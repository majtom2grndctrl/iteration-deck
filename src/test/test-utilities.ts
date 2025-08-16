/**
 * Shared test utilities for Lit component testing
 * 
 * Provides helper functions for creating, rendering, and interacting
 * with Lit components in tests.
 */

import { LitElement } from 'lit';
import { vi } from 'vitest';

/**
 * Wait for a Lit element to complete its update cycle
 */
export async function waitForLitElement(element: LitElement): Promise<void> {
  await element.updateComplete;
}

/**
 * Create and append a Lit element to the DOM for testing
 */
export async function createLitElement<T extends LitElement>(
  tagName: string,
  attributes: Record<string, string | number | boolean> = {},
  content?: string
): Promise<T> {
  const element = document.createElement(tagName) as T;
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(key, '');
      }
    } else {
      element.setAttribute(key, String(value));
    }
  });
  
  // Set inner content if provided
  if (content) {
    element.innerHTML = content;
  }
  
  // Append to DOM
  document.body.appendChild(element);
  
  // Wait for the element to be fully initialized
  await waitForLitElement(element);
  
  return element;
}

/**
 * Remove element from DOM and wait for cleanup
 */
export async function removeLitElement(element: LitElement): Promise<void> {
  element.remove();
  // Give time for disconnectedCallback to run
  await new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Mock the environment utilities for testing
 */
export function mockEnvironmentUtils(isDev: boolean = true) {
  return {
    isDevelopment: vi.fn(() => isDev),
    isProduction: vi.fn(() => !isDev)
  };
}

/**
 * Mock store utilities for testing
 */
export function createMockStore() {
  const store = {
    activeDecks: {} as Record<string, string>,
    isProduction: false,
    selectedDeckId: undefined as string | undefined,
    listeners: new Set<(state: any) => void>(),
    
    setActiveSlide: vi.fn((deckId: string, slideId: string) => {
      store.activeDecks[deckId] = slideId;
      store.notifyListeners();
    }),
    
    removeDeck: vi.fn((deckId: string) => {
      delete store.activeDecks[deckId];
      if (store.selectedDeckId === deckId) {
        const remainingDecks = Object.keys(store.activeDecks);
        store.selectedDeckId = remainingDecks.length > 0 ? remainingDecks[0] : undefined;
      }
      store.notifyListeners();
    }),
    
    getActiveSlide: vi.fn((deckId: string) => {
      return store.activeDecks[deckId];
    }),
    
    getRegisteredDecks: vi.fn(() => {
      return Object.keys(store.activeDecks);
    }),
    
    setSelectedDeck: vi.fn((deckId: string) => {
      store.selectedDeckId = deckId;
      store.notifyListeners();
    }),
    
    subscribe: vi.fn((listener: (state: any) => void) => {
      store.listeners.add(listener);
      return () => store.listeners.delete(listener);
    }),
    
    notifyListeners: () => {
      store.listeners.forEach(listener => listener(store));
    }
  };
  
  return store;
}

/**
 * Simulate keyboard events for testing navigation
 */
export function simulateKeyboardEvent(
  key: string, 
  options: {
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    target?: HTMLElement;
  } = {}
): KeyboardEvent {
  const event = new KeyboardEvent('keydown', {
    key,
    code: `Key${key.toUpperCase()}`,
    ctrlKey: options.ctrlKey || false,
    metaKey: options.metaKey || false,
    shiftKey: options.shiftKey || false,
    altKey: options.altKey || false,
    bubbles: true,
    cancelable: true
  });
  
  const target = options.target || document;
  target.dispatchEvent(event);
  
  return event;
}

/**
 * Wait for a specific number of animation frames
 */
export function waitForAnimationFrames(count: number = 1): Promise<void> {
  return new Promise(resolve => {
    let framesLeft = count;
    function frame() {
      if (--framesLeft <= 0) {
        resolve();
      } else {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  });
}

/**
 * Mock RAF for tests that don't need real animation timing
 */
export function mockAnimationFrame() {
  const originalRAF = globalThis.requestAnimationFrame;
  const originalCAF = globalThis.cancelAnimationFrame;
  
  let id = 0;
  const callbacks = new Map<number, FrameRequestCallback>();
  
  globalThis.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
    const currentId = ++id;
    callbacks.set(currentId, callback);
    // Execute immediately in tests
    setTimeout(() => {
      if (callbacks.has(currentId)) {
        callback(performance.now());
        callbacks.delete(currentId);
      }
    }, 0);
    return currentId;
  });
  
  globalThis.cancelAnimationFrame = vi.fn((id: number) => {
    callbacks.delete(id);
  });
  
  return () => {
    globalThis.requestAnimationFrame = originalRAF;
    globalThis.cancelAnimationFrame = originalCAF;
  };
}

/**
 * Create a test slide element with specified attributes
 */
export async function createTestSlide(
  label: string,
  attributes: Record<string, any> = {},
  content: string = `<div>Content for ${label}</div>`
): Promise<HTMLElement> {
  const slide = await createLitElement('iteration-deck-slide', {
    label,
    ...attributes
  }, content);
  
  return slide;
}

/**
 * Create a test deck with multiple slides
 */
export async function createTestDeck(
  deckId: string,
  slides: Array<{ label: string; attributes?: Record<string, any>; content?: string }>,
  deckAttributes: Record<string, any> = {}
): Promise<HTMLElement> {
  const deck = await createLitElement('iteration-deck', {
    id: deckId,
    ...deckAttributes
  });
  
  // Add slides to the deck
  for (const slideConfig of slides) {
    const slide = await createTestSlide(
      slideConfig.label,
      slideConfig.attributes || {},
      slideConfig.content || `<div>Content for ${slideConfig.label}</div>`
    );
    deck.appendChild(slide);
  }
  
  // Wait for deck to detect slides
  await waitForLitElement(deck as LitElement);
  
  return deck;
}

/**
 * Assert that an element has specific CSS classes
 */
export function assertElementClasses(element: Element, expectedClasses: string[]) {
  expectedClasses.forEach(className => {
    if (!element.classList.contains(className)) {
      throw new Error(`Expected element to have class "${className}", but it was not found. Element classes: ${Array.from(element.classList).join(', ')}`);
    }
  });
}

/**
 * Assert that an element does not have specific CSS classes
 */
export function assertElementLacksClasses(element: Element, unexpectedClasses: string[]) {
  unexpectedClasses.forEach(className => {
    if (element.classList.contains(className)) {
      throw new Error(`Expected element to NOT have class "${className}", but it was found. Element classes: ${Array.from(element.classList).join(', ')}`);
    }
  });
}