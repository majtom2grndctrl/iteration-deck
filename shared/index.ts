/**
 * Shared foundation for both React and Web Component implementations
 * Provides design tokens and TypeScript interfaces for consistency
 */

// Export comprehensive design tokens system
export * from './tokens.js';
export { themeTokens } from './tokens-lit.js';

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
  return process.env.NODE_ENV !== 'production';
}

// Utility function to get token values with TypeScript safety (legacy)
import { tokens } from './tokens.js';
export function getToken<K extends keyof typeof tokens>(category: K): typeof tokens[K] {
  return tokens[category];
}