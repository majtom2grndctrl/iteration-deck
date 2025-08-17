/**
 * React wrapper component for iteration-deck Lit web component
 * 
 * Provides a React-friendly interface around the underlying <iteration-deck> 
 * web component with proper TypeScript types, ref forwarding, and Zustand integration.
 */

import React, { 
  forwardRef, 
  useEffect, 
  useRef, 
  useImperativeHandle,
  type ReactElement 
} from 'react';

// Import the Lit web component to ensure it's registered
import '../components/iteration-deck';
import '../components/iteration-deck-slide';

// Import types and hooks
import type { IterationDeckProps as CoreIterationDeckProps, IterationDeckSlideProps } from '../core/types';
import { useIterationStore, useActiveSlide } from './hooks';

/**
 * React-specific props interface extending the core interface
 */
export interface IterationDeckProps extends CoreIterationDeckProps {
  /** React children - should be IterationDeckSlide components */
  children: ReactElement<IterationDeckSlideProps> | ReactElement<IterationDeckSlideProps>[];
  /** Optional className for styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
  /** Optional callback fired when slide changes */
  onSlideChange?: (event: CustomEvent) => void;
  /** Optional callback fired when deck is registered */
  onDeckRegistered?: (event: CustomEvent) => void;
  /** Optional callback fired when deck is unregistered */
  onDeckUnregistered?: (event: CustomEvent) => void;
}

/**
 * Imperative handle interface for the IterationDeck component
 * Exposes the underlying web component's public API
 */
export interface IterationDeckHandle {
  /** Navigate to a specific slide by ID */
  navigateToSlide: (slideId: string) => boolean;
  /** Navigate to the next slide */
  navigateToNext: () => boolean;
  /** Navigate to the previous slide */
  navigateToPrev: () => boolean;
  /** Get current slide information */
  getCurrentSlide: () => any;
  /** Get all slides information */
  getAllSlides: () => any[];
  /** Get deck metadata */
  getDeckInfo: () => any;
  /** Get the underlying DOM element */
  getElement: () => HTMLElement | null;
}

/**
 * React wrapper component for <iteration-deck>
 * 
 * This component creates a thin wrapper around the Lit web component,
 * providing a React-friendly API while delegating all functionality
 * to the underlying web component.
 */
export const IterationDeck = forwardRef<IterationDeckHandle, IterationDeckProps>(
  function IterationDeck({
    id,
    label,
    prompt,
    description,
    children,
    className,
    style,
    onSlideChange,
    onDeckRegistered,
    onDeckUnregistered,
    ...otherProps
  }, ref) {
    const elementRef = useRef<HTMLElement>(null);
    
    // Subscribe to store for reactive updates (ensures component re-renders on state changes)
    useIterationStore();
    useActiveSlide(id);

    // Set up properties on the underlying Lit element
    useEffect(() => {
      const element = elementRef.current as any;
      if (!element) return;

      // Map React props to Lit element properties
      element.id = id;
      
      if (label !== undefined) {
        element.label = label;
      }
      
      if (prompt !== undefined) {
        element.prompt = prompt;
      }
      
      if (description !== undefined) {
        element.description = description;
      }
    }, [id, label, prompt, description]);

    // Set up event listeners for web component events
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleSlideChange = (event: Event) => {
        onSlideChange?.(event as CustomEvent);
      };

      const handleDeckRegistered = (event: Event) => {
        onDeckRegistered?.(event as CustomEvent);
      };

      const handleDeckUnregistered = (event: Event) => {
        onDeckUnregistered?.(event as CustomEvent);
      };

      // Add event listeners
      element.addEventListener('slide-change', handleSlideChange);
      element.addEventListener('deck-registered', handleDeckRegistered);
      element.addEventListener('deck-unregistered', handleDeckUnregistered);

      // Cleanup
      return () => {
        element.removeEventListener('slide-change', handleSlideChange);
        element.removeEventListener('deck-registered', handleDeckRegistered);
        element.removeEventListener('deck-unregistered', handleDeckUnregistered);
      };
    }, [onSlideChange, onDeckRegistered, onDeckUnregistered]);

    // Expose imperative handle for programmatic control
    useImperativeHandle(ref, () => ({
      navigateToSlide: (slideId: string) => {
        const element = elementRef.current as any;
        return element?.navigateToSlide?.(slideId) ?? false;
      },
      navigateToNext: () => {
        const element = elementRef.current as any;
        return element?.navigateToNext?.() ?? false;
      },
      navigateToPrev: () => {
        const element = elementRef.current as any;
        return element?.navigateToPrev?.() ?? false;
      },
      getCurrentSlide: () => {
        const element = elementRef.current as any;
        return element?.getCurrentSlide?.() ?? null;
      },
      getAllSlides: () => {
        const element = elementRef.current as any;
        return element?.getAllSlides?.() ?? [];
      },
      getDeckInfo: () => {
        const element = elementRef.current as any;
        return element?.getDeckInfo?.() ?? null;
      },
      getElement: () => elementRef.current
    }), []);

    // Render the web component with React children
    return React.createElement(
      'iteration-deck',
      {
        ref: elementRef,
        className,
        style,
        ...otherProps
      },
      children
    );
  }
);

// Set display name for better debugging
IterationDeck.displayName = 'IterationDeck';