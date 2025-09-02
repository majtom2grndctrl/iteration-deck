/**
 * Pure React IterationDeckSlide component
 * 
 * Provides slide functionality as a pure React component without any
 * web component dependencies. This component is used by the React
 * IterationDeck to wrap individual slide content.
 */

import { forwardRef, useRef, useImperativeHandle } from 'react';
import type { IterationDeckSlideProps } from '../../shared/types.js';

/**
 * React props interface extending the core props with React-specific types
 */
export interface ReactIterationDeckSlideProps extends IterationDeckSlideProps {
  /** React children to render inside the slide */
  children?: React.ReactNode;
  /** Optional className for additional styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
}

/**
 * Ref interface for the React IterationDeckSlide component
 */
export interface IterationDeckSlideRef {
  /** Get slide metadata */
  getSlideData: () => {
    label: string;
    aiPrompt?: string;
    notes?: string;
    confidence?: number;
  };
  /** Access to the underlying React element */
  element: HTMLDivElement | null;
}

/**
 * Pure React IterationDeckSlide component
 * 
 * This component renders slide content as a pure React component without any
 * web component dependencies. The slide metadata is used by the parent
 * IterationDeck component for navigation and display purposes.
 */
export const IterationDeckSlide = forwardRef<IterationDeckSlideRef, ReactIterationDeckSlideProps>(
  function IterationDeckSlide({ 
    label, 
    aiPrompt, 
    notes, 
    confidence,
    className,
    style,
    children,
    ...otherProps
  }, ref) {
    const elementRef = useRef<HTMLDivElement>(null);

    // Expose imperative API through ref
    useImperativeHandle(ref, () => ({
      getSlideData: () => ({
        label,
        aiPrompt,
        notes,
        confidence
      }),
      get element() {
        return elementRef.current;
      }
    }), [label, aiPrompt, notes, confidence]);

    // Simple div wrapper that renders the slide content
    return (
      <div
        ref={elementRef}
        className={className}
        style={style}
        data-iteration-deck-slide="true"
        data-slide-label={label}
        data-slide-ai-prompt={aiPrompt}
        data-slide-notes={notes}
        data-slide-confidence={confidence}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);

IterationDeckSlide.displayName = 'IterationDeckSlide';

// Type-only exports for convenience
export type { IterationDeckSlideProps };

// Default export for easier importing
export default IterationDeckSlide;