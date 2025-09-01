/**
 * IterationDeckSlide - Lit web component for individual slides in an iteration deck
 * 
 * Individual slide wrapper component that represents AI-generated UI variations.
 * Renders slot content when active, hides when inactive based on parent deck state.
 * Fully integrated with Zustand store for cross-component reactivity.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state, queryAssignedElements } from 'lit/decorators.js';
import type { IterationDeckSlideProps } from '../../core/types.js';
import { 
  subscribeToIterationStore, 
  getIterationStoreState,
  type IterationStore 
} from '../../store/iteration-store.js';
import { 
  generateSlideId, 
  errorLog 
} from '../../core/utilities.js';

/**
 * Custom element for individual iteration deck slides
 * 
 * Features:
 * - Slot-based content rendering for maximum flexibility
 * - Automatic visibility management based on parent deck state
 * - AI metadata support (prompts, notes, confidence scores)
 * - Smooth transitions between active/inactive states
 * - Full accessibility support with ARIA attributes
 * - TypeScript strict mode compliance
 */
@customElement('iteration-deck-slide')
export class IterationDeckSlide extends LitElement implements IterationDeckSlideProps {
  
  /**
   * ShadowDOM-encapsulated styles using Lit CSS tagged template literals
   * with design tokens for consistent styling and theme support
   */
  static styles = css`
    :host {
      display: block;
    }
    
    .slide-container {
      display: block;
      min-height: inherit;
    }
    
    .slide-container.active {
      display: block;
    }
    
    /* Hide inactive slides properly once deck IDs are resolved */
    .slide-container.inactive {
      display: none;
    }
    
    .slide-content {
      display: block;
      min-height: inherit;
    }
    
  `;

  // Public properties from IterationDeckSlideProps interface
  @property({ type: String, reflect: true })
  label!: string;

  @property({ type: String, attribute: 'ai-prompt', reflect: false })
  aiPrompt?: string;

  @property({ type: String, reflect: false })
  notes?: string;

  @property({ type: Number, reflect: false })
  confidence?: number;

  @property({ type: String, reflect: true, attribute: 'slide-id' })
  slideId?: string;

  // Internal state
  @state()
  private isActive = false;

  @state()
  private deckId: string | null = null;

  @state()
  private _internalSlideId: string = '';

  @state()
  private isDevelopment = false;

  @state()
  private parentEnableInProduction = false;

  @state()
  private isInitializing = true;

  // Lit-specific slot content query (TypeScript-friendly)
  @queryAssignedElements()
  private _slottedElements!: HTMLElement[];

  // Store subscription cleanup function
  private unsubscribeStore?: () => void;

  /**
   * Generate or use provided slide ID on first update
   */
  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    
    // Validate confidence score
    if (this.confidence !== undefined && (this.confidence < 0 || this.confidence > 1)) {
      errorLog(`Invalid confidence score for slide "${this.label}": ${this.confidence}. Must be between 0 and 1.`);
      this.confidence = undefined;
    }
  }

  /**
   * Lifecycle: Setup basic properties and defer store setup
   */
  override connectedCallback() {
    super.connectedCallback();
    
    // Get initial store state (no subscriptions yet)
    const storeState = getIterationStoreState();
    this.isDevelopment = !storeState.isProduction;
    
    // Find parent deck element
    this.findParentDeck();
    
    // Generate internal slide ID immediately with available information
    if (!this._internalSlideId) {
      this._internalSlideId = this.slideId || 
                             this.getAttribute('slide-id') ||
                             generateSlideId(this.deckId || 'unknown', this.label || 'slide');
    }
    
    // Try immediate initialization if deck is found
    if (this.deckId) {
      this.subscribeToStore();
      this.updateActiveState();
      this.isInitializing = false;
    } else {
      // If we couldn't find the parent deck, try again after a short delay
      // This handles cases where React hasn't finished rendering the parent yet
      setTimeout(() => {
        this.findParentDeck();
        // Regenerate slide ID with proper deck context
        if (this.deckId) {
          this._internalSlideId = this.slideId || 
                                 this.getAttribute('slide-id') ||
                                 generateSlideId(this.deckId, this.label || 'slide');
          
          // Now initialize properly
          this.subscribeToStore();
          this.updateActiveState();
          this.isInitializing = false;
          
          // Force a re-render to update the visual state
          this.requestUpdate();
        }
      }, 10);
    }
    
    // Always check again after a short delay for enable-in-production updates
    // since attributes might be set after element creation
    setTimeout(() => {
      this.findParentDeck(); // Re-check parent for enable-in-production
      if (!this.unsubscribeStore && this.deckId) {
        // If we haven't subscribed yet and now have a deck, initialize
        this.subscribeToStore();
        this.updateActiveState();
        this.isInitializing = false;
        this.requestUpdate();
      }
    }, 10);
  }

  /**
   * Lifecycle: Cleanup store subscription
   */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeStore?.();
  }

  /**
   * Find the parent iteration-deck element
   */
  private findParentDeck() {
    let parent = this.parentElement;
    
    while (parent && parent.tagName !== 'ITERATION-DECK') {
      parent = parent.parentElement;
    }
    
    if (parent) {
      this.deckId = parent.getAttribute('id');
      // Check if parent deck has development features enabled in production
      this.parentEnableInProduction = parent.hasAttribute('enable-in-production');
    } else {
      errorLog(`IterationDeckSlide "${this.label}" is not inside an iteration-deck element`);
    }
  }

  /**
   * Check if we should behave as development mode (natural or enabled in production by parent)
   */
  private shouldActivate(): boolean {
    return this.isDevelopment || this.parentEnableInProduction;
  }

  /**
   * Subscribe to Zustand store for active state changes
   */
  private subscribeToStore() {
    this.unsubscribeStore = subscribeToIterationStore((state: IterationStore) => {
      const newIsDevelopment = !state.isProduction;
      
      // Update development mode if changed
      if (newIsDevelopment !== this.isDevelopment) {
        this.isDevelopment = newIsDevelopment;
        // Force a re-render when development mode changes to update cursor styles
        this.requestUpdate();
      }
      
      // Update active state based on store changes
      this.updateActiveState(state);
      
      // Lit will automatically re-render due to @state() property changes
    });
  }

  /**
   * Update active state based on store with idiomatic Lit patterns
   */
  private updateActiveState(storeState?: IterationStore) {
    if (!this.deckId) return;
    
    const state = storeState || getIterationStoreState();
    const activeSlideId = state.activeDecks[this.deckId];
    const newIsActive = activeSlideId === this._internalSlideId;
    
    // If no active slide is set yet, treat first slide as active to prevent zero height
    const isFirstSlide = !activeSlideId && this.parentElement && 
                         this.parentElement.querySelector('iteration-deck-slide') === this;
    
    const shouldBeActive = newIsActive || !!isFirstSlide;
    
    
    // Only update if state actually changed
    if (shouldBeActive !== this.isActive) {
      this.isActive = shouldBeActive;
      
      // Update ARIA attributes for accessibility
      this.setAttribute('aria-hidden', this.isActive ? 'false' : 'true');
      this.setAttribute('role', 'tabpanel');
      
      // Lit automatically re-renders when @state() properties change
      this.requestUpdate(); // Force a re-render to ensure visual update
    }
  }


  /**
   * Render the slide content with metadata overlay in development
   */
  override render() {
    const containerClasses = [
      'slide-container',
      this.isActive ? 'active' : 'inactive',
      this.isInitializing ? 'initializing' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${containerClasses}">
        <div class="slide-content">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

  /**
   * Handle slot content changes
   */
  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const slottedElements = slot.assignedElements();

    // If we have slotted content and we're the first slide, make sure we're active
    if (slottedElements.length > 0 && this.deckId && !this.isActive) {
      const store = getIterationStoreState();
      const activeSlide = store.getActiveSlide(this.deckId);
      
      // If no slide is active yet, activate this one
      if (!activeSlide) {
        store.setActiveSlide(this.deckId, this._internalSlideId);
      }
    }
  }

  /**
   * Programmatic API: Activate this slide
   */
  public activate() {
    if (!this.deckId) {
      errorLog('Cannot activate slide: no parent deck found');
      return;
    }
    
    const store = getIterationStoreState();
    store.setActiveSlide(this.deckId, this._internalSlideId);
  }

  /**
   * Programmatic API: Check if this slide is currently active
   */
  public isActiveSlide(): boolean {
    return this.isActive;
  }

  /**
   * Programmatic API: Get slide metadata
   */
  public getSlideData() {
    return {
      id: this._internalSlideId,
      label: this.label,
      aiPrompt: this.aiPrompt,
      notes: this.notes,
      confidence: this.confidence,
      isActive: this.isActive,
      deckId: this.deckId,
      isDevelopment: this.isDevelopment,
      parentEnableInProduction: this.parentEnableInProduction,
    };
  }

  /**
   * Programmatic API: Get slotted content elements (Lit + TypeScript pattern)
   */
  public getSlottedElements(): HTMLElement[] {
    return this._slottedElements;
  }

  /**
   * Programmatic API: Get primary slotted content element for highlighting
   */
  public getPrimarySlottedElement(): HTMLElement | null {
    return this._slottedElements?.[0] || null;
  }

  /**
   * Custom event dispatching for parent deck communication
   */
  private dispatchSlideEvent(type: string, detail: any) {
    const event = new CustomEvent(`iteration-slide-${type}`, {
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Handle click events in development mode for manual slide switching
   */
  private handleSlideClick() {
    if (this.shouldActivate() && !this.isActive) {
      this.activate();
      this.dispatchSlideEvent('activated', this.getSlideData());
    }
  }

  /**
   * Updated render with click handler for development mode
   */
  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    // Set cursor and click behavior based on development mode
    if (this.shouldActivate()) {
      // In development mode, inactive slides are clickable
      this.style.cursor = this.isActive ? 'default' : 'pointer';
      this.onclick = () => this.handleSlideClick();
    } else {
      // In production mode, no interactions
      this.style.cursor = 'default';
      this.onclick = null;
    }
  }
}

// Type-only export for TypeScript consumers
export type { IterationDeckSlideProps };

// Re-export utilities for convenience
export { generateSlideId } from '../../core/utilities.js';

declare global {
  interface HTMLElementTagNameMap {
    'iteration-deck-slide': IterationDeckSlide;
  }
}