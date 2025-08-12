import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { IterationDeck } from '../IterationDeck'
import { IterationDeckSlide } from '../IterationDeckSlide'
import { useIterationDeckStore } from '../../core/store'
import * as environment from '../../core/environment'

// Mock the environment to test both dev and production modes
vi.mock('../../core/environment', () => ({
  isDevelopment: vi.fn(() => true),
  isProduction: vi.fn(() => false),
}))

describe('IterationDeck', () => {
  beforeEach(() => {
    // Reset the store before each test
    useIterationDeckStore.setState({
      decks: new Map(),
      activeDeckId: null,
      globalToolbarVisible: false,
    })
    
    // Reset mocks
    vi.mocked(environment.isDevelopment).mockReturnValue(true)
    vi.mocked(environment.isProduction).mockReturnValue(false)
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
    it('should render the first slide by default', () => {
      render(TestSlides)
      
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
    })

    it('should register deck in store', () => {
      render(TestSlides)
      
      const { decks } = useIterationDeckStore.getState()
      const deck = decks.get('test-deck')
      
      expect(deck).toBeDefined()
      expect(deck?.label).toBe('Test Deck')
      expect(deck?.slides).toHaveLength(3)
      expect(deck?.slides[0].label).toBe('Slide 1')
    })

    it('should render active slide based on store state', () => {
      const { rerender } = render(TestSlides)
      
      act(() => {
        const { setActiveSlideIndex } = useIterationDeckStore.getState()
        // Change to slide 2
        setActiveSlideIndex('test-deck', 1)
      })
      
      // Re-render to see the change
      rerender(TestSlides)
      
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
      expect(screen.getByText('Content 2')).toBeInTheDocument()
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
    })

    it('should include ToolbarManager', () => {
      render(TestSlides)
      
      // ToolbarManager creates a portal, so we check if the container exists
      const toolbarContainer = document.getElementById('iteration-deck-toolbar-container')
      expect(toolbarContainer).toBeInTheDocument()
    })

    it('should handle multiple decks', () => {
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
      
      const { decks } = useIterationDeckStore.getState()
      expect(decks.size).toBe(2)
      expect(decks.has('test-deck')).toBe(true)
      expect(decks.has('second-deck')).toBe(true)
    })

    it('should unregister deck on unmount', () => {
      const { unmount } = render(TestSlides)
      
      const { decks } = useIterationDeckStore.getState()
      expect(decks.has('test-deck')).toBe(true)
      
      unmount()
      
      const { decks: decksAfterUnmount } = useIterationDeckStore.getState()
      expect(decksAfterUnmount.has('test-deck')).toBe(false)
    })
  })

  describe('Production Mode', () => {
    beforeEach(() => {
      // Mock production mode
      vi.mocked(environment.isDevelopment).mockReturnValue(false)
      vi.mocked(environment.isProduction).mockReturnValue(true)
    })

    it('should only render first slide in production', () => {
      render(TestSlides)
      
      // Should render first slide content
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      
      // Should not render other slides
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
      
      // Should not create toolbar container
      const toolbarContainer = document.getElementById('iteration-deck-toolbar-container')
      expect(toolbarContainer).not.toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(
        <IterationDeck id="empty-deck" label="Empty Deck">
        </IterationDeck>
      )
      
      // Should not crash and should render nothing
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })

    it('should handle slide props correctly', () => {
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
      
      const { decks } = useIterationDeckStore.getState()
      const slide = decks.get('props-test-deck')?.slides[0]
      
      expect(slide?.label).toBe('Test Slide')
      expect(slide?.aiPrompt).toBe('Test prompt')
      expect(slide?.notes).toBe('Test notes')
      expect(slide?.confidence).toBe(0.95)
    })
  })
})