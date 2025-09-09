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

import { LitElement, html, nothing, css } from 'lit';
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
} from '../../utils/index.js';
import type { DeckRegistration } from '../../types/index.js';
import type { IterationDeckSlide } from '../iteration-deck-slide/iteration-deck-slide.js';

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

  /**
   * Lit CSS styles - matches React version styling exactly
   */
  static styles = css`
    :host {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
    }

    .toolbar-root {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 24rem;
      gap: 0.5rem;
      padding: 0.75rem;
      border-radius: 2.5rem;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1;
      color: rgb(55 65 81);
      background-color: rgb(229 231 235 / 0.8);
    }

    @media (prefers-color-scheme: dark) {
      .toolbar-root {
        background-color: rgb(17 24 39 / 0.7);
        color: rgb(229 231 235);
      }
    }

    .toolbar-separator {
      width: 1px;
      height: 1.5rem;
      background-color: rgb(156 163 175 / 0.6);
    }

    @media (prefers-color-scheme: dark) {
      .toolbar-separator {
        background-color: rgb(107 114 128 / 0.7);
      }
    }

    /* Deck Selector */
    .selector-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .selector-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
    }

    .selector-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.75rem;
      min-width: 7.5rem;
      gap: 0.75rem;
      padding: 0 0.75rem;
      background-color: white;
      border: 2px solid rgb(209 213 219);
      border-radius: 1.5rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 0.75rem;
      color: rgb(55 65 81);
      cursor: pointer;
      user-select: none;
      transition: all 150ms ease-out;
    }

    .selector-button:hover {
      background-color: rgb(249 250 251);
      color: rgb(31 41 55);
    }

    .selector-button:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgb(59 130 246);
    }

    @media (prefers-color-scheme: dark) {
      .selector-button {
        background-color: rgb(31 41 55);
        border-color: rgb(75 85 99);
        color: rgb(229 231 235);
      }

      .selector-button:hover {
        background-color: rgb(75 85 99);
        color: rgb(243 244 246);
      }

      .selector-button:focus {
        box-shadow: 0 0 0 2px rgb(96 165 250);
      }
    }

    .selector-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .selector-arrow {
      font-size: 0.5rem;
      color: rgb(107 114 128);
      pointer-events: none;
    }

    @media (prefers-color-scheme: dark) {
      .selector-arrow {
        color: rgb(156 163 175);
      }
    }

    /* Slide Navigation */
    .slide-nav-container {
      display: flex;
      align-items: center;
      height: 1.75rem;
    }

    .nav-container {
      display: flex;
      align-items: center;
      height: 1.75rem;
      border-radius: 1.5rem;
      border: 2px solid rgb(209 213 219);
      overflow: hidden;
      background-color: rgb(229 231 235);
    }

    @media (prefers-color-scheme: dark) {
      .nav-container {
        background-color: rgb(75 85 99);
        border-color: rgb(75 85 99);
      }
    }

    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 100%;
      background-color: white;
      transition: all 150ms ease-out;
      color: rgb(75 85 99);
      font-size: 0.875rem;
      cursor: pointer;
      user-select: none;
      border: none;
      outline: none;
    }

    .nav-button:hover:not(:disabled) {
      background-color: rgb(249 250 251);
      color: rgb(31 41 55);
    }

    .nav-button:active:not(:disabled) {
      background-color: rgb(243 244 246);
      transform: scale(0.95);
    }

    .nav-button:focus:not(:disabled) {
      box-shadow: inset 0 0 0 2px rgb(59 130 246);
    }

    .nav-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .nav-button:disabled:hover {
      background-color: white;
      color: rgb(75 85 99);
      transform: none;
    }

    @media (prefers-color-scheme: dark) {
      .nav-button {
        background-color: rgb(31 41 55);
        color: rgb(209 213 219);
      }

      .nav-button:hover:not(:disabled) {
        background-color: rgb(75 85 99);
        color: rgb(243 244 246);
      }

      .nav-button:active:not(:disabled) {
        background-color: rgb(107 114 128);
      }

      .nav-button:focus:not(:disabled) {
        box-shadow: inset 0 0 0 2px rgb(96 165 250);
      }

      .nav-button:disabled:hover {
        background-color: rgb(55 65 81);
        color: rgb(209 213 219);
      }
    }

    .prev-button {
      border-top-left-radius: 1.5rem;
      border-bottom-left-radius: 1.5rem;
      border-right: 0;
    }

    .next-button {
      border-top-right-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      border-left: 0;
    }

    /* Slide Info */
    .slide-info-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      padding: 0 0.5rem;
      width: 20rem;
    }

    .slide-info-label {
      color: rgb(55 65 81);
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @media (prefers-color-scheme: dark) {
      .slide-info-label {
        color: rgb(229 231 235);
      }
    }

    /* Slide Indicators */
    .indicators-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.25rem;
      width: 100%;
    }

    .indicator-dot {
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background-color: rgb(156 163 175);
      transition: opacity 200ms;
    }

    .dot-active {
      opacity: 0.9;
    }

    .dot-inactive {
      opacity: 0.5;
    }
  `;

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

    // Using Tailwind classes from shared styles for cross-framework consistency

    // Subscribe to store changes
    this.unsubscribeFromStore = subscribeToIterationStore((state) => {
      this.storeState = state;
      this.requestUpdate();
      
      // Auto-select first deck if none selected and we have interactive decks
      const deckIds = state.getInteractiveDecks();
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
    const deckIds = this.storeState.getInteractiveDecks();
    
    // If only one interactive deck, it's implicitly selected
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
        border-radius: 8px;
        position: relative;
        animation: iteration-deck-glow 1s ease-in-out;
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

    // Get current slide label from metadata
    const currentSlideLabel = metadata.slides?.find(slide => slide.id === metadata.activeSlideId)?.label;
    
    return currentSlideLabel || 'No slide selected';
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
      <div class="indicators-container" aria-hidden="true">
        ${deck.slideIds.map((_, index) => html`
          <div
            class="indicator-dot ${index === currentSlideIndex ? 'dot-active' : 'dot-inactive'}"
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

    const deckIds = this.storeState.getInteractiveDecks();
    const selectedDeckId = this.getSelectedDeckId();
    const hasMultipleDecks = deckIds.length > 1;
    const hasAnyDecks = deckIds.length > 0;
    
    // Don't render if no interactive decks are available
    if (!hasAnyDecks) {
      return nothing;
    }

    return html`
      <div class="toolbar-root" role="toolbar" aria-label="Iteration Deck Toolbar">
          ${hasMultipleDecks ? html`
            <div class="selector-container">
              <select 
                class="selector-select"
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
              <div class="selector-button">
                <span class="selector-text">${this.getDeckLabel(selectedDeckId || '')}</span>
                <span class="selector-arrow">▼</span>
              </div>
            </div>
            <div class="toolbar-separator"></div>
          ` : ''}
          
          <div class="slide-nav-container">
            <nav class="nav-container">
              <button 
                class="nav-button prev-button"
                @click=${this.handlePrevSlide}
                ?disabled=${!this.canNavigatePrev()}
                aria-label="Previous slide (Ctrl/Cmd+Alt+[)"
                title="Previous slide (Ctrl/Cmd+Alt+[)"
              >
                <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                  <path d="M7 6l6-4v8l-6-4z" />
                </svg>
              </button>
              
              <button 
                class="nav-button next-button"
                @click=${this.handleNextSlide}
                ?disabled=${!this.canNavigateNext()}
                aria-label="Next slide (Ctrl/Cmd+Alt+])"
                title="Next slide (Ctrl/Cmd+Alt+])"
              >
                <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                  <path d="M11 6l-6 4V2l6 4z" />
                </svg>
              </button>
            </nav>
            
            <div class="slide-info-container">
              <span class="slide-info-label" 
                    title=${this.getCurrentSlideLabel()}>
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
    const deckIds = store.getInteractiveDecks();
    
    // If no interactive decks remain, remove the toolbar
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