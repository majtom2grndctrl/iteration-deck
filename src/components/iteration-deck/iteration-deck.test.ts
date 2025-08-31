/**
 * IterationDeck Component Tests
 * 
 * Test suite for the IterationDeck Lit component
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LitElement } from 'lit';
import { IterationDeck } from './iteration-deck.js';
import { getIterationStoreState } from '../../store/iteration-store.js';

// Import the component to register it
import './iteration-deck.js';

describe('IterationDeck Component Tests', () => {
  let deck: IterationDeck;
  
  afterEach(async () => {
    if (deck && deck.parentNode) {
      deck.parentNode.removeChild(deck);
    }
    document.body.innerHTML = '';
  });

  describe('Basic Functionality', () => {
    it('should create element', () => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      expect(deck).toBeInstanceOf(IterationDeck);
      expect(deck).toBeInstanceOf(LitElement);
    });

    it('should have required properties', () => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'test-deck';
      deck.label = 'Test Deck';
      
      expect(deck.id).toBe('test-deck');
      expect(deck.label).toBe('Test Deck');
    });

    it('should render without errors', async () => {
      deck = document.createElement('iteration-deck') as IterationDeck;
      deck.id = 'test-deck';
      document.body.appendChild(deck);
      
      await deck.updateComplete;
      
      expect(deck.shadowRoot).toBeTruthy();
    });

    it('should support custom element registration', () => {
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

    it('should provide getDeckInfo method', async () => {
      await deck.updateComplete;
      
      const deckInfo = deck.getDeckInfo();
      
      expect(deckInfo).toBeDefined();
      expect(deckInfo.id).toBe('api-test-deck');
      expect(typeof deckInfo.slideCount).toBe('number');
      expect(typeof deckInfo.isRegistered).toBe('boolean');
    });

    it('should provide getAllSlides method', async () => {
      await deck.updateComplete;
      
      const slides = deck.getAllSlides();
      
      expect(Array.isArray(slides)).toBe(true);
    });

    it('should provide getCurrentSlide method', async () => {
      await deck.updateComplete;
      
      const currentSlide = deck.getCurrentSlide();
      
      // Can be null if no slides
      expect(currentSlide === null || typeof currentSlide === 'object').toBe(true);
    });

    it('should provide navigation methods', async () => {
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

    it('should register with store after deferred initialization', async () => {
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

    it('should handle store updates during initialization without warnings', async () => {
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

    it('should complete deferred operations within expected timeframe', async () => {
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

    it('should handle multiple deck registrations without conflicts', async () => {
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

    it('should handle property updates after initialization without lifecycle conflicts', async () => {
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