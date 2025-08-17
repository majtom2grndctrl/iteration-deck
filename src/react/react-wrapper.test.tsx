/**
 * Corrected React Integration Tests
 * 
 * Tests React-Lit interop with proper property vs attribute handling
 */

import React, { createRef } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import React components
import { IterationDeck, IterationDeckSlide } from './index';
import type { IterationDeckHandle, IterationDeckSlideRef } from './index';

describe('React Integration Tests (Corrected)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  describe('Basic React-Lit Rendering', () => {
    it('should render IterationDeck wrapper component', async () => {
      const { container } = render(
        <IterationDeck id="test-deck" label="Test Deck">
          <IterationDeckSlide label="Slide 1">
            <div>Test Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Check that web component is rendered
      const deckElement = container.querySelector('iteration-deck') as any;
      expect(deckElement).toBeInTheDocument();
      
      // Wait for properties to be set via useEffect
      await waitFor(() => {
        expect(deckElement.id).toBe('test-deck');
      });
      
      // Check properties
      expect(deckElement.label).toBe('Test Deck');
    });

    it('should render IterationDeckSlide wrapper component', async () => {
      const { container } = render(
        <IterationDeck id="slide-test">
          <IterationDeckSlide label="Test Slide">
            <div data-testid="slide-content">Slide Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const slideElement = container.querySelector('iteration-deck-slide') as any;
      expect(slideElement).toBeInTheDocument();
      
      // Wait for properties to be set
      await waitFor(() => {
        expect(slideElement.label).toBe('Test Slide');
      });

      const content = container.querySelector('[data-testid="slide-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent('Slide Content');
    });

    it('should pass props correctly to web components', async () => {
      const { container } = render(
        <IterationDeck 
          id="prop-test-deck" 
          label="Props Test"
          prompt="Test prompt"
          description="Test description"
          className="custom-class"
        >
          <IterationDeckSlide 
            label="Test Slide"
            aiPrompt="Test AI prompt"
            notes="Test notes"
            confidence={0.85}
            className="slide-class"
          >
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      const slideElement = container.querySelector('iteration-deck-slide') as any;
      
      // Wait for properties to be set
      await waitFor(() => {
        expect(deckElement.id).toBe('prop-test-deck');
      });
      
      // Check deck properties
      expect(deckElement.label).toBe('Props Test');
      expect(deckElement.prompt).toBe('Test prompt');
      expect(deckElement.description).toBe('Test description');
      expect(deckElement).toHaveClass('custom-class');

      // Check slide properties
      await waitFor(() => {
        expect(slideElement.label).toBe('Test Slide');
      });
      expect(slideElement.aiPrompt).toBe('Test AI prompt');
      expect(slideElement.notes).toBe('Test notes');
      expect(slideElement.confidence).toBe(0.85);
      expect(slideElement).toHaveClass('slide-class');
    });

    it('should handle multiple children correctly', async () => {
      const { container } = render(
        <IterationDeck id="multiple-children-test">
          <IterationDeckSlide label="Slide 1">
            <div data-testid="content-1">React Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <span data-testid="content-2">React Content 2</span>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 3">
            <p data-testid="content-3">React Content 3</p>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Check that all slides are rendered
      const slideElements = container.querySelectorAll('iteration-deck-slide');
      expect(slideElements).toHaveLength(3);
      
      const content1 = container.querySelector('[data-testid="content-1"]');
      const content2 = container.querySelector('[data-testid="content-2"]');
      const content3 = container.querySelector('[data-testid="content-3"]');
      
      expect(content1).toBeInTheDocument();
      expect(content2).toBeInTheDocument();
      expect(content3).toBeInTheDocument();
      expect(content1).toHaveTextContent('React Content 1');
      expect(content2).toHaveTextContent('React Content 2');
      expect(content3).toHaveTextContent('React Content 3');
    });
  });

  describe('React Refs and Imperative API', () => {
    it('should provide ref for IterationDeck', async () => {
      const deckRef = createRef<IterationDeckHandle>();

      render(
        <IterationDeck ref={deckRef} id="ref-test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).toBeTruthy();
      });
      
      if (deckRef.current) {
        const handle = deckRef.current;
        
        // Test all imperative methods exist
        expect(typeof handle.navigateToSlide).toBe('function');
        expect(typeof handle.navigateToNext).toBe('function');
        expect(typeof handle.navigateToPrev).toBe('function');
        expect(typeof handle.getCurrentSlide).toBe('function');
        expect(typeof handle.getAllSlides).toBe('function');
        expect(typeof handle.getDeckInfo).toBe('function');
        expect(typeof handle.getElement).toBe('function');
      }
    });

    it('should provide ref for IterationDeckSlide', async () => {
      const slideRef = createRef<IterationDeckSlideRef>();

      render(
        <IterationDeck id="slide-ref-test">
          <IterationDeckSlide ref={slideRef} label="Test Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(slideRef.current).toBeTruthy();
      });
      
      if (slideRef.current) {
        const handle = slideRef.current;
        
        // Test all imperative methods exist
        expect(typeof handle.activate).toBe('function');
        expect(typeof handle.isActiveSlide).toBe('function');
        expect(typeof handle.getSlideData).toBe('function');
        expect(handle.element).toBeTruthy();
      }
    });

    it('should handle ref methods gracefully when element is unavailable', async () => {
      const deckRef = createRef<IterationDeckHandle>();

      render(
        <IterationDeck ref={deckRef} id="graceful-ref-test">
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).toBeTruthy();
      });

      if (deckRef.current) {
        // These should not throw even if underlying element has issues
        expect(() => deckRef.current!.navigateToNext()).not.toThrow();
        expect(() => deckRef.current!.navigateToPrev()).not.toThrow();
        expect(() => deckRef.current!.navigateToSlide('test')).not.toThrow();
        expect(() => deckRef.current!.getCurrentSlide()).not.toThrow();
        expect(() => deckRef.current!.getAllSlides()).not.toThrow();
        expect(() => deckRef.current!.getDeckInfo()).not.toThrow();
      }
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle missing children gracefully', () => {
      expect(() => {
        render(
          <IterationDeck id="no-children-test">
            {/* No children */}
          </IterationDeck>
        );
      }).not.toThrow();
    });

    it('should handle single child correctly', async () => {
      const { container } = render(
        <IterationDeck id="single-child-test">
          <IterationDeckSlide label="Only Slide">
            <div>Only Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const slideElements = container.querySelectorAll('iteration-deck-slide');
      expect(slideElements).toHaveLength(1);
      
      const slideElement = slideElements[0] as any;
      await waitFor(() => {
        expect(slideElement.label).toBe('Only Slide');
      });
    });

    it('should handle dynamic prop changes', async () => {
      const DynamicComponent = ({ label }: { label: string }) => (
        <IterationDeck id="dynamic-test" label={label}>
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const { container, rerender } = render(<DynamicComponent label="Initial Label" />);
      
      const deckElement = container.querySelector('iteration-deck') as any;
      
      await waitFor(() => {
        expect(deckElement.label).toBe('Initial Label');
      });

      rerender(<DynamicComponent label="Updated Label" />);
      
      await waitFor(() => {
        expect(deckElement.label).toBe('Updated Label');
      });
    });

    it('should handle undefined optional props', async () => {
      const { container } = render(
        <IterationDeck id="undefined-props-test">
          <IterationDeckSlide label="Basic Slide">
            <div>Basic Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      const slideElement = container.querySelector('iteration-deck-slide') as any;
      
      expect(deckElement).toBeInTheDocument();
      expect(slideElement).toBeInTheDocument();
      
      await waitFor(() => {
        expect(deckElement.id).toBe('undefined-props-test');
        expect(slideElement.label).toBe('Basic Slide');
      });
      
      // Undefined optional props should remain undefined
      expect(deckElement.label).toBeUndefined();
      expect(deckElement.prompt).toBeUndefined();
      expect(deckElement.description).toBeUndefined();
      expect(slideElement.aiPrompt).toBeUndefined();
      expect(slideElement.notes).toBeUndefined();
      expect(slideElement.confidence).toBeUndefined();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple decks independently', async () => {
      const { container } = render(
        <div>
          <IterationDeck id="deck-1" label="First Deck">
            <IterationDeckSlide label="Deck 1 Slide 1">
              <div>Deck 1 Content 1</div>
            </IterationDeckSlide>
            <IterationDeckSlide label="Deck 1 Slide 2">
              <div>Deck 1 Content 2</div>
            </IterationDeckSlide>
          </IterationDeck>
          
          <IterationDeck id="deck-2" label="Second Deck">
            <IterationDeckSlide label="Deck 2 Slide 1">
              <div>Deck 2 Content 1</div>
            </IterationDeckSlide>
            <IterationDeckSlide label="Deck 2 Slide 2">
              <div>Deck 2 Content 2</div>
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      );

      const deckElements = container.querySelectorAll('iteration-deck');
      expect(deckElements).toHaveLength(2);
      
      const deck1 = deckElements[0] as any;
      const deck2 = deckElements[1] as any;
      
      await waitFor(() => {
        expect(deck1.id).toBe('deck-1');
        expect(deck2.id).toBe('deck-2');
      });
      
      expect(deck1.label).toBe('First Deck');
      expect(deck2.label).toBe('Second Deck');

      // Each deck should have its own slides
      const allSlides = container.querySelectorAll('iteration-deck-slide');
      expect(allSlides).toHaveLength(4);
    });

    it('should handle nested React components as children', () => {
      const NestedComponent = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div>
          <h3 data-testid="nested-title">{title}</h3>
          {children}
        </div>
      );

      const { container } = render(
        <IterationDeck id="nested-test">
          <IterationDeckSlide label="Nested Content">
            <NestedComponent title="Nested Title">
              <p data-testid="nested-paragraph">Nested paragraph</p>
              <button data-testid="nested-button">Nested button</button>
            </NestedComponent>
          </IterationDeckSlide>
        </IterationDeck>
      );

      expect(container.querySelector('[data-testid="nested-title"]')).toHaveTextContent('Nested Title');
      expect(container.querySelector('[data-testid="nested-paragraph"]')).toHaveTextContent('Nested paragraph');
      expect(container.querySelector('[data-testid="nested-button"]')).toHaveTextContent('Nested button');
    });
  });

  describe('Component Lifecycle', () => {
    it('should properly mount and unmount React components', async () => {
      let mountCount = 0;
      let unmountCount = 0;

      const TrackingComponent = () => {
        React.useEffect(() => {
          mountCount++;
          return () => {
            unmountCount++;
          };
        }, []);
        
        return <div>Tracking Component</div>;
      };

      const { unmount } = render(
        <IterationDeck id="lifecycle-test">
          <IterationDeckSlide label="Lifecycle Slide">
            <TrackingComponent />
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Component should have mounted
      expect(mountCount).toBe(1);
      expect(unmountCount).toBe(0);

      // Unmount the entire tree
      unmount();

      // Component should have unmounted
      expect(unmountCount).toBe(1);
    });

    it('should handle React state updates correctly', async () => {
      const StatefulComponent = () => {
        const [count, setCount] = React.useState(0);
        
        React.useEffect(() => {
          const timer = setTimeout(() => setCount(1), 10);
          return () => clearTimeout(timer);
        }, []);
        
        return <div data-testid="count">{count}</div>;
      };

      const { container } = render(
        <IterationDeck id="state-test">
          <IterationDeckSlide label="State Slide">
            <StatefulComponent />
          </IterationDeckSlide>
        </IterationDeck>
      );

      const countElement = container.querySelector('[data-testid="count"]');
      expect(countElement).toHaveTextContent('0');

      // Wait for state update
      await waitFor(() => {
        expect(countElement).toHaveTextContent('1');
      });
    });
  });
});