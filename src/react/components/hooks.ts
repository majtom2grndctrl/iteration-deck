/**
 * React hooks for iteration-deck store integration
 * Provides React-specific state management hooks that integrate with the Zustand store
 */

import { useEffect, useState, useCallback } from 'react';
import type { IterationStore } from '../store/iteration-store';
import { 
  subscribeToIterationStore,
  getIterationStoreState,
  isDevelopmentMode
} from '../store/iteration-store';

/**
 * React hook for subscribing to the iteration store
 * Provides reactive access to store state with automatic React re-renders
 */
export function useIterationStore(): IterationStore {
  const [state, setState] = useState<IterationStore>(() => getIterationStoreState());

  useEffect(() => {
    // Subscribe to store changes and update React state
    const unsubscribe = subscribeToIterationStore((newState: IterationStore) => {
      setState(newState);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return state;
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
 * Hook for getting deck metadata including slide information
 */
export function useDeckMetadata(deckId: string) {
  const store = useIterationStore();
  return store.getDeckMetadata(deckId);
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
 * Hook for registering a deck with the store
 * Useful for components that need to register themselves
 */
export function useRegisterDeck() {
  const store = useIterationStore();
  
  const registerDeck = useCallback((deckId: string, slideIds: string[], label?: string) => {
    store.registerDeck(deckId, slideIds, label);
  }, [store]);

  const removeDeck = useCallback((deckId: string) => {
    store.removeDeck(deckId);
  }, [store]);

  return { registerDeck, removeDeck };
}

/**
 * Hook for development mode detection
 * Returns true if in development mode, false in production
 */
export function useIsDevelopment(): boolean {
  const store = useIterationStore();
  return !store.isProduction;
}

/**
 * Get current store state without subscriptions (snapshot)
 * Useful for one-time reads or in event handlers
 */
export const useIterationStoreSnapshot = () => {
  return getIterationStoreState;
};

// Re-export utilities from the store for convenience
export { isDevelopmentMode, getIterationStoreState };

// Re-export types
export type { IterationStore };