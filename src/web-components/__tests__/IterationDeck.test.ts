import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { newSpecPage } from '@stencil/core/testing'
import { getIterationDeckStore } from '../../core/store'
import { IterationDeck } from '../../components/iteration-deck'
import { IterationDeckSlide } from '../../components/iteration-deck-slide'
import { IterationDeckToolbar } from '../../components/iteration-deck-toolbar'

describe('IterationDeck Web Component', () => {
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

  it('should render with basic props', async () => {
    const page = await newSpecPage({
      components: [IterationDeck],
      html: `<iteration-deck id="test-deck" label="Test Deck"></iteration-deck>`,
    });

    expect(page.root).toEqualHtml(`
      <iteration-deck id="test-deck" label="Test Deck">
        <mock:shadow-root>
          <host>
            <slot></slot>
          </host>
        </mock:shadow-root>
      </iteration-deck>
    `);
  })

  it('should register deck with store on componentDidLoad', async () => {
    const store = getIterationDeckStore()
    
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide],
      html: `
        <iteration-deck id="test-deck" label="Test Deck">
          <iteration-deck-slide label="Slide 1">
            <div>Content 1</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Slide 2">
            <div>Content 2</div>
          </iteration-deck-slide>
        </iteration-deck>
      `,
    });

    // Component should be loaded and registered with store
    const registeredDeck = store.getDeck('test-deck')
    expect(registeredDeck).toBeDefined()
    expect(registeredDeck?.label).toBe('Test Deck')
  })

  it('should handle slide properties correctly', async () => {
    // Use dynamic approach that works in JSDOM
    const deck = document.createElement('iteration-deck') as any
    deck.id = 'props-deck'
    document.body.appendChild(deck)
    
    // Wait for deck to initialize
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Add slide dynamically with all properties
    const slide = document.createElement('iteration-deck-slide')
    slide.setAttribute('label', 'Test Slide')
    slide.setAttribute('ai-prompt', 'Test prompt')
    slide.setAttribute('notes', 'Test notes')
    slide.setAttribute('confidence', '0.95')
    slide.innerHTML = '<div>Test Content</div>'
    deck.appendChild(slide)
    
    // Manually trigger slide extraction
    if (deck._extractSlideData) {
      deck._extractSlideData()
      deck._registerWithStore()
    }
    
    const store = getIterationDeckStore()
    const registeredDeck = store.getDeck('props-deck')
    const slideData = registeredDeck?.slides[0]
    
    expect(slideData?.label).toBe('Test Slide')
    expect(slideData?.aiPrompt).toBe('Test prompt')
    expect(slideData?.notes).toBe('Test notes')
    expect(slideData?.confidence).toBe(0.95)
  })

  it('should update when slides are added dynamically', async () => {
    const deck = document.createElement('iteration-deck') as any
    deck.id = 'dynamic-deck'
    document.body.appendChild(deck)
    
    // Wait for initial registration
    await new Promise(resolve => setTimeout(resolve, 50))
    
    let store = getIterationDeckStore()
    let registeredDeck = store.getDeck('dynamic-deck')
    expect(registeredDeck?.slides).toHaveLength(0)
    
    // Add a slide dynamically
    const slide = document.createElement('iteration-deck-slide')
    slide.setAttribute('label', 'Dynamic Slide')
    slide.innerHTML = '<div>Dynamic Content</div>'
    deck.appendChild(slide)
    
    // Manually trigger slide extraction for testing
    if (deck._extractSlideData) {
      deck._extractSlideData()
      deck._registerWithStore()
    }
    
    store = getIterationDeckStore()
    registeredDeck = store.getDeck('dynamic-deck')
    expect(registeredDeck?.slides).toHaveLength(1)
    expect(registeredDeck?.slides[0].label).toBe('Dynamic Slide')
  })

  it('should unregister deck when removed from DOM', async () => {
    const deck = document.createElement('iteration-deck')
    deck.id = 'remove-deck'
    document.body.appendChild(deck)
    
    // Wait for registration
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const store = getIterationDeckStore()
    expect(store.getDeck('remove-deck')).toBeDefined()
    
    // Remove from DOM
    deck.remove()
    
    // Wait for cleanup
    await new Promise(resolve => setTimeout(resolve, 10))
    
    expect(store.getDeck('remove-deck')).toBeUndefined()
  })

  it('should handle attribute changes', async () => {
    // Use dynamic approach that works in JSDOM  
    const deck = document.createElement('iteration-deck') as any
    deck.id = 'attr-deck'
    deck.setAttribute('label', 'Initial Label')
    document.body.appendChild(deck)
    
    // Wait for deck to initialize
    await new Promise(resolve => setTimeout(resolve, 50))
    
    // Add slide dynamically
    const slide = document.createElement('iteration-deck-slide')
    slide.setAttribute('label', 'Initial Slide')
    slide.innerHTML = '<div>Initial Content</div>'
    deck.appendChild(slide)
    
    // Initial extraction
    if (deck._extractSlideData) {
      deck._extractSlideData()
      deck._registerWithStore()
    }
    
    let store = getIterationDeckStore()
    let registeredDeck = store.getDeck('attr-deck')
    expect(registeredDeck?.label).toBe('Initial Label')
    expect(registeredDeck?.slides[0].label).toBe('Initial Slide')
    
    // Change attributes
    deck.setAttribute('label', 'Updated Label')
    slide.setAttribute('label', 'Updated Slide')
    
    // Manually trigger extraction for testing
    if (deck._extractSlideData) {
      deck._extractSlideData()
      deck._registerWithStore()
    }
    
    store = getIterationDeckStore()
    registeredDeck = store.getDeck('attr-deck')
    expect(registeredDeck?.label).toBe('Updated Label')
    expect(registeredDeck?.slides[0].label).toBe('Updated Slide')
  })

  it('should handle multiple decks', async () => {
    const deck1 = document.createElement('iteration-deck')
    deck1.id = 'deck-1'
    deck1.setAttribute('label', 'Deck 1')
    
    const deck2 = document.createElement('iteration-deck')
    deck2.id = 'deck-2'
    deck2.setAttribute('label', 'Deck 2')
    
    document.body.appendChild(deck1)
    document.body.appendChild(deck2)
    
    // Wait for registration
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const store = getIterationDeckStore()
    const decks = store.getAllDecks()
    
    expect(decks).toHaveLength(2)
    expect(store.getDeck('deck-1')).toBeDefined()
    expect(store.getDeck('deck-2')).toBeDefined()
    expect(store.getActiveDeckId()).toBe('deck-1') // First deck should be active
  })
})