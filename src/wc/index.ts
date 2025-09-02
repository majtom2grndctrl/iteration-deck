/**
 * Web Components entry point
 * 
 * Exports the Lit-based web components for use in any framework
 * or vanilla HTML environments.
 */

// Export Lit web components
export * from '../components';

// Export store utilities
export { 
  subscribeToIterationStore, 
  getIterationStoreState, 
  isDevelopmentMode 
} from '../store/iteration-store';

// Export store and core types
export type { IterationStore, DeckMetadata } from '../store/iteration-store';
export * from '../core/types';