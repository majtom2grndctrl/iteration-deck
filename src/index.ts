/**
 * Main entry point for iteration-deck
 * 
 * Exports the pure React implementation as the primary interface
 * for maximum compatibility and immediate usability.
 */

// Primary React implementation 
export * from './react';

// Re-export shared types and utilities that aren't already exported by React implementation
export { tokens, isDevelopmentMode } from '../shared';