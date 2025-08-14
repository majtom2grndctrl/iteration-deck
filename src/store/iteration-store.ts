/**
 * Zustand Store for Iteration Deck State Management
 * 
 * This store provides state management for iteration decks and slides,
 * supporting both React components (via hooks) and Lit components (via subscriptions).
 * 
 * Architecture:
 * - Uses Zustand for reactive state management
 * - Environment detection for production vs development modes
 * - Cross-framework compatibility with subscription methods
 */

import { create } from 'zustand';

/**
 * Core store interface matching TECHNICAL_SPEC.md requirements
 */
export interface IterationStore {
  /** Map of deckId to active slideId for each registered deck */
  activeDecks: Record<string, string>;
  
  /** Action to set the active slide for a specific deck */
  setActiveSlide: (deckId: string, slideId: string) => void;
  
  /** Environment detection - true in production, false in development */
  isProduction: boolean;
}

/**
 * Environment detection utility
 * Uses Vite's built-in environment detection
 */
function getIsProduction(): boolean {
  // Vite provides import.meta.env.PROD at build time
  // For development/build compatibility, we use a safer check
  try {
    // @ts-ignore - Vite provides this at build time
    return import.meta.env?.PROD === true;
  } catch {
    // Fallback for environments where import.meta is not available
    return false;
  }
}

/**
 * Zustand store instance
 * Provides reactive state management with actions for managing active slides per deck
 */
export const useIterationStore = create<IterationStore>((set, get) => ({
  // Initial state
  activeDecks: {},
  isProduction: getIsProduction(),
  
  // Actions
  setActiveSlide: (deckId: string, slideId: string) => {
    set((state) => ({
      activeDecks: {
        ...state.activeDecks,
        [deckId]: slideId,
      },
    }));
  },
}));

/**
 * Direct store instance for non-React usage (Lit components)
 * Provides access to the store state and subscription methods
 */
export const iterationStore = {
  /**
   * Get current store state
   */
  getState: () => useIterationStore.getState(),
  
  /**
   * Subscribe to store changes for Lit components
   * Returns unsubscribe function
   */
  subscribe: (listener: (state: IterationStore) => void) => {
    return useIterationStore.subscribe(listener);
  },
  
  /**
   * Set active slide (convenience method for non-React usage)
   */
  setActiveSlide: (deckId: string, slideId: string) => {
    useIterationStore.getState().setActiveSlide(deckId, slideId);
  },
  
  /**
   * Get active slide ID for a specific deck
   */
  getActiveSlide: (deckId: string): string | undefined => {
    return useIterationStore.getState().activeDecks[deckId];
  },
  
  /**
   * Check if we're in production mode
   */
  get isProduction() {
    return useIterationStore.getState().isProduction;
  },
  
  /**
   * Get all active decks
   */
  get activeDecks() {
    return useIterationStore.getState().activeDecks;
  },
};

// Note: IterationStore interface is already exported above