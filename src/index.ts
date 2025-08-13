// Export Stencil component classes for advanced usage
export { IterationDeck } from './components/iteration-deck';
export { IterationDeckSlide } from './components/iteration-deck-slide';
export { IterationDeckToolbar } from './components/iteration-deck-toolbar';

// Export types for TypeScript users
export type { 
  IterationDeckProps, 
  IterationDeckSlideProps,
  IterationDeckToolbarProps,
  DeckData,
  SlideData,
  IterationDeckStore
} from './core/stencil-types';