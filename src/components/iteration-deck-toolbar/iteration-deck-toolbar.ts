/**
 * IterationDeckToolbar Lit Component
 * 
 * Global singleton toolbar for iteration deck navigation and management.
 * Provides multi-deck support with dropdown selector, keyboard shortcuts,
 * and navigation controls for the currently active deck.
 * 
 * Features:
 * - Singleton pattern - only one toolbar instance globally
 * - Development mode only (hidden in production)
 * - Multi-deck dropdown selector
 * - Previous/Next navigation for active deck
 * - Global keyboard shortcuts (Ctrl/Cmd + [ ] keys)
 * - Accessible UI with ARIA labels and focus management
 * - Dynamic deck registration/unregistration handling
 */

import { LitElement, html, nothing, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { 
  subscribeToIterationStore, 
  getIterationStoreState, 
  isDevelopmentMode,
  type IterationStore 
} from '../../store/iteration-store.js';
import {
  isNavigationShortcut,
  warnLog,
  errorLog,
  throttle,
  type NavigationDirection
} from '../../core/utilities.js';
import type { DeckRegistration } from '../../core/types.js';
import { 
  themeTokens,
  spacing,
  breakpoints,
  duration,
  easing
} from '../../tokens/index.js';
import type { IterationDeckSlide } from '../iteration-deck-slide/iteration-deck-slide.js';

// ShadowDOM encapsulation for isolated styling

/**
 * Singleton instance tracking
 */
let toolbarInstance: IterationDeckToolbar | null = null;

/**
 * Global IterationDeckToolbar singleton component
 * 
 * This component automatically mounts when the first IterationDeck is registered
 * and handles all deck navigation for the entire application.
 */
@customElement('iteration-deck-toolbar')
export class IterationDeckToolbar extends LitElement {
  /**
   * Current store state snapshot
   */
  @state()
  private storeState: IterationStore;

  // Note: Dropdown functionality will be implemented in future iterations


  /**
   * Store unsubscribe function
   */
  private unsubscribeFromStore?: () => void;

  /**
   * Keyboard event listener (throttled for performance)
   */
  private throttledKeyboardHandler = throttle(this.handleKeyboardNavigation.bind(this), 100);

  static styles = [
    themeTokens,
    css`
    :host {
      /* Positioning */
      position: fixed;
      bottom: ${unsafeCSS(spacing.spacing2)};
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      
      /* Layout and sizing - Mobile-first approach */
      display: flex;
      align-items: center;
      gap: ${unsafeCSS(spacing.spacing1)};
      min-width: calc(${unsafeCSS(spacing.spacing8)} * 5); /* 320px equivalent */
      padding: ${unsafeCSS(spacing.spacing1)} ${unsafeCSS(spacing.spacing2)};
      
      /* Visual design - signature pill shape */
      border-radius: ${unsafeCSS(spacing.spacing8)}; /* Large border radius */
      background: var(--color-bg-glass);
      backdrop-filter: blur(${unsafeCSS(spacing.spacing2)}); /* 16px blur */
      border: ${unsafeCSS(spacing.spacing00)} solid var(--color-border-secondary);
      box-shadow: var(--toolbar-shadow);
      
      /* Typography - Mobile-first */
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
      font-size: ${unsafeCSS(spacing.spacing1)}; /* 8px - small text */
      font-weight: 500;
      line-height: 1;
      color: var(--color-text-primary);
    }
    
    /* Progressive enhancement for larger screens */
    @media (min-width: ${unsafeCSS(breakpoints.sm)}) {
      :host {
        min-width: calc(${unsafeCSS(spacing.spacing8)} * 6); /* ~384px equivalent */
        height: auto;
        padding: ${unsafeCSS(spacing.spacing1)};
        gap: ${unsafeCSS(spacing.spacing2)};
        bottom: ${unsafeCSS(spacing.spacing4)};
        font-size: ${unsafeCSS(spacing.spacing2)}; /* 16px - standard text */
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }
    }
    
    .toolbar-container {
      display: flex;
      align-items: center;
      gap: ${unsafeCSS(spacing.spacing2)};
      width: 100%;
    }
    
    /* Custom deck selector styles to match button height */
    .deck-selector {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    /* Hidden native select for accessibility and functionality */
    .select-element {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }
    
    /* Custom select display that matches button styling */
    .select-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: ${unsafeCSS(spacing.spacing6)};
      gap: ${unsafeCSS(spacing.spacing3)};
      min-width: 120px;
      padding: 0 ${unsafeCSS(spacing.spacing3)};
      
      background: var(--color-bg-elevated);
      border: ${unsafeCSS(spacing.spacing00)} solid var(--color-border-secondary);
      border-radius: 24px;
      
      font-size: ${unsafeCSS(spacing.spacing2)}; /* 16px - standard text */
      font-weight: 500;
      line-height: ${unsafeCSS(spacing.spacing3)};
      color: var(--color-text-primary);
      
      cursor: pointer;
      user-select: none;
        }
    
    .select-display:hover {
      background: var(--color-bg-elevated);
      border-color: var(--color-border-primary);
    }
    
    .select-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .select-arrow {
      font-size: 8px;
      color: var(--color-text-secondary);
      pointer-events: none;
    }
    
    /* Navigation section - Mobile-first */
    .slide-selector {
      display: flex;
      align-items: center;
      gap: 0;
    }
    
    /* Progressive enhancement for larger screens */
    @media (min-width: ${unsafeCSS(breakpoints.sm)}) {
      .slide-selector {
        gap: ${unsafeCSS(spacing.spacing1)};
      }
    }
    
    /* Segmented button group */
    .segmented-button-group {
      display: flex;
      align-items: center;
      gap: ${unsafeCSS(spacing.spacing00)};
      overflow: hidden;
      background: var(--segmented-shadow);
    }
    
    /* Navigation buttons - Mobile-first */
    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${unsafeCSS(spacing.spacing6)};
      height: ${unsafeCSS(spacing.spacing6)};
      
      background: var(--color-bg-elevated);
      border: ${unsafeCSS(spacing.spacing00)} solid var(--color-border-secondary);
      
      color: var(--color-text-secondary);
      cursor: pointer;
      outline: none;
      
        }
    
    .nav-button:hover {
      background: var(--color-interactive-hover);
      border-color: var(--color-border-primary);
      color: var(--color-text-primary);
    }
    
    .nav-button:focus {
      outline: none;
    }
    
    .nav-button:focus-visible {
      outline: 2px solid #007AFF;
      outline-offset: 2px;
      border-color: #007AFF;
    }
    
    .nav-button:active {
      opacity: 0.8;
    }
    
    .nav-button:disabled {
      color: var(--color-text-disabled);
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    .nav-button:disabled:hover {
      background: var(--color-bg-elevated);
      border-color: var(--color-border-secondary);
      transform: none;
      box-shadow: none;
    }
    
    
    
    /* First and last button styling for seamless segmented group */
    .nav-button:first-child {
      border-radius: 0;
      border-right: none;
      border-top-left-radius: ${unsafeCSS(spacing.spacing3)};
      border-bottom-left-radius: ${unsafeCSS(spacing.spacing3)};
    }
    
    .nav-button:last-child {
      border-radius: 0;
      border-left: none;
      border-top-right-radius: ${unsafeCSS(spacing.spacing3)};
      border-bottom-right-radius: ${unsafeCSS(spacing.spacing3)};
    }
    
    /* Slide info wrapper - Mobile-first */
    .slide-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${unsafeCSS(spacing.spacing0)};
    }
    
    /* Progressive enhancement for larger screens */
    @media (min-width: ${unsafeCSS(breakpoints.sm)}) {
      .slide-info {
        padding: 0 ${unsafeCSS(spacing.spacing2)};
        max-width: 50rem;
      }
    }

    @media (min-width: ${unsafeCSS(breakpoints.lg)}) {
      .slide-info {
        max-width: unset;
        width: 20rem;
      }
    }
    
    /* Slide label - Mobile-first */
    .slide-label {
      color: var(--color-text-primary);
      font-size: ${unsafeCSS(spacing.spacing3)};
      font-weight: 500;
      line-height: ${unsafeCSS(spacing.spacing4)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    /* Progressive enhancement for larger screens */
    @media (min-width: ${unsafeCSS(breakpoints.sm)}) {
      .slide-label {
        font-size: 14px;
      }
    }
    
    /* Carousel indicators */
    .slide-indicators {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${unsafeCSS(spacing.spacing1)};
      width: 100%;
    }
    
    .slide-indicator {
      width: ${unsafeCSS(spacing.spacing0)};
      height: ${unsafeCSS(spacing.spacing0)};
      border-radius: 50%;
      background: var(--color-text-secondary);
      opacity: 0.4;
      transition: opacity ${unsafeCSS(duration.normal)};
    }
    
    .slide-indicator.active {
      opacity: 0.8;
    }
    
    /* Separator - Mobile-first */
    .separator {
      width: 1px;
      height: 20px;
      background: var(--color-border-primary);
      opacity: 0.6;
    }
    
    /* Progressive enhancement for larger screens */
    @media (min-width: ${unsafeCSS(breakpoints.sm)}) {
      .separator {
        height: ${unsafeCSS(spacing.spacing4)};
      }
    }
    
    
  `];

  constructor() {
    super();
    
    // Initialize store state
    this.storeState = getIterationStoreState();
    
    // Enforce singleton pattern
    if (toolbarInstance && toolbarInstance !== this) {
      warnLog('Multiple IterationDeckToolbar instances detected. Only one toolbar should exist globally.');
      // Remove the existing instance from DOM if it exists
      if (toolbarInstance.parentNode) {
        toolbarInstance.parentNode.removeChild(toolbarInstance);
      }
    }
    
    toolbarInstance = this;
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Only mount in development mode (or if any deck has development features enabled in production)
    if (!this.shouldShowToolbar()) {
      return;
    }

    // Styles are now embedded via CSS tagged template literals with ShadowDOM encapsulation

    // Subscribe to store changes
    this.unsubscribeFromStore = subscribeToIterationStore((state) => {
      this.storeState = state;
      this.requestUpdate();
      
      // Auto-select first deck if none selected and we have decks
      const deckIds = state.getRegisteredDecks();
      if (deckIds.length > 0 && !state.selectedDeckId) {
        const store = getIterationStoreState();
        store.setSelectedDeck(deckIds[0]);
      }
    });

    // Add global keyboard listeners
    document.addEventListener('keydown', this.throttledKeyboardHandler);
    
    // Set toolbar as visible
    this.setAttribute('visible', '');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Clean up subscriptions
    this.unsubscribeFromStore?.();
    document.removeEventListener('keydown', this.throttledKeyboardHandler);
    
    // Clear singleton reference
    if (toolbarInstance === this) {
      toolbarInstance = null;
    }
  }

  /**
   * Check if any deck has development features enabled in production or if we're in natural development mode
   */
  private shouldShowToolbar(): boolean {
    if (isDevelopmentMode()) {
      return true;
    }
    
    // Check if any deck has development features enabled in production
    const deckElements = document.querySelectorAll('iteration-deck');
    for (const deckElement of deckElements) {
      if (deckElement.hasAttribute('enable-in-production')) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Handle global keyboard navigation shortcuts
   */
  private handleKeyboardNavigation(event: KeyboardEvent) {
    // Don't interfere with form inputs or other interactive elements
    const target = event.target as HTMLElement;
    if (target && (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.tagName === 'SELECT' ||
      target.isContentEditable
    )) {
      return;
    }

    const direction = isNavigationShortcut(event);
    if (!direction) {
      return;
    }

    // Prevent default browser behavior
    event.preventDefault();
    event.stopPropagation();

    // Navigate the currently selected deck
    this.navigateSelectedDeck(direction);
  }

  /**
   * Navigate the currently selected deck in the specified direction
   */
  private navigateSelectedDeck(direction: NavigationDirection) {
    const selectedDeckId = this.getSelectedDeckId();
    if (!selectedDeckId) {
      return;
    }

    const deck = this.getCurrentDeck(selectedDeckId);
    if (!deck) {
      warnLog('Selected deck not found in store', selectedDeckId);
      return;
    }

    const currentSlideIndex = deck.slideIds.indexOf(deck.activeSlideId);
    let newSlideIndex: number;

    switch (direction) {
      case 'prev':
        newSlideIndex = currentSlideIndex > 0 ? currentSlideIndex - 1 : deck.slideIds.length - 1;
        break;
      case 'next':
        newSlideIndex = currentSlideIndex < deck.slideIds.length - 1 ? currentSlideIndex + 1 : 0;
        break;
      case 'first':
        newSlideIndex = 0;
        break;
      case 'last':
        newSlideIndex = deck.slideIds.length - 1;
        break;
      default:
        return;
    }

    const newSlideId = deck.slideIds[newSlideIndex];
    if (newSlideId) {
      const store = getIterationStoreState();
      store.setActiveSlide(selectedDeckId, newSlideId);
    }
  }

  /**
   * Get the currently selected deck ID
   */
  private getSelectedDeckId(): string | undefined {
    const deckIds = this.storeState.getRegisteredDecks();
    
    // If only one deck, it's implicitly selected
    if (deckIds.length === 1) {
      return deckIds[0];
    }
    
    // Return explicitly selected deck
    return this.storeState.selectedDeckId;
  }

  /**
   * Get deck registration by ID
   */
  private getCurrentDeck(deckId?: string): DeckRegistration | null {
    if (!deckId) return null;
    
    const store = getIterationStoreState();
    const metadata = store.getDeckMetadata(deckId);
    if (!metadata) {
      return null;
    }

    return {
      id: deckId,
      label: metadata.label || deckId,
      slideIds: metadata.slideIds,
      activeSlideId: metadata.activeSlideId,
      registeredAt: Date.now()
    };
  }

  /**
   * Handle deck selection change from dropdown
   */
  private handleDeckSelection(event: Event) {
    const select = event.target as HTMLSelectElement;
    const deckId = select.value;
    
    if (deckId) {
      const store = getIterationStoreState();
      store.setSelectedDeck(deckId);
      
      // Auto-scroll to deck and highlight it
      this.scrollToDeckAndHighlight(deckId);
    }
  }

  /**
   * Scroll to deck and add glow effect
   */
  private scrollToDeckAndHighlight(deckId: string) {
    const deckElement = document.querySelector(`iteration-deck[id="${deckId}"]`) as HTMLElement;
    
    if (!deckElement) {
      return;
    }
    
    const activeSlide = deckElement.querySelector('iteration-deck-slide[aria-hidden="false"]') as IterationDeckSlide;
    const slottedContent = activeSlide?.getPrimarySlottedElement();
    
    const elementToHighlight = slottedContent || activeSlide || deckElement;

    const rect = deckElement.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const elementTop = rect.top + currentScrollY;
    const targetScrollY = elementTop - (window.innerHeight * 0.15);

    const finalScrollY = Math.max(0, targetScrollY);
    window.scrollTo({
      top: finalScrollY,
      behavior: 'smooth'
    });

    this.waitForScrollComplete(finalScrollY, () => {
      this.addGlowEffect(elementToHighlight);
    });
  }

  /**
   * Wait for scroll animation to complete and then execute callback
   */
  private waitForScrollComplete(targetY: number, callback: () => void) {
    let scrollTimeout: number;
    let maxWaitTimeout: number;
    
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      
      // Check if we're close enough to the target (within 5px tolerance)
      scrollTimeout = window.setTimeout(() => {
        const currentY = window.scrollY;
        const tolerance = 5;
        
        if (Math.abs(currentY - targetY) <= tolerance) {
          // Scroll has stopped at the target position
          window.removeEventListener('scroll', onScroll);
          clearTimeout(maxWaitTimeout);
          callback();
        }
      }, 150); // Wait 150ms of no scroll movement to consider it "stopped"
    };
    
    // Safety timeout - trigger after 3 seconds maximum, even if scroll detection fails
    maxWaitTimeout = window.setTimeout(() => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
      callback();
    }, 3000);
    
    // Start listening for scroll events
    window.addEventListener('scroll', onScroll);
    
    // Also trigger immediately if we're already at the target position
    const currentY = window.scrollY;
    if (Math.abs(currentY - targetY) <= 5) {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(maxWaitTimeout);
      setTimeout(callback, 100); // Small delay to ensure DOM is settled
    }
  }

  /**
   * Inject global CSS for deck glow animations (called once)
   */
  private static ensureGlowStyles() {
    const styleId = 'iteration-deck-glow-styles';
    if (document.getElementById(styleId)) return; // Already injected
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Iteration Deck Glow Effect Global Styles */
      [data-iteration-glow] {
        border-radius: ${unsafeCSS(spacing.spacing1)}; /* 8px - small radius */
        position: relative;
        animation: iteration-deck-glow ${unsafeCSS(duration.slower)} ${unsafeCSS(easing.easeInOut)};
      }
      
      @keyframes iteration-deck-glow {
        0% {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2), 0 0 25px rgba(236, 72, 153, 0.1);
          outline: 2px solid rgba(236, 72, 153, 0.2);
        }
        50% {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.4), 0 0 25px rgba(236, 72, 153, 0.3);
          outline: 2px solid rgba(236, 72, 153, 0.6);
        }
        100% {
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2), 0 0 25px rgba(236, 72, 153, 0.1);
          outline: 2px solid rgba(236, 72, 153, 0);
        }
      }
      
      /* Accessibility: respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        [data-iteration-glow] {
          animation: none;
          border: 2px solid rgba(236, 72, 153, 0.6);
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.3), 0 0 25px rgba(236, 72, 153, 0.2);
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Add temporary glow effect to deck element using CSS classes
   * Much simpler and more performant than inline style manipulation
   */
  private addGlowEffect(deckElement: HTMLElement) {
    // Ensure global styles are injected
    IterationDeckToolbar.ensureGlowStyles();
    
    // Add glow data attribute to trigger CSS animation
    deckElement.setAttribute('data-iteration-glow', '');
    
    // Remove glow attribute after animation completes
    setTimeout(() => {
      deckElement.removeAttribute('data-iteration-glow');
    }, 800);
  }

  /**
   * Handle previous slide navigation
   */
  private handlePrevSlide() {
    try {
      this.navigateSelectedDeck('prev');
    } catch (error) {
      errorLog('Error navigating to previous slide:', error);
    }
  }

  /**
   * Handle next slide navigation
   */
  private handleNextSlide() {
    try {
      this.navigateSelectedDeck('next');
    } catch (error) {
      errorLog('Error navigating to next slide:', error);
    }
  }

  /**
   * Get display label for a deck
   */
  private getDeckLabel(deckId: string): string {
    const store = getIterationStoreState();
    const metadata = store.getDeckMetadata(deckId);
    return metadata?.label || deckId;
  }

  /**
   * Get current slide label for display
   */
  private getCurrentSlideLabel(): string {
    const selectedDeckId = this.getSelectedDeckId();
    if (!selectedDeckId) {
      return 'No deck selected';
    }

    const store = getIterationStoreState();
    const metadata = store.getDeckMetadata(selectedDeckId);
    if (!metadata || !metadata.activeSlideId) {
      return 'No slide active';
    }

    // Use the slide ID as the label for now
    // This will be enhanced when we have full slide metadata
    return metadata.activeSlideId;
  }

  /**
   * Check if we can navigate to previous slide
   */
  private canNavigatePrev(): boolean {
    const selectedDeckId = this.getSelectedDeckId();
    if (!selectedDeckId) {
      return false;
    }

    const deck = this.getCurrentDeck(selectedDeckId);
    if (!deck) {
      return false;
    }
    
    if (deck.slideIds.length <= 1) {
      return false;
    }

    return true; // Always allow navigation (wraps around)
  }

  /**
   * Render carousel-style slide indicators
   */
  private renderSlideIndicators() {
    const selectedDeckId = this.getSelectedDeckId();
    if (!selectedDeckId) {
      return '';
    }

    const deck = this.getCurrentDeck(selectedDeckId);
    if (!deck || deck.slideIds.length <= 1) {
      return '';
    }

    const currentSlideIndex = deck.slideIds.indexOf(deck.activeSlideId);

    return html`
      <div class="slide-indicators" aria-hidden="true">
        ${deck.slideIds.map((_, index) => html`
          <div
            class="slide-indicator ${index === currentSlideIndex ? 'active' : ''}"
          ></div>
        `)}
      </div>
    `;
  }


  /**
   * Check if we can navigate to next slide
   */
  private canNavigateNext(): boolean {
    const selectedDeckId = this.getSelectedDeckId();
    if (!selectedDeckId) {
      return false;
    }

    const deck = this.getCurrentDeck(selectedDeckId);
    if (!deck) {
      return false;
    }
    
    if (deck.slideIds.length <= 1) {
      return false;
    }

    return true; // Always allow navigation (wraps around)
  }

  render() {
    // Don't render in production mode (unless any deck is forcing dev mode)
    if (!this.shouldShowToolbar()) {
      return nothing;
    }

    const deckIds = this.storeState.getRegisteredDecks();
    const selectedDeckId = this.getSelectedDeckId();
    const hasMultipleDecks = deckIds.length > 1;
    const hasAnyDecks = deckIds.length > 0;
    
    // Don't render if no decks are registered
    if (!hasAnyDecks) {
      return nothing;
    }

    return html`
      <div class="toolbar-container">
        ${hasMultipleDecks ? html`
          <div class="deck-selector">
            <select 
              class="select-element"
              @change=${this.handleDeckSelection}
              .value=${selectedDeckId || ''}
              aria-label="Select iteration deck"
            >
              ${deckIds.map(deckId => html`
                <option 
                  value=${deckId} 
                  ?selected=${deckId === selectedDeckId}
                >
                  ${this.getDeckLabel(deckId)}
                </option>
              `)}
            </select>
            <div class="select-display">
              <span class="select-text">${this.getDeckLabel(selectedDeckId || '')}</span>
              <span class="select-arrow">▼</span>
            </div>
          </div>
          <div class="separator"></div>
        ` : ''}
        
        <div class="slide-selector">
          <nav class="segmented-button-group">
            <button 
              class="nav-button nav-button-first"
              @click=${this.handlePrevSlide}
              ?disabled=${!this.canNavigatePrev()}
              aria-label="Previous slide (Ctrl/Cmd + [)"
              title="Previous slide (Ctrl/Cmd + [)"
            >
              ◀
            </button>
            
            <button 
              class="nav-button nav-button-last"
              @click=${this.handleNextSlide}
              ?disabled=${!this.canNavigateNext()}
              aria-label="Next slide (Ctrl/Cmd + ])"
              title="Next slide (Ctrl/Cmd + ])"
            >
              ▶
            </button>
          </nav>
          
          <div class="slide-info">
            <span class="slide-label" title=${this.getCurrentSlideLabel()}>
              ${this.getCurrentSlideLabel()}
            </span>
            ${this.renderSlideIndicators()}
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Check if any deck has development features enabled in production
 */
function shouldShowToolbarGlobally(): boolean {
  if (isDevelopmentMode()) {
    return true;
  }
  
  // Check if any deck has development features enabled in production
  const deckElements = document.querySelectorAll('iteration-deck');
  for (const deckElement of deckElements) {
    if (deckElement.hasAttribute('enable-in-production')) {
      return true;
    }
  }
  
  return false;
}

/**
 * Utility function to ensure toolbar is mounted
 * Called by IterationDeck components when they connect
 */
export function ensureToolbarMounted(): void {
  // Only mount in development mode or if any deck has development features enabled in production
  if (!shouldShowToolbarGlobally()) {
    return;
  }

  // Check if toolbar already exists in DOM
  if (document.querySelector('iteration-deck-toolbar')) {
    return;
  }

  // Create and mount toolbar
  const toolbar = new IterationDeckToolbar();
  document.body.appendChild(toolbar);
}

/**
 * Utility function to clean up toolbar when no decks remain
 * Called by IterationDeck components when they disconnect
 */
export function cleanupToolbarIfEmpty(): void {
  // Small delay to allow for component cleanup
  setTimeout(() => {
    const store = getIterationStoreState();
    const deckIds = store.getRegisteredDecks();
    
    // If no decks remain, remove the toolbar
    if (deckIds.length === 0) {
      const toolbar = document.querySelector('iteration-deck-toolbar');
      if (toolbar) {
        toolbar.remove();
      }
    }
  }, 100);
}

/**
 * Export the toolbar instance for direct access if needed
 */
export function getToolbarInstance(): IterationDeckToolbar | null {
  return toolbarInstance;
}

// Register the custom element
declare global {
  interface HTMLElementTagNameMap {
    'iteration-deck-toolbar': IterationDeckToolbar;
  }
}