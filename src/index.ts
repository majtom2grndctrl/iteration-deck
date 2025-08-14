/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

export { detectEnvironment } from './utils/environment';
export { useIterationDeckStore } from './store/iteration-deck-store';
export type { DeckInfo, SlideInfo, GlobalDeckState } from './store/iteration-deck-store';
export type * from './components.d.ts';
