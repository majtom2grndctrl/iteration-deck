/**
 * IterationDeckToolbar component
 * 
 * Global toolbar component that provides navigation controls for iteration decks.
 * Uses standard React + Tailwind CSS patterns for maintainability and hot reload.
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useIterationStore } from './store';
import { iterationDeckStyles, injectIterationDeckStyles } from '../utils/injectCSS';

/**
 * Toolbar component props
 */
export interface IterationDeckToolbarProps {
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
 * Main toolbar component
 */
export const IterationDeckToolbar: React.FC<IterationDeckToolbarProps> = ({ 
  className 
}) => {
  const store = useIterationStore();
  const [isVisible, setIsVisible] = useState(false);
  const glowStylesInjected = useRef(false);

  // Inject CSS styles automatically
  React.useEffect(() => {
    injectIterationDeckStyles();
  }, []);

  console.log('[IterationDeckToolbar DEBUG] Rendering toolbar:', { isVisible });

  // Get interactive decks and current selection
  const interactiveDecks = store.getInteractiveDecks().map(id => ({
    id,
    label: store.deckMetadata[id]?.label
  }));

  const selectedDeckId = store.selectedDeckId || interactiveDecks[0]?.id;
  const selectedDeck = store.deckMetadata[selectedDeckId];
  
  // Get current slide info
  const currentSlideId = selectedDeckId ? store.activeDecks[selectedDeckId] : undefined;
  const slideIds = selectedDeck?.slideIds || [];
  const currentSlideIndex = currentSlideId ? slideIds.indexOf(currentSlideId) : 0;
  const totalSlides = slideIds.length;
  
  // Get current slide label from metadata
  const currentSlideLabel = selectedDeck?.slides?.find(slide => slide.id === currentSlideId)?.label;
  

  // Show toolbar if we have interactive decks
  useEffect(() => {
    setIsVisible(interactiveDecks.length > 0);
  }, [interactiveDecks.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedDeckId || !isVisible) return;
      
      const isCmd = event.metaKey || event.ctrlKey;
      const isAlt = event.altKey;
      
      if (isCmd && isAlt) {
        if (event.code === 'BracketLeft') { // Cmd+Alt+[
          event.preventDefault();
          handlePrevious();
        } else if (event.code === 'BracketRight') { // Cmd+Alt+]
          event.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDeckId, isVisible]);

  const handleDeckSelect = useCallback((deckId: string) => {
    store.setSelectedDeck(deckId);
    // Auto-scroll to deck and highlight it
    scrollToDeckAndHighlight(deckId);
  }, [store]);

  const handlePrevious = useCallback(() => {
    if (!selectedDeckId) return;
    
    const slideIds = store.deckMetadata[selectedDeckId]?.slideIds || [];
    const currentIndex = slideIds.indexOf(store.activeDecks[selectedDeckId] || slideIds[0]);
    const previousIndex = currentIndex <= 0 ? slideIds.length - 1 : currentIndex - 1;
    
    store.setActiveSlide(selectedDeckId, slideIds[previousIndex]);
  }, [selectedDeckId, store]);

  const handleNext = useCallback(() => {
    if (!selectedDeckId) return;
    
    const slideIds = store.deckMetadata[selectedDeckId]?.slideIds || [];
    const currentIndex = slideIds.indexOf(store.activeDecks[selectedDeckId] || slideIds[0]);
    const nextIndex = currentIndex >= slideIds.length - 1 ? 0 : currentIndex + 1;
    
    store.setActiveSlide(selectedDeckId, slideIds[nextIndex]);
  }, [selectedDeckId, store]);

  /**
   * Inject global CSS for deck glow animations (called once)
   */
  const ensureGlowStyles = useCallback(() => {
    if (glowStylesInjected.current) return; // Already injected
    
    const styleId = 'iteration-deck-glow-styles';
    if (document.getElementById(styleId)) {
      glowStylesInjected.current = true;
      return; // Already injected
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Iteration Deck Glow Effect Global Styles */
      [data-iteration-glow] {
        border-radius: 8px;
        position: relative;
        animation: iteration-deck-glow 1s ease-in-out;
      }
      
      @keyframes iteration-deck-glow {
        0% {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2), 0 0 25px rgba(236, 72, 153, 0.1);
          outline: 2px solid rgba(236, 72, 153, 0.2);
        }
        50% {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.4), 0 0 25px rgba(236, 72, 153, 0.3);
          outline: 2px solid rgba(236, 72, 153, 0.6);
        }
        100% {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2), 0 0 25px rgba(236, 72, 153, 0.1);
          outline: 2px solid rgba(236, 72, 153, 0.1);
        }
      }
      
      /* Accessibility: respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        [data-iteration-glow] {
          animation: none;
          border: 2px solid rgba(236, 72, 153, 0.6);
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.3), 0 0 25px rgba(236, 72, 153, 0.2);
        }
      }
    `;
    document.head.appendChild(style);
    glowStylesInjected.current = true;
  }, []);

  /**
   * Wait for scroll animation to complete and then execute callback
   */
  const waitForScrollComplete = useCallback((targetY: number, callback: () => void) => {
    let scrollTimeout: number;
    let maxWaitTimeout: number;
    
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      
      // Check if we're close enough to the target (within 5px tolerance)
      scrollTimeout = window.setTimeout(() => {
        const currentY = window.scrollY;
        const tolerance = 5;
        
        if (Math.abs(currentY - targetY) <= tolerance) {
          // Scroll has stopped at the target position
          window.removeEventListener('scroll', onScroll);
          clearTimeout(maxWaitTimeout);
          callback();
        }
      }, 150); // Wait 150ms of no scroll movement to consider it "stopped"
    };
    
    // Safety timeout - trigger after 3 seconds maximum, even if scroll detection fails
    maxWaitTimeout = window.setTimeout(() => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
      callback();
    }, 3000);
    
    // Start listening for scroll events
    window.addEventListener('scroll', onScroll);
    
    // Also trigger immediately if we're already at the target position
    const currentY = window.scrollY;
    if (Math.abs(currentY - targetY) <= 5) {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(maxWaitTimeout);
      setTimeout(callback, 100); // Small delay to ensure DOM is settled
    }
  }, []);

  /**
   * Add temporary glow effect to deck element using CSS classes
   */
  const addGlowEffect = useCallback((deckElement: HTMLElement) => {
    // Ensure global styles are injected
    ensureGlowStyles();
    
    // Add glow data attribute to trigger CSS animation
    deckElement.setAttribute('data-iteration-glow', '');
    
    // Remove glow attribute after animation completes
    setTimeout(() => {
      deckElement.removeAttribute('data-iteration-glow');
    }, 800);
  }, [ensureGlowStyles]);

  /**
   * Scroll to deck and add glow effect
   */
  const scrollToDeckAndHighlight = useCallback((deckId: string) => {
    const deckElement = document.querySelector(`[data-iteration-deck="${deckId}"]`) as HTMLElement;
    
    if (!deckElement) {
      return;
    }
    
    // Find the active slide content to highlight - matches Lit version logic
    const activeSlide = deckElement.querySelector('[data-slide-active="true"]') as HTMLElement;
    
    // Get the actual React component content inside the slide
    const slottedContent = activeSlide?.firstElementChild as HTMLElement;
    
    // Priority: actual content -> slide wrapper -> deck container (matches Lit version)
    const elementToHighlight = slottedContent || activeSlide || deckElement;

    const rect = deckElement.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const elementTop = rect.top + currentScrollY;
    const targetScrollY = elementTop - (window.innerHeight * 0.15);

    const finalScrollY = Math.max(0, targetScrollY);
    window.scrollTo({
      top: finalScrollY,
      behavior: 'smooth'
    });

    waitForScrollComplete(finalScrollY, () => {
      addGlowEffect(elementToHighlight);
    });
  }, [waitForScrollComplete, addGlowEffect]);

  // Don't render if no interactive decks or in production without enable
  if (!isVisible) return null;

  console.log('[IterationDeckToolbar DEBUG] Rendering visible toolbar with data:', {
    interactiveDecks: interactiveDecks.length,
    selectedDeckId,
    totalSlides
  });

  const toolbarContent = (
    <div className={`${iterationDeckStyles.toolbar} ${className || ''}`}>
      {/* Deck selector */}
      <DeckSelector
        decks={interactiveDecks}
        selectedDeckId={selectedDeckId}
        onSelect={handleDeckSelect}
      />

      {/* Separator */}
      {interactiveDecks.length > 1 && (
        <div className={iterationDeckStyles.separator} />
      )}

      {/* Navigation controls */}
      <div className={iterationDeckStyles.navContainer}>
        <SlideNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={totalSlides > 1}
          canGoNext={totalSlides > 1}
        />
      </div>

      {/* Slide info */}
      <SlideInfo
        currentSlide={{
          label: currentSlideLabel,
          index: currentSlideIndex
        }}
        totalSlides={totalSlides}
      />
    </div>
  );

  // Render in portal at document root
  return createPortal(toolbarContent, document.body);
};

export default IterationDeckToolbar;