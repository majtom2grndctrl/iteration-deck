import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { getIterationDeckStore } from '../store'
import '../index.js' // Register all web components

// Mock development mode
let mockIsDevelopment = true
jest.mock('../store', () => {
  const actual = jest.requireActual('../store')
  return {
    ...actual,
    isDevelopment: () => mockIsDevelopment,
  }
})

// Mock keyboard events
const createKeyboardEvent = (key: string, ctrlKey = false, metaKey = false) => {
  return new KeyboardEvent('keydown', {
    key,
    ctrlKey,
    metaKey,
    bubbles: true,
    cancelable: true
  })
}

describe('Keyboard Navigation', () => {
  let store: ReturnType<typeof getIterationDeckStore>
  let toolbar: any

  beforeEach(() => {
    // Ensure development mode
    mockIsDevelopment = true
    
    // Clean up any existing decks
    store = getIterationDeckStore()
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
    
    // Clean up DOM
    document.body.innerHTML = ''
    
    // Create and add toolbar (needed for keyboard handling)
    toolbar = document.createElement('iteration-deck-toolbar')
    document.body.appendChild(toolbar)
  })

  afterEach(() => {
    // Clean up after each test
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
    
    // Remove toolbar and clean up DOM
    if (toolbar) {
      toolbar.remove()
    }
    document.body.innerHTML = ''
  })

  describe('Single Deck Navigation', () => {
    beforeEach(() => {
      // Set up a test deck with multiple slides
      store.registerDeck({
        id: 'keyboard-test',
        label: 'Keyboard Test Deck',
        slides: [
          { label: 'Slide 1' },
          { label: 'Slide 2' },
          { label: 'Slide 3' },
          { label: 'Slide 4' }
        ],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      
      // Set this as the active deck
      store.setActiveDeck('keyboard-test')
    })

    it('should navigate to next slide with Ctrl+ArrowRight', async () => {
      // Record current state
      const initialIndex = store.getDeck('keyboard-test')?.activeSlideIndex || 0
      
      // Wait for toolbar to initialize
      await new Promise(resolve => setTimeout(resolve, 10))
      
      // Simulate Ctrl+ArrowRight
      const event = createKeyboardEvent('ArrowRight', true)
      document.dispatchEvent(event)
      
      // Should have navigated (index should be different from initial)
      const finalIndex = store.getDeck('keyboard-test')?.activeSlideIndex || 0
      expect(finalIndex).not.toBe(initialIndex)
      
      // Verify it's within valid range
      expect(finalIndex).toBeGreaterThanOrEqual(0)
      expect(finalIndex).toBeLessThan(4)
    })

    it('should navigate to next slide with Cmd+ArrowRight on Mac', () => {
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
      
      // Simulate Cmd+ArrowRight (metaKey for Mac)
      const event = createKeyboardEvent('ArrowRight', false, true)
      document.dispatchEvent(event)
      
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(1)
    })

    it('should navigate to previous slide with Ctrl+ArrowLeft', () => {
      // Start at slide 2
      store.setActiveSlideIndex('keyboard-test', 2)
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(2)
      
      // Simulate Ctrl+ArrowLeft
      const event = createKeyboardEvent('ArrowLeft', true)
      document.dispatchEvent(event)
      
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(1)
    })

    it('should navigate to previous slide with Cmd+ArrowLeft on Mac', () => {
      // Start at slide 2
      store.setActiveSlideIndex('keyboard-test', 2)
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(2)
      
      // Simulate Cmd+ArrowLeft
      const event = createKeyboardEvent('ArrowLeft', false, true)
      document.dispatchEvent(event)
      
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(1)
    })

    it('should wrap around when navigating past last slide', () => {
      // Start at last slide
      store.setActiveSlideIndex('keyboard-test', 3)
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(3)
      
      // Navigate next (should wrap to first)
      const event = createKeyboardEvent('ArrowRight', true)
      document.dispatchEvent(event)
      
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
    })

    it('should wrap around when navigating before first slide', () => {
      // Start at first slide
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
      
      // Navigate previous (should wrap to last)
      const event = createKeyboardEvent('ArrowLeft', true)
      document.dispatchEvent(event)
      
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(3)
    })

    it('should ignore arrow keys without modifier keys', () => {
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
      
      // Arrow key without Ctrl/Cmd should not navigate
      const event = createKeyboardEvent('ArrowRight')
      document.dispatchEvent(event)
      
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
    })

    it('should ignore other key combinations', () => {
      expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
      
      // Test various other keys with Ctrl
      const keys = ['ArrowUp', 'ArrowDown', 'Space', 'Enter', 'a', 'z']
      
      keys.forEach(key => {
        const event = createKeyboardEvent(key, true)
        document.dispatchEvent(event)
        expect(store.getDeck('keyboard-test')?.activeSlideIndex).toBe(0)
      })
    })
  })

  describe('Multiple Deck Navigation', () => {
    beforeEach(() => {
      // Set up multiple test decks
      store.registerDeck({
        id: 'deck-1',
        label: 'First Deck',
        slides: [
          { label: 'Deck 1 Slide 1' },
          { label: 'Deck 1 Slide 2' }
        ],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })

      store.registerDeck({
        id: 'deck-2',
        label: 'Second Deck',
        slides: [
          { label: 'Deck 2 Slide 1' },
          { label: 'Deck 2 Slide 2' },
          { label: 'Deck 2 Slide 3' }
        ],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      
      // Set deck-1 as active
      store.setActiveDeck('deck-1')
    })

    it('should only navigate active deck', () => {
      expect(store.getActiveDeckId()).toBe('deck-1')
      expect(store.getDeck('deck-1')?.activeSlideIndex).toBe(0)
      expect(store.getDeck('deck-2')?.activeSlideIndex).toBe(0)
      
      // Navigate active deck
      const event = createKeyboardEvent('ArrowRight', true)
      document.dispatchEvent(event)
      
      // Only deck-1 should change
      expect(store.getDeck('deck-1')?.activeSlideIndex).toBe(1)
      expect(store.getDeck('deck-2')?.activeSlideIndex).toBe(0)
    })

    it('should switch active deck and navigate', () => {
      expect(store.getActiveDeckId()).toBe('deck-1')
      
      // Switch to deck-2
      store.setActiveDeck('deck-2')
      expect(store.getActiveDeckId()).toBe('deck-2')
      
      // Navigate
      const event = createKeyboardEvent('ArrowRight', true)
      document.dispatchEvent(event)
      
      // Only deck-2 should change
      expect(store.getDeck('deck-1')?.activeSlideIndex).toBe(0)
      expect(store.getDeck('deck-2')?.activeSlideIndex).toBe(1)
    })
  })

  describe('No Active Deck', () => {
    it('should handle keyboard events gracefully when no active deck', () => {
      // No decks registered
      expect(store.getActiveDeckId()).toBeNull()
      
      // Keyboard events should not crash
      expect(() => {
        const event = createKeyboardEvent('ArrowRight', true)
        document.dispatchEvent(event)
      }).not.toThrow()
    })

    it('should handle keyboard events when active deck is removed', () => {
      // Register and activate a deck
      store.registerDeck({
        id: 'temp-deck',
        label: 'Temporary Deck',
        slides: [{ label: 'Slide 1' }],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      store.setActiveDeck('temp-deck')
      
      // Remove the deck
      store.unregisterDeck('temp-deck')
      
      // Keyboard events should not crash
      expect(() => {
        const event = createKeyboardEvent('ArrowRight', true)
        document.dispatchEvent(event)
      }).not.toThrow()
    })
  })

  describe('Edge Cases', () => {
    beforeEach(() => {
      // Set up a deck with only one slide
      store.registerDeck({
        id: 'single-slide-deck',
        label: 'Single Slide Deck',
        slides: [{ label: 'Only Slide' }],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      store.setActiveDeck('single-slide-deck')
    })

    it('should handle single slide deck navigation', () => {
      expect(store.getDeck('single-slide-deck')?.activeSlideIndex).toBe(0)
      
      // Navigation should stay on the same slide
      const rightEvent = createKeyboardEvent('ArrowRight', true)
      document.dispatchEvent(rightEvent)
      expect(store.getDeck('single-slide-deck')?.activeSlideIndex).toBe(0)
      
      const leftEvent = createKeyboardEvent('ArrowLeft', true)
      document.dispatchEvent(leftEvent)
      expect(store.getDeck('single-slide-deck')?.activeSlideIndex).toBe(0)
    })

    it('should handle empty deck gracefully', () => {
      // Register a deck with no slides (edge case)
      store.registerDeck({
        id: 'empty-deck',
        label: 'Empty Deck',
        slides: [],
        activeSlideIndex: 0,
        element: document.createElement('iteration-deck') as any
      })
      store.setActiveDeck('empty-deck')
      
      // Should not crash
      expect(() => {
        const event = createKeyboardEvent('ArrowRight', true)
        document.dispatchEvent(event)
      }).not.toThrow()
    })
  })
})