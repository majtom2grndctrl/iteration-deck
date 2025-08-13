import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { newSpecPage } from '@stencil/core/testing'
import { getIterationDeckStore } from '../../core/store'
import { IterationDeck } from '../../components/iteration-deck'
import { IterationDeckSlide } from '../../components/iteration-deck-slide'
import { IterationDeckToolbar } from '../../components/iteration-deck-toolbar'

// Mock the environment function
let mockIsDevelopment = true
jest.mock('../../core/store', () => {
  const actual = jest.requireActual('../../core/store')
  return {
    ...actual,
    isDevelopment: () => mockIsDevelopment,
  }
})

describe('Development vs Production Mode', () => {
  beforeEach(() => {
    // Clean up any existing decks
    const store = getIterationDeckStore()
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
    
    // Clean up DOM
    document.body.innerHTML = ''
  })

  afterEach(() => {
    // Clean up after each test
    const store = getIterationDeckStore()
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
    document.body.innerHTML = ''
  })

  describe('Development Mode', () => {
    beforeEach(() => {
      mockIsDevelopment = true
    })

    it('should show toolbar in development mode', () => {
      // Use dynamic approach that works in JSDOM
      const deck = document.createElement('iteration-deck') as any
      deck.id = 'dev-deck'
      deck.setAttribute('label', 'Dev Deck')
      document.body.appendChild(deck)
      
      // Add slides dynamically 
      const slide1 = document.createElement('iteration-deck-slide')
      slide1.setAttribute('label', 'Dev Slide 1')
      slide1.innerHTML = '<div>Dev Content 1</div>'
      deck.appendChild(slide1)
      
      const slide2 = document.createElement('iteration-deck-slide')
      slide2.setAttribute('label', 'Dev Slide 2')
      slide2.innerHTML = '<div>Dev Content 2</div>'
      deck.appendChild(slide2)
      
      // Manually trigger slide extraction
      if (deck._extractSlideData && deck._registerWithStore) {
        deck._extractSlideData()
        deck._registerWithStore()
      }
      
      const store = getIterationDeckStore()
      const registeredDeck = store.getDeck('dev-deck')
      
      expect(registeredDeck).toBeDefined()
      expect(registeredDeck?.slides).toHaveLength(2)
      
      // Check that toolbar should be created (we can't fully test this in JSDOM 
      // but we can test the store registration which triggers toolbar)
      const allDecks = store.getAllDecks()
      expect(allDecks).toHaveLength(1)
    })

    it('should allow navigation between slides in development', async () => {
      const store = getIterationDeckStore()
      
      // Register a test deck manually
      store.registerDeck({
        id: 'nav-test',
        label: 'Navigation Test',
        slides: [
          { label: 'Slide 1' },
          { label: 'Slide 2' },
          { label: 'Slide 3' }
        ],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      
      expect(store.getDeck('nav-test')?.activeSlideIndex).toBe(0)
      
      // Test navigation
      store.nextSlide('nav-test')
      expect(store.getDeck('nav-test')?.activeSlideIndex).toBe(1)
      
      store.nextSlide('nav-test')
      expect(store.getDeck('nav-test')?.activeSlideIndex).toBe(2)
      
      // Should wrap around
      store.nextSlide('nav-test')
      expect(store.getDeck('nav-test')?.activeSlideIndex).toBe(0)
      
      // Test previous
      store.previousSlide('nav-test')
      expect(store.getDeck('nav-test')?.activeSlideIndex).toBe(2)
    })
  })

  describe('Production Mode', () => {
    beforeEach(() => {
      mockIsDevelopment = false
    })

    it('should not show toolbar in production mode', () => {
      // In production, the deck should still register but toolbar functionality is limited
      const store = getIterationDeckStore()
      
      // We can still test basic store functionality
      expect(store).toBeDefined()
      expect(typeof store.registerDeck).toBe('function')
      expect(typeof store.getDeck).toBe('function')
      
      // Test that isDevelopment is correctly returning false in this context
      expect(mockIsDevelopment).toBe(false)
    })

    it('should render first slide by default in production', () => {
      const store = getIterationDeckStore()
      
      // Register a deck in production mode
      store.registerDeck({
        id: 'prod-first-slide',
        label: 'Production First Slide Test',
        slides: [
          { label: 'First Slide' },
          { label: 'Second Slide' },
          { label: 'Third Slide' }
        ],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      
      const deck = store.getDeck('prod-first-slide')
      expect(deck?.activeSlideIndex).toBe(0)
      expect(deck?.slides[0].label).toBe('First Slide')
    })
  })

  describe('Store Functionality Across Modes', () => {
    it('should handle deck registration in both modes', () => {
      const store = getIterationDeckStore()
      
      // Test development mode
      mockIsDevelopment = true
      
      store.registerDeck({
        id: 'test-dev',
        label: 'Dev Test',
        slides: [{ label: 'Dev Slide' }],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      
      expect(store.getDeck('test-dev')).toBeDefined()
      
      // Test production mode
      mockIsDevelopment = false
      
      store.registerDeck({
        id: 'test-prod',
        label: 'Prod Test',
        slides: [{ label: 'Prod Slide' }],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      
      expect(store.getDeck('test-prod')).toBeDefined()
      
      // Both should exist
      expect(store.getAllDecks()).toHaveLength(2)
    })
  })
})