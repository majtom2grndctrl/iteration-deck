/**
 * Integration tests for IterationDeckToolbar - Props mapping from store to ToolbarView
 *
 * These tests verify that the smart wrapper correctly maps Zustand store state
 * to ToolbarView component props.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { IterationDeckToolbar } from './IterationDeckToolbar';
import { useIterationStore } from './store';
import type { DeckMetadata } from './store';

// Mock the CSS injection utility
vi.mock('../utils/injectCSS', () => ({
  injectIterationDeckStyles: vi.fn(),
  iterationDeckStyles: {
    toolbarContainer: 'toolbar-container-class',
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

// Mock ToolbarView to track what props it receives
vi.mock('./IterationDeckToolbarView', () => ({
  IterationDeckToolbarView: vi.fn(({
    decks,
    selectedDeckId,
    currentSlide,
    totalSlides,
    onPrevious,
    onNext,
    onDeckSelect,
    canNavigate
  }) => (
    <div data-testid="toolbar-view-mock">
      <div data-testid="decks-count">{decks?.length || 0}</div>
      <div data-testid="selected-deck-id">{selectedDeckId}</div>
      <div data-testid="current-slide-label">{currentSlide?.label}</div>
      <div data-testid="current-slide-index">{currentSlide?.index}</div>
      <div data-testid="total-slides">{totalSlides}</div>
      <div data-testid="can-navigate">{String(canNavigate)}</div>
      <button data-testid="prev-btn" onClick={onPrevious}>Prev</button>
      <button data-testid="next-btn" onClick={onNext}>Next</button>
      <button data-testid="deck-select-btn" onClick={() => onDeckSelect?.('deck2')}>Select</button>
    </div>
  ))
}));

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

describe('IterationDeckToolbar - Integration: Store to ToolbarView Props Mapping', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('maps store state to ToolbarView props correctly', () => {
    const slides = [
      { id: 'test-slide-0', label: 'First Slide' },
      { id: 'test-slide-1', label: 'Second Slide' },
      { id: 'test-slide-2', label: 'Third Slide' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-slide-1');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Verify props passed to ToolbarView
    expect(screen.getByTestId('decks-count')).toHaveTextContent('1');
    expect(screen.getByTestId('selected-deck-id')).toHaveTextContent('test-deck');
    expect(screen.getByTestId('current-slide-label')).toHaveTextContent('Second Slide');
    expect(screen.getByTestId('current-slide-index')).toHaveTextContent('1');
    expect(screen.getByTestId('total-slides')).toHaveTextContent('3');
    expect(screen.getByTestId('can-navigate')).toHaveTextContent('true');
  });

  test('passes correct canNavigate based on slide count', () => {
    const singleSlide = [
      { id: 'test-slide-0', label: 'Only Slide' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', singleSlide);
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // With only 1 slide, canNavigate should be false
    expect(screen.getByTestId('can-navigate')).toHaveTextContent('false');
  });

  test('triggers store.setActiveSlide when onPrevious is called', () => {
    const slides = [
      { id: 'test-slide-0', label: 'First' },
      { id: 'test-slide-1', label: 'Second' },
      { id: 'test-slide-2', label: 'Third' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-slide-1');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    const prevBtn = screen.getByTestId('prev-btn');
    fireEvent.click(prevBtn);

    // Should navigate to previous slide (from index 1 to 0)
    expect(mockStore.setActiveSlide).toHaveBeenCalledWith('test-deck', 'test-slide-0');
  });

  test('triggers store.setActiveSlide when onNext is called', () => {
    const slides = [
      { id: 'test-slide-0', label: 'First' },
      { id: 'test-slide-1', label: 'Second' },
      { id: 'test-slide-2', label: 'Third' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-slide-1');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    const nextBtn = screen.getByTestId('next-btn');
    fireEvent.click(nextBtn);

    // Should navigate to next slide (from index 1 to 2)
    expect(mockStore.setActiveSlide).toHaveBeenCalledWith('test-deck', 'test-slide-2');
  });

  test('wraps around to last slide when going previous from first slide', () => {
    const slides = [
      { id: 'test-slide-0', label: 'First' },
      { id: 'test-slide-1', label: 'Second' },
      { id: 'test-slide-2', label: 'Third' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-slide-0');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    const prevBtn = screen.getByTestId('prev-btn');
    fireEvent.click(prevBtn);

    // Should wrap around to last slide
    expect(mockStore.setActiveSlide).toHaveBeenCalledWith('test-deck', 'test-slide-2');
  });

  test('wraps around to first slide when going next from last slide', () => {
    const slides = [
      { id: 'test-slide-0', label: 'First' },
      { id: 'test-slide-1', label: 'Second' },
      { id: 'test-slide-2', label: 'Third' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-slide-2');
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    const nextBtn = screen.getByTestId('next-btn');
    fireEvent.click(nextBtn);

    // Should wrap around to first slide
    expect(mockStore.setActiveSlide).toHaveBeenCalledWith('test-deck', 'test-slide-0');
  });

  test('triggers store.setSelectedDeck when onDeckSelect is called', () => {
    const slides = [
      { id: 'test-slide-0', label: 'First' }
    ];

    const mockStore = createMockStoreWithSlides('test-deck', slides);
    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    const selectBtn = screen.getByTestId('deck-select-btn');
    fireEvent.click(selectBtn);

    expect(mockStore.setSelectedDeck).toHaveBeenCalledWith('deck2');
  });

  test('maps multiple decks correctly to ToolbarView', () => {
    const deck1Slides = [
      { id: 'deck1-slide-0', label: 'D1 First' },
      { id: 'deck1-slide-1', label: 'D1 Second' }
    ];

    const deck2Slides = [
      { id: 'deck2-slide-0', label: 'D2 First' }
    ];

    const mockMetadata1: DeckMetadata = {
      slideIds: deck1Slides.map(s => s.id),
      slides: deck1Slides,
      activeSlideId: 'deck1-slide-0',
      label: 'First Deck',
      isInteractive: true
    };

    const mockMetadata2: DeckMetadata = {
      slideIds: deck2Slides.map(s => s.id),
      slides: deck2Slides,
      activeSlideId: 'deck2-slide-0',
      label: 'Second Deck',
      isInteractive: true
    };

    const mockStore = {
      activeDecks: {
        'deck1': 'deck1-slide-0',
        'deck2': 'deck2-slide-0'
      },
      deckMetadata: {
        'deck1': mockMetadata1,
        'deck2': mockMetadata2
      },
      selectedDeckId: 'deck1',
      registerDeck: vi.fn(),
      removeDeck: vi.fn(),
      setActiveSlide: vi.fn(),
      setSelectedDeck: vi.fn(),
      getActiveSlide: vi.fn(() => 'deck1-slide-0'),
      getDeckSlides: vi.fn(() => ['deck1-slide-0', 'deck1-slide-1']),
      getDeckMetadata: vi.fn(() => mockMetadata1),
      getRegisteredDecks: vi.fn(() => ['deck1', 'deck2']),
      getInteractiveDecks: vi.fn(() => ['deck1', 'deck2'])
    };

    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Should show 2 decks
    expect(screen.getByTestId('decks-count')).toHaveTextContent('2');
    // Should show selected deck
    expect(screen.getByTestId('selected-deck-id')).toHaveTextContent('deck1');
  });

  test('handles missing slide metadata gracefully', () => {
    const mockMetadata: DeckMetadata = {
      slideIds: ['test-slide-0'],
      slides: [], // No slide metadata
      activeSlideId: 'test-slide-0',
      label: 'Test Deck',
      isInteractive: true
    };

    const mockStore = {
      activeDecks: { 'test-deck': 'test-slide-0' },
      deckMetadata: { 'test-deck': mockMetadata },
      selectedDeckId: 'test-deck',
      registerDeck: vi.fn(),
      removeDeck: vi.fn(),
      setActiveSlide: vi.fn(),
      setSelectedDeck: vi.fn(),
      getActiveSlide: vi.fn(() => 'test-slide-0'),
      getDeckSlides: vi.fn(() => ['test-slide-0']),
      getDeckMetadata: vi.fn(() => mockMetadata),
      getRegisteredDecks: vi.fn(() => ['test-deck']),
      getInteractiveDecks: vi.fn(() => ['test-deck'])
    };

    vi.mocked(useIterationStore).mockReturnValue(mockStore);

    render(<IterationDeckToolbar />);

    // Should pass undefined label to ToolbarView (which will show fallback)
    expect(screen.getByTestId('current-slide-label')).toHaveTextContent('');
  });
});
