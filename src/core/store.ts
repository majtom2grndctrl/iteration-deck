import { create } from 'zustand'
import { IterationDeckStore, DeckState } from './types'

export const useIterationDeckStore = create<IterationDeckStore>((set, get) => ({
  decks: new Map(),
  activeDeckId: null,
  globalToolbarVisible: false,

  registerDeck: (deck: DeckState) => {
    set((state) => {
      const newDecks = new Map(state.decks)
      newDecks.set(deck.id, deck)
      
      // If this is the first deck, make it active
      const activeDeckId = state.activeDeckId || deck.id
      
      // Show toolbar if we have at least one deck and we're in development
      const globalToolbarVisible = newDecks.size > 0

      return {
        decks: newDecks,
        activeDeckId,
        globalToolbarVisible
      }
    })
  },

  unregisterDeck: (id: string) => {
    set((state) => {
      const newDecks = new Map(state.decks)
      newDecks.delete(id)
      
      // If the active deck was removed, select the first remaining deck
      let activeDeckId = state.activeDeckId
      if (activeDeckId === id) {
        const remainingDecks = Array.from(newDecks.keys())
        activeDeckId = remainingDecks.length > 0 ? remainingDecks[0] : null
      }
      
      // Hide toolbar if no decks remain
      const globalToolbarVisible = newDecks.size > 0

      return {
        decks: newDecks,
        activeDeckId,
        globalToolbarVisible
      }
    })
  },

  setActiveSlideIndex: (deckId: string, index: number) => {
    set((state) => {
      const newDecks = new Map(state.decks)
      const deck = newDecks.get(deckId)
      
      if (deck) {
        // Clamp index to valid range
        const clampedIndex = Math.max(0, Math.min(index, deck.slides.length - 1))
        newDecks.set(deckId, { ...deck, activeSlideIndex: clampedIndex })
      }
      
      return { decks: newDecks }
    })
  },

  setActiveDeck: (deckId: string | null) => {
    set({ activeDeckId: deckId })
  },

  nextSlide: () => {
    const { activeDeckId, decks, setActiveSlideIndex } = get()
    if (!activeDeckId) return
    
    const deck = decks.get(activeDeckId)
    if (!deck) return
    
    const nextIndex = (deck.activeSlideIndex + 1) % deck.slides.length
    setActiveSlideIndex(activeDeckId, nextIndex)
  },

  previousSlide: () => {
    const { activeDeckId, decks, setActiveSlideIndex } = get()
    if (!activeDeckId) return
    
    const deck = decks.get(activeDeckId)
    if (!deck) return
    
    const prevIndex = deck.activeSlideIndex === 0 
      ? deck.slides.length - 1 
      : deck.activeSlideIndex - 1
    setActiveSlideIndex(activeDeckId, prevIndex)
  },

  setGlobalToolbarVisible: (visible: boolean) => {
    set({ globalToolbarVisible: visible })
  }
}))