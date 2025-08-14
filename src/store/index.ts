/**
 * Store Entry Point
 * Exports Zustand store and related utilities for both React and Lit components
 */

// Main store and types
export { iterationStore, useIterationStore } from './iteration-store.js';
export type { IterationStore } from './iteration-store.js';

// React-specific hooks and utilities
export {
  useActiveSlide,
  useSetActiveSlide,
  useIsProduction,
  useActiveDecks,
  useHasActiveSlide,
  useDeckUtilities,
} from './react-hooks.js';

// Re-export the main hook for convenience
export { useIterationStore as useIterationStoreReact } from './react-hooks.js';