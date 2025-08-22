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

// Design tokens imported and embedded directly in CSS for Lit compatibility

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
      position: relative;
      width: 100%;
      min-height: 200px;
      border-radius: 8px;
      transition: opacity 0.2s ease-in-out;
      isolation: isolate;
      outline: none;
      
      /* CSS custom properties for theme switching */
      --slide-bg-primary: #fafafa;
      --slide-bg-secondary: #f4f4f5;
      --slide-text-primary: #374151;
      --slide-text-secondary: #52525b;
      --slide-border: #d4d4d8;
      --slide-hover-bg: #f4f4f5;
      --slide-active-bg: #e4e4e7;
      --slide-focus-outline: #52525b;
    }
    
    /* Dark theme support */
    @media (prefers-color-scheme: dark) {
      :host {
        --slide-bg-primary: #18181b;
        --slide-bg-secondary: #27272a;
        --slide-text-primary: #e4e4e7;
        --slide-text-secondary: #d4d4d8;
        --slide-border: #52525b;
        --slide-hover-bg: #27272a;
        --slide-active-bg: #374151;
        --slide-focus-outline: #a1a1aa;
      }
    }
    
    .slide-container {
      display: block;
      position: relative;
      width: 100%;
      min-height: inherit;
      border-radius: inherit;
      background: transparent;
      transition: all 0.15s ease-in-out;
      isolation: isolate;
      outline: none;
    }
    
    /* Slide state variants */
    .slide-container.active {
      opacity: 1;
      pointer-events: auto;
      z-index: 1;
    }
    
    .slide-container.inactive {
      opacity: 0;
      pointer-events: none;
      z-index: 0;
    }
    
    .slide-container.loading {
      opacity: 0.6;
      pointer-events: none;
    }
    
    .slide-container.error {
      opacity: 0.4;
      pointer-events: none;
      border: 1px solid #ef4444;
      background: rgba(239, 68, 68, 0.05);
    }
    
    /* Slide content wrapper */
    .slide-content {
      width: 100%;
      min-height: inherit;
      position: relative;
      z-index: 1;
      padding: 16px;
    }
    
    /* Development mode hover effects - REMOVED for better content interactivity */
    /* TODO: Relocate metadata display (AI confidence, prompt, notes) to toolbar or other UI location */
    /*
    .slide-container.development:not(.active):hover {
      background: var(--slide-hover-bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      cursor: pointer;
    }
    */
    
    /* AI confidence indicator - REMOVED, now available as standalone <iteration-confidence-bar> component */
    /* TODO: Use <iteration-confidence-bar> component in toolbar or other UI location */
    
    /* AI metadata overlay system (development mode only) */
    .metadata-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px;
      gap: 12px;
      border-radius: inherit;
      border: 1px solid var(--slide-border);
      text-align: center;
      color: var(--slide-text-primary);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
      z-index: 10;
    }
    
    @media (prefers-color-scheme: dark) {
      .metadata-overlay {
        background: rgba(39, 39, 42, 0.95);
      }
    }
    
    /* Metadata overlay hover - REMOVED, metadata needs new location */
    /*
    .slide-container.development:hover .metadata-overlay {
      opacity: 1;
      visibility: visible;
    }
    */
    
    .metadata-title {
      font-size: 16px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
      font-weight: 500;
      line-height: 1.375;
      letter-spacing: 0;
      color: var(--slide-text-primary);
      margin: 0;
      margin-bottom: 8px;
    }
    
    .metadata-prompt {
      width: 100%;
      max-width: 400px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
      line-height: 1.5;
      color: var(--slide-text-secondary);
      background: var(--slide-bg-secondary);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--slide-border);
      margin: 0;
      margin-bottom: 12px;
    }
    
    .metadata-notes {
      width: 100%;
      max-width: 400px;
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
      line-height: 1.5;
      color: var(--slide-text-secondary);
      font-style: italic;
      margin: 0;
      opacity: 0.8;
    }
    
    .metadata-score {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 500;
      color: var(--slide-text-secondary);
      margin-top: 8px;
    }
    
    .score-label {
      color: var(--slide-text-secondary);
      opacity: 0.8;
    }
    
    .score-value {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    
    .score-value[data-score="high"] {
      color: #10b981;
    }
    
    .score-value[data-score="medium"] {
      color: #f59e0b;
    }
    
    .score-value[data-score="low"] {
      color: #ef4444;
    }
    
    /* Accessibility enhancements */
    :host([aria-hidden="true"]) {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    
    :host([tabindex="0"]:focus) {
      outline: 3px solid var(--slide-focus-outline);
      outline-offset: 2px;
    }
    
    /* Production mode overrides */
    .slide-container.production {
      background: transparent;
      transform: none;
      box-shadow: none;
      cursor: default;
    }
    
    /* Confidence indicator production hiding - REMOVED with component extraction */
    
    .slide-container.production .metadata-overlay {
      display: none;
    }
    
    /* Responsive design */
    @media (max-width: 640px) {
      .slide-container {
        min-height: 150px;
      }
      
      .slide-content {
        padding: 12px;
      }
      
      .metadata-overlay {
        padding: 12px;
        gap: 8px;
      }
      
      .metadata-prompt,
      .metadata-notes {
        max-width: 100%;
      }
    }
    
    @media (min-width: 641px) and (max-width: 1024px) {
      .slide-container {
        min-height: 200px;
      }
      
      .slide-content {
        padding: 16px;
      }
    }
    
    @media (min-width: 1025px) {
      .slide-content {
        padding: 24px;
      }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .slide-container,
      /* .confidence-indicator, .confidence-bar - REMOVED */,
      .metadata-overlay {
        transition: none;
      }
      
      /* Reduced motion hover override - REMOVED with hover effects */
      /*
      .slide-container.development:hover {
        transform: none;
      }
      */
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
    // Build classes for slide container
    const containerClasses = [
      'slide-container',
      this.isActive ? 'active' : 'inactive',
      this.isDevelopment ? 'development' : 'production'
    ].join(' ');

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
        <div class="slide-content">
          <slot></slot>
        </div>
        
        <!-- AI confidence indicator - REMOVED, use <iteration-confidence-bar> component instead -->
        
        <!-- Development mode metadata overlay -->
        ${this.isDevelopment ? html`
          <div class="metadata-overlay">
            <h3 class="metadata-title">${this.label}</h3>
            
            ${this.aiPrompt ? html`
              <div class="metadata-prompt">
                <strong>AI Prompt:</strong><br>
                ${this.aiPrompt}
              </div>
            ` : ''}
            
            ${this.notes ? html`
              <div class="metadata-notes">
                <strong>Notes:</strong><br>
                ${this.notes}
              </div>
            ` : ''}
            
            ${this.confidence !== undefined ? html`
              <div class="metadata-score">
                <span class="score-label">Confidence:</span>
                <span 
                  class="score-value" 
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