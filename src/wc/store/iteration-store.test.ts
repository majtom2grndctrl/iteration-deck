/**
 * Iteration Store Production Mode Override Tests
 * 
 * Tests how the Zustand store handles production mode detection and override behavior.
 * Focuses on the core state management logic for the production override feature.
 */

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { getIterationStoreState, subscribeToIterationStore } from './iteration-store.js';

describe('IterationStore - Production Mode Override', () => {
  let store: ReturnType<typeof getIterationStoreState>;

  beforeEach(() => {
    // Reset store state between tests
    store = getIterationStoreState();
    // Clear any existing data
    Object.keys(store.activeDecks).forEach(deckId => store.removeDeck(deckId));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Production Mode Detection', () => {
    test('store has isProduction flag', () => {
      // The store should have an isProduction flag
      expect(typeof store.isProduction).toBe('boolean');
    });
  });

  describe('Store State Management', () => {
    test('store maintains consistent deck registration regardless of environment', () => {
      const deckId = 'test-deck';
      const slideIds = ['slide-1', 'slide-2', 'slide-3'];
      const label = 'Test Deck';

      // Register deck
      store.registerDeck(deckId, slideIds, label);

      // Verify deck is registered with correct metadata
      const metadata = store.getDeckMetadata(deckId);
      expect(metadata).toMatchObject({
        slideIds: slideIds,
        activeSlideId: 'slide-1',
        label: label,
        isInteractive: true,
        slides: [
          { id: 'slide-1', label: 'slide-1' },
          { id: 'slide-2', label: 'slide-2' },
          { id: 'slide-3', label: 'slide-3' }
        ]
      });

      // Verify active slide is set
      expect(store.getActiveSlide(deckId)).toBe('slide-1');

      // Verify deck appears in registered decks
      expect(store.getRegisteredDecks()).toContain(deckId);
    });

    test('store allows slide navigation regardless of production mode', () => {
      const deckId = 'test-deck';
      const slideIds = ['slide-1', 'slide-2', 'slide-3'];

      // Register deck
      store.registerDeck(deckId, slideIds);

      // Should be able to change active slide
      store.setActiveSlide(deckId, 'slide-2');
      expect(store.getActiveSlide(deckId)).toBe('slide-2');

      // Metadata should be updated
      const metadata = store.getDeckMetadata(deckId);
      expect(metadata?.activeSlideId).toBe('slide-2');

      // Should be able to change to third slide
      store.setActiveSlide(deckId, 'slide-3');
      expect(store.getActiveSlide(deckId)).toBe('slide-3');
    });

    test('store properly handles deck cleanup', () => {
      const deckId = 'test-deck';
      const slideIds = ['slide-1', 'slide-2'];

      // Register deck
      store.registerDeck(deckId, slideIds);
      expect(store.getRegisteredDecks()).toContain(deckId);

      // Remove deck
      store.removeDeck(deckId);

      // Verify deck is completely removed
      expect(store.getRegisteredDecks()).not.toContain(deckId);
      expect(store.getActiveSlide(deckId)).toBeUndefined();
      expect(store.getDeckMetadata(deckId)).toBeUndefined();
    });

    test('store properly handles slide metadata registration', () => {
      const deckId = 'test-deck';
      const slideIds = ['test-deck-slide-0', 'test-deck-slide-1', 'test-deck-slide-2'];
      const slideMetadata = [
        { id: 'test-deck-slide-0', label: 'Hero Layout' },
        { id: 'test-deck-slide-1', label: 'Card Layout' },
        { id: 'test-deck-slide-2', label: 'List Layout' }
      ];

      // Register deck with slide metadata
      store.registerDeck(deckId, slideIds, 'Test Deck', true, slideMetadata);

      // Verify deck is registered with correct metadata
      const metadata = store.getDeckMetadata(deckId);
      expect(metadata).toMatchObject({
        slideIds: slideIds,
        activeSlideId: 'test-deck-slide-0',
        label: 'Test Deck',
        isInteractive: true,
        slides: slideMetadata
      });

      // Verify slide metadata is accessible
      expect(metadata?.slides).toHaveLength(3);
      expect(metadata?.slides[0]).toEqual({ id: 'test-deck-slide-0', label: 'Hero Layout' });
      expect(metadata?.slides[1]).toEqual({ id: 'test-deck-slide-1', label: 'Card Layout' });
      expect(metadata?.slides[2]).toEqual({ id: 'test-deck-slide-2', label: 'List Layout' });
    });

    test('store falls back to slide IDs as labels when no metadata provided', () => {
      const deckId = 'test-deck';
      const slideIds = ['slide-1', 'slide-2'];

      // Register deck without slide metadata
      store.registerDeck(deckId, slideIds, 'Test Deck', true);

      // Verify deck is registered with fallback slide metadata
      const metadata = store.getDeckMetadata(deckId);
      expect(metadata?.slides).toEqual([
        { id: 'slide-1', label: 'slide-1' },
        { id: 'slide-2', label: 'slide-2' }
      ]);
    });
  });

  describe('Store Notifications', () => {
    test('store notifies listeners of state changes', async () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToIterationStore(listener);

      const deckId = 'test-deck';
      const slideIds = ['slide-1', 'slide-2'];

      // Register deck should trigger notification
      store.registerDeck(deckId, slideIds);
      expect(listener).toHaveBeenCalledWith(store);

      // Reset calls
      listener.mockClear();

      // Set active slide should trigger notification
      store.setActiveSlide(deckId, 'slide-2');
      expect(listener).toHaveBeenCalledWith(store);

      // Reset calls
      listener.mockClear();

      // Remove deck should trigger notification
      store.removeDeck(deckId);
      expect(listener).toHaveBeenCalledWith(store);

      // Clean up subscription
      unsubscribe();
    });

    test('store handles multiple listeners correctly', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      const unsubscribe1 = subscribeToIterationStore(listener1);
      const unsubscribe2 = subscribeToIterationStore(listener2);

      // Trigger a state change
      store.registerDeck('test-deck', ['slide-1']);

      // Both listeners should be called
      expect(listener1).toHaveBeenCalledWith(store);
      expect(listener2).toHaveBeenCalledWith(store);

      // Unsubscribe first listener
      unsubscribe1();
      listener1.mockClear();
      listener2.mockClear();

      // Trigger another state change
      store.setActiveSlide('test-deck', 'slide-1');

      // Only second listener should be called
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).toHaveBeenCalledWith(store);

      // Clean up
      unsubscribe2();
    });
  });

  describe('Multi-Deck Support', () => {
    test('store handles multiple decks independently', () => {
      const deck1Id = 'deck-1';
      const deck1Slides = ['deck1-slide1', 'deck1-slide2'];
      const deck2Id = 'deck-2';
      const deck2Slides = ['deck2-slide1', 'deck2-slide2', 'deck2-slide3'];

      // Register both decks
      store.registerDeck(deck1Id, deck1Slides, 'Deck 1');
      store.registerDeck(deck2Id, deck2Slides, 'Deck 2');

      // Verify both decks are registered
      expect(store.getRegisteredDecks()).toEqual(expect.arrayContaining([deck1Id, deck2Id]));

      // Verify independent active slides
      expect(store.getActiveSlide(deck1Id)).toBe('deck1-slide1');
      expect(store.getActiveSlide(deck2Id)).toBe('deck2-slide1');

      // Change active slides independently
      store.setActiveSlide(deck1Id, 'deck1-slide2');
      store.setActiveSlide(deck2Id, 'deck2-slide3');

      // Verify changes are independent
      expect(store.getActiveSlide(deck1Id)).toBe('deck1-slide2');
      expect(store.getActiveSlide(deck2Id)).toBe('deck2-slide3');

      // Verify metadata is maintained independently
      const deck1Meta = store.getDeckMetadata(deck1Id);
      const deck2Meta = store.getDeckMetadata(deck2Id);

      expect(deck1Meta?.label).toBe('Deck 1');
      expect(deck2Meta?.label).toBe('Deck 2');
      expect(deck1Meta?.slideIds).toHaveLength(2);
      expect(deck2Meta?.slideIds).toHaveLength(3);
    });

    test('store handles selected deck for toolbar navigation', () => {
      const deck1Id = 'deck-1';
      const deck2Id = 'deck-2';

      store.registerDeck(deck1Id, ['slide1']);
      store.registerDeck(deck2Id, ['slide1']);

      // Initially no deck is selected
      expect(store.selectedDeckId).toBeUndefined();

      // Set selected deck
      store.setSelectedDeck(deck1Id);
      expect(store.selectedDeckId).toBe(deck1Id);

      // Change selected deck
      store.setSelectedDeck(deck2Id);
      expect(store.selectedDeckId).toBe(deck2Id);

      // Remove selected deck should update selection
      store.removeDeck(deck2Id);
      expect(store.selectedDeckId).toBe(deck1Id); // Should fallback to remaining deck

      // Remove last deck should clear selection
      store.removeDeck(deck1Id);
      expect(store.selectedDeckId).toBeUndefined();
    });
  });

  describe('Interactive Deck Tracking', () => {
    test('store tracks interactive vs display-only decks', () => {
      const interactiveDeckId = 'interactive-deck';
      const displayOnlyDeckId = 'display-only-deck';
      const slideIds = ['slide-1', 'slide-2'];

      // Register interactive deck (default behavior)
      store.registerDeck(interactiveDeckId, slideIds, 'Interactive Deck');
      
      // Register display-only deck
      store.registerDeck(displayOnlyDeckId, slideIds, 'Display Only Deck', false);

      // Verify metadata includes isInteractive flag
      const interactiveMeta = store.getDeckMetadata(interactiveDeckId);
      const displayOnlyMeta = store.getDeckMetadata(displayOnlyDeckId);

      expect(interactiveMeta?.isInteractive).toBe(true);
      expect(displayOnlyMeta?.isInteractive).toBe(false);
    });

    test('getInteractiveDecks returns only interactive decks', () => {
      const deck1Id = 'interactive-deck-1';
      const deck2Id = 'display-only-deck';
      const deck3Id = 'interactive-deck-2';
      const slideIds = ['slide-1'];

      // Register mixed deck types
      store.registerDeck(deck1Id, slideIds, 'Interactive 1', true);
      store.registerDeck(deck2Id, slideIds, 'Display Only', false);
      store.registerDeck(deck3Id, slideIds, 'Interactive 2', true);

      // Get all registered decks vs interactive decks
      const allDecks = store.getRegisteredDecks();
      const interactiveDecks = store.getInteractiveDecks();

      expect(allDecks).toHaveLength(3);
      expect(allDecks).toEqual(expect.arrayContaining([deck1Id, deck2Id, deck3Id]));

      expect(interactiveDecks).toHaveLength(2);
      expect(interactiveDecks).toEqual(expect.arrayContaining([deck1Id, deck3Id]));
      expect(interactiveDecks).not.toContain(deck2Id);
    });

    test('registerDeck defaults to interactive when isInteractive parameter is omitted', () => {
      const deckId = 'default-deck';
      const slideIds = ['slide-1'];

      // Register without specifying isInteractive (should default to true)
      store.registerDeck(deckId, slideIds);

      const metadata = store.getDeckMetadata(deckId);
      expect(metadata?.isInteractive).toBe(true);
      expect(store.getInteractiveDecks()).toContain(deckId);
    });

    test('getInteractiveDecks returns empty array when no interactive decks', () => {
      const deck1Id = 'display-only-1';
      const deck2Id = 'display-only-2';
      const slideIds = ['slide-1'];

      // Register only display-only decks
      store.registerDeck(deck1Id, slideIds, 'Display Only 1', false);
      store.registerDeck(deck2Id, slideIds, 'Display Only 2', false);

      const interactiveDecks = store.getInteractiveDecks();
      expect(interactiveDecks).toHaveLength(0);
      expect(interactiveDecks).toEqual([]);
    });
  });

  describe('Error Handling', () => {
    test('store handles invalid slide IDs gracefully', () => {
      const deckId = 'test-deck';
      const slideIds = ['slide-1', 'slide-2'];

      store.registerDeck(deckId, slideIds);

      // Try to set an invalid slide ID
      store.setActiveSlide(deckId, 'invalid-slide-id');

      // Store should still update (components will handle validation)
      expect(store.getActiveSlide(deckId)).toBe('invalid-slide-id');

      // But metadata should reflect the change
      const metadata = store.getDeckMetadata(deckId);
      expect(metadata?.activeSlideId).toBe('invalid-slide-id');
    });

    test('store handles operations on non-existent decks gracefully', () => {
      const nonExistentDeckId = 'non-existent-deck';

      // These operations should not throw errors
      expect(() => {
        store.setActiveSlide(nonExistentDeckId, 'some-slide');
      }).not.toThrow();

      expect(() => {
        store.removeDeck(nonExistentDeckId);
      }).not.toThrow();

      // Should return appropriate undefined values
      expect(store.getActiveSlide(nonExistentDeckId)).toBeUndefined();
      expect(store.getDeckMetadata(nonExistentDeckId)).toBeUndefined();
      expect(store.getDeckSlides(nonExistentDeckId)).toEqual([]);
    });
  });
});