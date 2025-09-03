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

import { LitElement, html, nothing } from 'lit';
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
import { toolbarStyles } from '../../../shared/styles.js';
import type { IterationDeckSlide } from '../iteration-deck-slide/iteration-deck-slide.js';

// Using shared Tailwind classes for cross-framework consistency
// Classes are imported from shared/styles.ts and work with CDN or build-time Tailwind

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
   * Disable Shadow DOM to allow external Tailwind CSS to style the component
   * This is necessary because Tailwind classes from CDN cannot penetrate Shadow DOM
   */
  createRenderRoot() {
    return this;
  }

  // No static styles - using Tailwind classes in template

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
      <div class="${toolbarStyles.indicators.container}" aria-hidden="true">
        ${deck.slideIds.map((_, index) => html`
          <div
            class="${toolbarStyles.indicators.dot} ${index === currentSlideIndex ? toolbarStyles.indicators.dotActive : toolbarStyles.indicators.dotInactive}"
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
      <div class="${toolbarStyles.container}">
        <div class="${toolbarStyles.inner}">
          ${hasMultipleDecks ? html`
            <div class="${toolbarStyles.selector.container}">
              <select 
                class="${toolbarStyles.selector.select}"
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
              <div class="${toolbarStyles.selector.button}">
                <span class="${toolbarStyles.selector.text}">${this.getDeckLabel(selectedDeckId || '')}</span>
                <span class="${toolbarStyles.selector.arrow}">▼</span>
              </div>
            </div>
            <div class="${toolbarStyles.separator}"></div>
          ` : ''}
          
          <div class="${toolbarStyles.slideNavigation.container}">
            <nav class="${toolbarStyles.navigation.container}">
              <button 
                class="${toolbarStyles.navigation.button} ${toolbarStyles.slideNavigation.prevButton}"
                @click=${this.handlePrevSlide}
                ?disabled=${!this.canNavigatePrev()}
                aria-label="Previous slide (Ctrl/Cmd+Alt+[)"
                title="Previous slide (Ctrl/Cmd+Alt+[)"
              >
                ◀
              </button>
              
              <button 
                class="${toolbarStyles.navigation.button} ${toolbarStyles.slideNavigation.nextButton}"
                @click=${this.handleNextSlide}
                ?disabled=${!this.canNavigateNext()}
                aria-label="Next slide (Ctrl/Cmd+Alt+])"
                title="Next slide (Ctrl/Cmd+Alt+])"
              >
                ▶
              </button>
            </nav>
            
            <div class="${toolbarStyles.slideInfo.container}">
              <span class="${toolbarStyles.slideInfo.label}" 
                    title=${this.getCurrentSlideLabel()}>
                ${this.getCurrentSlideLabel()}
              </span>
              ${this.renderSlideIndicators()}
            </div>
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