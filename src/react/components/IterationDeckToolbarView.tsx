/**
 * IterationDeckToolbarView - Pure presentational component
 *
 * Displays the iteration deck toolbar UI without any state management or side effects.
 * This component is purely presentational and can be reused in different contexts
 * (e.g., production app with Zustand state, marketing landing pages with local state).
 */

import React from 'react';
import { iterationDeckStyles } from '../utils/injectCSS';

/**
 * Props for the IterationDeckToolbarView component
 */
export interface IterationDeckToolbarViewProps {
  /** Array of available decks for selection */
  decks?: Array<{ id: string; label?: string }>;

  /** Currently selected deck ID */
  selectedDeckId?: string;

  /** Current slide information */
  currentSlide?: {
    label?: string;
    index?: number;
  };

  /** Total number of slides in the selected deck */
  totalSlides: number;

  /** Callback when user clicks previous button */
  onPrevious: () => void;

  /** Callback when user clicks next button */
  onNext: () => void;

  /** Callback when user selects a deck from dropdown */
  onDeckSelect?: (deckId: string) => void;

  /** Whether navigation buttons should be disabled */
  canNavigate?: boolean;

  /** Optional className for the toolbar container */
  className?: string;
}

/**
 * Deck selector dropdown component
 */
const DeckSelector: React.FC<{
  decks: { id: string; label?: string }[];
  selectedDeckId?: string;
  onSelect: (deckId: string) => void;
}> = ({ decks, selectedDeckId, onSelect }) => {
  const selectedDeck = decks.find(d => d.id === selectedDeckId);
  const displayLabel = selectedDeck ? (selectedDeck.label || selectedDeck.id) : 'Select Deck';

  if (decks.length <= 1) return null;

  return (
    <div className={iterationDeckStyles.selectorContainer}>
      <select
        className={iterationDeckStyles.hiddenSelect}
        onChange={(e) => onSelect(e.target.value)}
        value={selectedDeckId || ''}
        aria-label="Select iteration deck"
      >
        {decks.map(deck => (
          <option
            key={deck.id}
            value={deck.id}
          >
            {deck.label || deck.id}
          </option>
        ))}
      </select>

      <div className={iterationDeckStyles.selectorDisplay}>
        <span className={iterationDeckStyles.selectorLabel}>
          {displayLabel}
        </span>
        <span className={iterationDeckStyles.dropdownArrow}>
          ▼
        </span>
      </div>
    </div>
  );
};

/**
 * Slide navigation buttons component
 */
const SlideNavigation: React.FC<{
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}> = ({ onPrevious, onNext, canGoPrevious, canGoNext }) => {
  return (
    <div className={iterationDeckStyles.navigationContainer}>
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={iterationDeckStyles.previousButton}
        aria-label="Previous slide (Ctrl/Cmd+Alt+[)"
        title="Previous slide (Ctrl/Cmd+Alt+[)"
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <path d="M7 6l6-4v8l-6-4z" />
        </svg>
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={iterationDeckStyles.nextButton}
        aria-label="Next slide (Ctrl/Cmd+Alt+])"
        title="Next slide (Ctrl/Cmd+Alt+])"
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <path d="M11 6l-6 4V2l6 4z" />
        </svg>
      </button>
    </div>
  );
};

/**
 * Slide info display component
 */
const SlideInfo: React.FC<{
  currentSlide?: { label?: string; index?: number };
  totalSlides: number;
}> = ({ currentSlide, totalSlides }) => {
  return (
    <div className={iterationDeckStyles.slideInfo}>
      <span className={iterationDeckStyles.slideLabel}>
        {currentSlide?.label || 'No slide selected'}
      </span>

      {/* Slide indicators */}
      <div className={iterationDeckStyles.slideIndicators}>
        {totalSlides === 0 ? (
          <span className={iterationDeckStyles.noSlides}>
            No slides (totalSlides: {totalSlides})
          </span>
        ) : (
          Array.from({ length: totalSlides }, (_, i) => {
            const isActive = i === (currentSlide?.index || 0);

            return (
              <div
                key={i}
                className={isActive ? iterationDeckStyles.slideDotActive : iterationDeckStyles.slideDotInactive}
                title={`Dot ${i} - ${isActive ? 'active' : 'inactive'}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

/**
 * IterationDeckToolbarView - Pure presentational toolbar component
 *
 * This component handles only the visual presentation of the toolbar.
 * All state management, side effects, and business logic should be handled
 * by parent components that wrap this view.
 */
export const IterationDeckToolbarView: React.FC<IterationDeckToolbarViewProps> = ({
  decks = [],
  selectedDeckId,
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onDeckSelect,
  canNavigate = true,
  className = ''
}) => {
  const handleDeckSelect = onDeckSelect || (() => {});

  return (
    <div className={`${iterationDeckStyles.toolbar} ${className}`}>
      {/* Deck selector */}
      <DeckSelector
        decks={decks}
        selectedDeckId={selectedDeckId}
        onSelect={handleDeckSelect}
      />

      {/* Separator */}
      {decks.length > 1 && (
        <div className={iterationDeckStyles.separator} />
      )}

      {/* Navigation controls */}
      <div className={iterationDeckStyles.navContainer}>
        <SlideNavigation
          onPrevious={onPrevious}
          onNext={onNext}
          canGoPrevious={canNavigate && totalSlides > 1}
          canGoNext={canNavigate && totalSlides > 1}
        />
      </div>

      {/* Slide info */}
      <SlideInfo
        currentSlide={currentSlide}
        totalSlides={totalSlides}
      />
    </div>
  );
};

export default IterationDeckToolbarView;
