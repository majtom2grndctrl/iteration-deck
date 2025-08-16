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
 * - Global keyboard shortcuts (Ctrl/Cmd + Arrow keys)
 * - Accessible UI with ARIA labels and focus management
 * - Dynamic deck registration/unregistration handling
 */

import { LitElement, html, nothing, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ref, createRef, type Ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { 
  subscribeToIterationStore, 
  getIterationStoreState, 
  isDevelopmentMode,
  type IterationStore 
} from '../../store/iteration-store.js';
import {
  isNavigationShortcut,
  debugLog,
  warnLog,
  errorLog,
  throttle,
  type NavigationDirection
} from '../../core/utilities.js';
import type { DeckRegistration } from '../../core/types.js';
import { deckGlow } from './iteration-deck-toolbar.css.js';

// Note: Using Lit static styles instead of Vanilla Extract for shadow DOM compatibility

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
   * Reference to the dropdown select element for focus management
   */
  private dropdownRef: Ref<HTMLSelectElement> = createRef();

  /**
   * Store unsubscribe function
   */
  private unsubscribeFromStore?: () => void;

  /**
   * Keyboard event listener (throttled for performance)
   */
  private throttledKeyboardHandler = throttle(this.handleKeyboardNavigation.bind(this), 100);

  /**
   * Static styles for shadow DOM
   * Since Vanilla Extract doesn't work in shadow DOM, we define styles here
   */
  static styles = css`
    :host {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      
      display: flex;
      align-items: center;
      gap: 12px;
      
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 64px;
      
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      color: #666;
      cursor: pointer;
      outline: none;
      
      transition: all 0.2s ease;
    }

    button:hover {
      background: #f5f5f5;
      color: #333;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    select {
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      padding: 6px 12px;
      font-size: 14px;
      color: #333;
      outline: none;
      cursor: pointer;
    }

    .separator {
      width: 1px;
      height: 24px;
      background: rgba(0, 0, 0, 0.1);
    }

    .slide-label {
      padding: 0 8px;
      font-size: 14px;
      color: #666;
      white-space: nowrap;
    }

    .navigation {
      display: flex;
      align-items: center;
      gap: 8px;
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
    debugLog('IterationDeckToolbar instance created');
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Only mount in development mode
    if (!isDevelopmentMode()) {
      debugLog('IterationDeckToolbar hidden in production mode');
      return;
    }

    // Styles are now applied via static styles property

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
    
    debugLog('IterationDeckToolbar connected and listening for keyboard shortcuts');
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
    
    debugLog('IterationDeckToolbar disconnected');
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
      debugLog('No selected deck for navigation');
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
      debugLog(`Navigated deck ${selectedDeckId} to slide ${newSlideId} (${direction})`);
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
      debugLog(`Selected deck: ${deckId}`);
      
      // Auto-scroll to deck and highlight it
      this.scrollToDeckAndHighlight(deckId);
    }
  }

  /**
   * Scroll to deck and add glow effect
   */
  private scrollToDeckAndHighlight(deckId: string) {
    // Find the deck element
    const deckElement = document.querySelector(`iteration-deck[id="${deckId}"]`) as HTMLElement;
    
    if (!deckElement) {
      debugLog(`Deck element not found: ${deckId}`);
      return;
    }
    
    // Find the actual visible content within the deck to highlight
    const contentElement = deckElement.querySelector('.demo-content') as HTMLElement;
    const elementToHighlight = contentElement || deckElement;

    // Calculate scroll position to put deck near the top of window
    const rect = deckElement.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const elementTop = rect.top + currentScrollY;
    const targetScrollY = elementTop - (window.innerHeight * 0.15); // Near top (15% from top)

    // Smooth scroll to position
    const finalScrollY = Math.max(0, targetScrollY);
    window.scrollTo({
      top: finalScrollY,
      behavior: 'smooth'
    });

    // Add glow effect after scroll animation actually completes
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
          debugLog(`Scroll completed at ${currentY}, target was ${targetY}`);
        }
      }, 150); // Wait 150ms of no scroll movement to consider it "stopped"
    };
    
    // Safety timeout - trigger after 3 seconds maximum, even if scroll detection fails
    maxWaitTimeout = window.setTimeout(() => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
      callback();
      debugLog('Scroll completion detected via safety timeout');
    }, 3000);
    
    // Start listening for scroll events
    window.addEventListener('scroll', onScroll);
    
    // Also trigger immediately if we're already at the target position
    const currentY = window.scrollY;
    if (Math.abs(currentY - targetY) <= 5) {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(maxWaitTimeout);
      setTimeout(callback, 100); // Small delay to ensure DOM is settled
      debugLog('Already at target scroll position');
    }
  }

  /**
   * Add temporary glow effect to deck element
   */
  private addGlowEffect(deckElement: HTMLElement) {
    // Apply the glow CSS class from Vanilla Extract
    deckElement.classList.add(deckGlow);
    
    // Remove glow class after animation completes (1s duration + buffer)
    setTimeout(() => {
      deckElement.classList.remove(deckGlow);
    }, 1300);
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
      debugLog('canNavigatePrev: No selected deck');
      return false;
    }

    const deck = this.getCurrentDeck(selectedDeckId);
    if (!deck) {
      debugLog(`canNavigatePrev: No deck found for ID ${selectedDeckId}`);
      return false;
    }
    
    if (deck.slideIds.length <= 1) {
      debugLog(`canNavigatePrev: Deck ${selectedDeckId} has ${deck.slideIds.length} slides`);
      return false;
    }

    debugLog(`canNavigatePrev: Deck ${selectedDeckId} can navigate prev (${deck.slideIds.length} slides)`);
    return true; // Always allow navigation (wraps around)
  }

  /**
   * Check if we can navigate to next slide
   */
  private canNavigateNext(): boolean {
    const selectedDeckId = this.getSelectedDeckId();
    if (!selectedDeckId) {
      debugLog('canNavigateNext: No selected deck');
      return false;
    }

    const deck = this.getCurrentDeck(selectedDeckId);
    if (!deck) {
      debugLog(`canNavigateNext: No deck found for ID ${selectedDeckId}`);
      return false;
    }
    
    if (deck.slideIds.length <= 1) {
      debugLog(`canNavigateNext: Deck ${selectedDeckId} has ${deck.slideIds.length} slides`);
      return false;
    }

    debugLog(`canNavigateNext: Deck ${selectedDeckId} can navigate next (${deck.slideIds.length} slides)`);
    return true; // Always allow navigation (wraps around)
  }

  render() {
    // Don't render in production mode
    if (!isDevelopmentMode()) {
      return nothing;
    }

    const deckIds = this.storeState.getRegisteredDecks();
    const selectedDeckId = this.getSelectedDeckId();
    const hasMultipleDecks = deckIds.length > 1;
    const hasAnyDecks = deckIds.length > 0;
    
    debugLog(`Toolbar render: ${deckIds.length} decks, selected: ${selectedDeckId}`);
    
    // Check button states
    const canPrev = this.canNavigatePrev();
    const canNext = this.canNavigateNext();
    debugLog(`Toolbar render: canPrev=${canPrev}, canNext=${canNext}`);

    // Don't render if no decks are registered
    if (!hasAnyDecks) {
      debugLog('Toolbar render: No decks registered, returning nothing');
      return nothing;
    }

    return html`
      ${when(hasMultipleDecks, () => html`
        <div class="deck-selector">
          <select 
            ${ref(this.dropdownRef)}
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
        </div>
        <div class="separator"></div>
      `)}
      
      <div class="navigation">
        <button 
          @click=${this.handlePrevSlide}
          ?disabled=${!this.canNavigatePrev()}
          aria-label="Previous slide (Ctrl/Cmd + Left Arrow)"
          title="Previous slide (Ctrl/Cmd + ←)"
        >
          ◀
        </button>
        
        <span class="slide-label" title=${this.getCurrentSlideLabel()}>
          ${this.getCurrentSlideLabel()}
        </span>
        
        <button 
          @click=${this.handleNextSlide}
          ?disabled=${!this.canNavigateNext()}
          aria-label="Next slide (Ctrl/Cmd + Right Arrow)"
          title="Next slide (Ctrl/Cmd + →)"
        >
          ▶
        </button>
      </div>
    `;
  }
}

/**
 * Utility function to ensure toolbar is mounted
 * Called by IterationDeck components when they connect
 */
export function ensureToolbarMounted(): void {
  // Only mount in development mode
  if (!isDevelopmentMode()) {
    return;
  }

  // Check if toolbar already exists in DOM
  if (document.querySelector('iteration-deck-toolbar')) {
    debugLog('IterationDeckToolbar already mounted');
    return;
  }

  // Create and mount toolbar
  const toolbar = new IterationDeckToolbar();
  document.body.appendChild(toolbar);
  debugLog('IterationDeckToolbar automatically mounted');
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
        debugLog('IterationDeckToolbar removed - no decks remaining');
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