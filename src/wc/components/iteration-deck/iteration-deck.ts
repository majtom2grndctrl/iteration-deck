/**
 * IterationDeck Lit Web Component
 * 
 * Main container component that wraps AI-generated UI variations with
 * intuitive controls for switching between them. Built for AI-first
 * prototyping workflows with slot-based architecture for universal compatibility.
 * 
 * Features:
 * - Slot-based children rendering for framework-agnostic usage
 * - Zustand store integration for state management
 * - Environment detection (production vs development modes)
 * - Automatic slide detection and registration
 * - Keyboard shortcut support via global toolbar
 * - Multi-deck support with automatic cleanup
 */

import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Import core types and utilities
import type { 
  SlideChangeEvent, 
  DeckRegistrationEvent 
} from '../../types/index.js';
import { 
  isDevelopment, 
  generateSlideId, 
  validateDeckId, 
  errorLog, 
  warnLog 
} from '../../utils/index.js';

// Import store integration
import { 
  subscribeToIterationStore, 
  getIterationStoreState, 
  type IterationStore 
} from '../../store/iteration-store.js';

// Import shared styles for Tailwind consistency
import { deckStyles } from '../../../../shared/styles.js';

// Import toolbar integration
import { ensureToolbarMounted, cleanupToolbarIfEmpty } from '../iteration-deck-toolbar';


/**
 * Internal interface for slide element data extracted from slots
 */
interface SlideElementData {
  id: string;
  label: string;
  element: Element;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

/**
 * IterationDeck Web Component
 * 
 * @element iteration-deck
 * @slot - Default slot for IterationDeckSlide elements
 * 
 * @fires slide-change - Fired when the active slide changes
 * @fires deck-registered - Fired when the deck is registered with the store
 * @fires deck-unregistered - Fired when the deck is unregistered from the store
 */
@customElement('iteration-deck')
export class IterationDeck extends LitElement {
  /**
   * Unique identifier for this iteration deck
   * Used for state management across the application
   */
  @property({ type: String, reflect: true })
  id!: string;

  /**
   * Display label for this deck in the toolbar dropdown
   * Falls back to the deck ID if not provided
   */
  @property({ type: String, reflect: false })
  label?: string;

  /**
   * Original AI prompt context for generation tracking
   * Used for stakeholder communication and iteration history
   */
  @property({ type: String, reflect: false })
  prompt?: string;

  /**
   * Additional context for stakeholder presentations
   * Design rationale, requirements, or other relevant information
   */
  @property({ type: String, reflect: false })
  description?: string;

  /**
   * Enable development features in production builds
   * Allows showing all slides and toolbar in production when set to true
   */
  @property({ type: Boolean, attribute: 'enable-in-production' })
  enableInProduction = false;

  /**
   * Current environment mode (automatically detected, can be overridden by enableInProduction)
   * @internal
   */
  @state()
  private _isProduction = !isDevelopment();

  /**
   * Currently active slide ID from the Zustand store
   * @internal
   */
  @state()
  private _activeSlideId = '';

  /**
   * Array of slide data extracted from slotted elements
   * @internal
   */
  @state()
  private _slides: SlideElementData[] = [];

  /**
   * Whether the deck has been successfully registered with the store
   * @internal
   */
  @state()
  private _isRegistered = false;

  /**
   * Store unsubscribe function
   * @internal
   */
  private _unsubscribeStore?: () => void;

  /**
   * Slot change observer for dynamic slide detection
   * @internal
   */
  private _slotObserver?: MutationObserver;


  /**
   * Component lifecycle: Initialize store subscription and register deck
   */
  connectedCallback(): void {
    super.connectedCallback();
    
    // Validate required properties
    if (!this.id) {
      errorLog('IterationDeck requires an id property');
      return;
    }

    if (!validateDeckId(this.id)) {
      errorLog(`Invalid deck ID format: ${this.id}`);
      return;
    }

    // Set up slot observation for dynamic slide detection
    this._setupSlotObserver();
    
    // Ensure global toolbar is mounted (development mode only)
    if (this._shouldActivate()) {
      ensureToolbarMounted();
    }
    
    // Try immediate detection for direct DOM manipulation (like in tests)
    this._detectSlidesAndRegister();
    
    // Defer store operations to avoid React render conflicts
    setTimeout(() => {
      this._subscribeToStore();
      this._detectSlidesAndRegister(); // Re-check after timeout for React cases
    }, 0);
  }

  /**
   * Component lifecycle: Clean up subscriptions and unregister deck
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    
    // Unsubscribe from store
    this._unsubscribeStore?.();
    
    // Stop observing slot changes
    this._slotObserver?.disconnect();
    
    // Unregister from store
    if (this._isRegistered) {
      const store = getIterationStoreState();
      store.removeDeck(this.id);
      
      // Fire unregistration event
      this.dispatchEvent(new CustomEvent('deck-unregistered', {
        detail: { deckId: this.id },
        bubbles: true,
        composed: true
      }));
    }
    
    // Clean up toolbar if no decks remain
    cleanupToolbarIfEmpty();
  }

  /**
   * Property change handler: Re-register deck when key properties change
   */
  updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    
    // If id, label, or slides changed, re-register the deck
    // Defer to avoid calling requestUpdate() during Lit's update cycle
    if (changedProperties.has('id') || changedProperties.has('label')) {
      setTimeout(() => {
        this._detectSlidesAndRegister();
      }, 0);
    }
  }

  /**
   * Subscribe to Zustand store changes
   * @internal
   */
  private _subscribeToStore(): void {
    this._unsubscribeStore = subscribeToIterationStore((state: IterationStore) => {
      // Use requestUpdate instead of direct state property updates to avoid timing conflicts
      const newActiveSlideId = state.activeDecks[this.id] || '';
      const previousSlideId = this._activeSlideId;
      
      // Update active slide if changed
      if (newActiveSlideId !== previousSlideId) {
        // Schedule the update for next tick to avoid render conflicts
        this.requestUpdate('_activeSlideId', previousSlideId);
        this._activeSlideId = newActiveSlideId;
        
        // Fire slide change event (only if both slides exist)
        if (previousSlideId && newActiveSlideId) {
          const slideIndex = this._slides.findIndex(slide => slide.id === newActiveSlideId);
          
          this.dispatchEvent(new CustomEvent('slide-change', {
            detail: {
              deckId: this.id,
              previousSlideId,
              currentSlideId: newActiveSlideId,
              slideIndex
            } as SlideChangeEvent,
            bubbles: true,
            composed: true
          }));
        }
      }
      
      // Update production mode if changed  
      const newIsProduction = state.isProduction;
      if (newIsProduction !== this._isProduction) {
        this.requestUpdate('_isProduction', this._isProduction);
        this._isProduction = newIsProduction;
      }
    });
  }

  /**
   * Set up MutationObserver to detect dynamically added/removed slides
   * @internal
   */
  private _setupSlotObserver(): void {
    this._slotObserver = new MutationObserver((mutations) => {
      let shouldRedetect = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          shouldRedetect = true;
        }
      });
      
      if (shouldRedetect) {
        this._detectSlidesAndRegister();
      }
    });
    
    this._slotObserver.observe(this, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Detect slides from slotted elements and register deck with store
   * @internal
   */
  private _detectSlidesAndRegister(): void {
    const slideElements = Array.from(this.querySelectorAll('iteration-deck-slide'));
    
    if (slideElements.length === 0) {
      warnLog(`No slides found for deck ${this.id}`);
      return;
    }

    // Extract slide data from elements and update state safely
    const newSlides = slideElements.map((element, index) => {
      const label = element.getAttribute('label') || `Slide ${index + 1}`;
      const slideId = element.getAttribute('id') || 
                     element.getAttribute('slide-id') ||
                     generateSlideId(this.id, label);
      
      // Set the ID back on the element if it was generated
      if (!element.getAttribute('id') && !element.getAttribute('slide-id')) {
        element.setAttribute('slide-id', slideId);
      }
      
      return {
        id: slideId,
        label,
        element,
        aiPrompt: element.getAttribute('ai-prompt') || undefined,
        notes: element.getAttribute('notes') || undefined,
        confidence: element.getAttribute('confidence') ? 
                   parseFloat(element.getAttribute('confidence')!) : undefined
      };
    });

    // Update slides state properly
    if (JSON.stringify(newSlides.map(s => s.id)) !== JSON.stringify(this._slides.map(s => s.id))) {
      this.requestUpdate('_slides', this._slides);
      this._slides = newSlides;
    }

    // Register with store
    this._registerWithStore();
  }

  /**
   * Register this deck with the Zustand store
   * @internal
   */
  private _registerWithStore(): void {
    if (this._slides.length === 0) {
      return;
    }

    const store = getIterationStoreState();
    const slideIds = this._slides.map(slide => slide.id);
    
    // Calculate if this deck should be interactive
    const isInteractive = this._shouldActivate();
    
    // Register deck with all slide IDs, label, and interactive state
    store.registerDeck(this.id, slideIds, this.label, isInteractive);
    
    // Get the active slide that was set during registration and update properties safely
    const activeSlideId = store.getActiveSlide(this.id) || slideIds[0];
    
    // Use requestUpdate to properly schedule the state changes
    if (activeSlideId !== this._activeSlideId) {
      this.requestUpdate('_activeSlideId', this._activeSlideId);
      this._activeSlideId = activeSlideId;
    }
    
    if (!this._isRegistered) {
      this.requestUpdate('_isRegistered', this._isRegistered);
      this._isRegistered = true;
    }

    // Fire registration event
    this.dispatchEvent(new CustomEvent('deck-registered', {
      detail: {
        deckId: this.id,
        label: this.label || this.id,
        slideCount: this._slides.length
      } as DeckRegistrationEvent,
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Get the currently active slide data
   * @internal
   */
  private _getActiveSlide(): SlideElementData | undefined {
    return this._slides.find(slide => slide.id === this._activeSlideId);
  }

  /**
   * Check if we should behave as development mode (natural or enabled for production)
   * @internal
   */
  private _shouldActivate(): boolean {
    return !this._isProduction || this.enableInProduction;
  }

  /**
   * Render method: Show active slide in production, all slides in development
   */
  render() {
    if (!this.id || this._slides.length === 0) {
      return html`<slot></slot>`;
    }

    // Use shared Tailwind styles for consistency
    const containerClasses = [
      deckStyles.container, // 'block relative'
      this._shouldActivate() ? 'development' : 'production',
      'animated'
    ].join(' ');

    // Simply render the default slot - the slide components will handle their own visibility
    return html`
      <div class="${containerClasses} min-h-[1px]">
        <div class="block min-h-inherit">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /**
   * Public API: Navigate to a specific slide
   */
  public navigateToSlide(slideId: string): boolean {
    const slide = this._slides.find(s => s.id === slideId);
    
    if (!slide) {
      warnLog(`Slide not found: ${slideId} in deck ${this.id}`);
      return false;
    }

    const store = getIterationStoreState();
    store.setActiveSlide(this.id, slideId);
    
    return true;
  }

  /**
   * Public API: Navigate to next slide
   */
  public navigateToNext(): boolean {
    // Re-detect slides if we don't have any yet
    if (this._slides.length === 0) {
      this._detectSlidesAndRegister();
    }
    
    if (this._slides.length <= 1) return false;
    
    const currentIndex = this._slides.findIndex(slide => slide.id === this._activeSlideId);
    const nextIndex = (currentIndex + 1) % this._slides.length;
    const nextSlideId = this._slides[nextIndex].id;
    
    return this.navigateToSlide(nextSlideId);
  }

  /**
   * Public API: Navigate to previous slide
   */
  public navigateToPrev(): boolean {
    // Re-detect slides if we don't have any yet
    if (this._slides.length === 0) {
      this._detectSlidesAndRegister();
    }
    
    if (this._slides.length <= 1) return false;
    
    const currentIndex = this._slides.findIndex(slide => slide.id === this._activeSlideId);
    const prevIndex = currentIndex <= 0 ? this._slides.length - 1 : currentIndex - 1;
    const prevSlideId = this._slides[prevIndex].id;
    
    return this.navigateToSlide(prevSlideId);
  }

  /**
   * Public API: Get current slide information
   */
  public getCurrentSlide(): SlideElementData | null {
    return this._getActiveSlide() || null;
  }

  /**
   * Public API: Get all slides information
   */
  public getAllSlides(): SlideElementData[] {
    return [...this._slides];
  }

  /**
   * Public API: Get deck metadata
   */
  public getDeckInfo() {
    return {
      id: this.id,
      label: this.label || this.id,
      prompt: this.prompt,
      description: this.description,
      slideCount: this._slides.length,
      activeSlideId: this._activeSlideId,
      isProduction: this._isProduction,
      enableInProduction: this.enableInProduction,
      isRegistered: this._isRegistered
    };
  }
}

/**
 * Type declaration for the custom element
 */
declare global {
  interface HTMLElementTagNameMap {
    'iteration-deck': IterationDeck;
  }
}