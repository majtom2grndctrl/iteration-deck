/**
 * Essential IterationDeckToolbar Tests
 * 
 * Tests core functionality: singleton pattern and development mode
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './iteration-deck-toolbar.js';
import { 
  IterationDeckToolbar,
  getToolbarInstance
} from './iteration-deck-toolbar.js';

vi.mock('../../store/iteration-store.js', () => ({
  subscribeToIterationStore: vi.fn(() => () => {}),
  getIterationStoreState: vi.fn(() => ({
    getRegisteredDecks: () => [],
    selectedDeckId: undefined
  })),
  isDevelopmentMode: vi.fn(() => true)
}));

vi.mock('../../core/utilities.js', async () => {
  const actual = await vi.importActual('../../core/utilities.js');
  return {
    ...actual,
    warnLog: vi.fn(),
    throttle: vi.fn((fn) => fn)
  };
});

describe('IterationDeckToolbar Essential Tests', () => {
  let toolbar: IterationDeckToolbar;
  
  beforeEach(() => {
    vi.clearAllMocks();
    document.querySelectorAll('iteration-deck-toolbar').forEach(el => el.remove());
  });
  
  afterEach(() => {
    if (toolbar) {
      toolbar.remove();
    }
    document.querySelectorAll('iteration-deck-toolbar').forEach(el => el.remove());
    document.body.innerHTML = '';
  });

  describe('Singleton Pattern', () => {
    it('should enforce singleton pattern', async () => {
      const { warnLog } = await import('../../core/utilities.js');
      
      // Create first toolbar
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // Create second toolbar - should warn
      const secondToolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(secondToolbar);
      
      expect(warnLog).toHaveBeenCalledWith(
        'Multiple IterationDeckToolbar instances detected. Only one toolbar should exist globally.'
      );
      
      secondToolbar.remove();
    });

    it('should track singleton instance', () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      expect(getToolbarInstance()).toBe(toolbar);
    });

    it('should clear singleton reference on disconnect', () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      toolbar.remove();
      
      expect(getToolbarInstance()).toBeNull();
    });
  });

  describe('Development vs Production Mode', () => {
    it('should render in development mode', async () => {
      const { isDevelopmentMode } = await import('../../store/iteration-store.js');
      vi.mocked(isDevelopmentMode).mockReturnValue(true);
      
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Should have shadow root with content in dev mode
      expect(toolbar.shadowRoot).toBeTruthy();
    });

    it('should not render in production mode', async () => {
      const { isDevelopmentMode } = await import('../../store/iteration-store.js');
      vi.mocked(isDevelopmentMode).mockReturnValue(false);
      
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Should return early and have minimal content in production
      const shadowContent = toolbar.shadowRoot?.innerHTML || '';
      expect(shadowContent.length).toBeLessThan(100); // Very minimal content
    });
  });

  describe('Basic Functionality', () => {
    beforeEach(async () => {
      const { isDevelopmentMode } = await import('../../store/iteration-store.js');
      vi.mocked(isDevelopmentMode).mockReturnValue(true);
    });

    it('should handle empty deck state', async () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // With no decks, toolbar should still render
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(toolbar.shadowRoot).toBeTruthy();
    });

    it('should subscribe to store changes', async () => {
      const { subscribeToIterationStore } = await import('../../store/iteration-store.js');
      
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      expect(subscribeToIterationStore).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(async () => {
      const { isDevelopmentMode } = await import('../../store/iteration-store.js');
      vi.mocked(isDevelopmentMode).mockReturnValue(true);
    });

    it('should register keyboard event listener on connect', async () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // Wait for connectedCallback
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
      
      addEventListenerSpy.mockRestore();
    });

    it('should remove keyboard event listener on disconnect', async () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // Wait for connectedCallback
      await new Promise(resolve => setTimeout(resolve, 10));
      
      toolbar.remove();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
      
      removeEventListenerSpy.mockRestore();
    });

    it('should ignore keyboard events in form elements', async () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      // Wait for connectedCallback
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Create a mock input element
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.focus();
      
      // Simulate keyboard event on input
      const event = new KeyboardEvent('keydown', {
        key: '[',
        ctrlKey: true,
        bubbles: true
      });
      
      Object.defineProperty(event, 'target', { 
        value: input,
        configurable: true
      });
      
      // Should not prevent default when target is input
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      document.dispatchEvent(event);
      
      expect(preventDefaultSpy).not.toHaveBeenCalled();
      
      input.remove();
      preventDefaultSpy.mockRestore();
    });
  });
});