// Placeholder React hooks - deferred implementation
// These will be properly implemented when React integration is added

import type { IterationStore } from '../store/iteration-store';
import { 
  getIterationStoreState,
  isDevelopmentMode
} from '../store/iteration-store';

/**
 * Get current store state without subscriptions
 * 
 * Basic utility for accessing store state in React components.
 * Proper React hooks with subscriptions will be implemented later.
 */
export const useIterationStoreSnapshot = () => {
  return getIterationStoreState;
};

// Re-export utilities from the store for convenience
export { isDevelopmentMode, getIterationStoreState };

// Re-export types
export type { IterationStore };