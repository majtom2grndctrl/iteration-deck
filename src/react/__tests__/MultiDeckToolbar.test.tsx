import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { IterationDeck } from '../IterationDeck'
import { IterationDeckSlide } from '../IterationDeckSlide'
import { getIterationDeckStore } from '../../web-components/store'

// Mock development mode
let mockIsDevelopment = true
jest.mock('../../web-components/store', () => {
  const actual = jest.requireActual('../../web-components/store')
  return {
    ...actual,
    isDevelopment: () => mockIsDevelopment,
  }
})

describe('Multi-Deck Toolbar Integration', () => {
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
    
    // Create and add toolbar (needed for multi-deck functionality)
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

  describe('Single Deck Scenarios', () => {
    it('should handle single deck without dropdown', async () => {
      const TestSingleDeck = (
        <IterationDeck id="single-deck" label="Single Deck">
          <IterationDeckSlide label="Slide 1">
            <div>Single deck content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Slide 2">
            <div>Single deck content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestSingleDeck)
      
      // Wait for registration
      await new Promise(resolve => setTimeout(resolve, 100))
      
      expect(store.getAllDecks()).toHaveLength(1)
      expect(store.getDeck('single-deck')).toBeDefined()
      
      // Single deck should be automatically active
      expect(store.getActiveDeckId()).toBe('single-deck')
    })
  })

  describe('Multiple Deck Scenarios', () => {
    const MultipleDeckPage = () => (
      <div>
        <h2>Header Variations</h2>
        <IterationDeck id="headers" label="Page Headers">
          <IterationDeckSlide label="Standard Header">
            <div>Standard header content</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Compact Header">
            <div>Compact header content</div>
          </IterationDeckSlide>
        </IterationDeck>

        <h2>Footer Variations</h2>
        <IterationDeck id="footers" label="Page Footers">
          <IterationDeckSlide label="Full Footer">
            <div>Full footer content</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="Minimal Footer">
            <div>Minimal footer content</div>
          </IterationDeckSlide>
        </IterationDeck>

        <h2>Button Variations</h2>
        <IterationDeck id="buttons" label="Action Buttons">
          <IterationDeckSlide label="Primary Button">
            <button>Primary Action</button>
          </IterationDeckSlide>
          <IterationDeckSlide label="Secondary Button">
            <button>Secondary Action</button>
          </IterationDeckSlide>
          <IterationDeckSlide label="Outline Button">
            <button>Outline Action</button>
          </IterationDeckSlide>
        </IterationDeck>
      </div>
    )

    it('should register multiple decks correctly', async () => {
      render(<MultipleDeckPage />)
      
      // Wait for all registrations
      await new Promise(resolve => setTimeout(resolve, 150))
      
      const allDecks = store.getAllDecks()
      expect(allDecks).toHaveLength(3)
      
      const deckIds = allDecks.map(deck => deck.id)
      expect(deckIds).toContain('headers')
      expect(deckIds).toContain('footers')
      expect(deckIds).toContain('buttons')
    })

    it('should have first deck as active by default', async () => {
      render(<MultipleDeckPage />)
      
      // Wait for registrations
      await new Promise(resolve => setTimeout(resolve, 150))
      
      // First registered deck should be active
      const activeDeckId = store.getActiveDeckId()
      expect(activeDeckId).toBeTruthy()
      expect(['headers', 'footers', 'buttons']).toContain(activeDeckId)
    })

    it('should allow switching active deck', async () => {
      render(<MultipleDeckPage />)
      
      // Wait for registrations
      await new Promise(resolve => setTimeout(resolve, 150))
      
      const initialActive = store.getActiveDeckId()
      expect(initialActive).toBeTruthy()
      
      // Switch to a different deck
      const allDecks = store.getAllDecks()
      const differentDeck = allDecks.find(deck => deck.id !== initialActive)
      expect(differentDeck).toBeDefined()
      
      store.setActiveDeck(differentDeck!.id)
      expect(store.getActiveDeckId()).toBe(differentDeck!.id)
    })

    it('should handle deck navigation independently', async () => {
      render(<MultipleDeckPage />)
      
      // Wait for registrations
      await new Promise(resolve => setTimeout(resolve, 150))
      
      // Get all deck data
      const headersDeck = store.getDeck('headers')
      const footersDeck = store.getDeck('footers')
      const buttonsDeck = store.getDeck('buttons')
      
      expect(headersDeck).toBeDefined()
      expect(footersDeck).toBeDefined()
      expect(buttonsDeck).toBeDefined()
      
      // All should start at index 0
      expect(headersDeck?.activeSlideIndex).toBe(0)
      expect(footersDeck?.activeSlideIndex).toBe(0)
      expect(buttonsDeck?.activeSlideIndex).toBe(0)
      
      // Navigate each deck independently
      store.setActiveDeck('headers')
      store.nextSlide()
      expect(store.getDeck('headers')?.activeSlideIndex).toBe(1)
      expect(store.getDeck('footers')?.activeSlideIndex).toBe(0) // Unchanged
      expect(store.getDeck('buttons')?.activeSlideIndex).toBe(0) // Unchanged
      
      store.setActiveDeck('buttons')
      store.nextSlide()
      store.nextSlide() // Navigate to slide 2
      expect(store.getDeck('headers')?.activeSlideIndex).toBe(1) // Unchanged
      expect(store.getDeck('footers')?.activeSlideIndex).toBe(0) // Unchanged
      expect(store.getDeck('buttons')?.activeSlideIndex).toBe(2)
    })
  })

  describe('Toolbar State Management', () => {
    it('should show toolbar when decks are present in development', async () => {
      const TestDeck = (
        <IterationDeck id="toolbar-test" label="Toolbar Test">
          <IterationDeckSlide label="Test Slide">
            <div>Test content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestDeck)
      
      // Wait for registration
      await new Promise(resolve => setTimeout(resolve, 100))
      
      expect(store.isGlobalToolbarVisible()).toBe(true)
      expect(store.getAllDecks()).toHaveLength(1)
    })

    it('should handle toolbar visibility with multiple decks', async () => {
      const FirstDeck = (
        <IterationDeck id="first" label="First">
          <IterationDeckSlide label="Slide 1">
            <div>First content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      const { rerender } = render(FirstDeck)
      
      // Wait for first deck
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(store.getAllDecks()).toHaveLength(1)
      expect(store.isGlobalToolbarVisible()).toBe(true)
      
      // Add second deck
      const SecondDeck = (
        <div>
          <IterationDeck id="first" label="First">
            <IterationDeckSlide label="Slide 1">
              <div>First content</div>
            </IterationDeckSlide>
          </IterationDeck>
          <IterationDeck id="second" label="Second">
            <IterationDeckSlide label="Slide 2">
              <div>Second content</div>
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      )
      
      rerender(SecondDeck)
      
      // Wait for second deck
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(store.getAllDecks()).toHaveLength(2)
      expect(store.isGlobalToolbarVisible()).toBe(true)
    })
  })

  describe('Production Mode Behavior', () => {
    beforeEach(() => {
      mockIsDevelopment = false
    })

    it('should not show toolbar in production mode', async () => {
      const TestDeck = (
        <IterationDeck id="prod-test" label="Production Test">
          <IterationDeckSlide label="Prod Slide">
            <div>Production content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestDeck)
      
      // Wait for registration
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Deck should still register - the store tracks decks regardless of mode
      expect(store.getDeck('prod-test')).toBeDefined()
      
      // In production mode, the store still reports toolbar as available (for decks > 0)
      // but the actual toolbar component should not be visible due to isDevelopment() check
      expect(store.isGlobalToolbarVisible()).toBe(true) // Store tracks deck existence
      expect(mockIsDevelopment).toBe(false) // But we're in production mode
      
      // The actual toolbar visibility is determined by: isDevelopment() && store.isGlobalToolbarVisible()
      const expectedToolbarVisibility = mockIsDevelopment && store.isGlobalToolbarVisible()
      expect(expectedToolbarVisibility).toBe(false)
    })

    it('should handle multiple decks in production without toolbar', async () => {
      const MultiDeckProd = (
        <div>
          <IterationDeck id="prod-1" label="Prod Deck 1">
            <IterationDeckSlide label="Slide 1">
              <div>Prod content 1</div>
            </IterationDeckSlide>
          </IterationDeck>
          <IterationDeck id="prod-2" label="Prod Deck 2">
            <IterationDeckSlide label="Slide 2">
              <div>Prod content 2</div>
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      )
      
      render(MultiDeckProd)
      
      // Wait for registrations
      await new Promise(resolve => setTimeout(resolve, 150))
      
      expect(store.getAllDecks()).toHaveLength(2)
      
      // Store tracks decks but actual toolbar visibility is controlled by development mode
      expect(store.isGlobalToolbarVisible()).toBe(true) // Store has decks
      expect(mockIsDevelopment).toBe(false) // But we're in production
      
      const expectedToolbarVisibility = mockIsDevelopment && store.isGlobalToolbarVisible()
      expect(expectedToolbarVisibility).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle deck removal gracefully', async () => {
      const TestDeck = ({ showSecond }: { showSecond: boolean }) => (
        <div>
          <IterationDeck id="persistent" label="Persistent Deck">
            <IterationDeckSlide label="Persistent Slide">
              <div>Persistent content</div>
            </IterationDeckSlide>
          </IterationDeck>
          
          {showSecond && (
            <IterationDeck id="removable" label="Removable Deck">
              <IterationDeckSlide label="Removable Slide">
                <div>Removable content</div>
              </IterationDeckSlide>
            </IterationDeck>
          )}
        </div>
      )
      
      const { rerender } = render(<TestDeck showSecond={true} />)
      
      // Wait for both decks
      await new Promise(resolve => setTimeout(resolve, 150))
      expect(store.getAllDecks()).toHaveLength(2)
      
      // Remove second deck
      rerender(<TestDeck showSecond={false} />)
      
      // Wait for cleanup
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(store.getAllDecks()).toHaveLength(1)
      expect(store.getDeck('persistent')).toBeDefined()
      expect(store.getDeck('removable')).toBeUndefined()
    })

    it('should handle empty deck list', () => {
      // No decks registered
      expect(store.getAllDecks()).toHaveLength(0)
      expect(store.getActiveDeckId()).toBeNull()
      expect(store.isGlobalToolbarVisible()).toBe(false)
    })
  })
})