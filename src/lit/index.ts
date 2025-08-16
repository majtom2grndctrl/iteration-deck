/**
 * Lit Web Components Entry Point
 * 
 * Exports all Lit web components for use in any framework.
 * Import from this module to register all web components.
 */

// Re-export components from main module to avoid duplication
export * from '../components';

// Re-export core types for convenience
export type {
  IterationDeckProps,
  IterationDeckSlideProps,
  SlideChangeEvent,
  DeckRegistrationEvent
} from '../core/types.js';