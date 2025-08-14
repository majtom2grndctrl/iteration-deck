import { create } from 'zustand';

export interface DeckInfo {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  slides: SlideInfo[];
  activeSlideIndex: number;
}

export interface SlideInfo {
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

export interface GlobalDeckState {
  decks: Map<string, DeckInfo>;
  activeDeckId: string | null;
  
  // Actions
  setActiveDeck: (deckId: string) => void;
  setActiveSlide: (deckId: string, slideIndex: number) => void;
  registerDeck: (deck: DeckInfo) => void;
  unregisterDeck: (deckId: string) => void;
  updateDeckSlides: (deckId: string, slides: SlideInfo[]) => void;
  addSlide: (deckId: string, slide: SlideInfo) => void;
  removeSlide: (deckId: string, slideIndex: number) => void;
  
  // Getters
  getActiveDeck: () => DeckInfo | null;
  getActiveSlideIndex: (deckId: string) => number;
  getDeckSlideCount: (deckId: string) => number;
  getAllDecks: () => DeckInfo[];
}

export const useIterationDeckStore = create<GlobalDeckState>((set, get) => ({
  decks: new Map<string, DeckInfo>(),
  activeDeckId: null,

  setActiveDeck: (deckId: string) => {
    set((state) => {
      if (state.decks.has(deckId)) {
        return { activeDeckId: deckId };
      }
      return state;
    });
  },

  setActiveSlide: (deckId: string, slideIndex: number) => {
    set((state) => {
      const deck = state.decks.get(deckId);
      if (deck && slideIndex >= 0 && slideIndex < deck.slides.length) {
        const updatedDeck = { ...deck, activeSlideIndex: slideIndex };
        const newDecks = new Map(state.decks);
        newDecks.set(deckId, updatedDeck);
        return { decks: newDecks };
      }
      return state;
    });
  },

  registerDeck: (deck: DeckInfo) => {
    set((state) => {
      const newDecks = new Map(state.decks);
      newDecks.set(deck.id, deck);
      
      // If this is the first deck, make it active
      const activeDeckId = state.activeDeckId || deck.id;
      
      return { 
        decks: newDecks,
        activeDeckId
      };
    });
  },

  unregisterDeck: (deckId: string) => {
    set((state) => {
      const newDecks = new Map(state.decks);
      newDecks.delete(deckId);
      
      // If we're removing the active deck, select another one
      let activeDeckId: string | null = state.activeDeckId;
      if (activeDeckId === deckId) {
        const remainingDecks = Array.from(newDecks.keys());
        activeDeckId = remainingDecks.length > 0 ? remainingDecks[0]! : null;
      }
      
      return { 
        decks: newDecks,
        activeDeckId
      };
    });
  },

  updateDeckSlides: (deckId: string, slides: SlideInfo[]) => {
    set((state) => {
      const deck = state.decks.get(deckId);
      if (deck) {
        const updatedDeck = { 
          ...deck, 
          slides,
          // Ensure active slide index is still valid
          activeSlideIndex: Math.min(deck.activeSlideIndex, slides.length - 1)
        };
        const newDecks = new Map(state.decks);
        newDecks.set(deckId, updatedDeck);
        return { decks: newDecks };
      }
      return state;
    });
  },

  addSlide: (deckId: string, slide: SlideInfo) => {
    set((state) => {
      const deck = state.decks.get(deckId);
      if (deck) {
        const updatedDeck = { 
          ...deck, 
          slides: [...deck.slides, slide]
        };
        const newDecks = new Map(state.decks);
        newDecks.set(deckId, updatedDeck);
        return { decks: newDecks };
      }
      return state;
    });
  },

  removeSlide: (deckId: string, slideIndex: number) => {
    set((state) => {
      const deck = state.decks.get(deckId);
      if (deck && slideIndex >= 0 && slideIndex < deck.slides.length) {
        const newSlides = deck.slides.filter((_, index) => index !== slideIndex);
        const updatedDeck = { 
          ...deck, 
          slides: newSlides,
          // Adjust active slide index if necessary
          activeSlideIndex: slideIndex <= deck.activeSlideIndex 
            ? Math.max(0, deck.activeSlideIndex - 1)
            : deck.activeSlideIndex
        };
        const newDecks = new Map(state.decks);
        newDecks.set(deckId, updatedDeck);
        return { decks: newDecks };
      }
      return state;
    });
  },

  getActiveDeck: () => {
    const state = get();
    if (state.activeDeckId) {
      return state.decks.get(state.activeDeckId) || null;
    }
    return null;
  },

  getActiveSlideIndex: (deckId: string) => {
    const state = get();
    const deck = state.decks.get(deckId);
    return deck?.activeSlideIndex || 0;
  },

  getDeckSlideCount: (deckId: string) => {
    const state = get();
    const deck = state.decks.get(deckId);
    return deck?.slides.length || 0;
  },

  getAllDecks: () => {
    const state = get();
    return Array.from(state.decks.values());
  }
}));