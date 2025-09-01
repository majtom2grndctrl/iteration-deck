/**
 * Simplified Iteration Deck Store
 * 
 * Basic state management for iteration decks and their active slides.
 */

import { isDevelopment } from '../core/utilities.js';

/**
 * Deck metadata for store management
 */
export interface DeckMetadata {
  /** All slide IDs in this deck */
  slideIds: string[];
  /** Currently active slide ID */
  activeSlideId: string;
  /** Optional deck label */
  label?: string;
  /** Whether this deck should show navigation controls */
  isInteractive: boolean;
}

/**
 * Iteration Deck Store Interface
 */
export interface IterationStore {
  /** Record mapping deck IDs to their currently active slide IDs */
  activeDecks: Record<string, string>;
  
  /** Record mapping deck IDs to their metadata (slide IDs, labels, etc.) */
  deckMetadata: Record<string, DeckMetadata>;
  
  /** Sets the active slide for a specific deck */
  setActiveSlide: (deckId: string, slideId: string) => void;
  
  /** Registers a deck with all its slides */
  registerDeck: (deckId: string, slideIds: string[], label?: string, isInteractive?: boolean) => void;
  
  /** Removes a deck from the store */
  removeDeck: (deckId: string) => void;
  
  /** Gets the active slide ID for a specific deck */
  getActiveSlide: (deckId: string) => string | undefined;
  
  /** Gets all slide IDs for a specific deck */
  getDeckSlides: (deckId: string) => string[];
  
  /** Gets deck metadata (slides, active slide, label) */
  getDeckMetadata: (deckId: string) => DeckMetadata | undefined;
  
  /** Gets all registered deck IDs */
  getRegisteredDecks: () => string[];
  
  /** Gets only interactive deck IDs (for toolbar dropdown) */
  getInteractiveDecks: () => string[];
  
  /** Environment flag - true in production builds, false in development */
  isProduction: boolean;
  
  /** Currently selected deck for toolbar navigation */
  selectedDeckId?: string;
  
  /** Sets the selected deck for toolbar navigation */
  setSelectedDeck: (deckId: string) => void;
  
  /** For testing: Override production mode */
  _setProductionModeForTesting?: (isProduction: boolean) => void;
}

// Simple store implementation
class SimpleStore implements IterationStore {
  activeDecks: Record<string, string> = {};
  deckMetadata: Record<string, DeckMetadata> = {};
  selectedDeckId?: string;
  
  // For testing: allow overriding production mode
  private _testProductionModeOverride?: boolean;
  
  /**
   * Dynamic production state check to support test mocking
   */
  get isProduction(): boolean {
    if (this._testProductionModeOverride !== undefined) {
      return this._testProductionModeOverride;
    }
    return !isDevelopment();
  }
  
  /**
   * For testing: Override production mode
   */
  _setProductionModeForTesting(isProduction: boolean): void {
    this._testProductionModeOverride = isProduction;
    // Notify listeners of the change
    this.notifyListeners();
  }
  
  constructor() {
    // Store initialized
  }
  
  private listeners: Set<(state: IterationStore) => void> = new Set();
  
  registerDeck(deckId: string, slideIds: string[], label?: string, isInteractive: boolean = true): void {
    // Store deck metadata
    this.deckMetadata[deckId] = {
      slideIds: [...slideIds],
      activeSlideId: slideIds[0] || '',
      label,
      isInteractive
    };
    
    // Set active slide (use existing if valid, otherwise first slide)
    const currentActive = this.activeDecks[deckId];
    const validActiveSlide = slideIds.includes(currentActive) ? currentActive : slideIds[0];
    this.activeDecks[deckId] = validActiveSlide;
    
    // Update metadata with actual active slide
    this.deckMetadata[deckId].activeSlideId = validActiveSlide;
    
    this.notifyListeners();
  }
  
  setActiveSlide(deckId: string, slideId: string): void {
    this.activeDecks[deckId] = slideId;
    
    // Update metadata if it exists
    if (this.deckMetadata[deckId]) {
      this.deckMetadata[deckId].activeSlideId = slideId;
    }
    
    this.notifyListeners();
  }
  
  removeDeck(deckId: string): void {
    delete this.activeDecks[deckId];
    delete this.deckMetadata[deckId];
    
    if (this.selectedDeckId === deckId) {
      const remainingDecks = this.getRegisteredDecks();
      this.selectedDeckId = remainingDecks.length > 0 ? remainingDecks[0] : undefined;
    }
    this.notifyListeners();
  }
  
  getActiveSlide(deckId: string): string | undefined {
    return this.activeDecks[deckId];
  }
  
  getDeckSlides(deckId: string): string[] {
    return this.deckMetadata[deckId]?.slideIds || [];
  }
  
  getDeckMetadata(deckId: string): DeckMetadata | undefined {
    return this.deckMetadata[deckId];
  }
  
  getRegisteredDecks(): string[] {
    return Object.keys(this.activeDecks);
  }
  
  getInteractiveDecks(): string[] {
    return Object.keys(this.deckMetadata).filter(deckId => 
      this.deckMetadata[deckId]?.isInteractive === true
    );
  }
  
  setSelectedDeck(deckId: string): void {
    this.selectedDeckId = deckId;
    this.notifyListeners();
  }
  
  // Subscription management
  subscribe(listener: (state: IterationStore) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this));
  }
}

// Global store instance
const store = new SimpleStore();

/**
 * Subscribe to store changes
 */
export const subscribeToIterationStore = (
  listener: (state: IterationStore) => void
): (() => void) => {
  return store.subscribe(listener);
};

/**
 * Get current store state
 */
export const getIterationStoreState = (): IterationStore => {
  return store;
};

/**
 * Check if we're in development mode
 */
export const isDevelopmentMode = (): boolean => {
  return !store.isProduction;
};