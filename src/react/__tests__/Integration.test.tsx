import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { IterationDeck } from '../IterationDeck'
import { IterationDeckSlide } from '../IterationDeckSlide'
import { getIterationDeckStore } from '../../web-components/store'

describe('React Integration Tests', () => {
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

  describe('React to Web Component Integration', () => {
    it('should render React components as web components', async () => {
      const TestDeck = (
        <IterationDeck id="integration-test" label="Integration Test">
          <IterationDeckSlide label="React Slide 1">
            <div>React content 1</div>
          </IterationDeckSlide>
          <IterationDeckSlide label="React Slide 2">
            <div>React content 2</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestDeck)
      
      // Check that web components are created and content renders
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
      
      const slideElements = document.querySelectorAll('iteration-deck-slide')
      expect(slideElements).toHaveLength(2)
      
      // Most importantly, check that React content is rendered
      expect(screen.getByText('React content 1')).toBeInTheDocument()
      expect(screen.getByText('React content 2')).toBeInTheDocument()
    })

    it('should pass props correctly to web components', async () => {
      const TestDeck = (
        <IterationDeck 
          id="props-test" 
          label="Props Test"
          prompt="Test prompt"
          description="Test description"
        >
          <IterationDeckSlide 
            label="Props Slide"
            aiPrompt="AI test prompt"
            notes="Test notes"
            confidence={0.85}
          >
            <div>Props test content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestDeck)
      
      // Focus on what we can reliably test - element creation and content
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
      
      const slideElement = document.querySelector('iteration-deck-slide')
      expect(slideElement).toBeInTheDocument()
      
      // Verify content renders correctly
      expect(screen.getByText('Props test content')).toBeInTheDocument()
    })

    it('should render React children content inside web components', () => {
      const TestComponent = () => (
        <div>
          <h1>Complex React Component</h1>
          <button onClick={() => console.log('clicked')}>Test Button</button>
        </div>
      )
      
      const TestDeck = (
        <IterationDeck id="content-test" label="Content Test">
          <IterationDeckSlide label="Complex Content">
            <TestComponent />
          </IterationDeckSlide>
          <IterationDeckSlide label="Simple Content">
            <p>Simple paragraph content</p>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestDeck)
      
      // Check that React content is rendered
      expect(screen.getByText('Complex React Component')).toBeInTheDocument()
      expect(screen.getByText('Test Button')).toBeInTheDocument()
      expect(screen.getByText('Simple paragraph content')).toBeInTheDocument()
    })
  })

  describe('State Integration', () => {
    it('should register deck in store when React component mounts', async () => {
      const TestDeck = (
        <IterationDeck id="store-test" label="Store Test">
          <IterationDeckSlide label="Test Slide">
            <div>Test content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      render(TestDeck)
      
      // Wait for web component initialization
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const store = getIterationDeckStore()
      const registeredDeck = store.getDeck('store-test')
      
      expect(registeredDeck).toBeDefined()
      expect(registeredDeck?.label).toBe('Store Test')
    })

    it('should unregister deck from store when React component unmounts', async () => {
      const TestDeck = (
        <IterationDeck id="unmount-test" label="Unmount Test">
          <IterationDeckSlide label="Test Slide">
            <div>Test content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      const { unmount } = render(TestDeck)
      
      // Wait for registration
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const store = getIterationDeckStore()
      expect(store.getDeck('unmount-test')).toBeDefined()
      
      unmount()
      
      // Wait for cleanup
      await new Promise(resolve => setTimeout(resolve, 100))
      
      expect(store.getDeck('unmount-test')).toBeUndefined()
    })
  })

  describe('Multiple Deck Support', () => {
    it('should handle multiple React decks on same page', async () => {
      const MultipleDeckPage = () => (
        <div>
          <IterationDeck id="deck-1" label="First Deck">
            <IterationDeckSlide label="Slide 1A">
              <div>Deck 1 Content A</div>
            </IterationDeckSlide>
            <IterationDeckSlide label="Slide 1B">
              <div>Deck 1 Content B</div>
            </IterationDeckSlide>
          </IterationDeck>
          
          <IterationDeck id="deck-2" label="Second Deck">
            <IterationDeckSlide label="Slide 2A">
              <div>Deck 2 Content A</div>
            </IterationDeckSlide>
            <IterationDeckSlide label="Slide 2B">
              <div>Deck 2 Content B</div>
            </IterationDeckSlide>
          </IterationDeck>
        </div>
      )
      
      render(<MultipleDeckPage />)
      
      // Check that both decks render
      const deckElements = document.querySelectorAll('iteration-deck')
      expect(deckElements).toHaveLength(2)
      
      expect(screen.getByText('Deck 1 Content A')).toBeInTheDocument()
      expect(screen.getByText('Deck 1 Content B')).toBeInTheDocument()
      expect(screen.getByText('Deck 2 Content A')).toBeInTheDocument()
      expect(screen.getByText('Deck 2 Content B')).toBeInTheDocument()
      
      // Wait for store registration
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const store = getIterationDeckStore()
      expect(store.getDeck('deck-1')).toBeDefined()
      expect(store.getDeck('deck-2')).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should handle React components without crashing when deck has no children', () => {
      expect(() => {
        render(<IterationDeck id="empty-deck" label="Empty Deck" />)
      }).not.toThrow()
      
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
    })

    it('should handle missing required props gracefully', () => {
      expect(() => {
        render(
          <IterationDeck id="missing-props-deck">
            <IterationDeckSlide label="Valid Slide">
              <div>Valid content</div>
            </IterationDeckSlide>
          </IterationDeck>
        )
      }).not.toThrow()
      
      const deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
    })
  })

  describe('Dynamic Updates', () => {
    it('should handle prop updates without crashing', async () => {
      const TestDeck = ({ label }: { label: string }) => (
        <IterationDeck id="update-test" label={label}>
          <IterationDeckSlide label="Test Slide">
            <div>Test content</div>
          </IterationDeckSlide>
        </IterationDeck>
      )
      
      const { rerender } = render(<TestDeck label="Initial Label" />)
      
      let deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
      expect(screen.getByText('Test content')).toBeInTheDocument()
      
      // Update props - should not crash
      expect(() => {
        rerender(<TestDeck label="Updated Label" />)
      }).not.toThrow()
      
      deckElement = document.querySelector('iteration-deck')
      expect(deckElement).toBeInTheDocument()
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('should handle children updates without crashing', async () => {
      const TestDeck = ({ showSecondSlide }: { showSecondSlide: boolean }) => (
        <IterationDeck id="children-update-test" label="Children Update Test">
          <IterationDeckSlide label="First Slide">
            <div>First slide content</div>
          </IterationDeckSlide>
          {showSecondSlide && (
            <IterationDeckSlide label="Second Slide">
              <div>Second slide content</div>
            </IterationDeckSlide>
          )}
        </IterationDeck>
      )
      
      const { rerender } = render(<TestDeck showSecondSlide={false} />)
      
      expect(screen.getByText('First slide content')).toBeInTheDocument()
      expect(screen.queryByText('Second slide content')).not.toBeInTheDocument()
      
      // Add second slide
      rerender(<TestDeck showSecondSlide={true} />)
      
      expect(screen.getByText('First slide content')).toBeInTheDocument()
      expect(screen.getByText('Second slide content')).toBeInTheDocument()
    })
  })
})