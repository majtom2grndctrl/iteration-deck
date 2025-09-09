/**
 * Simplified tests for IterationDeck - always show toolbar architecture
 */

import { render, waitFor, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { IterationDeck } from './IterationDeck';
import { IterationDeckSlide } from './IterationDeckSlide';
import { useIterationStore } from './store';

// Create a proper mock for the store
const createMockStore = () => ({
  activeDecks: {} as Record<string, string>,
  deckMetadata: {} as Record<string, any>,
  selectedDeckId: undefined as string | undefined,
  registerDeck: vi.fn(),
  removeDeck: vi.fn(),
  setActiveSlide: vi.fn(),
  setSelectedDeck: vi.fn(),
  getActiveSlide: vi.fn(),
  getDeckSlides: vi.fn(() => []),
  getDeckMetadata: vi.fn(),
  getRegisteredDecks: vi.fn(() => []),
  getInteractiveDecks: vi.fn(() => [])
});

vi.mock('./store', () => ({
  useIterationStore: vi.fn(),
  useDeckNavigation: vi.fn(() => ({
    setActiveSlide: vi.fn(),
    navigateNext: vi.fn(),
    navigatePrev: vi.fn(),
    activeSlide: undefined,
    slideCount: 0
  }))
}));

vi.mock('./useIterationDeckToolbar', () => ({
  useEnsureToolbar: vi.fn()
}));

const mockStore = createMockStore();

describe('IterationDeck - Simplified Architecture', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockStore, createMockStore());
    vi.mocked(useIterationStore).mockReturnValue(mockStore);
  });

  test('renders basic iteration deck structure', async () => {
    render(
      <IterationDeck id="test-deck" label="Test Deck">
        <IterationDeckSlide label="Slide 1">
          <div>Content 1</div>
        </IterationDeckSlide>
        <IterationDeckSlide label="Slide 2">
          <div>Content 2</div>
        </IterationDeckSlide>
      </IterationDeck>
    );

    await waitFor(() => {
      expect(document.querySelector('[data-iteration-deck="test-deck"]')).toBeInTheDocument();
    });

    // Verify content renders
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  test('registers deck with store including slide metadata', async () => {
    render(
      <IterationDeck id="test-deck" label="Test Deck">
        <IterationDeckSlide label="Slide 1">
          <div>Content</div>
        </IterationDeckSlide>
      </IterationDeck>
    );

    await waitFor(() => {
      expect(mockStore.registerDeck).toHaveBeenCalledWith(
        'test-deck',
        ['test-deck-slide-0'],
        'Test Deck',
        true, // Always interactive now
        [{ id: 'test-deck-slide-0', label: 'Slide 1' }] // Slide metadata
      );
    });
  });

  test('registers deck with multiple slides and their labels', async () => {
    render(
      <IterationDeck id="multi-deck" label="Multi Deck">
        <IterationDeckSlide label="Hero Layout">
          <div>Hero content</div>
        </IterationDeckSlide>
        <IterationDeckSlide label="Card Layout">
          <div>Card content</div>
        </IterationDeckSlide>
        <IterationDeckSlide label="List Layout">
          <div>List content</div>
        </IterationDeckSlide>
      </IterationDeck>
    );

    await waitFor(() => {
      expect(mockStore.registerDeck).toHaveBeenCalledWith(
        'multi-deck',
        ['multi-deck-slide-0', 'multi-deck-slide-1', 'multi-deck-slide-2'],
        'Multi Deck',
        true,
        [
          { id: 'multi-deck-slide-0', label: 'Hero Layout' },
          { id: 'multi-deck-slide-1', label: 'Card Layout' },
          { id: 'multi-deck-slide-2', label: 'List Layout' }
        ]
      );
    });
  });

  test('calls useEnsureToolbar to show toolbar', async () => {
    const { useEnsureToolbar } = await import('./useIterationDeckToolbar');
    
    render(
      <IterationDeck id="test-deck">
        <IterationDeckSlide label="Slide 1">
          <div>Content</div>
        </IterationDeckSlide>
      </IterationDeck>
    );

    expect(useEnsureToolbar).toHaveBeenCalled();
  });

  test('cleans up on unmount', () => {
    const { unmount } = render(
      <IterationDeck id="test-deck">
        <IterationDeckSlide label="Slide 1">
          <div>Content</div>
        </IterationDeckSlide>
      </IterationDeck>
    );

    unmount();

    expect(mockStore.removeDeck).toHaveBeenCalledWith('test-deck');
  });
});

describe('IterationDeckSlide', () => {
  test('renders slide content with proper attributes', () => {
    render(
      <IterationDeckSlide label="Test Slide">
        <div>Slide content</div>
      </IterationDeckSlide>
    );

    expect(screen.getByText('Slide content')).toBeInTheDocument();
    expect(document.querySelector('[data-iteration-deck-slide="true"]')).toBeInTheDocument();
  });
});