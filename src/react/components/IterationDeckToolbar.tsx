/**
 * IterationDeckToolbar component
 * 
 * Global toolbar component that provides navigation controls for iteration decks.
 * Uses standard React + Tailwind CSS patterns for maintainability and hot reload.
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useIterationStore } from './store';


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
    <div className="relative flex items-center">
      <select 
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-[2]"
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
      
      <div className="flex items-center justify-between h-7 min-w-[120px] gap-3 px-3 bg-white border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-3xl text-sm font-normal text-gray-700 dark:text-gray-200 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
        <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{displayLabel}</span>
        <span className="text-[8px] text-gray-500 dark:text-gray-400 pointer-events-none">▼</span>
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
  // Base button classes (shared by both buttons)
  const baseButtonClass = "flex items-center justify-center w-8 h-full bg-white dark:bg-gray-800 transition-all duration-150 ease-out text-gray-600 dark:text-gray-300 text-sm cursor-pointer select-none hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-100 active:bg-gray-100 active:scale-95 dark:active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset dark:focus:ring-blue-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 dark:disabled:hover:bg-gray-700 dark:disabled:hover:text-gray-300 disabled:active:scale-100";

  return (
    <div className="flex items-center rounded-3xl border-2 border-gray-300 dark:border-gray-600 overflow-hidden h-7 bg-gray-200 dark:bg-gray-600">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`${baseButtonClass} rounded-l-3xl border-r-0`}
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
        className={`${baseButtonClass} rounded-r-3xl border-l-0`}
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
  // Debug logging
  
  return (
    <div className="flex-1 flex flex-col gap-1 sm:px-2 sm:max-w-4xl lg:max-w-none lg:w-80">
      <span className="text-gray-700 dark:text-gray-200 text-xs font-medium leading-4 overflow-hidden text-ellipsis whitespace-nowrap sm:text-sm">
        {currentSlide?.label || 'No slide selected'}
      </span>
      
      {/* Slide indicators - show debug info when no dots */}
      <div className="flex items-center justify-start gap-1 w-full">
        {totalSlides === 0 ? (
          <span className="text-[8px] text-red-500">No slides (totalSlides: {totalSlides})</span>
        ) : (
          Array.from({ length: totalSlides }, (_, i) => {
            const isActive = i === (currentSlide?.index || 0);
            
            return (
              <div
                key={i}
                className={`w-1 h-1 rounded-full bg-gray-400 transition-opacity duration-200 ${
                  isActive ? 'opacity-90' : 'opacity-50'
                }`}
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
          outline: 2px solid rgba(236, 72, 153, 0);
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
   * Find the best element to highlight within a slide
   * Targets the first child which is typically the actual content component
   */
  const findBestHighlightTarget = useCallback((slideElement: HTMLElement): HTMLElement => {
    // Look for the first child element (the actual slide content)
    const firstChild = slideElement.firstElementChild as HTMLElement;
    
    if (firstChild) {
      return firstChild;
    }
    
    // Fallback to slide element if no children
    return slideElement;
  }, []);

  /**
   * Scroll to deck and add glow effect
   */
  const scrollToDeckAndHighlight = useCallback((deckId: string) => {
    const deckElement = document.querySelector(`[data-iteration-deck="${deckId}"]`) as HTMLElement;
    
    if (!deckElement) {
      return;
    }
    
    // Find the active slide content to highlight
    const activeSlide = deckElement.querySelector('[data-slide-active="true"]') as HTMLElement;
    let elementToHighlight = activeSlide || deckElement;
    
    // If we found an active slide, try to find a better highlight target within it
    if (activeSlide) {
      elementToHighlight = findBestHighlightTarget(activeSlide);
    }

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

  const toolbarContent = (
    <div className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999] flex items-center min-w-80 sm:min-w-96 gap-1 px-2 py-1 sm:gap-2 sm:px-1 sm:py-1 sm:bottom-4 lg:p-3 rounded-[40px] backdrop-blur-md shadow-lg font-medium text-sm leading-none text-gray-700 bg-gray-200/80 dark:bg-gray-900/70 dark:text-gray-200 ${className || ''}`}>
      {/* Inner container */}
      <div className="flex items-center gap-2 w-full">
        {/* Deck selector */}
        <DeckSelector
          decks={interactiveDecks}
          selectedDeckId={selectedDeckId}
          onSelect={handleDeckSelect}
        />

        {/* Separator */}
        {interactiveDecks.length > 1 && (
          <div className="w-px h-5 bg-gray-400/60 dark:bg-gray-500/70 sm:h-4" />
        )}

        {/* Navigation controls */}
        <div className="flex items-center gap-0">
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
            label: selectedDeck?.slideIds?.[currentSlideIndex],
            index: currentSlideIndex
          }}
          totalSlides={totalSlides}
        />
      </div>
    </div>
  );

  // Render in portal at document root
  return createPortal(toolbarContent, document.body);
};

export default IterationDeckToolbar;