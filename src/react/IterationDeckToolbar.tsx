import React from 'react';
import { defineCustomElements } from '../../loader';

// Ensure web components are defined
defineCustomElements();

export interface IterationDeckToolbarProps {
  /** Additional props for the toolbar component */
  [key: string]: any;
}

/**
 * React wrapper for the iteration-deck-toolbar web component.
 * 
 * Note: The toolbar is typically auto-created by the first IterationDeck component
 * and acts as a singleton. This wrapper is provided for advanced use cases where
 * manual toolbar management is needed.
 * 
 * In most cases, you don't need to use this component directly - the toolbar
 * will be automatically created when you use IterationDeck components.
 * 
 * @example
 * ```tsx
 * import { IterationDeckToolbar } from 'iteration-deck/react';
 * 
 * // Advanced usage - manually creating toolbar (not typically needed)
 * function CustomApp() {
 *   return (
 *     <div>
 *       <IterationDeckToolbar />
 *     </div>
 *   );
 * }
 * ```
 */
export const IterationDeckToolbar: React.FC<IterationDeckToolbarProps> = (props) => {
  return React.createElement('iteration-deck-toolbar', props);
};

export default IterationDeckToolbar;