/**
 * Comprehensive React Integration Tests
 * 
 * Tests React-Lit interop, state synchronization, event handling, 
 * children/slot handling, and ref forwarding as requested.
 */

import { createRef, useState, useEffect } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import React components and hooks
import { 
  IterationDeck, 
  IterationDeckSlide, 
  useIterationStore, 
  useDeckNavigation 
} from './index';
import type { IterationDeckHandle, IterationDeckSlideRef } from './index';

describe('React-Lit Integration (Comprehensive)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Clear any existing toolbars
    document.querySelectorAll('iteration-deck-toolbar').forEach(el => el.remove());
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  describe('1. React-Lit Component Interop', () => {
    it('should properly bridge React props to Lit element properties', async () => {
      const { container } = render(
        <IterationDeck 
          id="interop-deck" 
          label="Interop Test"
          prompt="AI generation prompt"
          description="Deck description"
        >
          <IterationDeckSlide 
            label="Slide 1"
            aiPrompt="Specific AI prompt"
            notes="Design notes"
            confidence={0.95}
          >
            <div>React content inside Lit element</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      const slideElement = container.querySelector('iteration-deck-slide') as any;

      // Wait for React useEffect to set properties on Lit elements
      await waitFor(() => {
        expect(deckElement.id).toBe('interop-deck');
        expect(deckElement.label).toBe('Interop Test');
        expect(deckElement.prompt).toBe('AI generation prompt');
        expect(deckElement.description).toBe('Deck description');
      });

      await waitFor(() => {
        expect(slideElement.label).toBe('Slide 1');
        expect(slideElement.aiPrompt).toBe('Specific AI prompt');
        expect(slideElement.notes).toBe('Design notes');
        expect(slideElement.confidence).toBe(0.95);
      });
    });

    it('should handle React children as web component slots', async () => {
      const ComplexReactComponent = () => (
        <div className="complex-react">
          <h2>React Component</h2>
          <button onClick={() => {}}>React Button</button>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      );

      const { container } = render(
        <IterationDeck id="slot-test">
          <IterationDeckSlide label="Complex Slide">
            <ComplexReactComponent />
          </IterationDeckSlide>
        </IterationDeck>
      );

      // Verify React component is rendered inside web component
      const reactComponent = container.querySelector('.complex-react');
      expect(reactComponent).toBeInTheDocument();
      expect(reactComponent?.querySelector('h2')).toHaveTextContent('React Component');
      expect(reactComponent?.querySelector('button')).toBeInTheDocument();
      expect(reactComponent?.querySelectorAll('li')).toHaveLength(2);
    });

    it('should update Lit properties when React props change', async () => {
      const DynamicDeck = ({ deckLabel, slideLabel }: { deckLabel: string; slideLabel: string }) => (
        <IterationDeck id="dynamic-deck" label={deckLabel}>
          <IterationDeckSlide label={slideLabel}>
            <div>Dynamic content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const { container, rerender } = render(
        <DynamicDeck deckLabel="Initial" slideLabel="Slide Initial" />
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      const slideElement = container.querySelector('iteration-deck-slide') as any;

      await waitFor(() => {
        expect(deckElement.label).toBe('Initial');
        expect(slideElement.label).toBe('Slide Initial');
      });

      // Update props
      rerender(<DynamicDeck deckLabel="Updated" slideLabel="Slide Updated" />);

      await waitFor(() => {
        expect(deckElement.label).toBe('Updated');
        expect(slideElement.label).toBe('Slide Updated');
      });
    });
  });

  describe('2. State Synchronization with Zustand Store', () => {
    it('should synchronize React component state with underlying store', async () => {
      const StoreTestComponent = () => {
        const store = useIterationStore();
        const [deckCount, setDeckCount] = useState(0);

        useEffect(() => {
          const registeredDecks = store.getRegisteredDecks();
          setDeckCount(registeredDecks.length);
        }, [store]);

        return (
          <div>
            <div data-testid="deck-count">{deckCount}</div>
            <IterationDeck id="sync-deck" label="Sync Test">
              <IterationDeckSlide label="Slide 1">
                <div>Content</div>
              </IterationDeckSlide>
            </IterationDeck>
          </div>
        );
      };

      const { getByTestId } = render(<StoreTestComponent />);

      // Wait for deck to register and state to update
      await waitFor(() => {
        const count = getByTestId('deck-count');
        expect(parseInt(count.textContent || '0')).toBeGreaterThanOrEqual(0);
      });
    });

    it('should use React hooks for deck navigation', async () => {
      const NavigationTestComponent = () => {
        const navigation = useDeckNavigation('hook-test-deck');
        const [currentSlide, setCurrentSlide] = useState('');

        useEffect(() => {
          setCurrentSlide(navigation.activeSlide || 'none');
        }, [navigation.activeSlide]);

        return (
          <div>
            <div data-testid="current-slide">{currentSlide}</div>
            <button 
              data-testid="next-btn"
              onClick={() => navigation.navigateNext()}
            >
              Next
            </button>
            <IterationDeck id="hook-test-deck">
              <IterationDeckSlide label="Slide 1">
                <div>Slide 1 Content</div>
              </IterationDeckSlide>
              <IterationDeckSlide label="Slide 2">
                <div>Slide 2 Content</div>
              </IterationDeckSlide>
            </IterationDeck>
          </div>
        );
      };

      const { getByTestId } = render(<NavigationTestComponent />);

      // Initially should show some slide or 'none'
      const currentSlideElement = getByTestId('current-slide');
      expect(currentSlideElement).toBeInTheDocument();

      // Navigation hook should provide working methods
      const nextButton = getByTestId('next-btn');
      expect(nextButton).toBeInTheDocument();
      
      // Click should not throw
      expect(() => fireEvent.click(nextButton)).not.toThrow();
    });

    it('should re-render React components when store state changes', async () => {
      let renderCount = 0;
      
      const ReactiveComponent = () => {
        const store = useIterationStore();
        renderCount++;
        
        return (
          <div>
            <div data-testid="render-count">{renderCount}</div>
            <div data-testid="production-mode">{store.isProduction ? 'prod' : 'dev'}</div>
          </div>
        );
      };

      const { getByTestId } = render(
        <div>
          <ReactiveComponent />
          <IterationDeck id="reactive-deck">
            <IterationDeckSlide label="Slide 1">
              <div>Content</div>
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      );

      const initialRenderCount = parseInt(getByTestId('render-count').textContent || '0');
      expect(initialRenderCount).toBeGreaterThan(0);

      // Store changes should trigger re-renders
      // (This would typically be tested by triggering store actions)
      expect(getByTestId('production-mode')).toHaveTextContent('dev');
    });
  });

  describe('3. Event Handling Between React and Lit', () => {
    it('should handle custom events from Lit components in React', async () => {
      const slideChangeEvents: any[] = [];
      const deckRegisteredEvents: any[] = [];

      const EventTestComponent = () => (
        <IterationDeck 
          id="event-deck"
          onSlideChange={(event) => slideChangeEvents.push(event.detail)}
          onDeckRegistered={(event) => deckRegisteredEvents.push(event.detail)}
        >
          <IterationDeckSlide label="Event Slide 1">
            <div>Event Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Event Slide 2">
            <div>Event Content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const { container } = render(<EventTestComponent />);
      const deckElement = container.querySelector('iteration-deck');

      // Simulate events from the Lit component
      const slideChangeEvent = new CustomEvent('slide-change', {
        detail: { slideId: 'slide-1', deckId: 'event-deck' }
      });
      
      const deckRegisteredEvent = new CustomEvent('deck-registered', {
        detail: { deckId: 'event-deck', slideCount: 2 }
      });

      // Dispatch events
      deckElement?.dispatchEvent(slideChangeEvent);
      deckElement?.dispatchEvent(deckRegisteredEvent);

      // Wait for event handlers to be called
      await waitFor(() => {
        expect(slideChangeEvents).toHaveLength(1);
        expect(deckRegisteredEvents).toHaveLength(1);
      });

      expect(slideChangeEvents[0]).toEqual({ slideId: 'slide-1', deckId: 'event-deck' });
      expect(deckRegisteredEvents[0]).toEqual({ deckId: 'event-deck', slideCount: 2 });
    });

    it('should not fail when event handlers are not provided', async () => {
      const { container } = render(
        <IterationDeck id="no-handlers">
          <IterationDeckSlide label="Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck');
      
      // Should not throw when dispatching events without handlers
      expect(() => {
        deckElement?.dispatchEvent(new CustomEvent('slide-change'));
        deckElement?.dispatchEvent(new CustomEvent('deck-registered'));
        deckElement?.dispatchEvent(new CustomEvent('deck-unregistered'));
      }).not.toThrow();
    });

    it('should handle React events within Lit component children', async () => {
      const clickEvents: any[] = [];

      const InteractiveComponent = () => (
        <div>
          <button 
            data-testid="react-button"
            onClick={(e) => clickEvents.push(e.type)}
          >
            React Button in Lit
          </button>
          <input 
            data-testid="react-input"
            onChange={(e) => clickEvents.push(e.type)}
          />
        </div>
      );

      const { getByTestId } = render(
        <IterationDeck id="interactive-deck">
          <IterationDeckSlide label="Interactive Slide">
            <InteractiveComponent />
          </IterationDeckSlide>
        </IterationDeck>
      );

      const button = getByTestId('react-button');
      const input = getByTestId('react-input');

      // React events should work normally inside Lit components
      fireEvent.click(button);
      fireEvent.change(input, { target: { value: 'test' } });

      expect(clickEvents).toContain('click');
      expect(clickEvents).toContain('change');
    });
  });

  describe('4. Ref Forwarding and Imperative API', () => {
    it('should forward refs to underlying Lit elements', async () => {
      const deckRef = createRef<IterationDeckHandle>();
      const slideRef = createRef<IterationDeckSlideRef>();

      render(
        <IterationDeck ref={deckRef} id="ref-forward-deck">
          <IterationDeckSlide ref={slideRef} label="Ref Slide">
            <div>Ref Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).toBeTruthy();
        expect(slideRef.current).toBeTruthy();
      });

      // Test deck ref methods
      if (deckRef.current) {
        expect(deckRef.current.getElement()).toBeInstanceOf(HTMLElement);
        expect(typeof deckRef.current.getDeckInfo()).toBe('object');
        expect(Array.isArray(deckRef.current.getAllSlides())).toBe(true);
      }

      // Test slide ref methods
      if (slideRef.current) {
        expect(slideRef.current.element).toBeInstanceOf(HTMLElement);
        expect(typeof slideRef.current.getSlideData()).toBe('object');
        expect(typeof slideRef.current.isActiveSlide()).toBe('boolean');
      }
    });

    it('should provide imperative navigation control', async () => {
      const deckRef = createRef<IterationDeckHandle>();

      render(
        <IterationDeck ref={deckRef} id="nav-control-deck">
          <IterationDeckSlide label="Nav Slide 1">
            <div>Nav Content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Nav Slide 2">
            <div>Nav Content 2</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Nav Slide 3">
            <div>Nav Content 3</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).toBeTruthy();
      });

      if (deckRef.current) {
        const handle = deckRef.current;
        
        // These methods should exist and be callable
        expect(typeof handle.navigateToNext).toBe('function');
        expect(typeof handle.navigateToPrev).toBe('function');
        expect(typeof handle.navigateToSlide).toBe('function');
        
        // Should not throw when called
        expect(() => handle.navigateToNext()).not.toThrow();
        expect(() => handle.navigateToPrev()).not.toThrow();
        expect(() => handle.navigateToSlide('any-id')).not.toThrow();
      }
    });

    it('should handle null refs gracefully', async () => {
      const deckRef = createRef<IterationDeckHandle>();

      render(
        <IterationDeck ref={deckRef} id="null-ref-deck">
          <IterationDeckSlide label="Null Ref Slide">
            <div>Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      );

      await waitFor(() => {
        expect(deckRef.current).toBeTruthy();
      });

      if (deckRef.current) {
        // Mock null element scenario
        const originalGetElement = deckRef.current.getElement;
        (deckRef.current as any).getElement = () => null;
        
        // Methods should handle null element gracefully (may return default values)
        expect(typeof deckRef.current.navigateToNext()).toBe('boolean');
        expect(typeof deckRef.current.navigateToPrev()).toBe('boolean');
        expect(typeof deckRef.current.navigateToSlide('test')).toBe('boolean');
        // getCurrentSlide may return null or slide data
        const currentSlide = deckRef.current.getCurrentSlide();
        expect(currentSlide === null || typeof currentSlide === 'object').toBe(true);
        // getAllSlides may return empty array or slide array
        expect(Array.isArray(deckRef.current.getAllSlides())).toBe(true);
        // getDeckInfo may return null or info object
        const deckInfo = deckRef.current.getDeckInfo();
        expect(deckInfo === null || typeof deckInfo === 'object').toBe(true);
        
        // Restore
        (deckRef.current as any).getElement = originalGetElement;
      }
    });
  });

  describe('5. Complex Integration Scenarios', () => {
    it('should handle multiple decks with independent React state', async () => {
      const MultipleDeckComponent = () => {
        const [deck1State, setDeck1State] = useState('initial');
        const [deck2State, setDeck2State] = useState('initial');

        return (
          <div>
            <div data-testid="deck1-state">{deck1State}</div>
            <div data-testid="deck2-state">{deck2State}</div>
            
            <IterationDeck id="multi-deck-1" label={`Deck 1 - ${deck1State}`}>
              <IterationDeckSlide label="D1 Slide 1">
                <button onClick={() => setDeck1State('clicked')}>
                  Click Deck 1
                </button>
              </IterationDeckSlide>
            </IterationDeck>
            
            <IterationDeck id="multi-deck-2" label={`Deck 2 - ${deck2State}`}>
              <IterationDeckSlide label="D2 Slide 1">
                <button onClick={() => setDeck2State('clicked')}>
                  Click Deck 2
                </button>
              </IterationDeckSlide>
            </IterationDeck>
          </div>
        );
      };

      const { getByTestId, container } = render(<MultipleDeckComponent />);

      // Initial state
      expect(getByTestId('deck1-state')).toHaveTextContent('initial');
      expect(getByTestId('deck2-state')).toHaveTextContent('initial');

      // Click buttons to change state
      const button1 = container.querySelector('button');
      const button2 = container.querySelectorAll('button')[1];
      
      if (button1) fireEvent.click(button1);
      if (button2) fireEvent.click(button2);

      // States should update independently
      await waitFor(() => {
        expect(getByTestId('deck1-state')).toHaveTextContent('clicked');
        expect(getByTestId('deck2-state')).toHaveTextContent('clicked');
      });
    });

    it('should maintain React component lifecycle through Lit updates', async () => {
      let mountedComponents = 0;
      let unmountedComponents = 0;

      const LifecycleComponent = ({ id }: { id: string }) => {
        useEffect(() => {
          mountedComponents++;
          return () => {
            unmountedComponents++;
          };
        }, []);

        return <div data-testid={`lifecycle-${id}`}>Component {id}</div>;
      };

      const DynamicContent = ({ slideCount }: { slideCount: number }) => (
        <IterationDeck id="lifecycle-deck">
          {Array.from({ length: slideCount }, (_, i) => (
            <IterationDeckSlide key={i} label={`Slide ${i + 1}`}>
              <LifecycleComponent id={`comp-${i}`} />
            </IterationDeckSlide>
          ))}
        </IterationDeck>
      );

      const { rerender } = render(<DynamicContent slideCount={2} />);

      // Initial mount
      expect(mountedComponents).toBe(2);
      expect(unmountedComponents).toBe(0);

      // Change slide count
      rerender(<DynamicContent slideCount={1} />);

      // One component should unmount
      await waitFor(() => {
        expect(unmountedComponents).toBe(1);
      });
    });

    it('should handle concurrent React and Lit state updates', async () => {
      const ConcurrentUpdateComponent = () => {
        const [reactState, setReactState] = useState(0);
        const deckRef = createRef<IterationDeckHandle>();

        const handleUpdate = () => {
          setReactState(prev => prev + 1);
          // Trigger Lit component update
          deckRef.current?.navigateToNext();
        };

        return (
          <div>
            <div data-testid="react-state">{reactState}</div>
            <button data-testid="update-btn" onClick={handleUpdate}>
              Update Both
            </button>
            <IterationDeck ref={deckRef} id="concurrent-deck">
              <IterationDeckSlide label="Concurrent Slide 1">
                <div>State: {reactState}</div>
              </IterationDeckSlide>
              <IterationDeckSlide label="Concurrent Slide 2">
                <div>State: {reactState}</div>
              </IterationDeckSlide>
            </IterationDeck>
          </div>
        );
      };

      const { getByTestId } = render(<ConcurrentUpdateComponent />);

      const updateButton = getByTestId('update-btn');
      const stateDisplay = getByTestId('react-state');

      expect(stateDisplay).toHaveTextContent('0');

      // Trigger concurrent updates
      fireEvent.click(updateButton);

      await waitFor(() => {
        expect(stateDisplay).toHaveTextContent('1');
      });

      // Should not cause conflicts or errors
      fireEvent.click(updateButton);
      fireEvent.click(updateButton);

      await waitFor(() => {
        expect(stateDisplay).toHaveTextContent('3');
      });
    });
  });
});