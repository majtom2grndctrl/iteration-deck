import React, { useRef, useEffect } from 'react';
import { defineCustomElements } from '../../loader';

// Ensure web components are defined
defineCustomElements();

export interface IterationDeckProps {
  /** Unique identifier for this iteration deck */
  deckId: string;
  /** Label for this deck in the toolbar */
  label?: string;
  /** Optional AI prompt context for generation tracking */
  prompt?: string;
  /** Additional context for stakeholder presentations */
  description?: string;
  /** Currently active slide index */
  activeIndex?: number;
  /** React children to render inside the deck */
  children?: React.ReactNode;
  /** Event handler for when active slide changes */
  onActiveIndexChange?: (index: number) => void;
}

/**
 * React wrapper for the iteration-deck web component.
 * 
 * This component provides a React-friendly interface for the iteration-deck
 * web component, enabling AI-first prototyping workflows with proper TypeScript
 * support and React integration.
 * 
 * @example
 * ```tsx
 * import { IterationDeck, IterationDeckSlide } from 'iteration-deck/react';
 * 
 * function MyComponent() {
 *   return (
 *     <IterationDeck deckId="hero-variations" label="Hero Layouts">
 *       <IterationDeckSlide label="Centered">
 *         <div>Centered layout content</div>
 *       </IterationDeckSlide>
 *       <IterationDeckSlide label="Split">
 *         <div>Split layout content</div>
 *       </IterationDeckSlide>
 *     </IterationDeck>
 *   );
 * }
 * ```
 */
export const IterationDeck: React.FC<IterationDeckProps> = ({
  deckId,
  label,
  prompt,
  description,
  activeIndex = 0,
  children,
  onActiveIndexChange,
  ...props
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Listen for active index changes from the web component
    const handleActiveIndexChange = (event: CustomEvent) => {
      if (onActiveIndexChange) {
        onActiveIndexChange(event.detail.activeIndex);
      }
    };

    element.addEventListener('activeIndexChange', handleActiveIndexChange as EventListener);

    return () => {
      element.removeEventListener('activeIndexChange', handleActiveIndexChange as EventListener);
    };
  }, [onActiveIndexChange]);

  // Convert React props to web component attributes
  const webComponentProps = {
    'deck-id': deckId,
    ...(label && { label }),
    ...(prompt && { prompt }),
    ...(description && { description }),
    'active-index': activeIndex,
    ...props,
  };

  return React.createElement('iteration-deck', {
    ref,
    ...webComponentProps,
  }, children);
};

export default IterationDeck;