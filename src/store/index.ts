/**
 * Iteration Deck Store
 * 
 * Centralized state management for iteration decks using Zustand.
 * Provides framework-agnostic state management that works with both
 * Lit components and React components.
 */

// Core store and types
export {
  subscribeToIterationStore,
  getIterationStoreState,
  isDevelopmentMode,
  type IterationStore
} from './iteration-store';