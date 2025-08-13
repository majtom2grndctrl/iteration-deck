import { Component, h, State, Listen } from '@stencil/core';
import { getIterationDeckStore, type DeckData } from '../core/store';
import { isDevelopment } from '../core/environment';

@Component({
  tag: 'iteration-deck-toolbar',
  styleUrl: 'iteration-deck-toolbar.css',
  shadow: true,
})
export class IterationDeckToolbar {
  @State() private decks: DeckData[] = [];
  @State() private activeDeckId: string | null = null;
  @State() private isVisible = false;

  private store = getIterationDeckStore();

  connectedCallback() {
    // Listen for store events
    window.addEventListener('iteration-deck:deck-registered', this.handleStoreUpdate);
    window.addEventListener('iteration-deck:deck-unregistered', this.handleStoreUpdate);
    window.addEventListener('iteration-deck:active-deck-changed', this.handleStoreUpdate);
    window.addEventListener('iteration-deck:slide-changed', this.handleStoreUpdate);
    
    // Initial state
    this.updateState();
  }

  disconnectedCallback() {
    window.removeEventListener('iteration-deck:deck-registered', this.handleStoreUpdate);
    window.removeEventListener('iteration-deck:deck-unregistered', this.handleStoreUpdate);
    window.removeEventListener('iteration-deck:active-deck-changed', this.handleStoreUpdate);
    window.removeEventListener('iteration-deck:slide-changed', this.handleStoreUpdate);
  }

  @Listen('keydown', { target: 'window' })
  handleKeydown(event: KeyboardEvent) {
    if (!isDevelopment() || !this.isVisible) return;
    
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.store.previousSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.store.nextSlide();
          break;
      }
    }
  }

  private handleStoreUpdate = () => {
    this.updateState();
  }

  private updateState() {
    this.decks = this.store.getAllDecks();
    this.activeDeckId = this.store.getActiveDeckId();
    this.isVisible = isDevelopment() && this.store.isGlobalToolbarVisible();
  }

  private handleDeckChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    this.store.setActiveDeck(target.value || null);
  }

  private handlePreviousSlide = () => {
    this.store.previousSlide();
  }

  private handleNextSlide = () => {
    this.store.nextSlide();
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    const activeDeck = this.store.getActiveDeck();
    const hasMultipleDecks = this.decks.length > 1;
    const currentSlideIndex = activeDeck?.activeSlideIndex ?? 0;
    const totalSlides = activeDeck?.slides.length ?? 0;
    const currentSlide = activeDeck?.slides[currentSlideIndex];
    const canNavigate = totalSlides > 1;

    return (
      <div class="toolbar" role="toolbar" aria-label="Iteration Deck Controls">
        {hasMultipleDecks && (
          <div class="deckSelectorContainer">
            <select 
              class="deckSelector"
              onChange={this.handleDeckChange}
              aria-label="Select iteration deck"
            >
              {this.decks.map(deck => (
                <option value={deck.id} selected={deck.id === this.activeDeckId}>
                  {deck.label || deck.id}
                </option>
              ))}
            </select>
            <div class="divider"></div>
          </div>
        )}

        <button
          class="navButton"
          onClick={this.handlePreviousSlide}
          disabled={!canNavigate}
          aria-label="Previous slide"
          title="Previous slide (Ctrl/Cmd + ←)"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7071 2.29289C11.0976 2.68342 11.0976 3.31658 10.7071 3.70711L6.41421 8L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289Z" fill="currentColor" />
          </svg>
        </button>

        <div class="slideInfo">
          {currentSlide && (
            <span class="slideLabel">{currentSlide.label}</span>
          )}
          <span class="slideCounter">
            {currentSlideIndex + 1} / {totalSlides}
          </span>
        </div>

        <button
          class="navButton"
          onClick={this.handleNextSlide}
          disabled={!canNavigate}
          aria-label="Next slide"
          title="Next slide (Ctrl/Cmd + →)"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289L11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071C4.90237 13.3166 4.90237 12.6834 5.29289 12.2929L9.58579 8L5.29289 3.70711C4.90237 3.31658 4.90237 2.68342 5.29289 2.29289Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    );
  }
}