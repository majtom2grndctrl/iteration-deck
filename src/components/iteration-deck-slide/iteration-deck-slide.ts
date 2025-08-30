/**
 * IterationDeckSlide - Lit web component for individual slides in an iteration deck
 * 
 * Individual slide wrapper component that represents AI-generated UI variations.
 * Renders slot content when active, hides when inactive based on parent deck state.
 * Fully integrated with Zustand store for cross-component reactivity.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { IterationDeckSlideProps } from '../../core/types.js';
import { 
  subscribeToIterationStore, 
  getIterationStoreState,
  type IterationStore 
} from '../../store/iteration-store.js';
import { 
  generateSlideId, 
  debugLog, 
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
    }
    
    .slide-container.active {
      display: block;
    }
    
    .slide-container.inactive {
      display: none;
    }
    
    .slide-content {
      display: block;
    }
    
    :host([aria-hidden="true"]) {
      display: none;
    }
  `;

  // Public properties from IterationDeckSlideProps interface
  @property({ type: String, reflect: true })
  label!: string;

  @property({ type: String, attribute: 'ai-prompt' })
  aiPrompt?: string;

  @property({ type: String })
  notes?: string;

  @property({ type: Number })
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
   * Lifecycle: Setup store subscription and register with parent deck
   */
  override connectedCallback() {
    super.connectedCallback();
    
    // Get initial store state
    const storeState = getIterationStoreState();
    this.isDevelopment = !storeState.isProduction;
    
    // Find parent deck element
    this.findParentDeck();
    
    // Generate internal slide ID now that we have deck context
    if (!this._internalSlideId) {
      this._internalSlideId = this.slideId || 
                             this.getAttribute('slide-id') ||
                             generateSlideId(this.deckId || 'unknown', this.label || 'slide');
    }
    
    // Subscribe to store changes
    this.subscribeToStore();
    
    // Initial active state check
    this.updateActiveState();
    
    debugLog(`IterationDeckSlide connected: ${this.label} (ID: ${this._internalSlideId})`);
  }

  /**
   * Lifecycle: Cleanup store subscription
   */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeStore?.();
    debugLog(`IterationDeckSlide disconnected: ${this.label}`);
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
      debugLog(`Found parent deck: ${this.deckId} for slide: ${this.label}`);
    } else {
      errorLog(`IterationDeckSlide "${this.label}" is not inside an iteration-deck element`);
    }
  }

  /**
   * Subscribe to Zustand store for active state changes
   */
  private subscribeToStore() {
    this.unsubscribeStore = subscribeToIterationStore((state: IterationStore) => {
      this.isDevelopment = !state.isProduction;
      this.updateActiveState(state);
    });
  }

  /**
   * Update active state based on store
   */
  private updateActiveState(storeState?: IterationStore) {
    if (!this.deckId) return;
    
    const state = storeState || getIterationStoreState();
    const activeSlideId = state.activeDecks[this.deckId];
    const wasActive = this.isActive;
    this.isActive = activeSlideId === this._internalSlideId;
    
    // Update ARIA attributes for accessibility
    this.setAttribute('aria-hidden', this.isActive ? 'false' : 'true');
    this.setAttribute('role', 'tabpanel');
    
    // Log state changes
    if (wasActive !== this.isActive) {
      debugLog(`Slide "${this.label}" active state changed: ${wasActive} -> ${this.isActive}`);
    }
  }


  /**
   * Render the slide content with metadata overlay in development
   */
  override render() {
    const containerClasses = [
      'slide-container',
      this.isActive ? 'active' : 'inactive'
    ].join(' ');

    return html`
      <div class="${containerClasses}">
        <div class="slide-content">
          <slot></slot>
        </div>
      </div>
    `;
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
    debugLog(`Slide "${this.label}" activated programmatically`);
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
    };
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
    if (this.isDevelopment && !this.isActive) {
      this.activate();
      this.dispatchSlideEvent('activated', this.getSlideData());
    }
  }

  /**
   * Updated render with click handler for development mode
   */
  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    // Add click listener in development mode
    if (this.isDevelopment) {
      this.style.cursor = this.isActive ? 'default' : 'pointer';
      this.onclick = () => this.handleSlideClick();
    } else {
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