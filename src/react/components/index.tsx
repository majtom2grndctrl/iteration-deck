/**
 * Pure React implementation of IterationDeck
 * 
 * This module provides React components that work immediately in any React environment
 * without configuration, web components, or external dependencies beyond React itself.
 */

// Export main components (toolbar automatically managed by IterationDeck)
export { IterationDeck } from './IterationDeck';
export { IterationDeckSlide } from './IterationDeckSlide';
import { IterationDeck } from './IterationDeck';

// Export React-specific types
export type {
  ReactIterationDeckProps,
  IterationDeckHandle,
} from './IterationDeck';

export type {
  ReactIterationDeckSlideProps,
  IterationDeckSlideRef,
} from './IterationDeckSlide';

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
export default IterationDeck;