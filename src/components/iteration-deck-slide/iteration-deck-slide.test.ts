/**
 * IterationDeckSlide Component Tests
 * 
 * Test suite for the IterationDeckSlide Lit component
 */

import { describe, test, expect, afterEach, beforeEach } from 'vitest';
import { LitElement } from 'lit';
import { IterationDeckSlide } from './iteration-deck-slide.js';
import { createLitElement, removeLitElement, waitForLitElement } from '../../test/test-utilities.js';
import { getIterationStoreState } from '../../store/iteration-store.js';

// Import components
import './iteration-deck-slide.js';
import '../iteration-deck/iteration-deck.js';
import type { IterationDeck } from '../iteration-deck/iteration-deck.js';


describe('IterationDeckSlide Component Tests', () => {
  let slide: IterationDeckSlide;
  
  afterEach(async () => {
    if (slide && slide.parentNode) {
      slide.parentNode.removeChild(slide);
    }
    document.body.innerHTML = '';
  });

  describe('Basic Functionality', () => {
    test('should create element', () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      expect(slide).toBeInstanceOf(IterationDeckSlide);
      expect(slide).toBeInstanceOf(LitElement);
    });

    test('should have required properties', () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'Test Slide';
      slide.aiPrompt = 'Test AI prompt';
      slide.notes = 'Test notes';
      slide.confidence = 0.85;
      
      expect(slide.label).toBe('Test Slide');
      expect(slide.aiPrompt).toBe('Test AI prompt');
      expect(slide.notes).toBe('Test notes');
      expect(slide.confidence).toBe(0.85);
    });

    test('should render without errors', async () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'Test Slide';
      document.body.appendChild(slide);
      
      await slide.updateComplete;
      
      expect(slide.shadowRoot).toBeTruthy();
    });

    test('should support custom element registration', () => {
      const element = document.createElement('iteration-deck-slide');
      expect(element.constructor.name).toBe('IterationDeckSlide');
    });

    test('should render slot content', async () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'Content Test';
      slide.innerHTML = '<div id="test-content">Test Content</div>';
      document.body.appendChild(slide);
      
      await slide.updateComplete;
      
      const slotContent = slide.querySelector('#test-content');
      expect(slotContent).toBeTruthy();
      expect(slotContent?.textContent).toBe('Test Content');
    });
  });

  describe('Properties', () => {
    beforeEach(() => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      document.body.appendChild(slide);
    });

    test('should handle label property', async () => {
      slide.label = 'Dynamic Label';
      await slide.updateComplete;
      
      expect(slide.label).toBe('Dynamic Label');
      expect(slide.getAttribute('label')).toBe('Dynamic Label');
    });

    test('should handle confidence property with validation', async () => {
      // Valid confidence
      slide.label = 'Valid Confidence';
      slide.confidence = 0.75;
      await slide.updateComplete;
      
      expect(slide.confidence).toBe(0.75);
    });

    test('should handle slideId property', async () => {
      slide.label = 'ID Test';
      slide.slideId = 'custom-slide-id';
      await slide.updateComplete;
      
      expect(slide.slideId).toBe('custom-slide-id');
    });
  });

  describe('Public API', () => {
    beforeEach(async () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'API Test';
      slide.confidence = 0.9;
      document.body.appendChild(slide);
      await slide.updateComplete;
    });

    test('should provide getSlideData method', () => {
      const slideData = slide.getSlideData();
      
      expect(slideData).toBeDefined();
      expect(slideData.label).toBe('API Test');
      expect(slideData.confidence).toBe(0.9);
      expect(typeof slideData.isActive).toBe('boolean');
    });

    test('should provide isActiveSlide method', () => {
      const isActive = slide.isActiveSlide();
      
      expect(typeof isActive).toBe('boolean');
    });

    test('should provide activate method', () => {
      expect(typeof slide.activate).toBe('function');
      
      // Should not throw when called
      expect(() => slide.activate()).not.toThrow();
    });
  });
});

describe('IterationDeckSlide - Production Mode Override', () => {
  beforeEach(() => {
    // Reset any test overrides to clean state
    const store = getIterationStoreState();
    if (store._setProductionModeForTesting) {
      // Reset to default (undefined = use normal environment detection)
      (store as any)._testProductionModeOverride = undefined;
      (store as any).notifyListeners?.(); // Notify of the change
    }
    
    // Clear all registered decks to start clean
    const registeredDecks = store.getRegisteredDecks();
    registeredDecks.forEach(deckId => {
      store.removeDeck(deckId);
    });
  });

  afterEach(() => {
    // Clean up test overrides
    const store = getIterationStoreState();
    if (store._setProductionModeForTesting) {
      // Reset to default (undefined = use normal environment detection)
      (store as any)._testProductionModeOverride = undefined;
      // Manually notify listeners by calling the private method
      (store as any).notifyListeners?.(); // Notify of the change
    }
    
    // Clear all registered decks to avoid interference
    const registeredDecks = store.getRegisteredDecks();
    registeredDecks.forEach(deckId => {
      store.removeDeck(deckId);
    });
    
    document.body.innerHTML = '';
  });

  describe('Production Mode Slide Visibility', () => {
    test('inactive slides are hidden in production mode', async () => {
      // Set production mode for testing
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(true);

      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck' 
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

      // In production, second slide should be hidden
      const slide2Container = slide2.shadowRoot?.querySelector('.slide-container');
      expect(slide2Container).toHaveClass('inactive');

      const slide2Styles = getComputedStyle(slide2Container as Element);
      expect(slide2Styles.display).toBe('none');

      await removeLitElement(deck);
    });

    test('slides do not respond to clicks in production mode', async () => {
      // Set production mode for testing
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(true);

      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck' 
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

      // In production, slides should not have pointer cursor or click handlers
      const slide2Styles = getComputedStyle(slide2);
      expect(slide2Styles.cursor).toBe('default');

      // Clicking should not activate the slide
      slide2.click();
      await waitForLitElement(slide2);

      const slide2Container = slide2.shadowRoot?.querySelector('.slide-container');
      expect(slide2Container).toHaveClass('inactive');

      await removeLitElement(deck);
    });
  });

  describe('Production Override Slide Behavior', () => {
    test('inactive slides remain rendered but hidden with enable-in-production', async () => {
      // Set production mode for testing
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(true);

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

      // With override, both slides should be rendered (though second is initially inactive)
      const slide1Container = slide1.shadowRoot?.querySelector('.slide-container');
      const slide2Container = slide2.shadowRoot?.querySelector('.slide-container');

      expect(slide1Container).toHaveClass('active');
      expect(slide2Container).toHaveClass('inactive');

      // Both slides should be in the DOM and available for interaction
      expect(slide1Container).toBeInTheDocument();
      expect(slide2Container).toBeInTheDocument();

      await removeLitElement(deck);
    });

    test('slides respond to clicks in production with enable-in-production', async () => {
      // Set production mode for testing
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(true);

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

      // With override, slides should have click handlers
      const slide2Styles = getComputedStyle(slide2);
      expect(slide2Styles.cursor).toBe('pointer');

      // Clicking should activate the slide
      slide2.click();
      await waitForLitElement(slide2);
      await waitForLitElement(slide1);

      const slide1Container = slide1.shadowRoot?.querySelector('.slide-container');
      const slide2Container = slide2.shadowRoot?.querySelector('.slide-container');

      expect(slide1Container).toHaveClass('inactive');
      expect(slide2Container).toHaveClass('active');

      await removeLitElement(deck);
    });

    test('slides can be programmatically activated with enable-in-production', async () => {
      // Set production mode for testing
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(true);

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

      // Should be able to programmatically activate slides
      const slide2Element = slide2 as any;
      slide2Element.activate();

      await waitForLitElement(slide1);
      await waitForLitElement(slide2);

      const slide1Container = slide1.shadowRoot?.querySelector('.slide-container');
      const slide2Container = slide2.shadowRoot?.querySelector('.slide-container');

      expect(slide1Container).toHaveClass('inactive');
      expect(slide2Container).toHaveClass('active');

      // Verify the slide reports itself as active
      expect(slide2Element.isActiveSlide()).toBe(true);
      expect((slide1 as any).isActiveSlide()).toBe(false);

      await removeLitElement(deck);
    });
  });

  describe('Development Mode Consistency', () => {
    test('slides behave consistently in development regardless of enable-in-production', async () => {
      // Set development mode for testing (default is development, but make it explicit)
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(false);

      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true // Should be ignored in development
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

      // In development, inactive slides should be clickable
      const slide2Styles = getComputedStyle(slide2);
      expect(slide2Styles.cursor).toBe('pointer');

      // Should be able to activate second slide
      slide2.click();
      await waitForLitElement(slide2);

      const slide2Container = slide2.shadowRoot?.querySelector('.slide-container');
      expect(slide2Container).toHaveClass('active');

      await removeLitElement(deck);
    });
  });

  describe('Slide State Consistency', () => {
    test('slide getSlideData method works correctly with override', async () => {
      // Set production mode for testing
      const store = getIterationStoreState();
      store._setProductionModeForTesting!(true);

      const deck = await createLitElement<IterationDeck>('iteration-deck', { 
        id: 'test-deck',
        'enable-in-production': true
      });

      const slide1 = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide1.setAttribute('label', 'Slide 1');
      slide1.setAttribute('ai-prompt', 'Create a modern button');
      slide1.setAttribute('confidence', '0.95');
      slide1.innerHTML = '<div>Content 1</div>';

      deck.appendChild(slide1);

      await waitForLitElement(deck);
      await waitForLitElement(slide1);

      // Get slide data should work regardless of production mode
      const slideData = (slide1 as any).getSlideData();

      expect(slideData).toMatchObject({
        label: 'Slide 1',
        aiPrompt: 'Create a modern button',
        confidence: 0.95,
        isActive: true,
        deckId: 'test-deck'
      });

      await removeLitElement(deck);
    });
  });
});
