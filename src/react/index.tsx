/**
 * Pure React implementation of IterationDeck
 * 
 * This module provides React components that work immediately in any React environment
 * without configuration, web components, or external dependencies beyond React itself.
 */

// Export main components
export { IterationDeck } from './IterationDeck';
export { IterationDeckSlide } from './IterationDeckSlide';
export { IterationDeckToolbar } from './IterationDeckToolbar';

// Export React-specific types (avoid re-exporting shared types here to prevent duplicates)
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

// Export store and hooks
export {
  useIterationStore,
  useActiveSlide,
  useDeckNavigation,
  useIsDevelopment,
  type StoreState,
  type StoreActions,
  type DeckMetadata,
} from './store';

// Export toolbar management hooks
export {
  useIterationDeckToolbar,
  useEnsureToolbar,
} from './useIterationDeckToolbar';

/**
 * Enhanced IterationDeck that automatically manages the toolbar
 * 
 * This is the recommended component for most use cases as it handles
 * toolbar rendering automatically.
 */
import React from 'react';
import { IterationDeck as BaseIterationDeck } from './IterationDeck';
import type { ReactIterationDeckProps } from './IterationDeck';
import { useEnsureToolbar } from './useIterationDeckToolbar';

export const IterationDeckWithToolbar = React.forwardRef<any, ReactIterationDeckProps>(
  function IterationDeckWithToolbar(props, ref) {
    // Ensure toolbar is rendered when needed
    useEnsureToolbar();
    
    return React.createElement(BaseIterationDeck, { ...props, ref } as any);
  }
);

IterationDeckWithToolbar.displayName = 'IterationDeckWithToolbar';

// Default export
export { IterationDeckWithToolbar as default };