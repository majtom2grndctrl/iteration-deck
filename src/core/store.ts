/**
 * Vanilla JavaScript state management for Iteration Deck
 * Uses native custom events for reactivity across web components
 */

export interface DeckData {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  slides: SlideData[];
  activeSlideIndex: number;
  element?: Element;
}

export interface SlideData {
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

class IterationDeckStore {
  private decks = new Map<string, DeckData>();
  private activeDeckId: string | null = null;
  private globalToolbarVisible = false;

  registerDeck(deck: DeckData) {
    this.decks.set(deck.id, deck);
    
    // Set as active if first deck or no active deck
    if (!this.activeDeckId || this.decks.size === 1) {
      this.activeDeckId = deck.id;
    }
    
    this.globalToolbarVisible = this.decks.size > 0;
    
    this.dispatch('deck-registered', { 
      deck, 
      activeDeckId: this.activeDeckId,
      globalToolbarVisible: this.globalToolbarVisible 
    });
  }

  unregisterDeck(deckId: string) {
    this.decks.delete(deckId);
    
    // Update active deck if it was removed
    if (this.activeDeckId === deckId) {
      const remainingDecks = Array.from(this.decks.keys());
      this.activeDeckId = remainingDecks.length > 0 ? remainingDecks[0] : null;
    }
    
    this.globalToolbarVisible = this.decks.size > 0;
    
    this.dispatch('deck-unregistered', { 
      deckId, 
      activeDeckId: this.activeDeckId,
      globalToolbarVisible: this.globalToolbarVisible 
    });
  }

  setActiveSlideIndex(deckId: string, index: number) {
    const deck = this.decks.get(deckId);
    if (!deck) return;
    
    const clampedIndex = Math.max(0, Math.min(index, deck.slides.length - 1));
    deck.activeSlideIndex = clampedIndex;
    
    this.dispatch('slide-changed', { deckId, slideIndex: clampedIndex });
  }

  setActiveDeck(deckId: string | null) {
    if (deckId && !this.decks.has(deckId)) return;
    
    this.activeDeckId = deckId;
    this.dispatch('active-deck-changed', { activeDeckId: deckId });
  }

  nextSlide() {
    if (!this.activeDeckId) return;
    
    const deck = this.decks.get(this.activeDeckId);
    if (!deck) return;
    
    const nextIndex = (deck.activeSlideIndex + 1) % deck.slides.length;
    this.setActiveSlideIndex(this.activeDeckId, nextIndex);
  }

  previousSlide() {
    if (!this.activeDeckId) return;
    
    const deck = this.decks.get(this.activeDeckId);
    if (!deck) return;
    
    const prevIndex = deck.activeSlideIndex === 0 
      ? deck.slides.length - 1 
      : deck.activeSlideIndex - 1;
    this.setActiveSlideIndex(this.activeDeckId, prevIndex);
  }

  // Getters
  getDeck(deckId: string): DeckData | undefined {
    return this.decks.get(deckId);
  }

  getAllDecks(): DeckData[] {
    return Array.from(this.decks.values());
  }

  getActiveDeckId(): string | null {
    return this.activeDeckId;
  }

  getActiveDeck(): DeckData | null {
    return this.activeDeckId ? this.decks.get(this.activeDeckId) || null : null;
  }

  isGlobalToolbarVisible(): boolean {
    return this.globalToolbarVisible;
  }

  private dispatch(eventName: string, data: any) {
    window.dispatchEvent(
      new CustomEvent(`iteration-deck:${eventName}`, { 
        detail: data 
      })
    );
  }
}

// Global singleton store
let storeInstance: IterationDeckStore | null = null;

export function getIterationDeckStore(): IterationDeckStore {
  if (!storeInstance) {
    storeInstance = new IterationDeckStore();
  }
  return storeInstance;
}

