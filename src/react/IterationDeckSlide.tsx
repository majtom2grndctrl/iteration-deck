/**
 * React wrapper component for iteration-deck-slide Lit web component
 * 
 * Provides a React-friendly API around the underlying Lit component
 * with proper TypeScript types, ref forwarding, and children handling.
 */

import { useEffect, useRef, forwardRef, useImperativeHandle, createElement } from 'react';
import type { IterationDeckSlideProps } from '../core/types.js';

// Ensure the Lit component is registered
import '../components/iteration-deck-slide/index.js';

/**
 * React props interface extending the core props with React-specific types
 */
export interface ReactIterationDeckSlideProps extends Omit<IterationDeckSlideProps, 'slideId'> {
  /** React children to render inside the slide */
  children: React.ReactNode;
  /** Optional slide ID override */
  slideId?: string;
  /** Optional className for additional styling */
  className?: string;
  /** Optional ref callback */
  ref?: React.Ref<IterationDeckSlideRef>;
}

/**
 * Ref interface exposing the underlying Lit component's public API
 */
export interface IterationDeckSlideRef {
  /** Activate this slide programmatically */
  activate: () => void;
  /** Check if this slide is currently active */
  isActiveSlide: () => boolean;
  /** Get slide metadata */
  getSlideData: () => {
    id: string;
    label: string;
    aiPrompt?: string;
    notes?: string;
    confidence?: number;
    isActive: boolean;
    deckId: string | null;
  };
  /** Access to the underlying Lit element */
  element: HTMLElement | null;
}

/**
 * React wrapper component for iteration-deck-slide
 * 
 * This component creates a thin React wrapper around the Lit web component,
 * handling prop mapping, children rendering, and ref forwarding properly.
 */
export const IterationDeckSlide = forwardRef<IterationDeckSlideRef, ReactIterationDeckSlideProps>(
  ({ 
    label, 
    aiPrompt, 
    notes, 
    confidence, 
    slideId,
    className,
    children 
  }, ref) => {
    const elementRef = useRef<HTMLElement & {
      label: string;
      aiPrompt?: string;
      notes?: string;
      confidence?: number;
      slideId?: string;
      activate: () => void;
      isActiveSlide: () => boolean;
      getSlideData: () => any;
    }>(null);

    // Note: Properties are now set as HTML attributes in createElement for proper timing.
    // This useEffect is kept for any future complex property handling if needed.
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // All basic properties are now set as attributes in createElement
      // This useEffect is reserved for any complex properties that can't be attributes
      
    }, [label, aiPrompt, notes, confidence, slideId]);

    // Note: className is now handled directly as an attribute in createElement

    // Expose imperative API through ref
    useImperativeHandle(ref, () => ({
      activate: () => {
        elementRef.current?.activate();
      },
      isActiveSlide: () => {
        return elementRef.current?.isActiveSlide() ?? false;
      },
      getSlideData: () => {
        return elementRef.current?.getSlideData();
      },
      get element() {
        return elementRef.current;
      }
    }), []);

    return createElement(
      'iteration-deck-slide',
      {
        ref: elementRef,
        // Map React props to web component attributes for proper initialization timing
        label: label,
        'ai-prompt': aiPrompt,
        notes: notes,
        confidence: confidence,
        'slide-id': slideId,
        // React-specific props
        className
      },
      children
    );
  }
);

IterationDeckSlide.displayName = 'IterationDeckSlide';

// Type-only exports for convenience
export type { IterationDeckSlideProps };

// Default export for easier importing
export default IterationDeckSlide;