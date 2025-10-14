/**
 * Unit tests for IterationDeckToolbarView - Pure presentational component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { IterationDeckToolbarView } from './IterationDeckToolbarView';

// Mock the CSS injection utility
vi.mock('../utils/injectCSS', () => ({
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

describe('IterationDeckToolbarView - Pure Presentational Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls onPrevious when previous button is clicked', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <IterationDeckToolbarView
        currentSlide={{ label: 'Slide 2', index: 1 }}
        totalSlides={3}
        onPrevious={onPrevious}
        onNext={onNext}
        canNavigate={true}
      />
    );

    const prevButton = screen.getByLabelText(/previous slide/i);
    fireEvent.click(prevButton);

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).not.toHaveBeenCalled();
  });

  test('calls onNext when next button is clicked', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <IterationDeckToolbarView
        currentSlide={{ label: 'Slide 1', index: 0 }}
        totalSlides={3}
        onPrevious={onPrevious}
        onNext={onNext}
        canNavigate={true}
      />
    );

    const nextButton = screen.getByLabelText(/next slide/i);
    fireEvent.click(nextButton);

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).not.toHaveBeenCalled();
  });

  test('disables navigation buttons when canNavigate is false', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <IterationDeckToolbarView
        currentSlide={{ label: 'Single Slide', index: 0 }}
        totalSlides={3}
        onPrevious={onPrevious}
        onNext={onNext}
        canNavigate={false}
      />
    );

    const prevButton = screen.getByLabelText(/previous slide/i);
    const nextButton = screen.getByLabelText(/next slide/i);

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  test('disables navigation buttons when only one slide', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <IterationDeckToolbarView
        currentSlide={{ label: 'Only Slide', index: 0 }}
        totalSlides={1}
        onPrevious={onPrevious}
        onNext={onNext}
        canNavigate={true}
      />
    );

    const prevButton = screen.getByLabelText(/previous slide/i);
    const nextButton = screen.getByLabelText(/next slide/i);

    // Should be disabled because there's only 1 slide
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  test('renders deck selector when multiple decks provided', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    const onDeckSelect = vi.fn();

    const decks = [
      { id: 'deck1', label: 'First Deck' },
      { id: 'deck2', label: 'Second Deck' }
    ];

    render(
      <IterationDeckToolbarView
        decks={decks}
        selectedDeckId="deck1"
        currentSlide={{ label: 'Slide', index: 0 }}
        totalSlides={2}
        onPrevious={onPrevious}
        onNext={onNext}
        onDeckSelect={onDeckSelect}
      />
    );

    // Deck selector should be visible - check for the select element
    expect(screen.getByLabelText(/select iteration deck/i)).toBeInTheDocument();
    // Verify the selected deck is displayed
    expect(screen.getAllByText('First Deck').length).toBeGreaterThan(0);
  });

  test('hides deck selector when only one deck', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    const decks = [
      { id: 'deck1', label: 'Single Deck' }
    ];

    render(
      <IterationDeckToolbarView
        decks={decks}
        selectedDeckId="deck1"
        currentSlide={{ label: 'Slide', index: 0 }}
        totalSlides={2}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    // Deck selector should not be visible with one deck
    expect(screen.queryByLabelText(/select iteration deck/i)).not.toBeInTheDocument();
  });

  test('calls onDeckSelect when deck is changed', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    const onDeckSelect = vi.fn();

    const decks = [
      { id: 'deck1', label: 'First Deck' },
      { id: 'deck2', label: 'Second Deck' }
    ];

    render(
      <IterationDeckToolbarView
        decks={decks}
        selectedDeckId="deck1"
        currentSlide={{ label: 'Slide', index: 0 }}
        totalSlides={2}
        onPrevious={onPrevious}
        onNext={onNext}
        onDeckSelect={onDeckSelect}
      />
    );

    const select = screen.getByLabelText(/select iteration deck/i);
    fireEvent.change(select, { target: { value: 'deck2' } });

    expect(onDeckSelect).toHaveBeenCalledWith('deck2');
  });

  test('displays slide indicators matching totalSlides', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    const { container } = render(
      <IterationDeckToolbarView
        currentSlide={{ label: 'Slide 2', index: 1 }}
        totalSlides={4}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    // Should have 4 dots (one for each slide)
    const dots = container.querySelectorAll('[title^="Dot"]');
    expect(dots).toHaveLength(4);
  });

  test('highlights active slide indicator correctly', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    const { container } = render(
      <IterationDeckToolbarView
        currentSlide={{ label: 'Slide 2', index: 1 }}
        totalSlides={3}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    // Check that the correct dot is active (index 1)
    const dots = container.querySelectorAll('[title^="Dot"]');
    expect(dots[0]).toHaveClass('slide-dot-inactive-class');
    expect(dots[1]).toHaveClass('slide-dot-active-class');
    expect(dots[2]).toHaveClass('slide-dot-inactive-class');
  });

  test('shows fallback message when no slide selected', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <IterationDeckToolbarView
        totalSlides={3}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    expect(screen.getByText('No slide selected')).toBeInTheDocument();
  });

  test('shows error message when totalSlides is 0', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <IterationDeckToolbarView
        totalSlides={0}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    expect(screen.getByText(/No slides \(totalSlides: 0\)/)).toBeInTheDocument();
  });

  test('does not crash when onDeckSelect is undefined', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    const decks = [
      { id: 'deck1', label: 'First Deck' },
      { id: 'deck2', label: 'Second Deck' }
    ];

    render(
      <IterationDeckToolbarView
        decks={decks}
        selectedDeckId="deck1"
        currentSlide={{ label: 'Slide', index: 0 }}
        totalSlides={2}
        onPrevious={onPrevious}
        onNext={onNext}
        // onDeckSelect intentionally omitted
      />
    );

    const select = screen.getByLabelText(/select iteration deck/i);

    // Should not crash when changed
    expect(() => {
      fireEvent.change(select, { target: { value: 'deck2' } });
    }).not.toThrow();
  });

  test('renders separator when multiple decks', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    const decks = [
      { id: 'deck1', label: 'First Deck' },
      { id: 'deck2', label: 'Second Deck' }
    ];

    const { container } = render(
      <IterationDeckToolbarView
        decks={decks}
        selectedDeckId="deck1"
        currentSlide={{ label: 'Slide', index: 0 }}
        totalSlides={2}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    // Separator should be rendered between selector and navigation
    const separator = container.querySelector('.separator-class');
    expect(separator).toBeInTheDocument();
  });

  test('does not render separator when single deck', () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    const decks = [
      { id: 'deck1', label: 'Single Deck' }
    ];

    const { container } = render(
      <IterationDeckToolbarView
        decks={decks}
        selectedDeckId="deck1"
        currentSlide={{ label: 'Slide', index: 0 }}
        totalSlides={2}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    );

    // Separator should NOT be rendered
    const separator = container.querySelector('.separator-class');
    expect(separator).not.toBeInTheDocument();
  });
});
