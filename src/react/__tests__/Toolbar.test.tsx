import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toolbar } from '../Toolbar'
import { useIterationDeckStore } from '../../core/store'
import { DeckState } from '../../core/types'

describe('Toolbar', () => {
  beforeEach(() => {
    // Reset the store before each test
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

  describe('Visibility', () => {
    it('should not render when no decks are registered', () => {
      render(<Toolbar />)
      
      expect(screen.queryByRole('toolbar')).not.toBeInTheDocument()
    })

    it('should render when decks are registered', () => {
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(mockDeck)
      
      render(<Toolbar />)
      
      expect(screen.getByRole('toolbar')).toBeInTheDocument()
    })
  })

  describe('Single Deck', () => {
    beforeEach(() => {
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(mockDeck)
    })

    it('should not show deck selector for single deck', () => {
      render(<Toolbar />)
      
      expect(screen.queryByLabelText('Select iteration deck')).not.toBeInTheDocument()
    })

    it('should display current slide info', () => {
      render(<Toolbar />)
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('should have navigation buttons', () => {
      render(<Toolbar />)
      
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    })

    it('should navigate slides when clicking buttons', async () => {
      const user = userEvent.setup()
      render(<Toolbar />)
      
      const nextButton = screen.getByLabelText('Next slide')
      await user.click(nextButton)
      
      expect(screen.getByText('Slide 2')).toBeInTheDocument()
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
      
      const prevButton = screen.getByLabelText('Previous slide')
      await user.click(prevButton)
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  describe('Multiple Decks', () => {
    beforeEach(() => {
      const { registerDeck } = useIterationDeckStore.getState()
      
      const secondDeck: DeckState = {
        id: 'second-deck',
        label: 'Second Deck',
        slides: [
          { label: 'Second Slide 1' },
          { label: 'Second Slide 2' }
        ],
        activeSlideIndex: 0
      }
      
      registerDeck(mockDeck)
      registerDeck(secondDeck)
    })

    it('should show deck selector for multiple decks', () => {
      render(<Toolbar />)
      
      expect(screen.getByLabelText('Select iteration deck')).toBeInTheDocument()
    })

    it('should list all decks in selector', () => {
      render(<Toolbar />)
      
      const selector = screen.getByLabelText('Select iteration deck')
      expect(selector).toHaveValue('test-deck') // First deck is active by default
      
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(2)
      expect(options[0]).toHaveTextContent('Test Deck')
      expect(options[1]).toHaveTextContent('Second Deck')
    })

    it('should switch active deck when selector changes', async () => {
      const user = userEvent.setup()
      render(<Toolbar />)
      
      const selector = screen.getByLabelText('Select iteration deck')
      await user.selectOptions(selector, 'second-deck')
      
      expect(screen.getByText('Second Slide 1')).toBeInTheDocument()
      expect(screen.getByText('1 / 2')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(mockDeck)
    })

    it('should navigate with Ctrl+Arrow keys', () => {
      render(<Toolbar />)
      
      // Next slide with Ctrl+Right
      fireEvent.keyDown(window, { key: 'ArrowRight', ctrlKey: true })
      
      expect(screen.getByText('Slide 2')).toBeInTheDocument()
      
      // Previous slide with Ctrl+Left
      fireEvent.keyDown(window, { key: 'ArrowLeft', ctrlKey: true })
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
    })

    it('should navigate with Cmd+Arrow keys', () => {
      render(<Toolbar />)
      
      // Next slide with Cmd+Right
      fireEvent.keyDown(window, { key: 'ArrowRight', metaKey: true })
      
      expect(screen.getByText('Slide 2')).toBeInTheDocument()
      
      // Previous slide with Cmd+Left
      fireEvent.keyDown(window, { key: 'ArrowLeft', metaKey: true })
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
    })

    it('should not navigate without modifier keys', () => {
      render(<Toolbar />)
      
      // Arrow keys without modifiers should not navigate
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument()
    })

    it('should prevent default behavior for keyboard shortcuts', () => {
      render(<Toolbar />)
      
      const event = new KeyboardEvent('keydown', { 
        key: 'ArrowRight', 
        ctrlKey: true,
        bubbles: true
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      
      fireEvent(window, event)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty slide label gracefully', () => {
      const emptyLabelDeck: DeckState = {
        id: 'empty-label-deck',
        slides: [{ label: '' }],
        activeSlideIndex: 0
      }
      
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(emptyLabelDeck)
      
      render(<Toolbar />)
      
      expect(screen.getByText('1 / 1')).toBeInTheDocument()
    })

    it('should handle deck with no slides', () => {
      const noSlidesDeck: DeckState = {
        id: 'no-slides-deck',
        slides: [],
        activeSlideIndex: 0
      }
      
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(noSlidesDeck)
      
      render(<Toolbar />)
      
      expect(screen.getByText('1 / 0')).toBeInTheDocument()
    })

    it('should disable navigation buttons for single slide', () => {
      const singleSlideDeck: DeckState = {
        id: 'single-slide-deck',
        slides: [{ label: 'Only Slide' }],
        activeSlideIndex: 0
      }
      
      const { registerDeck } = useIterationDeckStore.getState()
      registerDeck(singleSlideDeck)
      
      render(<Toolbar />)
      
      const prevButton = screen.getByLabelText('Previous slide')
      const nextButton = screen.getByLabelText('Next slide')
      
      expect(prevButton).toBeDisabled()
      expect(nextButton).toBeDisabled()
    })
  })
})