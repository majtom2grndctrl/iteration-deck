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

import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Import core types and utilities
import type { 
  SlideChangeEvent, 
  DeckRegistrationEvent 
} from '../../core/types.js';
import { 
  isDevelopment, 
  generateSlideId, 
  validateDeckId, 
  debugLog, 
  errorLog, 
  warnLog 
} from '../../core/utilities.js';

// Import store integration
import { 
  subscribeToIterationStore, 
  getIterationStoreState, 
  type IterationStore 
} from '../../store/iteration-store.js';

// Import toolbar integration
import { ensureToolbarMounted, cleanupToolbarIfEmpty } from '../iteration-deck-toolbar';

// Import design tokens for type-safe styling
import {
  lightTheme,
  darkTheme,
  spacing,
  breakpoints
} from '../../tokens/index.js';

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
  @property({ type: String })
  label?: string;

  /**
   * Original AI prompt context for generation tracking
   * Used for stakeholder communication and iteration history
   */
  @property({ type: String })
  prompt?: string;

  /**
   * Additional context for stakeholder presentations
   * Design rationale, requirements, or other relevant information
   */
  @property({ type: String })
  description?: string;

  /**
   * Current environment mode (automatically detected)
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
   * ShadowDOM-encapsulated styles using Lit CSS tagged template literals
   * with design tokens for type-safe styling
   */
  static styles = [
    lightTheme,
    darkTheme,
    css`

    /* Base component styles */
    :host {
      display: block;
      position: relative;
      width: 100%;
      min-height: ${unsafeCSS(spacing.spacing8)}; /* 64px */
      background: transparent;
      border-radius: ${unsafeCSS(spacing.spacing3)};
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
      font-size: ${unsafeCSS(spacing.spacing2)}; /* 16px - using spacing for consistent sizing */
      line-height: 1.5;
      color: var(--color-text-primary);
      transition: all 0.2s ease;
      will-change: transform, opacity;
      transform: translateZ(0);
    }

    .iteration-deck-container {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .iteration-deck-content {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    /* Development mode styles */
    .development {
      position: relative;
      margin-bottom: ${unsafeCSS(spacing.spacing8)}; /* Space for toolbar */
    }

    .development::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: ${unsafeCSS(spacing.spacing00)} dashed var(--color-border-secondary);
      border-radius: inherit;
      opacity: 0.3;
      pointer-events: none;
      z-index: 0;
    }

    /* Production mode styles */
    .production {
      margin-bottom: 0;
    }

    .production::before {
      display: none;
    }

    /* Animation states */
    .animated {
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    /* Accessibility enhancements */
    :host(:focus-visible) {
      outline: ${unsafeCSS(spacing.spacing0)} solid var(--color-border-focus);
      outline-offset: ${unsafeCSS(spacing.spacing00)};
    }

    :host(:focus-within) {
      outline: ${unsafeCSS(spacing.spacing0)} solid var(--color-border-focus);
      outline-offset: ${unsafeCSS(spacing.spacing00)};
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      :host {
        border: ${unsafeCSS(spacing.spacing0)} solid var(--color-border-primary);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      :host {
        will-change: auto;
        transform: none;
        transition: none;
      }
      
      .animated {
        transition: none;
      }
    }

    /* Mobile-first responsive design */
    /* Base styles (mobile) */
    :host {
      padding: ${unsafeCSS(spacing.spacing2)};
      min-height: ${unsafeCSS(spacing.spacing7)}; /* 56px */
    }

    /* Tablet and larger (768px+) */
    @media (min-width: ${unsafeCSS(breakpoints.md)}) {
      :host {
        padding: ${unsafeCSS(spacing.spacing3)};
        min-height: ${unsafeCSS(spacing.spacing8)}; /* 64px */
      }
    }

    /* Desktop and larger (1024px+) */
    @media (min-width: ${unsafeCSS(breakpoints.lg)}) {
      :host {
        padding: ${unsafeCSS(spacing.spacing4)};
      }
    }

    /* Loading state */
    .loading {
      position: relative;
      overflow: hidden;
    }

    .loading::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      animation: slideInRight 1.5s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .loading::after {
        animation: none;
        background: var(--color-bg-glass);
        opacity: 0.5;
      }
    }

    /* Error state */
    .error {
      border: ${unsafeCSS(spacing.spacing0)} solid var(--color-border-error);
      background-color: var(--color-bg-error);
    }

    .error::before {
      border-color: var(--color-border-error) !important;
      border-style: solid;
      opacity: 0.8;
    }

    /* Empty state */
    .empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: ${unsafeCSS(spacing.spacing8)}; /* 64px */
      color: var(--color-text-tertiary);
      font-style: italic;
    }

    .empty::before {
      content: 'No slides available';
      font-size: ${unsafeCSS(spacing.spacing1)}; /* 8px - small text */
    }

    /* RTL support */
    :host([dir="rtl"]) {
      direction: rtl;
    }

    /* Container queries removed for broader browser support */

    /* Keyframes for loading animation */
    @keyframes slideInRight {
      from {
        left: -100%;
      }
      to {
        left: 100%;
      }
    }
  `,
  ];

  /**
   * Component lifecycle: Initialize store subscription and register deck
   */
  connectedCallback(): void {
    super.connectedCallback();
    
    debugLog(`IterationDeck connecting: ${this.id}`);
    
    // Validate required properties
    if (!this.id) {
      errorLog('IterationDeck requires an id property');
      return;
    }

    if (!validateDeckId(this.id)) {
      errorLog(`Invalid deck ID format: ${this.id}`);
      return;
    }

    // Subscribe to store changes
    this._subscribeToStore();
    
    // Set up slot observation for dynamic slide detection
    this._setupSlotObserver();
    
    // Ensure global toolbar is mounted (development mode only)
    ensureToolbarMounted();
    
    // Initial slide detection and registration - wait for slides to connect
    this.updateComplete.then(() => {
      // Use a small delay to ensure all child slides are connected
      setTimeout(() => {
        this._detectSlidesAndRegister();
      }, 100);
    });
  }

  /**
   * Component lifecycle: Clean up subscriptions and unregister deck
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    
    debugLog(`IterationDeck disconnecting: ${this.id}`);
    
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
    if (changedProperties.has('id') || changedProperties.has('label')) {
      this._detectSlidesAndRegister();
    }
  }

  /**
   * Subscribe to Zustand store changes
   * @internal
   */
  private _subscribeToStore(): void {
    this._unsubscribeStore = subscribeToIterationStore((state: IterationStore) => {
      const newActiveSlideId = state.activeDecks[this.id] || '';
      
      if (newActiveSlideId !== this._activeSlideId) {
        const previousSlideId = this._activeSlideId;
        this._activeSlideId = newActiveSlideId;
        
        debugLog(`Slide changed for deck ${this.id}: ${previousSlideId} -> ${newActiveSlideId}`);
        
        // Fire slide change event
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
        
        // Trigger re-render
        this.requestUpdate();
      }
      
      // Update production mode if it changed
      const newIsProduction = state.isProduction;
      if (newIsProduction !== this._isProduction) {
        this._isProduction = newIsProduction;
        debugLog(`Environment mode changed for deck ${this.id}: production=${newIsProduction}`);
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
        debugLog(`Slot changes detected for deck ${this.id}, re-detecting slides`);
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

    // Extract slide data from elements
    this._slides = slideElements.map((element, index) => {
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

    debugLog(`Detected ${this._slides.length} slides for deck ${this.id}`, 
             this._slides.map(s => ({ id: s.id, label: s.label })));

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
    
    // Register deck with all slide IDs and label
    store.registerDeck(this.id, slideIds, this.label);
    
    // Get the active slide that was set during registration
    this._activeSlideId = store.getActiveSlide(this.id) || slideIds[0];
    this._isRegistered = true;

    debugLog(`Registered deck ${this.id} with store`, {
      slides: slideIds,
      activeSlide: this._activeSlideId,
      label: this.label
    });

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
   * Render method: Show active slide in production, all slides in development
   */
  render() {
    if (!this.id || this._slides.length === 0) {
      return html`<slot></slot>`;
    }

    // Determine container classes based on mode
    const containerClasses = [
      'iteration-deck-container',
      this._isProduction ? 'production' : 'development',
      'animated'
    ].join(' ');

    // Simply render the default slot - the slide components will handle their own visibility
    return html`
      <div class="${containerClasses}">
        <div class="iteration-deck-content">
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
    
    debugLog(`Navigated to slide ${slideId} in deck ${this.id}`);
    return true;
  }

  /**
   * Public API: Navigate to next slide
   */
  public navigateToNext(): boolean {
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