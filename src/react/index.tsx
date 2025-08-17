/**
 * React integration for iteration-deck components
 * Provides React wrapper components and hooks for seamless integration
 */

// React wrapper components
export { IterationDeck } from './IterationDeck';
export type { IterationDeckProps, IterationDeckHandle } from './IterationDeck';

export { 
  IterationDeckSlide,
  default as IterationDeckSlideDefault 
} from './IterationDeckSlide';
export type { 
  ReactIterationDeckSlideProps,
  IterationDeckSlideRef 
} from './IterationDeckSlide';

// React hooks for store integration
export {
  useIterationStore,
  useActiveSlide,
  useDeckMetadata,
  useDeckNavigation,
  useRegisterDeck,
  useIsDevelopment,
  useIterationStoreSnapshot,
  isDevelopmentMode,
  getIterationStoreState
} from './hooks';

// Core types
export type * from '../core/types';
export type { IterationStore } from '../store/iteration-store';