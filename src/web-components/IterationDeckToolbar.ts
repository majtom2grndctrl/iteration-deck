import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { getIterationDeckStore, isDevelopment, type DeckData } from './store.js'
import { spacing, colors, typography, components, zIndex } from '../tokens.js'

@customElement('iteration-deck-toolbar')
export class IterationDeckToolbar extends LitElement {
  @state() private decks: DeckData[] = []
  @state() private activeDeckId: string | null = null
  @state() private isVisible = false

  private store = getIterationDeckStore()

  static styles = css`
    :host {
      position: fixed;
      bottom: ${unsafeCSS(spacing.xl)};
      left: 50%;
      transform: translateX(-50%);
      z-index: ${unsafeCSS(zIndex.toolbar)};
      font-family: ${unsafeCSS(typography.fontFamily)};
      font-size: ${unsafeCSS(typography.fontSize.sm)};
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: ${unsafeCSS(spacing.sm)};
      background: ${unsafeCSS(colors.background.overlay)};
      backdrop-filter: ${unsafeCSS(components.toolbar.backdropFilter)};
      border: 1px solid ${unsafeCSS(colors.border.light)};
      border-radius: ${unsafeCSS(components.toolbar.borderRadius)};
      padding: ${unsafeCSS(spacing.sm)} ${unsafeCSS(spacing.lg)};
      box-shadow: ${unsafeCSS(components.toolbar.boxShadow)};
      min-height: ${unsafeCSS(components.toolbar.minHeight)};
      user-select: none;
    }

    @media (prefers-color-scheme: dark) {
      .toolbar {
        background: ${unsafeCSS(colors.background.overlayDark)};
        border-color: ${unsafeCSS(colors.border.dark)};
        color: ${unsafeCSS(colors.text.inverse)};
      }
    }

    .deck-selector {
      background: none;
      border: none;
      padding: ${unsafeCSS(spacing.xs)} ${unsafeCSS(spacing.md)};
      border-radius: ${unsafeCSS(components.button.borderRadius)};
      font-size: ${unsafeCSS(typography.fontSize.sm)};
      font-family: inherit;
      cursor: pointer;
      min-width: 120px;
    }

    .deck-selector:hover {
      background: ${unsafeCSS(colors.interactive.hover)};
    }

    @media (prefers-color-scheme: dark) {
      .deck-selector {
        color: ${unsafeCSS(colors.text.inverse)};
      }
      
      .deck-selector:hover {
        background: ${unsafeCSS(colors.interactive.hoverDark)};
      }
    }

    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${unsafeCSS(components.button.size.sm)};
      height: ${unsafeCSS(components.button.size.sm)};
      border: none;
      border-radius: ${unsafeCSS(components.button.borderRadius)};
      background: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .nav-button:hover:not(:disabled) {
      background: ${unsafeCSS(colors.interactive.hover)};
    }

    .nav-button:disabled {
      opacity: ${unsafeCSS(colors.interactive.disabled)};
      cursor: not-allowed;
    }

    @media (prefers-color-scheme: dark) {
      .nav-button:hover:not(:disabled) {
        background: ${unsafeCSS(colors.interactive.hoverDark)};
      }
    }

    .nav-button svg {
      width: ${unsafeCSS(spacing.lg)};
      height: ${unsafeCSS(spacing.lg)};
      fill: currentColor;
    }

    .slide-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 100px;
      gap: 2px;
    }

    .slide-label {
      font-weight: ${unsafeCSS(typography.fontWeight.medium)};
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .slide-counter {
      font-size: ${unsafeCSS(typography.fontSize.xs)};
      opacity: 0.7;
    }

    .divider {
      width: ${unsafeCSS(components.divider.width)};
      height: ${unsafeCSS(components.divider.height)};
      background: ${unsafeCSS(colors.border.medium)};
      margin: 0 ${unsafeCSS(spacing.xs)};
    }

    @media (prefers-color-scheme: dark) {
      .divider {
        background: ${unsafeCSS(colors.border.darkMedium)};
      }
    }

    :host([hidden]) {
      display: none !important;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    
    // Listen for store events
    window.addEventListener('iteration-deck:deck-registered', this.handleStoreUpdate)
    window.addEventListener('iteration-deck:deck-unregistered', this.handleStoreUpdate)
    window.addEventListener('iteration-deck:active-deck-changed', this.handleStoreUpdate)
    window.addEventListener('iteration-deck:slide-changed', this.handleStoreUpdate)
    
    // Setup keyboard shortcuts
    window.addEventListener('keydown', this.handleKeydown)
    
    // Initial state
    this.updateState()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('iteration-deck:deck-registered', this.handleStoreUpdate)
    window.removeEventListener('iteration-deck:deck-unregistered', this.handleStoreUpdate)
    window.removeEventListener('iteration-deck:active-deck-changed', this.handleStoreUpdate)
    window.removeEventListener('iteration-deck:slide-changed', this.handleStoreUpdate)
    window.removeEventListener('keydown', this.handleKeydown)
  }

  private handleStoreUpdate = () => {
    this.updateState()
  }

  private updateState() {
    this.decks = this.store.getAllDecks()
    this.activeDeckId = this.store.getActiveDeckId()
    this.isVisible = isDevelopment() && this.store.isGlobalToolbarVisible()
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (!isDevelopment() || !this.isVisible) return
    
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          this.store.previousSlide()
          break
        case 'ArrowRight':
          event.preventDefault()
          this.store.nextSlide()
          break
      }
    }
  }

  private handleDeckChange(event: Event) {
    const target = event.target as HTMLSelectElement
    this.store.setActiveDeck(target.value || null)
  }

  private handlePreviousSlide() {
    this.store.previousSlide()
  }

  private handleNextSlide() {
    this.store.nextSlide()
  }

  render() {
    if (!this.isVisible) {
      return html``
    }

    const activeDeck = this.store.getActiveDeck()
    const hasMultipleDecks = this.decks.length > 1
    const currentSlideIndex = activeDeck?.activeSlideIndex ?? 0
    const totalSlides = activeDeck?.slides.length ?? 0
    const currentSlide = activeDeck?.slides[currentSlideIndex]
    const canNavigate = totalSlides > 1

    return html`
      <div class="toolbar" role="toolbar" aria-label="Iteration Deck Controls">
        ${hasMultipleDecks ? html`
          <select 
            class="deck-selector"
            .value="${this.activeDeckId || ''}"
            @change="${this.handleDeckChange}"
            aria-label="Select iteration deck"
          >
            ${this.decks.map(deck => html`
              <option value="${deck.id}">
                ${deck.label || deck.id}
              </option>
            `)}
          </select>
          <div class="divider"></div>
        ` : ''}

        <button
          class="nav-button"
          @click="${this.handlePreviousSlide}"
          ?disabled="${!canNavigate}"
          aria-label="Previous slide"
          title="Previous slide (Ctrl/Cmd + ←)"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7071 2.29289C11.0976 2.68342 11.0976 3.31658 10.7071 3.70711L6.41421 8L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289Z" fill="currentColor" />
          </svg>
        </button>

        <div class="slide-info">
          ${currentSlide ? html`
            <span class="slide-label">${currentSlide.label}</span>
          ` : ''}
          <span class="slide-counter">
            ${currentSlideIndex + 1} / ${totalSlides}
          </span>
        </div>

        <button
          class="nav-button"
          @click="${this.handleNextSlide}"
          ?disabled="${!canNavigate}"
          aria-label="Next slide"
          title="Next slide (Ctrl/Cmd + →)"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289L11.7071 7.29289C12.0976 7.68342 12.0976 8.31658 11.7071 8.70711L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071C4.90237 13.3166 4.90237 12.6834 5.29289 12.2929L9.58579 8L5.29289 3.70711C4.90237 3.31658 4.90237 2.68342 5.29289 2.29289Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    `
  }
}