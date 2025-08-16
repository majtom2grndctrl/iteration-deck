/**
 * IterationDeckSlide - Lit web component for individual slides in an iteration deck
 * 
 * Individual slide wrapper component that represents AI-generated UI variations.
 * Renders slot content when active, hides when inactive based on parent deck state.
 * Fully integrated with Zustand store for cross-component reactivity.
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
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

// Import component styles
import { slideStyles } from './iteration-deck-slide.css.js';

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
   * No static styles - using @vanilla-extract/css
   * Styles are imported from iteration-deck-slide.css.ts
   */

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
   * Get confidence level for styling
   */
  private getConfidenceLevel(): 'low' | 'medium' | 'high' | null {
    if (!this.confidence) return null;
    
    if (this.confidence >= 0.8) return 'high';
    if (this.confidence >= 0.6) return 'medium';
    return 'low';
  }

  /**
   * Render the slide content with metadata overlay in development
   */
  override render() {
    const containerClasses = classMap({
      [slideStyles.container]: true,
      [slideStyles.states.active]: this.isActive,
      [slideStyles.states.inactive]: !this.isActive,
      [slideStyles.hover]: this.isDevelopment,
      [slideStyles.production]: !this.isDevelopment,
      [slideStyles.accessibility]: true
    });

    const confidenceLevel = this.getConfidenceLevel();

    return html`
      <div 
        class="${containerClasses}" 
        role="tabpanel" 
        aria-label="${this.label}"
        data-env="${this.isDevelopment ? 'development' : 'production'}"
        style="display: ${this.isActive ? 'block' : 'none'}"
      >
        <!-- Main slide content wrapper -->
        <div class="${slideStyles.content}">
          <slot></slot>
        </div>
        
        <!-- AI confidence indicator (development only) -->
        ${this.isDevelopment && confidenceLevel ? html`
          <div class="${slideStyles.confidence.indicator}">
            <div 
              class="${slideStyles.confidence.bar} ${slideStyles.confidence.variants[confidenceLevel]}"
              style="width: ${Math.round((this.confidence || 0) * 100)}%"
            ></div>
          </div>
        ` : ''}
        
        <!-- Development mode metadata overlay -->
        ${this.isDevelopment ? html`
          <div 
            class="${slideStyles.metadata.overlay}" 
            data-visible="false"
          >
            <h3 class="${slideStyles.metadata.title}">${this.label}</h3>
            
            ${this.aiPrompt ? html`
              <div class="${slideStyles.metadata.prompt}">
                <strong>AI Prompt:</strong><br>
                ${this.aiPrompt}
              </div>
            ` : ''}
            
            ${this.notes ? html`
              <div class="${slideStyles.metadata.notes}">
                <strong>Notes:</strong><br>
                ${this.notes}
              </div>
            ` : ''}
            
            ${this.confidence !== undefined ? html`
              <div class="${slideStyles.metadata.score}">
                <span class="${slideStyles.metadata.scoreLabel}">Confidence:</span>
                <span 
                  class="${slideStyles.metadata.scoreValue}" 
                  data-score="${confidenceLevel}"
                >
                  ${Math.round(this.confidence * 100)}%
                </span>
              </div>
            ` : ''}
          </div>
        ` : ''}
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