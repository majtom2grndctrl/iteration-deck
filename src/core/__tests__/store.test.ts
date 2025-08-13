import { describe, it, expect, beforeEach } from '@jest/globals'
import { useIterationDeckStore } from '../store'
import { DeckState } from '../types'

describe('IterationDeckStore', () => {
  beforeEach(() => {
    // Reset the store before each test by resetting to initial state
    useIterationDeckStore.setState({
      decks: new Map(),
      activeDeckId: null,
      globalToolbarVisible: false,
    })
  })

  const mockDeck: DeckState = {
    id: 'test-deck',
    label: 'Test Deck',
    slides: [
      { label: 'Slide 1' },
      { label: 'Slide 2' },
      { label: 'Slide 3' }
    ],
    activeSlideIndex: 0
  }

  describe('registerDeck', () => {
    it('should register a new deck', () => {
      const { registerDeck } = useIterationDeckStore.getState()
      
      registerDeck(mockDeck)
      
      const { decks } = useIterationDeckStore.getState()
      expect(decks.get('test-deck')).toEqual(mockDeck)
      expect(decks.size).toBe(1)
    })

    it('should set first deck as active', () => {
      const { registerDeck } = useIterationDeckStore.getState()
      
      registerDeck(mockDeck)
      
      const { activeDeckId } = useIterationDeckStore.getState()
      expect(activeDeckId).toBe('test-deck')
    })

    it('should make toolbar visible when deck is registered', () => {
      const { registerDeck } = useIterationDeckStore.getState()
      
      registerDeck(mockDeck)
      
      const { globalToolbarVisible } = useIterationDeckStore.getState()
      expect(globalToolbarVisible).toBe(true)
    })
  })

  describe('unregisterDeck', () => {
    it('should remove a deck', () => {
      const { registerDeck, unregisterDeck, decks } = useIterationDeckStore.getState()
      
      registerDeck(mockDeck)
      unregisterDeck('test-deck')
      
      expect(decks.get('test-deck')).toBeUndefined()
      expect(decks.size).toBe(0)
    })

    it('should hide toolbar when no decks remain', () => {
      const { registerDeck, unregisterDeck, globalToolbarVisible } = useIterationDeckStore.getState()
      
      registerDeck(mockDeck)
      unregisterDeck('test-deck')
      
      expect(globalToolbarVisible).toBe(false)
    })

    it('should switch to another deck when active deck is removed', () => {
      const { registerDeck, unregisterDeck } = useIterationDeckStore.getState()
      
      const secondDeck: DeckState = { ...mockDeck, id: 'second-deck' }
      
      registerDeck(mockDeck)
      registerDeck(secondDeck)
      
      // First deck should be active
      let { activeDeckId } = useIterationDeckStore.getState()
      expect(activeDeckId).toBe('test-deck')
      
      // Remove active deck
      unregisterDeck('test-deck')
      
      // Should switch to remaining deck
      const finalState = useIterationDeckStore.getState()
      expect(finalState.activeDeckId).toBe('second-deck')
    })
  })

  describe('setActiveSlideIndex', () => {
    beforeEach(() => {
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(mockDeck)
    })

    it('should update slide index', () => {
      const { setActiveSlideIndex } = useIterationDeckStore.getState()
      
      setActiveSlideIndex('test-deck', 1)
      
      const { decks } = useIterationDeckStore.getState()
      const deck = decks.get('test-deck')
      expect(deck?.activeSlideIndex).toBe(1)
    })

    it('should clamp index to valid range', () => {
      const { setActiveSlideIndex } = useIterationDeckStore.getState()
      
      // Test upper bound
      setActiveSlideIndex('test-deck', 10)
      let { decks } = useIterationDeckStore.getState()
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(2) // max is 2 for 3 slides
      
      // Test lower bound
      setActiveSlideIndex('test-deck', -1)
      const finalState = useIterationDeckStore.getState()
      expect(finalState.decks.get('test-deck')?.activeSlideIndex).toBe(0)
    })

    it('should do nothing for non-existent deck', () => {
      const { setActiveSlideIndex, decks } = useIterationDeckStore.getState()
      
      setActiveSlideIndex('non-existent', 1)
      
      // Original deck should be unchanged
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(0)
    })
  })

  describe('nextSlide', () => {
    beforeEach(() => {
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(mockDeck)
    })

    it('should advance to next slide', () => {
      const { nextSlide } = useIterationDeckStore.getState()
      
      nextSlide()
      
      const { decks } = useIterationDeckStore.getState()
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(1)
    })

    it('should wrap to first slide from last', () => {
      const { setActiveSlideIndex, nextSlide, decks } = useIterationDeckStore.getState()
      
      // Go to last slide
      setActiveSlideIndex('test-deck', 2)
      
      // Next should wrap to first
      nextSlide()
      
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(0)
    })

    it('should do nothing if no active deck', () => {
      const { setActiveDeck, nextSlide, decks } = useIterationDeckStore.getState()
      
      setActiveDeck(null)
      nextSlide()
      
      // Should remain unchanged
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(0)
    })
  })

  describe('previousSlide', () => {
    beforeEach(() => {
      const { registerDeck, setActiveSlideIndex } = useIterationDeckStore.getState()
      registerDeck(mockDeck)
      setActiveSlideIndex('test-deck', 1) // Start at middle slide
    })

    it('should go to previous slide', () => {
      const { previousSlide } = useIterationDeckStore.getState()
      
      previousSlide()
      
      const { decks } = useIterationDeckStore.getState()
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(0)
    })

    it('should wrap to last slide from first', () => {
      const { setActiveSlideIndex, previousSlide } = useIterationDeckStore.getState()
      
      // Go to first slide
      setActiveSlideIndex('test-deck', 0)
      
      // Previous should wrap to last
      previousSlide()
      
      const { decks } = useIterationDeckStore.getState()
      expect(decks.get('test-deck')?.activeSlideIndex).toBe(2)
    })
  })
})