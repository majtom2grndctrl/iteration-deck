import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { render, screen, act, waitFor } from '@testing-library/react'
import { IterationDeck } from '../IterationDeck'
import { IterationDeckSlide } from '../IterationDeckSlide'
import { getIterationDeckStore } from '../../web-components/store'

// Mock the isDevelopment function for testing different modes
let mockIsDevelopment = true
jest.mock('../../web-components/store', () => {
  const actual = jest.requireActual('../../web-components/store')
  return {
    ...actual,
    isDevelopment: () => mockIsDevelopment,
  }
})

describe('IterationDeck', () => {
  beforeEach(() => {
    // Set development mode for most tests
    mockIsDevelopment = true
    
    // Clean up any existing decks
    const store = getIterationDeckStore()
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
    
    // Clean up any existing toolbar
    const existingToolbar = document.querySelector('iteration-deck-toolbar')
    if (existingToolbar) {
      existingToolbar.remove()
    }
  })
  
  afterEach(() => {
    // Clean up after each test
    const store = getIterationDeckStore()
    store.getAllDecks().forEach(deck => {
      store.unregisterDeck(deck.id)
    })
  })

  const TestSlides = (
    <IterationDeck id="test-deck" label="Test Deck">
      <IterationDeckSlide label="Slide 1">
        <div>Content 1</div>
      </IterationDeckSlide>
      <IterationDeckSlide label="Slide 2">
        <div>Content 2</div>
      </IterationDeckSlide>
      <IterationDeckSlide label="Slide 3">
        <div>Content 3</div>
      </IterationDeckSlide>
    </IterationDeck>
  )

  describe('Development Mode', () => {
    it('should render web components without crashing', () => {
      expect(() => render(TestSlides)).not.toThrow()
      
      // Check that web components are created
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
      
      const slideElements = document.querySelectorAll('iteration-deck-slide')
      expect(slideElements).toHaveLength(3)
    })

    it('should render slide content correctly', () => {
      render(TestSlides)
      
      // The most important test - does the content actually render?
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.getByText('Content 2')).toBeInTheDocument()
      expect(screen.getByText('Content 3')).toBeInTheDocument()
    })

    it('should handle different prop combinations', () => {
      expect(() => {
        render(
          <IterationDeck id="props-test" label="Props Test" prompt="Test prompt" description="Test description">
            <IterationDeckSlide label="Test Slide" aiPrompt="AI prompt" notes="Notes" confidence={0.9}>
              <div>Test Content</div>
            </IterationDeckSlide>
          </IterationDeck>
        )
      }).not.toThrow()
      
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should handle prop updates without crashing', () => {
      const { rerender } = render(
        <IterationDeck id="update-test" label="Initial Label">
          <IterationDeckSlide label="Initial Slide">
            <div>Initial Content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      expect(screen.getByText('Initial Content')).toBeInTheDocument()
      
      // Update props - should not crash
      expect(() => {
        rerender(
          <IterationDeck id="update-test" label="Updated Label">
            <IterationDeckSlide label="Updated Slide">
              <div>Updated Content</div>
            </IterationDeckSlide>
          </IterationDeck>
        )
      }).not.toThrow()
      
      expect(screen.getByText('Updated Content')).toBeInTheDocument()
    })

    it('should handle multiple decks', () => {
      expect(() => {
        render(
          <div>
            <IterationDeck id="test-deck" label="Test Deck">
              <IterationDeckSlide label="Slide 1">
                <div>Content 1</div>
              </IterationDeckSlide>
            </IterationDeck>
            <IterationDeck id="second-deck" label="Second Deck">
              <IterationDeckSlide label="Second Slide 1">
                <div>Second Content 1</div>
              </IterationDeckSlide>
            </IterationDeck>
          </div>
        )
      }).not.toThrow()
      
      const deckElements = document.querySelectorAll('iteration-deck')
      expect(deckElements).toHaveLength(2)
      
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.getByText('Second Content 1')).toBeInTheDocument()
    })

    it('should clean up properly on unmount', () => {
      const { unmount } = render(TestSlides)
      
      expect(document.querySelector('iteration-deck')).toBeInTheDocument()
      
      unmount()
      
      expect(document.querySelector('iteration-deck')).not.toBeInTheDocument()
    })
  })

  describe('Production Mode', () => {
    beforeEach(() => {
      mockIsDevelopment = false
    })

    it('should render without crashing in production mode', () => {
      expect(() => render(TestSlides)).not.toThrow()
      
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children gracefully', () => {
      expect(() => {
        render(<IterationDeck id="empty-deck" label="Empty Deck" />)
      }).not.toThrow()
      
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
    })

    it('should handle complex slide properties', () => {
      expect(() => {
        render(
          <IterationDeck id="props-test-deck">
            <IterationDeckSlide 
              label="Test Slide" 
              aiPrompt="Test prompt"
              notes="Test notes"
              confidence={0.95}
            >
              <div>Test Content</div>
            </IterationDeckSlide>
          </IterationDeck>
        )
      }).not.toThrow()
      
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })
})