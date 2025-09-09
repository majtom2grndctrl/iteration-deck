/**
 * Unit tests for IterationDeckToolbar - slide label display
 */

import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { IterationDeckToolbar } from './IterationDeckToolbar';
import { useIterationStore } from './store';
import type { DeckMetadata } from './store';

// Mock the CSS injection utility
vi.mock('../utils/injectCSS', () => ({
  injectIterationDeckStyles: vi.fn(),
  iterationDeckStyles: {
    toolbar: 'toolbar-class',
    selectorContainer: 'selector-class',
    hiddenSelect: 'hidden-select-class',
    selectorDisplay: 'selector-display-class',
    selectorLabel: 'selector-label-class',
    dropdownArrow: 'dropdown-arrow-class',
    navigationContainer: 'nav-container-class',
    previousButton: 'prev-button-class',
    nextButton: 'next-button-class',
    navContainer: 'nav-container-class',
    separator: 'separator-class',
    slideInfo: 'slide-info-class',
    slideLabel: 'slide-label-class',
    slideIndicators: 'slide-indicators-class',
    slideDotActive: 'slide-dot-active-class',
    slideDotInactive: 'slide-dot-inactive-class',
    noSlides: 'no-slides-class'
  }
}));

// Create a mock store with slide metadata
const createMockStoreWithSlides = (deckId: string, slides: { id: string; label: string }[], activeSlideId?: string) => {
  const mockMetadata: DeckMetadata = {
    slideIds: slides.map(s => s.id),
    slides: slides,
    activeSlideId: activeSlideId || slides[0]?.id || '',
    label: 'Test Deck',
    isInteractive: true
  };

  return {
    activeDecks: { [deckId]: activeSlideId || slides[0]?.id || '' } as Record<string, string>,
    deckMetadata: { [deckId]: mockMetadata } as Record<string, DeckMetadata>,
    selectedDeckId: deckId,
    registerDeck: vi.fn(),
    removeDeck: vi.fn(),
    setActiveSlide: vi.fn(),
    setSelectedDeck: vi.fn(),
    getActiveSlide: vi.fn(() => activeSlideId || slides[0]?.id),
    getDeckSlides: vi.fn(() => slides.map(s => s.id)),
    getDeckMetadata: vi.fn(() => mockMetadata),
    getRegisteredDecks: vi.fn(() => [deckId]),
    getInteractiveDecks: vi.fn(() => [deckId])
  };
};

vi.mock('./store', () => ({
  useIterationStore: vi.fn(),
}));

describe('IterationDeckToolbar - Slide Label Display', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays slide label instead of slide ID', () => {
    const slides = [
      { id: 'test-deck-slide-0', label: 'Hero Layout' },
      { id: 'test-deck-slide-1', label: 'Card Layout' },
      { id: 'test-deck-slide-2', label: 'List Layout' }
    ];
    
    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-deck-slide-0');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Should display the human-readable label, not the slide ID
    expect(screen.getByText('Hero Layout')).toBeInTheDocument();
    expect(screen.queryByText('test-deck-slide-0')).not.toBeInTheDocument();
  });

  test('displays correct label when active slide changes', () => {
    const slides = [
      { id: 'test-deck-slide-0', label: 'Primary Button' },
      { id: 'test-deck-slide-1', label: 'Secondary Button' },
      { id: 'test-deck-slide-2', label: 'Outline Button' }
    ];
    
    // Start with second slide active
    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-deck-slide-1');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Should display the label for the second slide
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
    expect(screen.queryByText('Primary Button')).not.toBeInTheDocument();
    expect(screen.queryByText('test-deck-slide-1')).not.toBeInTheDocument();
  });

  test('falls back gracefully when slide metadata is missing', () => {
    const mockStore = {
      activeDecks: { 'test-deck': 'test-deck-slide-0' },
      deckMetadata: {
        'test-deck': {
          slideIds: ['test-deck-slide-0'],
          slides: [], // Empty slides array
          activeSlideId: 'test-deck-slide-0',
          label: 'Test Deck',
          isInteractive: true
        }
      },
      selectedDeckId: 'test-deck',
      registerDeck: vi.fn(),
      removeDeck: vi.fn(),
      setActiveSlide: vi.fn(),
      setSelectedDeck: vi.fn(),
      getActiveSlide: vi.fn(() => 'test-deck-slide-0'),
      getDeckSlides: vi.fn(() => ['test-deck-slide-0']),
      getDeckMetadata: vi.fn(),
      getRegisteredDecks: vi.fn(() => ['test-deck']),
      getInteractiveDecks: vi.fn(() => ['test-deck'])
    };
    
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Should display fallback when no slide label is found
    expect(screen.getByText('No slide selected')).toBeInTheDocument();
  });

  test('handles multiple decks with different slide labels', () => {
    const slides = [
      { id: 'deck1-slide-0', label: 'Navigation Header' },
      { id: 'deck1-slide-1', label: 'Minimal Header' }
    ];

    const mockStore = createMockStoreWithSlides('deck1', slides, 'deck1-slide-1');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Should show the correct label for the selected deck's active slide
    expect(screen.getByText('Minimal Header')).toBeInTheDocument();
    expect(screen.queryByText('Navigation Header')).not.toBeInTheDocument();
  });

  test('does not render when no interactive decks are available', () => {
    const mockStore = {
      activeDecks: {},
      deckMetadata: {},
      selectedDeckId: undefined,
      registerDeck: vi.fn(),
      removeDeck: vi.fn(),
      setActiveSlide: vi.fn(),
      setSelectedDeck: vi.fn(),
      getActiveSlide: vi.fn(),
      getDeckSlides: vi.fn(() => []),
      getDeckMetadata: vi.fn(),
      getRegisteredDecks: vi.fn(() => []),
      getInteractiveDecks: vi.fn(() => []) // No interactive decks
    };
    
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    const { container } = render(<IterationDeckToolbar />);

    // Toolbar should not render at all
    expect(container.firstChild).toBeNull();
  });
});