/**
 * React Wrapper Component Tests
 * 
 * Tests React-Lit interop with property vs attribute handling and ref forwarding
 */

import React, { createRef } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { IterationDeck, IterationDeckSlide } from './index';
import type { IterationDeckHandle, IterationDeckSlideRef } from './index';

describe('React Wrapper Components', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  describe('Property Mapping', () => {
    it('should pass React props to Lit element properties', async () => {
      const { container } = render(
        <IterationDeck 
          id="prop-test" 
          label="Test Deck"
          prompt="AI prompt"
          description="Test description"
        >
          <IterationDeckSlide 
            label="Test Slide"
            aiPrompt="Slide AI prompt"
            notes="Slide notes"
            confidence={0.85}
          >
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      const slideElement = container.querySelector('iteration-deck-slide') as any;
      
      await waitFor(() => {
        expect(deckElement.id).toBe('prop-test');
        expect(deckElement.label).toBe('Test Deck');
        expect(deckElement.prompt).toBe('AI prompt');
        expect(deckElement.description).toBe('Test description');
      });
      
      await waitFor(() => {
        expect(slideElement.label).toBe('Test Slide');
        expect(slideElement.aiPrompt).toBe('Slide AI prompt');
        expect(slideElement.notes).toBe('Slide notes');
        expect(slideElement.confidence).toBe(0.85);
      });
    });

    it('should handle dynamic prop changes', async () => {
      const DynamicDeck = ({ label }: { label: string }) => (
        <IterationDeck id="dynamic-test" label={label}>
          <IterationDeckSlide label="Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const { container, rerender } = render(<DynamicDeck label="Initial" />);
      const deckElement = container.querySelector('iteration-deck') as any;
      
      await waitFor(() => {
        expect(deckElement.label).toBe('Initial');
      });

      rerender(<DynamicDeck label="Updated" />);
      
      await waitFor(() => {
        expect(deckElement.label).toBe('Updated');
      });
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward refs to underlying Lit elements', async () => {
      const deckRef = createRef<IterationDeckHandle>();
      const slideRef = createRef<IterationDeckSlideRef>();

      render(
        <IterationDeck ref={deckRef} id="ref-test">
          <IterationDeckSlide ref={slideRef} label="Test Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).toBeTruthy();
        expect(slideRef.current).toBeTruthy();
      });
      
      // Test imperative API exists
      if (deckRef.current) {
        expect(typeof deckRef.current.navigateToNext).toBe('function');
        expect(typeof deckRef.current.getCurrentSlide).toBe('function');
      }
      
      if (slideRef.current) {
        expect(typeof slideRef.current.activate).toBe('function');
        expect(typeof slideRef.current.getSlideData).toBe('function');
      }
    });
  });

  describe('Children Handling', () => {
    it('should render React children inside Lit slots', async () => {
      const { container } = render(
        <IterationDeck id="children-test">
          <IterationDeckSlide label="Complex Slide">
            <div className="react-content">
              <h2>React Component</h2>
              <button>React Button</button>
            </div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const reactContent = container.querySelector('.react-content');
      expect(reactContent).toBeInTheDocument();
      expect(reactContent?.querySelector('h2')).toHaveTextContent('React Component');
      expect(reactContent?.querySelector('button')).toHaveTextContent('React Button');
    });

    it('should handle multiple children correctly', async () => {
      const { container } = render(
        <IterationDeck id="multi-children">
          <IterationDeckSlide label="Slide 1">
            <div data-testid="content-1">Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div data-testid="content-2">Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const slideElements = container.querySelectorAll('iteration-deck-slide');
      expect(slideElements).toHaveLength(2);
      
      expect(container.querySelector('[data-testid="content-1"]')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="content-2"]')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing required props gracefully', () => {
      expect(() => {
        render(
          <IterationDeck id="error-test">
            {/* No children - should not throw */}
          </IterationDeck>
        );
      }).not.toThrow();
    });

    it('should handle undefined optional props', async () => {
      const { container } = render(
        <IterationDeck id="undefined-test">
          <IterationDeckSlide label="Basic Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      const slideElement = container.querySelector('iteration-deck-slide') as any;
      
      await waitFor(() => {
        expect(deckElement.id).toBe('undefined-test');
        expect(slideElement.label).toBe('Basic Slide');
      });
      
      // Optional props should be undefined when not provided
      expect(deckElement.label).toBeUndefined();
      expect(slideElement.confidence).toBeUndefined();
    });
  });
});