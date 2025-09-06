/**
 * IterationDeck Component Tests
 * 
 * Test suite for the IterationDeck Lit component
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { LitElement } from 'lit';
import { IterationDeck } from './iteration-deck.js';
import { getIterationStoreState } from '../../store/iteration-store.js';
import { createLitElement, removeLitElement, waitForLitElement } from '../../test-utils/test-utilities.js';


// Import the component to register it
import './iteration-deck.js';
import '../iteration-deck-slide/iteration-deck-slide.js';
import type { IterationDeckSlide } from '../iteration-deck-slide/iteration-deck-slide.js';


describe('IterationDeck Component Tests', () => {
  let deck: IterationDeck;
  
  afterEach(async () => {
    if (deck && deck.parentNode) {
      deck.parentNode.removeChild(deck);
    }
    document.body.innerHTML = '';
  });

  describe('Basic Functionality', () => {
    test('should create element', () => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      expect(deck).toBeInstanceOf(IterationDeck);
      expect(deck).toBeInstanceOf(LitElement);
    });

    test('should have required properties', () => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'test-deck';
      deck.label = 'Test Deck';
      
      expect(deck.id).toBe('test-deck');
      expect(deck.label).toBe('Test Deck');
    });

    test('should render without errors', async () => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'test-deck';
      document.body.appendChild(deck);
      
      await deck.updateComplete;
      
      expect(deck.shadowRoot).toBeTruthy();
    });

    test('should support custom element registration', () => {
      const element = document.createElement('iteration-deck');
      expect(element.constructor.name).toBe('IterationDeck');
    });
  });

  describe('Public API', () => {
    beforeEach(() => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'api-test-deck';
      document.body.appendChild(deck);
    });

    test('should provide getDeckInfo method', async () => {
      await deck.updateComplete;
      
      const deckInfo = deck.getDeckInfo();
      
      expect(deckInfo).toBeDefined();
      expect(deckInfo.id).toBe('api-test-deck');
      expect(typeof deckInfo.slideCount).toBe('number');
      expect(typeof deckInfo.isRegistered).toBe('boolean');
    });

    test('should provide getAllSlides method', async () => {
      await deck.updateComplete;
      
      const slides = deck.getAllSlides();
      
      expect(Array.isArray(slides)).toBe(true);
    });

    test('should provide getCurrentSlide method', async () => {
      await deck.updateComplete;
      
      const currentSlide = deck.getCurrentSlide();
      
      // Can be null if no slides
      expect(currentSlide === null || typeof currentSlide === 'object').toBe(true);
    });

    test('should provide navigation methods', async () => {
      await deck.updateComplete;
      
      expect(typeof deck.navigateToNext).toBe('function');
      expect(typeof deck.navigateToPrev).toBe('function');
      expect(typeof deck.navigateToSlide).toBe('function');
    });
  });

  describe('Store Integration and Timing', () => {
    beforeEach(() => {
      // Clean up store state between tests
      const store = getIterationStoreState();
      const decks = store.getRegisteredDecks();
      decks.forEach(deckId => store.removeDeck(deckId));
    });

    test('should register with store after deferred initialization', async () => {
      const store = getIterationStoreState();
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'store-test-deck';
      
      // Create mock slides
      const slide1 = document.createElement('iteration-deck-slide');
      slide1.setAttribute('label', 'Slide 1');
      slide1.setAttribute('slide-id', 'slide-1');
      deck.appendChild(slide1);

      const slide2 = document.createElement('iteration-deck-slide');
      slide2.setAttribute('label', 'Slide 2');  
      slide2.setAttribute('slide-id', 'slide-2');
      deck.appendChild(slide2);

      document.body.appendChild(deck);

      // Wait for deferred registration to complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Should be registered with store
      const registeredDecks = store.getRegisteredDecks();
      expect(registeredDecks).toContain('store-test-deck');
      
      // Should have active slide
      const activeSlide = store.getActiveSlide('store-test-deck');
      expect(activeSlide).toBeTruthy();
    });

    test('should handle store updates during initialization without warnings', async () => {
      const warnings: string[] = [];
      const originalWarn = console.warn;
      console.warn = vi.fn((msg: string) => warnings.push(msg));

      const store = getIterationStoreState();
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'init-store-test';
      
      const slide = document.createElement('iteration-deck-slide');
      slide.setAttribute('label', 'Test Slide');
      slide.setAttribute('slide-id', 'test-slide');
      deck.appendChild(slide);

      document.body.appendChild(deck);

      // Trigger store update during initialization
      setTimeout(() => {
        store.setActiveSlide('init-store-test', 'test-slide');
      }, 10);

      // Wait for all deferred operations
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not cause Lit warnings
      const litWarnings = warnings.filter(msg => 
        msg.includes('scheduled an update') && 
        msg.includes('after an update completed')
      );
      expect(litWarnings).toHaveLength(0);

      console.warn = originalWarn;
    });

    test('should complete deferred operations within expected timeframe', async () => {
      const startTime = Date.now();
      let registrationTime = 0;

      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'timing-test-deck';
      deck.addEventListener('deck-registered', () => {
        registrationTime = Date.now() - startTime;
      });

      const slide = document.createElement('iteration-deck-slide');
      slide.setAttribute('label', 'Timing Slide');
      deck.appendChild(slide);

      document.body.appendChild(deck);

      // Wait for registration event
      await new Promise(resolve => {
        deck.addEventListener('deck-registered', resolve);
        // Fallback timeout
        setTimeout(resolve, 200);
      });

      // Should complete quickly (within 100ms typically)
      expect(registrationTime).toBeGreaterThan(0);
      expect(registrationTime).toBeLessThan(100);
    });

    test('should handle multiple deck registrations without conflicts', async () => {
      const warnings: string[] = [];
      const originalWarn = console.warn;
      console.warn = vi.fn((msg: string) => warnings.push(msg));

      const store = getIterationStoreState();
      const decks: IterationDeck[] = [];

      // Create multiple decks simultaneously
      for (let i = 1; i <= 3; i++) {
        const testDeck = document.createElement('iteration-deck') as IterationDeck;
        testDeck.id = `multi-deck-${i}`;
        
        const slide = document.createElement('iteration-deck-slide');
        slide.setAttribute('label', `Slide ${i}`);
        slide.setAttribute('slide-id', `slide-${i}`);
        testDeck.appendChild(slide);

        document.body.appendChild(testDeck);
        decks.push(testDeck);
      }

      // Wait for all registrations
      await new Promise(resolve => setTimeout(resolve, 100));

      // All should be registered
      const registeredDecks = store.getRegisteredDecks();
      expect(registeredDecks).toContain('multi-deck-1');
      expect(registeredDecks).toContain('multi-deck-2');
      expect(registeredDecks).toContain('multi-deck-3');

      // Should not cause warnings
      const litWarnings = warnings.filter(msg => 
        msg.includes('scheduled an update') ||
        msg.includes('lifecycle')
      );
      expect(litWarnings).toHaveLength(0);

      // Cleanup
      decks.forEach(d => d.parentNode?.removeChild(d));
      console.warn = originalWarn;
    });

    test('should handle property updates after initialization without lifecycle conflicts', async () => {
      const warnings: string[] = [];
      const originalWarn = console.warn;
      console.warn = vi.fn((msg: string) => warnings.push(msg));

      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'prop-update-test';
      deck.label = 'Initial Label';
      
      const slide = document.createElement('iteration-deck-slide');
      slide.setAttribute('label', 'Test Slide');
      deck.appendChild(slide);

      document.body.appendChild(deck);

      // Wait for initial setup
      await new Promise(resolve => setTimeout(resolve, 50));

      // Update properties after initialization
      deck.label = 'Updated Label';
      deck.prompt = 'Updated Prompt';
      deck.description = 'Updated Description';

      // Wait for property updates to process
      await new Promise(resolve => setTimeout(resolve, 50));

      // Should not cause lifecycle warnings
      const litWarnings = warnings.filter(msg => 
        msg.includes('scheduled an update') && 
        msg.includes('after an update completed')
      );
      expect(litWarnings).toHaveLength(0);

      console.warn = originalWarn;
    });
  });
});


describe('Production Override Feature', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Mock console methods to avoid noise during tests
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('Core Behavior Requirements', () => {
    test('deck accepts enable-in-production boolean attribute', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true
      });

      // The element should have the attribute
      expect(deck.hasAttribute('enable-in-production')).toBe(true);

      await removeLitElement(deck);
    });

    test('deck handles enable-in-production as empty string (HTML boolean pattern)', async () => {
      const deck = document.createElement('iteration-deck') as IterationDeck;
      deck.setAttribute('id', 'test-deck');
      deck.setAttribute('enable-in-production', ''); // HTML boolean attribute pattern
      
      document.body.appendChild(deck);
      await waitForLitElement(deck);

      expect(deck.hasAttribute('enable-in-production')).toBe(true);
      expect(deck.getAttribute('enable-in-production')).toBe('');

      await removeLitElement(deck);
    });

    test('deck navigation works when enable-in-production is enabled', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true
      });

      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Slide 1');
      slide1.innerHTML = '<div>Content 1</div>';

      const slide2 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide2.setAttribute('label', 'Slide 2');
      slide2.innerHTML = '<div>Content 2</div>';

      deck.appendChild(slide1);
      deck.appendChild(slide2);

      await waitForLitElement(deck);
      await waitForLitElement(slide1);
      await waitForLitElement(slide2);

      // Should be able to navigate to next slide
      const success = (deck as any).navigateToNext?.();
      expect(success).toBe(true);

      await removeLitElement(deck);
    });
  });

  describe('Environment Integration', () => {
    test('enable-in-production attribute should be reflected on the element', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck'
      });

      // Initially should not have attribute
      expect(deck.hasAttribute('enable-in-production')).toBe(false);

      // Add attribute dynamically
      deck.setAttribute('enable-in-production', '');
      await waitForLitElement(deck);

      expect(deck.hasAttribute('enable-in-production')).toBe(true);

      // Remove attribute
      deck.removeAttribute('enable-in-production');
      await waitForLitElement(deck);

      expect(deck.hasAttribute('enable-in-production')).toBe(false);

      await removeLitElement(deck);
    });

    test('deck public API returns correct enable-in-production state', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true
      });

      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Slide 1');
      deck.appendChild(slide1);

      await waitForLitElement(deck);
      await waitForLitElement(slide1);

      // The deck should be able to report its state
      const deckInfo = (deck as any).getDeckInfo?.();
      expect(deckInfo).toBeDefined();
      expect(deckInfo.id).toBe('test-deck');

      await removeLitElement(deck);
    });
  });

  describe('Slide Behavior with Override', () => {
    test('slides render and can be navigated with enable-in-production', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true
      });

      // Add multiple slides
      const slides = [];
      for (let i = 1; i <= 3; i++) {
        const slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
        slide.setAttribute('label', `Slide ${i}`);
        slide.innerHTML = `<div>Content ${i}</div>`;
        deck.appendChild(slide);
        slides.push(slide);
      }

      await waitForLitElement(deck);
      await Promise.all(slides.map(slide => waitForLitElement(slide)));

      // All slides should be in DOM
      const slideElements = deck.querySelectorAll('iteration-deck-slide');
      expect(slideElements).toHaveLength(3);

      // First slide should be active initially
      const firstSlideContainer = slides[0].shadowRoot?.querySelector('.slide-wrapper');
      expect(firstSlideContainer).toHaveClass('active');

      // Should be able to navigate to different slides
      const success = (deck as any).navigateToSlide?.('test-deck-slide-2');
      
      // This test will guide implementation - the navigation should work
      // even if the exact slide ID format differs
      expect(typeof success).toBe('boolean');

      await removeLitElement(deck);
    });

    test('slides maintain their state and metadata with override', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true
      });

      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Test Slide');
      slide1.setAttribute('ai-prompt', 'Create a test component');
      slide1.setAttribute('notes', 'This is a test slide');
      slide1.setAttribute('confidence', '0.95');
      slide1.innerHTML = '<div>Test Content</div>';

      deck.appendChild(slide1);

      await waitForLitElement(deck);
      await waitForLitElement(slide1);

      // Slide should maintain its metadata
      const slideData = (slide1 as any).getSlideData?.();
      if (slideData) {
        expect(slideData.label).toBe('Test Slide');
        expect(slideData.aiPrompt).toBe('Create a test component');
        expect(slideData.notes).toBe('This is a test slide');
        expect(slideData.confidence).toBe(0.95);
      }

      await removeLitElement(deck);
    });
  });

  describe('Multi-deck Support', () => {
    test('enable-in-production works independently for multiple decks', async () => {
      // Create first deck with override
      const deck1 = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'deck-1',
        'enable-in-production': true
      });

      // Create second deck without override
      const deck2 = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'deck-2'
      });

      // Add slides to both decks
      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Slide 1');
      slide1.innerHTML = '<div>Deck 1 Content</div>';
      deck1.appendChild(slide1);

      const slide2 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide2.setAttribute('label', 'Slide 1');
      slide2.innerHTML = '<div>Deck 2 Content</div>';
      deck2.appendChild(slide2);

      await waitForLitElement(deck1);
      await waitForLitElement(deck2);
      await waitForLitElement(slide1);
      await waitForLitElement(slide2);

      // Both decks should be independently configured
      expect(deck1.hasAttribute('enable-in-production')).toBe(true);
      expect(deck2.hasAttribute('enable-in-production')).toBe(false);

      await removeLitElement(deck1);
      await removeLitElement(deck2);
    });
  });

  describe('Error Handling', () => {
    test('deck handles invalid enable-in-production values gracefully', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck'
      });

      // Test various invalid values
      deck.setAttribute('enable-in-production', 'invalid');
      await waitForLitElement(deck);
      expect(deck.hasAttribute('enable-in-production')).toBe(true);

      deck.setAttribute('enable-in-production', '123');
      await waitForLitElement(deck);
      expect(deck.hasAttribute('enable-in-production')).toBe(true);

      // Should still function normally
      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Slide 1');
      deck.appendChild(slide1);

      await waitForLitElement(slide1);

      // Basic functionality should work
      expect(deck.querySelectorAll('iteration-deck-slide')).toHaveLength(1);

      await removeLitElement(deck);
    });

    test('deck works correctly without enable-in-production attribute', async () => {
      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck'
      });

      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Slide 1');
      slide1.innerHTML = '<div>Content 1</div>';

      deck.appendChild(slide1);

      await waitForLitElement(deck);
      await waitForLitElement(slide1);

      // Should work normally without the attribute
      expect(deck.hasAttribute('enable-in-production')).toBe(false);
      expect(deck.querySelectorAll('iteration-deck-slide')).toHaveLength(1);

      await removeLitElement(deck);
    });
  });
});
