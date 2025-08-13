import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { getIterationDeckStore, isDevelopment } from '../store'

// Mock window for event testing
Object.defineProperty(window, 'dispatchEvent', {
  value: jest.fn(),
  writable: true
})

describe('Web Components Store', () => {
  let store: ReturnType<typeof getIterationDeckStore>

  beforeEach(() => {
    store = getIterationDeckStore()
    
    // Clean up all decks
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
    
    // Clear mock
    jest.clearAllMocks()
  })

  describe('Deck Management', () => {
    it('should register and retrieve decks', () => {
      const deckData = {
        id: 'test-deck',
        label: 'Test Deck',
        prompt: 'Test prompt',
        description: 'Test description',
        slides: [
          { label: 'Slide 1', aiPrompt: 'AI prompt 1' },
          { label: 'Slide 2', notes: 'Notes 2', confidence: 0.9 }
        ],
        activeSlideIndex: 0
      }

      store.registerDeck(deckData)

      const retrieved = store.getDeck('test-deck')
      expect(retrieved).toEqual(deckData)

      const allDecks = store.getAllDecks()
      expect(allDecks).toHaveLength(1)
      expect(allDecks[0]).toEqual(deckData)
    })

    it('should set first deck as active automatically', () => {
      const deck1 = {
        id: 'deck-1',
        slides: [],
        activeSlideIndex: 0
      }

      store.registerDeck(deck1)
      expect(store.getActiveDeckId()).toBe('deck-1')
      expect(store.getActiveDeck()).toEqual(deck1)
    })

    it('should not change active deck when adding subsequent decks', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }
      const deck2 = { id: 'deck-2', slides: [], activeSlideIndex: 0 }

      store.registerDeck(deck1)
      store.registerDeck(deck2)

      expect(store.getActiveDeckId()).toBe('deck-1')
    })

    it('should unregister decks', () => {
      const deckData = {
        id: 'test-deck',
        slides: [],
        activeSlideIndex: 0
      }

      store.registerDeck(deckData)
      expect(store.getDeck('test-deck')).toBeDefined()

      store.unregisterDeck('test-deck')
      expect(store.getDeck('test-deck')).toBeUndefined()
      expect(store.getAllDecks()).toHaveLength(0)
    })

    it('should update active deck when active deck is unregistered', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }
      const deck2 = { id: 'deck-2', slides: [], activeSlideIndex: 0 }

      store.registerDeck(deck1)
      store.registerDeck(deck2)
      store.setActiveDeck('deck-2')

      expect(store.getActiveDeckId()).toBe('deck-2')

      // Unregister active deck
      store.unregisterDeck('deck-2')

      // Should fall back to remaining deck
      expect(store.getActiveDeckId()).toBe('deck-1')
    })

    it('should clear active deck when all decks are unregistered', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }

      store.registerDeck(deck1)
      expect(store.getActiveDeckId()).toBe('deck-1')

      store.unregisterDeck('deck-1')
      expect(store.getActiveDeckId()).toBeNull()
    })
  })

  describe('Slide Management', () => {
    beforeEach(() => {
      const deckData = {
        id: 'test-deck',
        slides: [
          { label: 'Slide 1' },
          { label: 'Slide 2' },
          { label: 'Slide 3' }
        ],
        activeSlideIndex: 0
      }
      store.registerDeck(deckData)
      store.setActiveDeck('test-deck')
    })

    it('should set active slide index', () => {
      store.setActiveSlideIndex('test-deck', 1)
      const deck = store.getDeck('test-deck')
      expect(deck?.activeSlideIndex).toBe(1)
    })

    it('should clamp slide index to valid range', () => {
      // Try to set beyond last slide
      store.setActiveSlideIndex('test-deck', 10)
      let deck = store.getDeck('test-deck')
      expect(deck?.activeSlideIndex).toBe(2) // Last valid index

      // Try to set negative index
      store.setActiveSlideIndex('test-deck', -5)
      deck = store.getDeck('test-deck')
      expect(deck?.activeSlideIndex).toBe(0) // First valid index
    })

    it('should handle next slide navigation', () => {
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(0)

      store.nextSlide()
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(1)

      store.nextSlide()
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(2)

      // Should wrap to beginning
      store.nextSlide()
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(0)
    })

    it('should handle previous slide navigation', () => {
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(0)

      // Should wrap to end
      store.previousSlide()
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(2)

      store.previousSlide()
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(1)

      store.previousSlide()
      expect(store.getActiveDeck()?.activeSlideIndex).toBe(0)
    })

    it('should ignore navigation when no active deck', () => {
      store.setActiveDeck(null)
      
      // Should not throw
      expect(() => store.nextSlide()).not.toThrow()
      expect(() => store.previousSlide()).not.toThrow()
    })

    it('should ignore navigation for non-existent deck', () => {
      store.setActiveDeck('non-existent')
      
      // Should not throw
      expect(() => store.nextSlide()).not.toThrow()
      expect(() => store.previousSlide()).not.toThrow()
    })
  })

  describe('Active Deck Management', () => {
    it('should set active deck', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }
      const deck2 = { id: 'deck-2', slides: [], activeSlideIndex: 0 }

      store.registerDeck(deck1)
      store.registerDeck(deck2)

      store.setActiveDeck('deck-2')
      expect(store.getActiveDeckId()).toBe('deck-2')

      store.setActiveDeck('deck-1')
      expect(store.getActiveDeckId()).toBe('deck-1')
    })

    it('should ignore setting non-existent deck as active', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }
      store.registerDeck(deck1)

      const originalActive = store.getActiveDeckId()
      store.setActiveDeck('non-existent')
      expect(store.getActiveDeckId()).toBe(originalActive)
    })

    it('should allow setting active deck to null', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }
      store.registerDeck(deck1)

      store.setActiveDeck(null)
      expect(store.getActiveDeckId()).toBeNull()
    })
  })

  describe('Event Dispatching', () => {
    it('should dispatch events for deck registration', () => {
      const deckData = {
        id: 'test-deck',
        slides: [],
        activeSlideIndex: 0
      }

      store.registerDeck(deckData)

      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'iteration-deck:deck-registered',
          detail: expect.objectContaining({
            deck: deckData,
            activeDeckId: 'test-deck',
            globalToolbarVisible: true
          })
        })
      )
    })

    it('should dispatch events for deck unregistration', () => {
      const deckData = { id: 'test-deck', slides: [], activeSlideIndex: 0 }
      store.registerDeck(deckData)

      jest.clearAllMocks()

      store.unregisterDeck('test-deck')

      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'iteration-deck:deck-unregistered',
          detail: expect.objectContaining({
            deckId: 'test-deck',
            activeDeckId: null,
            globalToolbarVisible: false
          })
        })
      )
    })

    it('should dispatch events for slide changes', () => {
      const deckData = {
        id: 'test-deck',
        slides: [{ label: 'Slide 1' }, { label: 'Slide 2' }],
        activeSlideIndex: 0
      }
      store.registerDeck(deckData)

      jest.clearAllMocks()

      store.setActiveSlideIndex('test-deck', 1)

      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'iteration-deck:slide-changed',
          detail: { deckId: 'test-deck', slideIndex: 1 }
        })
      )
    })

    it('should dispatch events for active deck changes', () => {
      const deck1 = { id: 'deck-1', slides: [], activeSlideIndex: 0 }
      const deck2 = { id: 'deck-2', slides: [], activeSlideIndex: 0 }
      store.registerDeck(deck1)
      store.registerDeck(deck2)

      jest.clearAllMocks()

      store.setActiveDeck('deck-2')

      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'iteration-deck:active-deck-changed',
          detail: { activeDeckId: 'deck-2' }
        })
      )
    })
  })

  describe('Toolbar Visibility', () => {
    it('should show toolbar when decks are present', () => {
      expect(store.isGlobalToolbarVisible()).toBe(false)

      const deckData = { id: 'test-deck', slides: [], activeSlideIndex: 0 }
      store.registerDeck(deckData)

      expect(store.isGlobalToolbarVisible()).toBe(true)
    })

    it('should hide toolbar when no decks are present', () => {
      const deckData = { id: 'test-deck', slides: [], activeSlideIndex: 0 }
      store.registerDeck(deckData)
      expect(store.isGlobalToolbarVisible()).toBe(true)

      store.unregisterDeck('test-deck')
      expect(store.isGlobalToolbarVisible()).toBe(false)
    })
  })
})

describe('isDevelopment', () => {
  const originalEnv = globalThis.process?.env?.NODE_ENV

  afterEach(() => {
    // Restore original environment
    if (originalEnv !== undefined) {
      if (globalThis.process?.env) {
        globalThis.process.env.NODE_ENV = originalEnv
      }
    }
  })

  it('should detect development mode from process.env', () => {
    // Mock development environment
    if (!globalThis.process) {
      (globalThis as any).process = { env: {} }
    }
    globalThis.process.env.NODE_ENV = 'development'

    expect(isDevelopment()).toBe(true)
  })

  it('should detect production mode from process.env', () => {
    // Mock production environment
    if (!globalThis.process) {
      (globalThis as any).process = { env: {} }
    }
    globalThis.process.env.NODE_ENV = 'production'

    expect(isDevelopment()).toBe(false)
  })

  it('should return boolean result', () => {
    // Clear process.env
    if (globalThis.process?.env) {
      delete globalThis.process.env.NODE_ENV
    }

    // In Jest environment, this should return a boolean
    const result = isDevelopment()
    expect(typeof result).toBe('boolean')
  })
})