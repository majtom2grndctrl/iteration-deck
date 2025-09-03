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
  // Try Vite's import.meta.env.DEV first (more reliable in Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const isDev = import.meta.env.DEV === true;
    console.log('🌍 Environment check (Vite):', { 
      'import.meta.env.DEV': import.meta.env.DEV, 
      'import.meta.env.MODE': import.meta.env.MODE,
      isDev 
    });
    return isDev;
  }
  
  // Fallback to NODE_ENV
  const nodeEnv = process.env.NODE_ENV;
  const isDev = nodeEnv !== 'production';
  console.log('🌍 Environment check (Node):', { nodeEnv, isDev });
  return isDev;
}

// Utility function to get token values with TypeScript safety (legacy)
import { tokens } from './tokens.js';
export function getToken<K extends keyof typeof tokens>(category: K): typeof tokens[K] {
  return tokens[category];
}