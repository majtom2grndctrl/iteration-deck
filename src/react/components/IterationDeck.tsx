import React, { forwardRef, useEffect, useRef, useImperativeHandle, useMemo, Children, useState } from 'react';
import type { IterationDeckProps, IterationDeckSlideProps } from '../../shared/types';
import { useIterationStore, useDeckNavigation } from './store';
import { useEnsureToolbar } from './useIterationDeckToolbar';

/**
 * Extended slide props interface with React-specific additions
 */
interface ExtendedSlideProps extends IterationDeckSlideProps {
  slideId?: string;
  isActive?: boolean;
  deckId?: string;
}

/**
 * React-specific props interface extending the shared interface
 */
export interface ReactIterationDeckProps extends IterationDeckProps {
  /** React children - should be IterationDeckSlide components */
  children?: React.ReactElement<ExtendedSlideProps> | React.ReactElement<ExtendedSlideProps>[];
  /** Optional className for styling */
  className?: string;
  /** Optional style object */
  style?: React.CSSProperties;
  /** Optional callback fired when slide changes - matches CustomEvent API */
  onSlideChange?: (event: CustomEvent) => void;
  /** Optional callback fired when deck is registered */
  onDeckRegistered?: (event: CustomEvent) => void;
}

/**
 * Imperative handle interface for the IterationDeck component
 */
export interface IterationDeckHandle {
  /** Navigate to a specific slide by ID */
  navigateToSlide: (slideId: string) => boolean;
  /** Navigate to the next slide */
  navigateToNext: () => boolean;
  /** Navigate to the previous slide */
  navigateToPrev: () => boolean;
  /** Get current slide information */
  getCurrentSlide: () => { id: string; index: number; label: string } | null;
  /** Get all slides information */
  getAllSlides: () => { id: string; index: number; label: string }[];
  /** Get deck metadata */
  getDeckInfo: () => { id: string; label?: string; slideCount: number; activeSlideId?: string };
}

/**
 * Pure React IterationDeck component
 * 
 * Provides slide deck functionality with development toolbar and keyboard navigation
 * using standard React patterns without any web component dependencies.
 */
export const IterationDeck = forwardRef<IterationDeckHandle, ReactIterationDeckProps>(
  function IterationDeck({
    id,
    label,
    prompt,
    description,
    onSlideChange,
    onDeckRegistered,
    children,
    className,
    style,
    ...otherProps
  }, ref) {
    // Client-side only guard to prevent SSR hydration mismatch
    const [isClient, setIsClient] = useState(false);
    const store = useIterationStore();
    const navigation = useDeckNavigation(id);
    const deckRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setIsClient(true);
    }, []);
    
    // Parse children to extract slide count and labels (stable)
    const slideInfo = useMemo(() => {
      const childArray = Children.toArray(children) as React.ReactElement<IterationDeckSlideProps>[];
      const labels = childArray.map((child) => child.props.label);
      return {
        count: childArray.length,
        labels,
        labelsString: labels.join('|'), // Stable string representation
        metadata: childArray.map((child, index) => ({
          id: `${id}-slide-${index}`,
          label: child.props.label
        }))
      };
    }, [children, id]);

    // Parse children to extract slide elements (for rendering)
    const slideElements = useMemo(() => {
      const childArray = Children.toArray(children) as React.ReactElement<IterationDeckSlideProps>[];
      return childArray.map((child, index) => ({
        id: `${id}-slide-${index}`,
        label: child.props.label,
        element: child,
        index
      }));
    }, [children, id]);

    // Register this deck with the store
    useEffect(() => {
      const slideIds = slideInfo.metadata.map(slide => slide.id);
      if (slideIds.length > 0) {
        console.log('[IterationDeck DEBUG] Registering deck:', { id, label, slideCount: slideIds.length });
        store.registerDeck(id, slideIds, label, true); // Always interactive
        console.log('[IterationDeck DEBUG] After registration - store state:', {
          activeDecks: store.activeDecks,
          deckMetadata: store.deckMetadata,
          interactiveDecks: store.getInteractiveDecks()
        });
      }

      // Cleanup on unmount
      return () => {
        console.log('[IterationDeck DEBUG] Removing deck:', id);
        store.removeDeck(id);
      };
    }, [id, label, slideInfo.count, slideInfo.labelsString]);

    // Ensure toolbar is shown - this will react to deck registration changes
    useEnsureToolbar();

    // Fire onDeckRegistered callback (separate useEffect to avoid registration loop)
    useEffect(() => {
      if (onDeckRegistered && slideInfo.count > 0) {
        const customEvent = {
          detail: {
            deckId: id,
            slideCount: slideInfo.count,
            slides: slideInfo.metadata
          }
        } as CustomEvent;
        onDeckRegistered(customEvent);
      }
    }, [onDeckRegistered, id, slideInfo.count, slideInfo.labelsString]);

    // Get the current active slide - default to first slide if no active slide set
    const storeActiveSlideId = store.activeDecks[id];
    const activeSlideId = storeActiveSlideId || (slideElements.length > 0 ? slideElements[0].id : undefined);
    const activeSlideIndex = slideElements.findIndex(slide => slide.id === activeSlideId);
    const currentSlide = activeSlideIndex >= 0 ? slideElements[activeSlideIndex] : slideElements[0];

    // Handle slide change callbacks
    useEffect(() => {
      if (onSlideChange && currentSlide) {
        // Create CustomEvent-like object to match expected API
        const customEvent = {
          detail: {
            deckId: id,
            currentSlideId: currentSlide.id,
            previousSlideId: activeSlideId, // Will be the previous one due to timing
            slideIndex: currentSlide.index
          }
        } as CustomEvent;
        onSlideChange(customEvent);
      }
    }, [onSlideChange, currentSlide, id, activeSlideId]);

    // Expose imperative handle for programmatic control
    useImperativeHandle(ref, () => ({
      navigateToSlide: (slideId: string) => {
        const slide = slideElements.find(s => s.id === slideId);
        if (slide) {
          store.setActiveSlide(id, slideId);
          return true;
        }
        return false;
      },
      navigateToNext: () => navigation.navigateNext(),
      navigateToPrev: () => navigation.navigatePrev(),
      getCurrentSlide: () => {
        if (!currentSlide) return null;
        return {
          id: currentSlide.id,
          index: currentSlide.index,
          label: currentSlide.label
        };
      },
      getAllSlides: () => slideElements.map(slide => ({
        id: slide.id,
        index: slide.index,
        label: slide.label
      })),
      getDeckInfo: () => ({
        id,
        label,
        slideCount: slideElements.length,
        activeSlideId
      })
    }), [id, label, slideElements, currentSlide, activeSlideId, navigation, store]);

    // Return null during SSR to prevent hydration mismatch
    if (!isClient) {
      return null;
    }

    // Always render all slides but show only the active one
    return (
      <div 
        ref={deckRef}
        className={className}
        style={{
          position: 'relative',
          ...style
        }}
        data-iteration-deck={id}
        {...otherProps}
      >
        {slideElements.map((slide) => {
          const isActive = slide.id === activeSlideId;
          
          return (
            <div
              key={slide.id}
              style={{
                display: isActive ? 'block' : 'none'
              }}
              data-slide-id={slide.id}
              data-slide-active={isActive}
            >
              {React.cloneElement(slide.element, {
                ...slide.element.props
              } as any)}
            </div>
          );
        })}
      </div>
    );
  }
);

// Set display name for better debugging
IterationDeck.displayName = 'IterationDeck';