import { Component, Host, h, State, Listen, Element } from '@stencil/core';
import { useIterationDeckStore } from '../../store/iteration-deck-store';
import { isDevMode } from '../../utils/environment';
// import {
//   host,
//   toolbar,
//   deckSelector,
//   navControls,
//   navButton,
//   slideInfo,
//   dropdownMenu,
//   dropdownItem,
//   dropdownItemActive
// } from './iteration-deck-toolbar.css';

// Singleton instance tracker
let toolbarInstance: IterationDeckToolbar | null = null;

@Component({
  tag: 'iteration-deck-toolbar',
  shadow: true,
})
export class IterationDeckToolbar {
  @Element() el!: HTMLElement;
  
  @State() isDropdownOpen = false;
  @State() storeState = useIterationDeckStore.getState();
  
  private unsubscribe?: () => void;
  
  componentWillLoad() {
    // Singleton pattern - only allow one toolbar instance
    if (toolbarInstance && toolbarInstance !== this) {
      // Remove existing toolbar from DOM
      toolbarInstance.el?.remove();
    }
    toolbarInstance = this;
    
    // Subscribe to store changes
    this.unsubscribe = useIterationDeckStore.subscribe((state) => {
      this.storeState = { ...state };
    });
  }
  
  disconnectedCallback() {
    if (toolbarInstance === this) {
      toolbarInstance = null;
    }
    this.unsubscribe?.();
  }
  
  @Listen('keydown', { target: 'document' })
  handleKeydown(event: KeyboardEvent) {
    // Only handle shortcuts in development mode
    if (!isDevMode()) return;
    
    const { activeDeckId } = this.storeState;
    if (!activeDeckId) return;
    
    // Check for Ctrl/Cmd + Arrow keys
    if ((event.ctrlKey || event.metaKey) && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      
      const store = useIterationDeckStore.getState();
      const currentDeck = store.decks.get(activeDeckId);
      if (!currentDeck) return;
      
      const currentIndex = store.activeSlideIndex;
      const maxIndex = currentDeck.slideCount - 1;
      
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        store.setActiveSlide(currentIndex - 1);
      } else if (event.key === 'ArrowRight' && currentIndex < maxIndex) {
        store.setActiveSlide(currentIndex + 1);
      }
    }
  }
  
  private handlePrevSlide = () => {
    const { activeDeckId, activeSlideIndex } = this.storeState;
    if (!activeDeckId) return;
    
    const store = useIterationDeckStore.getState();
    if (activeSlideIndex > 0) {
      store.setActiveSlide(activeSlideIndex - 1);
    }
  }
  
  private handleNextSlide = () => {
    const { activeDeckId, activeSlideIndex } = this.storeState;
    if (!activeDeckId) return;
    
    const store = useIterationDeckStore.getState();
    const currentDeck = store.decks.get(activeDeckId);
    if (!currentDeck) return;
    
    const maxIndex = currentDeck.slideCount - 1;
    if (activeSlideIndex < maxIndex) {
      store.setActiveSlide(activeSlideIndex + 1);
    }
  }
  
  private handleDeckSelect = (deckId: string) => {
    useIterationDeckStore.getState().setActiveDeck(deckId);
    this.isDropdownOpen = false;
  }
  
  private toggleDropdown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  private renderDeckSelector() {
    const { decks, activeDeckId } = this.storeState;
    const deckArray = Array.from(decks.values());
    
    if (deckArray.length <= 1) {
      // Don't show selector for single deck
      return null;
    }
    
    const activeDeck = activeDeckId ? decks.get(activeDeckId) : null;
    const activeLabel = activeDeck?.label || activeDeck?.id || 'Select Deck';
    
    return (
      <div style={{ position: 'relative' }}>
        <button
          class="deck-selector"
          style={{
            background: 'transparent',
            border: '1px solid #d1d5db',
            borderRadius: '16px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '13px',
            color: '#374151'
          }}
          onClick={this.toggleDropdown}
          aria-expanded={this.isDropdownOpen.toString()}
          aria-haspopup="true"
        >
          {activeLabel} ▼
        </button>
        
        {this.isDropdownOpen && (
          <div class="dropdown-menu" style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            marginTop: '4px',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '150px',
            overflow: 'hidden'
          }}>
            {deckArray.map(deck => (
              <button
                key={deck.id}
                class={`dropdown-item ${deck.id === activeDeckId ? 'dropdown-item-active' : ''}`}
                style={{
                  background: deck.id === activeDeckId ? '#f3f4f6' : 'transparent',
                  border: 'none',
                  padding: '8px 12px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#374151'
                }}
                onClick={() => this.handleDeckSelect(deck.id)}
              >
                {deck.label || deck.id}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  private renderSlideInfo() {
    const { activeDeckId, activeSlideIndex, decks } = this.storeState;
    
    if (!activeDeckId) return null;
    
    const currentDeck = decks.get(activeDeckId);
    if (!currentDeck) return null;
    
    const slideLabel = currentDeck.slides[activeSlideIndex]?.label || `Slide ${activeSlideIndex + 1}`;
    
    return (
      <div class="slide-info" style={{
        padding: '0 12px',
        color: '#374151',
        fontSize: '13px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px'
      }}>
        {slideLabel}
      </div>
    );
  }
  
  render() {
    // Only render in development mode
    if (!isDevMode()) {
      return null;
    }
    
    const { activeDeckId, activeSlideIndex, decks } = this.storeState;
    const currentDeck = activeDeckId ? decks.get(activeDeckId) : null;
    const hasPrev = activeSlideIndex > 0;
    const hasNext = currentDeck ? activeSlideIndex < currentDeck.slideCount - 1 : false;
    
    // Don't render if no decks are registered
    if (decks.size === 0) {
      return null;
    }
    
    return (
      <Host class="host" style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '1000'
      }}>
        <div class="toolbar" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '8px 16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          {this.renderDeckSelector()}
          
          <div class="nav-controls" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <button
              class="nav-button"
              onClick={this.handlePrevSlide}
              style={{
                background: hasPrev ? '#3b82f6' : '#e5e7eb',
                color: hasPrev ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: hasPrev ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              disabled={!hasPrev}
              aria-label="Previous slide"
              title="Previous slide (Ctrl/Cmd + ←)"
            >
              ←
            </button>
            
            {this.renderSlideInfo()}
            
            <button
              class="nav-button"
              onClick={this.handleNextSlide}
              style={{
                background: hasNext ? '#3b82f6' : '#e5e7eb',
                color: hasNext ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: hasNext ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              disabled={!hasNext}
              aria-label="Next slide"
              title="Next slide (Ctrl/Cmd + →)"
            >
              →
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
