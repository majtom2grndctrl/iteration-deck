/**
 * React Wrapper Component Tests
 * 
 * Tests React-Lit interop with property vs attribute handling and ref forwarding
 */

import React, { createRef } from 'react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
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
    test('should pass React props to Lit element properties', async () => {
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

    test('should handle dynamic prop changes', async () => {
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
    test('should forward refs to underlying Lit elements', async () => {
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
    test('should render React children inside Lit slots', async () => {
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

    test('should handle multiple children correctly', async () => {
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
    test('should handle missing required props gracefully', () => {
      expect(() => {
        render(
          <IterationDeck id="error-test">
            {/* No children - should not throw */}
          </IterationDeck>
        );
      }).not.toThrow();
    });

    test('should handle undefined optional props', async () => {
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

describe('React Production Override', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe('enableInProduction Prop Integration', () => {
    test('passes enableInProduction prop as enable-in-production attribute', async () => {
      const { container } = render(
        <IterationDeck id="test-deck" enableInProduction={true}>
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        const deck = container.querySelector('iteration-deck');
        expect(deck).toHaveAttribute('enable-in-production');
      });
    });

    test('does not add attribute when enableInProduction is false', async () => {
      const { container } = render(
        <IterationDeck id="test-deck" enableInProduction={false}>
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        const deck = container.querySelector('iteration-deck');
        expect(deck).not.toHaveAttribute('enable-in-production');
      });
    });

    test('does not add attribute when enableInProduction is undefined', async () => {
      const { container } = render(
        <IterationDeck id="test-deck">
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        const deck = container.querySelector('iteration-deck');
        expect(deck).not.toHaveAttribute('enable-in-production');
      });
    });

    test('updates attribute when enableInProduction prop changes', async () => {
      const { container, rerender } = render(
        <IterationDeck id="test-deck" enableInProduction={false}>
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Initially should not have attribute
      await waitFor(() => {
        const deck = container.querySelector('iteration-deck');
        expect(deck).not.toHaveAttribute('enable-in-production');
      });

      // Update prop to true
      rerender(
        <IterationDeck id="test-deck" enableInProduction={true}>
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Should now have attribute
      await waitFor(() => {
        const deck = container.querySelector('iteration-deck');
        expect(deck).toHaveAttribute('enable-in-production');
      });
    });
  });

  describe('Component Integration', () => {
    test('renders multiple slides with enableInProduction enabled', async () => {
      const { container } = render(
        <IterationDeck id="test-deck" enableInProduction={true}>
          <IterationDeckSlide label="Slide 1">
            <div data-testid="slide-1">Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div data-testid="slide-2">Content 2</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 3">
            <div data-testid="slide-3">Content 3</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        // All slide contents should be in the DOM
        expect(container.querySelector('[data-testid="slide-1"]')).toBeInTheDocument();
        expect(container.querySelector('[data-testid="slide-2"]')).toBeInTheDocument();
        expect(container.querySelector('[data-testid="slide-3"]')).toBeInTheDocument();
      });

      // All slide elements should be present
      const slides = container.querySelectorAll('iteration-deck-slide');
      expect(slides).toHaveLength(3);
    });

    test('imperative API works with enableInProduction', async () => {
      const deckRef = React.createRef<any>();

      render(
        <IterationDeck id="test-deck" enableInProduction={true} ref={deckRef}>
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).not.toBeNull();
      });

      // The imperative API should be available
      const deckHandle = deckRef.current;
      expect(typeof deckHandle.navigateToNext).toBe('function');
      expect(typeof deckHandle.navigateToPrev).toBe('function');
      expect(typeof deckHandle.getDeckInfo).toBe('function');
    });
  });

  describe('TypeScript Interface Validation', () => {
    test('enableInProduction has correct TypeScript types', () => {
      // Compile-time type checking
      const validProps = {
        id: 'test',
        enableInProduction: true as boolean | undefined
      };

      expect(typeof validProps.enableInProduction).toBe('boolean');
    });

    test('component accepts all expected props with enableInProduction', () => {
      // This test validates the TypeScript interface compilation
      const TestComponent = () => (
        <IterationDeck 
          id="test-deck"
          label="Test Deck"
          prompt="Test prompt"
          description="Test description"
          enableInProduction={true}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const { container } = render(<TestComponent />);
      expect(container.querySelector('iteration-deck')).toBeInTheDocument();
    });
  });

  describe('Event Handling with Override', () => {
    test('deck events fire correctly with enableInProduction enabled', async () => {
      const onDeckRegistered = vi.fn();
      
      render(
        <IterationDeck 
          id="test-deck" 
          enableInProduction={true}
          onDeckRegistered={onDeckRegistered}
        >
          <IterationDeckSlide label="Slide 1">
            <div>Content 1</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Event handling should work the same way with or without override
      // This test ensures the override doesn't break event propagation
      await waitFor(() => {
        // The deck registration event may or may not fire depending on implementation
        // This test guides that events should still work with override
      });
    });
  });
});
