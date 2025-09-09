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

// Mock store implementation for testing slide label display
const createMockStoreWithSlides = (deckId: string, slides: { id: string; label: string }[], activeSlideId?: string) => {
  const mockMetadata = {
    slideIds: slides.map(s => s.id),
    slides: slides,
    activeSlideId: activeSlideId || slides[0]?.id || '',
    label: 'Test Deck',
    isInteractive: true
  };

  return {
    activeDecks: { [deckId]: activeSlideId || slides[0]?.id || '' },
    deckMetadata: { [deckId]: mockMetadata },
    selectedDeckId: deckId,
    getRegisteredDecks: () => [deckId],
    getInteractiveDecks: () => [deckId],
    getDeckMetadata: vi.fn(() => mockMetadata)
  };
};

vi.mock('../../store/iteration-store.js', () => ({
  subscribeToIterationStore: vi.fn(() => () => {}),
  getIterationStoreState: vi.fn(() => ({
    getRegisteredDecks: () => [],
    getInteractiveDecks: () => [],
    selectedDeckId: undefined
  })),
  isDevelopmentMode: vi.fn(() => true)
}));

vi.mock('../../utils/index.js', async () => {
  const actual = await vi.importActual('../../utils/index.js');
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
      const { warnLog } = await import('../../utils/index.js');
      
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
      
      // Component should be connected (basic functionality test)
      expect(toolbar.isConnected).toBe(true);
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
      
      // Component should be connected and not crash with empty deck state
      expect(toolbar.isConnected).toBe(true);
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

  describe('Slide Label Display', () => {
    beforeEach(async () => {
      const { isDevelopmentMode } = await import('../../store/iteration-store.js');
      vi.mocked(isDevelopmentMode).mockReturnValue(true);
    });

    it('should display slide label instead of slide ID', async () => {
      const slides = [
        { id: 'test-deck-slide-0', label: 'Hero Layout' },
        { id: 'test-deck-slide-1', label: 'Card Layout' },
        { id: 'test-deck-slide-2', label: 'List Layout' }
      ];
      
      const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-deck-slide-0');
      
      const { getIterationStoreState } = await import('../../store/iteration-store.js');
      vi.mocked(getIterationStoreState).mockReturnValue(mockStore as any);

      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const slideInfo = toolbar.shadowRoot?.querySelector('.slide-info-label');
      expect(slideInfo?.textContent?.trim()).toBe('Hero Layout');
      expect(slideInfo?.textContent?.trim()).not.toBe('test-deck-slide-0');
    });

    it('should display correct label when active slide changes', async () => {
      const slides = [
        { id: 'test-deck-slide-0', label: 'Primary Button' },
        { id: 'test-deck-slide-1', label: 'Secondary Button' },
        { id: 'test-deck-slide-2', label: 'Outline Button' }
      ];
      
      // Start with second slide active
      const mockStore = createMockStoreWithSlides('test-deck', slides, 'test-deck-slide-1');
      
      const { getIterationStoreState } = await import('../../store/iteration-store.js');
      vi.mocked(getIterationStoreState).mockReturnValue(mockStore as any);

      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const slideInfo = toolbar.shadowRoot?.querySelector('.slide-info-label');
      expect(slideInfo?.textContent?.trim()).toBe('Secondary Button');
      expect(slideInfo?.textContent?.trim()).not.toBe('Primary Button');
      expect(slideInfo?.textContent?.trim()).not.toBe('test-deck-slide-1');
    });

    it('should fall back gracefully when slide metadata is missing', async () => {
      const mockStore = {
        activeDecks: { 'test-deck': 'test-deck-slide-0' },
        deckMetadata: {
          'test-deck': {
            slideIds: ['test-deck-slide-0'],
            slides: [], // Empty slides array
            activeSlideId: 'test-deck-slide-0',
            label: 'Test Deck',
            isInteractive: true
          }
        },
        selectedDeckId: 'test-deck',
        getRegisteredDecks: () => ['test-deck'],
        getInteractiveDecks: () => ['test-deck'],
        getDeckMetadata: vi.fn()
      };
      
      mockStore.getDeckMetadata.mockReturnValue(mockStore.deckMetadata['test-deck']);
      
      const { getIterationStoreState } = await import('../../store/iteration-store.js');
      vi.mocked(getIterationStoreState).mockReturnValue(mockStore as any);

      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const slideInfo = toolbar.shadowRoot?.querySelector('.slide-info-label');
      expect(slideInfo?.textContent?.trim()).toBe('No slide selected');
    });

    it('should handle multiple decks with different slide labels', async () => {
      const slides = [
        { id: 'deck1-slide-0', label: 'Navigation Header' },
        { id: 'deck1-slide-1', label: 'Minimal Header' }
      ];

      const mockStore = createMockStoreWithSlides('deck1', slides, 'deck1-slide-1');
      
      const { getIterationStoreState } = await import('../../store/iteration-store.js');
      vi.mocked(getIterationStoreState).mockReturnValue(mockStore as any);

      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const slideInfo = toolbar.shadowRoot?.querySelector('.slide-info-label');
      expect(slideInfo?.textContent?.trim()).toBe('Minimal Header');
      expect(slideInfo?.textContent?.trim()).not.toBe('Navigation Header');
    });

    it('should not render when no interactive decks are available', async () => {
      const mockStore = {
        activeDecks: {},
        deckMetadata: {},
        selectedDeckId: undefined,
        getRegisteredDecks: () => [],
        getInteractiveDecks: () => [], // No interactive decks
        getDeckMetadata: vi.fn()
      };
      
      const { getIterationStoreState } = await import('../../store/iteration-store.js');
      vi.mocked(getIterationStoreState).mockReturnValue(mockStore as any);

      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Toolbar should not render at all
      const shadowContent = toolbar.shadowRoot?.innerHTML || '';
      expect(shadowContent.length).toBeLessThan(100); // Very minimal content
    });
  });
});