/**
 * React-specific store implementation using React patterns
 * Provides state management for iteration decks without external dependencies
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { isDevelopmentMode } from '../shared';

/**
 * Deck metadata for store management
 */
export interface DeckMetadata {
  /** All slide IDs in this deck */
  slideIds: string[];
  /** Currently active slide ID */
  activeSlideId: string;
  /** Optional deck label */
  label?: string;
  /** Whether this deck should show navigation controls */
  isInteractive: boolean;
}

/**
 * Store state interface
 */
export interface StoreState {
  /** Record mapping deck IDs to their currently active slide IDs */
  activeDecks: Record<string, string>;
  
  /** Record mapping deck IDs to their metadata (slide IDs, labels, etc.) */
  deckMetadata: Record<string, DeckMetadata>;
  
  /** Currently selected deck for toolbar navigation */
  selectedDeckId?: string;
  
  /** Environment flag - true in production builds, false in development */
  isProduction: boolean;
}

/**
 * Store actions interface
 */
export interface StoreActions {
  /** Sets the active slide for a specific deck */
  setActiveSlide: (deckId: string, slideId: string) => void;
  
  /** Registers a deck with all its slides */
  registerDeck: (deckId: string, slideIds: string[], label?: string, isInteractive?: boolean) => void;
  
  /** Removes a deck from the store */
  removeDeck: (deckId: string) => void;
  
  /** Sets the selected deck for toolbar navigation */
  setSelectedDeck: (deckId: string) => void;
  
  /** Gets the active slide ID for a specific deck */
  getActiveSlide: (deckId: string) => string | undefined;
  
  /** Gets all slide IDs for a specific deck */
  getDeckSlides: (deckId: string) => string[];
  
  /** Gets deck metadata (slides, active slide, label) */
  getDeckMetadata: (deckId: string) => DeckMetadata | undefined;
  
  /** Gets all registered deck IDs */
  getRegisteredDecks: () => string[];
  
  /** Gets only interactive deck IDs (for toolbar dropdown) */
  getInteractiveDecks: () => string[];
}

// Global store state
let globalState: StoreState = {
  activeDecks: {},
  deckMetadata: {},
  selectedDeckId: undefined,
  isProduction: !isDevelopmentMode()
};

// Store listeners
const listeners = new Set<(state: StoreState) => void>();

// Notify all listeners of state changes
function notifyListeners() {
  listeners.forEach(listener => listener(globalState));
}

// Store actions
export const storeActions: StoreActions = {
  setActiveSlide: (deckId: string, slideId: string) => {
    globalState = {
      ...globalState,
      activeDecks: {
        ...globalState.activeDecks,
        [deckId]: slideId
      },
      deckMetadata: {
        ...globalState.deckMetadata,
        [deckId]: globalState.deckMetadata[deckId] 
          ? { ...globalState.deckMetadata[deckId], activeSlideId: slideId }
          : { slideIds: [slideId], activeSlideId: slideId, isInteractive: true }
      }
    };
    notifyListeners();
  },

  registerDeck: (deckId: string, slideIds: string[], label?: string, isInteractive: boolean = true) => {
    const currentActive = globalState.activeDecks[deckId];
    const validActiveSlide = slideIds.includes(currentActive) ? currentActive : slideIds[0];
    
    globalState = {
      ...globalState,
      activeDecks: {
        ...globalState.activeDecks,
        [deckId]: validActiveSlide
      },
      deckMetadata: {
        ...globalState.deckMetadata,
        [deckId]: {
          slideIds: [...slideIds],
          activeSlideId: validActiveSlide,
          label,
          isInteractive
        }
      }
    };
    
    notifyListeners();
  },

  removeDeck: (deckId: string) => {
    const newActiveDecks = { ...globalState.activeDecks };
    const newDeckMetadata = { ...globalState.deckMetadata };
    
    delete newActiveDecks[deckId];
    delete newDeckMetadata[deckId];
    
    let newSelectedDeckId = globalState.selectedDeckId;
    if (newSelectedDeckId === deckId) {
      const remainingDecks = Object.keys(newActiveDecks);
      newSelectedDeckId = remainingDecks.length > 0 ? remainingDecks[0] : undefined;
    }
    
    globalState = {
      ...globalState,
      activeDecks: newActiveDecks,
      deckMetadata: newDeckMetadata,
      selectedDeckId: newSelectedDeckId
    };
    notifyListeners();
  },

  setSelectedDeck: (deckId: string) => {
    globalState = {
      ...globalState,
      selectedDeckId: deckId
    };
    notifyListeners();
  },

  getActiveSlide: (deckId: string) => {
    return globalState.activeDecks[deckId];
  },

  getDeckSlides: (deckId: string) => {
    return globalState.deckMetadata[deckId]?.slideIds || [];
  },

  getDeckMetadata: (deckId: string) => {
    return globalState.deckMetadata[deckId];
  },

  getRegisteredDecks: () => {
    return Object.keys(globalState.activeDecks);
  },

  getInteractiveDecks: () => {
    return Object.keys(globalState.deckMetadata).filter(deckId => 
      globalState.deckMetadata[deckId]?.isInteractive === true
    );
  }
};

/**
 * React hook for subscribing to the store
 * Provides reactive access to store state with automatic React re-renders
 */
export function useIterationStore(): StoreState & StoreActions {
  const [state, setState] = useState<StoreState>(() => globalState);

  useEffect(() => {
    // Subscribe to store changes and update React state
    const unsubscribe = (newState: StoreState) => {
      setState(newState);
    };
    
    listeners.add(unsubscribe);

    // Cleanup subscription on unmount
    return () => {
      listeners.delete(unsubscribe);
    };
  }, []);

  // Memoize the returned object to prevent unnecessary re-renders
  const result = useMemo(() => ({
    ...state,
    ...storeActions
  }), [state]);
  
  return result;
}

/**
 * Hook for getting the active slide ID for a specific deck
 * Returns undefined if deck doesn't exist
 */
export function useActiveSlide(deckId: string): string | undefined {
  const store = useIterationStore();
  return store.activeDecks[deckId];
}

/**
 * Hook for deck navigation actions
 * Returns functions to control slide navigation for a specific deck
 */
export function useDeckNavigation(deckId: string) {
  const store = useIterationStore();

  const setActiveSlide = useCallback((slideId: string) => {
    store.setActiveSlide(deckId, slideId);
  }, [store, deckId]);

  const navigateNext = useCallback(() => {
    const metadata = store.getDeckMetadata(deckId);
    if (!metadata) return false;

    const currentIndex = metadata.slideIds.indexOf(metadata.activeSlideId);
    if (currentIndex === -1) return false;

    const nextIndex = (currentIndex + 1) % metadata.slideIds.length;
    const nextSlideId = metadata.slideIds[nextIndex];
    
    store.setActiveSlide(deckId, nextSlideId);
    return true;
  }, [store, deckId]);

  const navigatePrev = useCallback(() => {
    const metadata = store.getDeckMetadata(deckId);
    if (!metadata) return false;

    const currentIndex = metadata.slideIds.indexOf(metadata.activeSlideId);
    if (currentIndex === -1) return false;

    const prevIndex = currentIndex <= 0 ? metadata.slideIds.length - 1 : currentIndex - 1;
    const prevSlideId = metadata.slideIds[prevIndex];
    
    store.setActiveSlide(deckId, prevSlideId);
    return true;
  }, [store, deckId]);

  return {
    setActiveSlide,
    navigateNext,
    navigatePrev,
    activeSlide: store.activeDecks[deckId],
    slideCount: store.getDeckMetadata(deckId)?.slideIds.length || 0
  };
}

/**
 * Hook for development mode detection
 * Returns true if in development mode, false in production
 */
export function useIsDevelopment(): boolean {
  const store = useIterationStore();
  return !store.isProduction;
}