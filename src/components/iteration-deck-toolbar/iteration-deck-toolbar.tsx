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
  
  @State() storeState = useIterationDeckStore.getState();
  
  private unsubscribe?: () => void;
  
  componentWillLoad() {
    // Singleton pattern - only allow one toolbar instance
    if (toolbarInstance && toolbarInstance !== this) {
      // Remove existing toolbar from DOM
      if (toolbarInstance.el && document.body.contains(toolbarInstance.el)) {
        toolbarInstance.el.remove();
      }
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
  }
  
  private renderDeckSelector() {
    const { decks, activeDeckId } = this.storeState;
    const deckArray = Array.from(decks.values());
    
    if (deckArray.length <= 1) {
      // Don't show selector for single deck
      return null;
    }
    
    return (
      <select
        class="deck-selector"
        style={{
          background: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '16px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontSize: '13px',
          color: '#374151',
          outline: 'none',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg viewBox=\'0 0 4 5\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M2 0L0 2h4zm0 5L0 3h4z\' fill=\'%23374151\'/></svg>")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          backgroundSize: '8px',
          paddingRight: '24px',
          minWidth: '120px'
        }}
        onInput={(event) => {
          const target = event.target as HTMLSelectElement;
          if (target.value) {
            this.handleDeckSelect(target.value);
          }
        }}
        aria-label="Select deck"
      >
        {deckArray.map(deck => (
          <option key={deck.id} value={deck.id} selected={deck.id === activeDeckId}>
            {deck.label || deck.id}
          </option>
        ))}
      </select>
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
    
    // Additional safety check - only render if this is the singleton instance
    if (toolbarInstance !== this) {
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
