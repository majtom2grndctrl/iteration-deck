/**
 * IterationDeck Component Tests
 * 
 * Tests the core functionality of the React IterationDeck component:
 * - Component rendering with slides
 * - Store integration and deck registration
 * - Slide navigation via imperative handle
 * - Production vs development mode behavior
 * - Automatic toolbar creation
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { IterationDeck, type IterationDeckHandle } from './IterationDeck';
import { IterationDeckSlide } from './IterationDeckSlide';

// Mock the toolbar hook to avoid DOM side effects in tests
vi.mock('./useIterationDeckToolbar', () => ({
  useEnsureToolbar: vi.fn()
}));

// Create mock store with functions
const createMockStore = () => ({
  activeDecks: {},
  deckMetadata: {},
  selectedDeckId: undefined,
  isProduction: false,
  registerDeck: vi.fn(),
  removeDeck: vi.fn(),
  setActiveSlide: vi.fn(),
  getActiveSlide: vi.fn(),
  getDeckMetadata: vi.fn(),
  setSelectedDeck: vi.fn(),
  getRegisteredDecks: vi.fn(() => []),
  getInteractiveDecks: vi.fn(() => [])
});

const createMockNavigation = () => ({
  navigateNext: vi.fn(() => true),
  navigatePrev: vi.fn(() => true),
  setActiveSlide: vi.fn(),
  activeSlide: 'test-deck-slide-0',
  slideCount: 3
});

// Mock the store module
vi.mock('./store', () => ({
  useIterationStore: vi.fn(),
  useDeckNavigation: vi.fn()
}));

describe('IterationDeck', () => {
  let mockStore: ReturnType<typeof createMockStore>;
  let mockNavigation: ReturnType<typeof createMockNavigation>;

  beforeEach(async () => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Create fresh mock instances
    mockStore = createMockStore();
    mockNavigation = createMockNavigation();
    
    // Import and configure the mocked modules
    const storeModule = await import('./store');
    vi.mocked(storeModule.useIterationStore).mockReturnValue(mockStore);
    vi.mocked(storeModule.useDeckNavigation).mockReturnValue(mockNavigation);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders with single slide', () => {
      render(
        <IterationDeck id="test-deck" label="Test Deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should render the deck container
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(document.querySelector('[data-iteration-deck="test-deck"]')).toBeInTheDocument();
    });

    test('renders with multiple slides', () => {
      render(
        <IterationDeck id="test-deck" label="Test Deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 3">
            <div>Content 3</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should render all slides (in development mode)
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument(); 
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    test('applies className and style props', () => {
      const customStyle = { backgroundColor: 'red', padding: '20px' };
      
      render(
        <IterationDeck 
          id="test-deck" 
          className="custom-class"
          style={customStyle}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = document.querySelector('[data-iteration-deck="test-deck"]') as HTMLElement;
      expect(deckElement).toHaveClass('custom-class');
      expect(deckElement.style.backgroundColor).toBe('red');
      expect(deckElement.style.padding).toBe('20px');
    });
  });

  describe('Store Integration', () => {
    test('registers deck with store on mount', () => {
      render(
        <IterationDeck id="test-deck" label="Test Label">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should call registerDeck with correct parameters
      expect(mockStore.registerDeck).toHaveBeenCalledWith(
        'test-deck',
        ['test-deck-slide-0', 'test-deck-slide-1'],
        'Test Label',
        true // isInteractive should be true in development
      );
    });

    test('removes deck from store on unmount', () => {
      const { unmount } = render(
        <IterationDeck id="test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      unmount();

      // Should call removeDeck on unmount
      expect(mockStore.removeDeck).toHaveBeenCalledWith('test-deck');
    });

    test('calls onDeckRegistered callback when provided', () => {
      const onDeckRegistered = vi.fn();
      
      render(
        <IterationDeck 
          id="test-deck" 
          label="Test Deck"
          onDeckRegistered={onDeckRegistered}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should call the callback with event-like object
      expect(onDeckRegistered).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            deckId: 'test-deck',
            slideCount: 1,
            slides: expect.arrayContaining([
              expect.objectContaining({
                id: 'test-deck-slide-0',
                label: 'Slide 1'
              })
            ])
          })
        })
      );
    });

    test('handles enableInProduction prop', () => {
      render(
        <IterationDeck 
          id="test-deck" 
          enableInProduction={true}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should register deck as interactive even in production
      expect(mockStore.registerDeck).toHaveBeenCalledWith(
        'test-deck',
        ['test-deck-slide-0'],
        undefined,
        true // Should be true due to enableInProduction
      );
    });
  });

  describe('Production Mode Behavior', () => {
    beforeEach(() => {
      // Set store to production mode
      mockStore.isProduction = true;
    });

    test('renders only first slide in production mode', () => {
      render(
        <IterationDeck id="test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 3">
            <div>Content 3</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should only render first slide
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();

      // Should have production mode data attribute
      const deckElement = document.querySelector('[data-iteration-deck="test-deck"]');
      expect(deckElement).toHaveAttribute('data-production-mode', 'true');
    });

    test('renders all slides when enableInProduction is true', () => {
      render(
        <IterationDeck id="test-deck" enableInProduction={true}>
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should render all slides even in production
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();

      // Should have development mode data attribute
      const deckElement = document.querySelector('[data-iteration-deck="test-deck"]');
      expect(deckElement).toHaveAttribute('data-development-mode', 'true');
    });
  });

  describe('Slide Navigation', () => {

    test('calls onSlideChange when active slide changes', () => {
      const onSlideChange = vi.fn();
      
      // Initial render with slide 0 active
      const { rerender } = render(
        <IterationDeck 
          id="test-deck"
          onSlideChange={onSlideChange}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Change active slide in store
      mockStore.activeDecks = {
        'test-deck': 'test-deck-slide-1'
      };

      // Re-render to trigger change
      rerender(
        <IterationDeck 
          id="test-deck"
          onSlideChange={onSlideChange}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should call onSlideChange with event details
      expect(onSlideChange).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            deckId: 'test-deck',
            currentSlideId: 'test-deck-slide-1',
            slideIndex: 1
          })
        })
      );
    });
  });

  describe('Imperative Handle', () => {
    test('provides navigation methods via ref', () => {
      const deckRef = React.createRef<IterationDeckHandle>();
      
      render(
        <IterationDeck ref={deckRef} id="test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const handle = deckRef.current;
      expect(handle).toBeTruthy();

      // Test navigation methods exist
      expect(typeof handle?.navigateToSlide).toBe('function');
      expect(typeof handle?.navigateToNext).toBe('function');
      expect(typeof handle?.navigateToPrev).toBe('function');
      expect(typeof handle?.getCurrentSlide).toBe('function');
      expect(typeof handle?.getAllSlides).toBe('function');
      expect(typeof handle?.getDeckInfo).toBe('function');
    });

    test('navigateToSlide works correctly', () => {
      const deckRef = React.createRef<IterationDeckHandle>();
      
      render(
        <IterationDeck ref={deckRef} id="test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const handle = deckRef.current!;
      
      // Navigate to specific slide
      const result = handle.navigateToSlide('test-deck-slide-1');
      
      expect(result).toBe(true);
      expect(mockStore.setActiveSlide).toHaveBeenCalledWith('test-deck', 'test-deck-slide-1');
    });

    test('navigateToSlide returns false for invalid slide', () => {
      const deckRef = React.createRef<IterationDeckHandle>();
      
      render(
        <IterationDeck ref={deckRef} id="test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const handle = deckRef.current!;
      
      // Try to navigate to non-existent slide
      const result = handle.navigateToSlide('invalid-slide-id');
      
      expect(result).toBe(false);
      expect(mockStore.setActiveSlide).not.toHaveBeenCalled();
    });

    test('getCurrentSlide returns correct slide info', () => {
      const deckRef = React.createRef<IterationDeckHandle>();
      
      // Set up active slide
      mockStore.activeDecks = {
        'test-deck': 'test-deck-slide-1'
      };
      
      render(
        <IterationDeck ref={deckRef} id="test-deck">
          <IterationDeckSlide label="First Slide">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Second Slide">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const handle = deckRef.current!;
      const currentSlide = handle.getCurrentSlide();
      
      expect(currentSlide).toEqual({
        id: 'test-deck-slide-1',
        index: 1,
        label: 'Second Slide'
      });
    });

    test('getAllSlides returns all slide info', () => {
      const deckRef = React.createRef<IterationDeckHandle>();
      
      render(
        <IterationDeck ref={deckRef} id="test-deck">
          <IterationDeckSlide label="First">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Second">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const handle = deckRef.current!;
      const allSlides = handle.getAllSlides();
      
      expect(allSlides).toEqual([
        { id: 'test-deck-slide-0', index: 0, label: 'First' },
        { id: 'test-deck-slide-1', index: 1, label: 'Second' }
      ]);
    });

    test('getDeckInfo returns deck metadata', () => {
      const deckRef = React.createRef<IterationDeckHandle>();
      
      render(
        <IterationDeck ref={deckRef} id="test-deck" label="My Deck">
          <IterationDeckSlide label="Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const handle = deckRef.current!;
      const deckInfo = handle.getDeckInfo();
      
      expect(deckInfo).toEqual({
        id: 'test-deck',
        label: 'My Deck',
        slideCount: 1,
        activeSlideId: undefined // Based on mock store
      });
    });
  });

  describe('Toolbar Integration', () => {
    test('calls useEnsureToolbar hook', async () => {
      const { useEnsureToolbar } = await import('./useIterationDeckToolbar');
      
      render(
        <IterationDeck id="test-deck">
          <IterationDeckSlide label="Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should call the hook to ensure toolbar is created
      expect(useEnsureToolbar).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty children gracefully', () => {
      render(
        <IterationDeck id="test-deck">
          {/* No children */}
        </IterationDeck>
      );

      // Should not crash and should not register deck
      expect(mockStore.registerDeck).not.toHaveBeenCalled();
    });

    test('handles null children gracefully', () => {
      render(
        <IterationDeck id="test-deck">
          {null}
        </IterationDeck>
      );

      // Should not crash 
      expect(mockStore.registerDeck).not.toHaveBeenCalled();
    });

    test('handles single child (not array)', () => {
      render(
        <IterationDeck id="test-deck">
          <IterationDeckSlide label="Single Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should handle single child correctly
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(mockStore.registerDeck).toHaveBeenCalledWith(
        'test-deck',
        ['test-deck-slide-0'],
        undefined,
        true
      );
    });
  });
});