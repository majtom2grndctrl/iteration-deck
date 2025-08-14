/**
 * Main entry point for @iteration-deck/core
 * Exports web components and core functionality
 */

// Export web components (Lit components)
export * from './lit/index.js';

// Export design tokens
export * from './tokens.js';

// Export core types and utilities
export * from './core/types.js';
export * from './core/utilities.js';
export * from './core/environment.js';

// Export store for direct usage
export * from './store/index.js';