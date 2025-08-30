/**
 * Core framework-agnostic types and utilities for iteration-deck
 * 
 * This module provides the foundational TypeScript interfaces and helper functions
 * that are shared across all framework implementations (Lit, React, etc.)
 */

// Export all types that actually exist
export type {
  IterationDeckProps,
  IterationDeckSlideProps,
  SlideChangeEvent,
  DeckRegistrationEvent,
} from './types.js';

// Export all utilities that actually exist
export {
  // Environment detection
  detectEnvironment,
  isDevelopment,
  
  // ID generation and validation
  generateSlideId,
  validateDeckId,
  
  // Keyboard shortcuts
  isNavigationShortcut,
  
  // Performance utilities
  debounce,
  throttle,
  
  // Debugging
  warnLog,
  errorLog,
} from './utilities.js';