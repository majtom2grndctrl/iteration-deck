/**
 * React wrapper components for Iteration Deck
 * 
 * This module provides React-friendly wrappers around the Iteration Deck web components,
 * enabling seamless integration with React applications while maintaining full functionality
 * and TypeScript support.
 * 
 * @example
 * ```tsx
 * import { IterationDeck, IterationDeckSlide } from 'iteration-deck/react';
 * 
 * function App() {
 *   return (
 *     <IterationDeck deckId="buttons" label="Button Variations">
 *       <IterationDeckSlide label="Primary">
 *         <button className="btn-primary">Click Me</button>
 *       </IterationDeckSlide>
 *       <IterationDeckSlide label="Secondary">
 *         <button className="btn-secondary">Click Me</button>
 *       </IterationDeckSlide>
 *     </IterationDeck>
 *   );
 * }
 * ```
 */

export { IterationDeck } from './IterationDeck';
export type { IterationDeckProps } from './IterationDeck';

export { IterationDeckSlide } from './IterationDeckSlide';
export type { IterationDeckSlideProps } from './IterationDeckSlide';

export { IterationDeckToolbar } from './IterationDeckToolbar';
export type { IterationDeckToolbarProps } from './IterationDeckToolbar';

// Re-export utility functions and types
export { defineCustomElements } from '../../loader';
export { useIterationDeckStore } from '../store/iteration-deck-store';
export type { DeckInfo, SlideInfo, GlobalDeckState } from '../store/iteration-deck-store';