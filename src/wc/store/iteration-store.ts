/**
 * Simplified Iteration Deck Store
 * 
 * Basic state management for iteration decks and their active slides.
 */

import { isDevelopment } from '../utils/index.js';

/**
 * Slide metadata for store management
 */
export interface SlideMetadata {
  /** Unique slide ID */
  id: string;
  /** Human-readable slide label */
  label: string;
}

/**
 * Deck metadata for store management
 */
export interface DeckMetadata {
  /** All slide IDs in this deck */
  slideIds: string[];
  /** Slide metadata with labels */
  slides: SlideMetadata[];
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
  registerDeck: (deckId: string, slideIds: string[], label?: string, isInteractive?: boolean, slides?: SlideMetadata[]) => void;
  
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
  
  /** Runtime environment detection update */
  updateEnvironmentDetection?: () => void;
}

// Simple store implementation
class SimpleStore implements IterationStore {
  activeDecks: Record<string, string> = {};
  deckMetadata: Record<string, DeckMetadata> = {};
  selectedDeckId?: string;
  
  // For testing: allow overriding production mode
  private _testProductionModeOverride?: boolean;
  
  // Environment detection state - lazy initialization
  private _environmentDetected: boolean = false;
  private _cachedIsProduction: boolean = true; // Conservative default
  
  /**
   * Lazy environment detection - happens on first access
   */
  private _ensureEnvironmentDetected(): void {
    if (!this._environmentDetected && typeof window !== 'undefined') {
      this._cachedIsProduction = !isDevelopment();
      this._environmentDetected = true;
    }
  }
  
  /**
   * Dynamic production state check with lazy detection
   */
  get isProduction(): boolean {
    if (this._testProductionModeOverride !== undefined) {
      return this._testProductionModeOverride;
    }
    
    // Lazy detection on first access
    this._ensureEnvironmentDetected();
    return this._cachedIsProduction;
  }
  
  /**
   * Update environment detection at runtime (for backward compatibility)
   * @deprecated Use lazy detection instead
   */
  updateEnvironmentDetection(): void {
    // Force re-detection
    this._environmentDetected = false;
    this._ensureEnvironmentDetected();
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
    // Store initialized with lazy environment detection
  }
  
  private listeners: Set<(state: IterationStore) => void> = new Set();
  
  registerDeck(deckId: string, slideIds: string[], label?: string, isInteractive: boolean = true, slides?: SlideMetadata[]): void {
    // Create slide metadata if not provided
    const slideMetadata = slides || slideIds.map(id => ({ id, label: id }));
    
    // Store deck metadata
    this.deckMetadata[deckId] = {
      slideIds: [...slideIds],
      slides: slideMetadata,
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