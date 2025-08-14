/**
 * React-specific hooks for Iteration Deck store
 * 
 * Provides optimized React hooks and utilities for working with the Zustand store
 * in React components, including selector-based subscriptions for performance.
 */

import { useMemo } from 'react';
import { useIterationStore, type IterationStore } from './iteration-store.js';

/**
 * Main React hook for accessing iteration store state
 * Re-exported from the main store for convenience
 */
export { useIterationStore };

/**
 * Hook to get the active slide for a specific deck
 * Uses selector pattern for optimal React re-rendering
 * 
 * @param deckId - The ID of the deck to get the active slide for
 * @returns The active slide ID for the deck, or undefined if not set
 */
export function useActiveSlide(deckId: string): string | undefined {
  return useIterationStore((state) => state.activeDecks[deckId]);
}

/**
 * Hook to get the setActiveSlide action
 * Memoized to prevent unnecessary re-renders when passed as props
 * 
 * @returns The setActiveSlide action function
 */
export function useSetActiveSlide() {
  return useIterationStore((state) => state.setActiveSlide);
}

/**
 * Hook to check if we're in production mode
 * Uses selector pattern for optimal performance
 * 
 * @returns True if in production mode, false in development
 */
export function useIsProduction(): boolean {
  return useIterationStore((state) => state.isProduction);
}

/**
 * Hook to get all active decks
 * Returns the complete activeDecks record
 * 
 * @returns Record mapping deckId to active slideId
 */
export function useActiveDecks(): Record<string, string> {
  return useIterationStore((state) => state.activeDecks);
}

/**
 * Hook to check if a specific deck has any active slide
 * 
 * @param deckId - The ID of the deck to check
 * @returns True if the deck has an active slide set
 */
export function useHasActiveSlide(deckId: string): boolean {
  return useIterationStore((state) => deckId in state.activeDecks);
}

/**
 * Hook that provides deck-specific utilities
 * Memoized to prevent object recreation on each render
 * 
 * @param deckId - The ID of the deck
 * @returns Object with deck-specific utilities and state
 */
export function useDeckUtilities(deckId: string) {
  const activeSlide = useActiveSlide(deckId);
  const setActiveSlide = useSetActiveSlide();
  
  return useMemo(
    () => ({
      activeSlide,
      setActiveSlide: (slideId: string) => setActiveSlide(deckId, slideId),
      hasActiveSlide: activeSlide !== undefined,
    }),
    [activeSlide, setActiveSlide, deckId]
  );
}