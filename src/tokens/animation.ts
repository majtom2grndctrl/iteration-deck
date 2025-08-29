/**
 * Animation Design Tokens
 * 
 * Minimal animation tokens for the iteration-deck components.
 * Only includes values actually used in the codebase.
 */

// Duration tokens - only the values we actually use
export const duration = {
  fast: '0.15s',    // slide container transitions
  normal: '0.2s',   // opacity transitions, deck animations
  slow: '0.3s',     // confidence bar, content transitions  
  slower: '0.5s',   // toolbar glow effect
  loading: '1.5s',  // loading animations
} as const;

// Easing - only the curves we actually use
export const easing = {
  ease: 'ease',               // deck animations
  easeInOut: 'ease-in-out',   // most component animations
} as const;

// Export types for TypeScript usage
export type Duration = typeof duration;
export type Easing = typeof easing;