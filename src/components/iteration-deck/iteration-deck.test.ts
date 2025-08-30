/**
 * IterationDeck Component Tests
 * 
 * Test suite for the IterationDeck Lit component
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LitElement } from 'lit';
import { IterationDeck } from './iteration-deck.js';

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
});