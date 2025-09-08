/**
 * Shared foundation for both React and Web Component implementations
 * Provides design tokens and TypeScript interfaces for consistency
 */

// Export comprehensive design tokens system
export * from './tokens.js';
// Note: themeTokens from tokens-lit.js are not exported here to avoid importing 'lit' 
// in React builds. Lit components should import directly from './tokens-lit.js'

// Export all TypeScript interfaces
export type {
  IterationDeckProps,
  IterationDeckSlideProps,
  Environment,
  NavigationDirection,
  IterationStore,
  DesignTokens
} from './types';

// Environment detection utility
export function isDevelopmentMode(): boolean {
  // In a browser environment, check if we're in development
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port !== '';
  }
  
  // In Node.js environment, check NODE_ENV
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV !== 'production';
  }
  
  // Default to development mode if unsure
  return true;
}

// Utility function to get token values with TypeScript safety (legacy)
import { tokens } from './tokens.js';
export function getToken<K extends keyof typeof tokens>(category: K): typeof tokens[K] {
  return tokens[category];
}