// Simple vanilla store implementation to avoid React dependencies

export interface DeckInfo {
  id: string;
  label: string | undefined;
  prompt: string | undefined;
  description: string | undefined;
  slides: SlideInfo[];
  slideCount: number;
  activeSlideIndex: number;
}

export interface SlideInfo {
  label: string;
  aiPrompt: string | undefined;
  notes: string | undefined;
  confidence: number | undefined;
}

export interface GlobalDeckState {
  decks: Map<string, DeckInfo>;
  activeDeckId: string | null;
  activeSlideIndex: number;
  
  // Actions
  setActiveDeck: (deckId: string) => void;
  setActiveSlide: (slideIndex: number) => void;
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

// Simple store implementation without external dependencies
class IterationDeckStore {
  private state: GlobalDeckState;
  private listeners: Array<(state: GlobalDeckState) => void> = [];

  constructor() {
    this.state = {
      decks: new Map<string, DeckInfo>(),
      activeDeckId: null,
      activeSlideIndex: 0,
      setActiveDeck: this.setActiveDeck.bind(this),
      setActiveSlide: this.setActiveSlide.bind(this),
      registerDeck: this.registerDeck.bind(this),
      unregisterDeck: this.unregisterDeck.bind(this),
      updateDeckSlides: this.updateDeckSlides.bind(this),
      addSlide: this.addSlide.bind(this),
      removeSlide: this.removeSlide.bind(this),
      getActiveDeck: this.getActiveDeck.bind(this),
      getActiveSlideIndex: this.getActiveSlideIndex.bind(this),
      getDeckSlideCount: this.getDeckSlideCount.bind(this),
      getAllDecks: this.getAllDecks.bind(this)
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener: (state: GlobalDeckState) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  private updateState(updates: Partial<GlobalDeckState>) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  setActiveDeck(deckId: string) {
    if (this.state.decks.has(deckId)) {
      this.updateState({ activeDeckId: deckId });
    }
  }

  setActiveSlide(slideIndex: number) {
    if (!this.state.activeDeckId) return;
    
    const deck = this.state.decks.get(this.state.activeDeckId);
    if (deck && slideIndex >= 0 && slideIndex < deck.slides.length) {
      const updatedDeck = { ...deck, activeSlideIndex: slideIndex };
      const newDecks = new Map(this.state.decks);
      newDecks.set(this.state.activeDeckId, updatedDeck);
      this.updateState({ 
        decks: newDecks,
        activeSlideIndex: slideIndex
      });
    }
  }

  registerDeck(deck: DeckInfo) {
    const deckWithCount = { ...deck, slideCount: deck.slides.length };
    const newDecks = new Map(this.state.decks);
    newDecks.set(deck.id, deckWithCount);
    
    // If this is the first deck, make it active
    const activeDeckId = this.state.activeDeckId || deck.id;
    const activeSlideIndex = activeDeckId === deck.id ? deck.activeSlideIndex : this.state.activeSlideIndex;
    
    this.updateState({ 
      decks: newDecks,
      activeDeckId,
      activeSlideIndex
    });
  }

  unregisterDeck(deckId: string) {
    const newDecks = new Map(this.state.decks);
    newDecks.delete(deckId);
    
    // If we're removing the active deck, select another one
    let activeDeckId: string | null = this.state.activeDeckId;
    if (activeDeckId === deckId) {
      const remainingDecks = Array.from(newDecks.keys());
      activeDeckId = remainingDecks.length > 0 ? remainingDecks[0]! : null;
    }
    
    this.updateState({ 
      decks: newDecks,
      activeDeckId
    });
  }

  updateDeckSlides(deckId: string, slides: SlideInfo[]) {
    const deck = this.state.decks.get(deckId);
    if (deck) {
      const updatedDeck = { 
        ...deck, 
        slides,
        slideCount: slides.length,
        // Ensure active slide index is still valid
        activeSlideIndex: Math.min(deck.activeSlideIndex, slides.length - 1)
      };
      const newDecks = new Map(this.state.decks);
      newDecks.set(deckId, updatedDeck);
      
      // Update global active slide index if this is the active deck
      const activeSlideIndex = this.state.activeDeckId === deckId 
        ? updatedDeck.activeSlideIndex 
        : this.state.activeSlideIndex;
      
      this.updateState({ 
        decks: newDecks,
        activeSlideIndex
      });
    }
  }

  addSlide(deckId: string, slide: SlideInfo) {
    const deck = this.state.decks.get(deckId);
    if (deck) {
      const newSlides = [...deck.slides, slide];
      const updatedDeck = { 
        ...deck, 
        slides: newSlides,
        slideCount: newSlides.length
      };
      const newDecks = new Map(this.state.decks);
      newDecks.set(deckId, updatedDeck);
      this.updateState({ decks: newDecks });
    }
  }

  removeSlide(deckId: string, slideIndex: number) {
    const deck = this.state.decks.get(deckId);
    if (deck && slideIndex >= 0 && slideIndex < deck.slides.length) {
      const newSlides = deck.slides.filter((_, index) => index !== slideIndex);
      const newActiveSlideIndex = slideIndex <= deck.activeSlideIndex 
        ? Math.max(0, deck.activeSlideIndex - 1)
        : deck.activeSlideIndex;
      
      const updatedDeck = { 
        ...deck, 
        slides: newSlides,
        slideCount: newSlides.length,
        activeSlideIndex: newActiveSlideIndex
      };
      const newDecks = new Map(this.state.decks);
      newDecks.set(deckId, updatedDeck);
      
      // Update global active slide index if this is the active deck
      const globalActiveSlideIndex = this.state.activeDeckId === deckId 
        ? newActiveSlideIndex 
        : this.state.activeSlideIndex;
      
      this.updateState({ 
        decks: newDecks,
        activeSlideIndex: globalActiveSlideIndex
      });
    }
  }

  getActiveDeck(): DeckInfo | null {
    if (this.state.activeDeckId) {
      return this.state.decks.get(this.state.activeDeckId) || null;
    }
    return null;
  }

  getActiveSlideIndex(deckId: string): number {
    const deck = this.state.decks.get(deckId);
    return deck?.activeSlideIndex || 0;
  }

  getDeckSlideCount(deckId: string): number {
    const deck = this.state.decks.get(deckId);
    return deck?.slides.length || 0;
  }

  getAllDecks(): DeckInfo[] {
    return Array.from(this.state.decks.values());
  }
}

export const useIterationDeckStore = new IterationDeckStore();