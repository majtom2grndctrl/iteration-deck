/**
 * Pure React implementation of IterationDeck
 * 
 * This module provides React components that work immediately in any React environment
 * without configuration, web components, or external dependencies beyond React itself.
 */

// Export main components (toolbar automatically managed by IterationDeck)
export { IterationDeck } from './IterationDeck';
export { IterationDeckSlide } from './IterationDeckSlide';

// Export toolbar components for external consumption
export { IterationDeckToolbar } from './IterationDeckToolbar';
export { IterationDeckToolbarView } from './IterationDeckToolbarView';

// Export React-specific types
export type {
  ReactIterationDeckProps,
  IterationDeckHandle,
} from './IterationDeck';

export type {
  ReactIterationDeckSlideProps,
  IterationDeckSlideRef,
} from './IterationDeckSlide';

export type {
  IterationDeckToolbarProps,
} from './IterationDeckToolbar';

export type {
  IterationDeckToolbarViewProps,
} from './IterationDeckToolbarView';

// Export store hooks for advanced usage
export {
  useIterationStore,
  useActiveSlide,
  useDeckNavigation,
  type StoreState,
  type StoreActions,
  type DeckMetadata,
} from './store';

// Default export for convenience
export { IterationDeck as default } from './IterationDeck';