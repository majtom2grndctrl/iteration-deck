import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { getIterationDeckStore, isDevelopment, type SlideData } from './store.js'

@customElement('iteration-deck')
export class IterationDeck extends LitElement {
  @property() id!: string
  @property() label?: string
  @property() prompt?: string
  @property() description?: string
  
  @state() private activeSlideIndex = 0
  @state() private slides: SlideData[] = []

  private store = getIterationDeckStore()
  private observer?: MutationObserver

  static styles = css`
    :host {
      display: block;
    }

    .iteration-deck {
      position: relative;
    }

    .slide {
      display: none;
    }

    .slide.active {
      display: block;
    }

    /* In development, show all slides but only make one visible */
    .slides-container.dev-mode .slide {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0;
      pointer-events: none;
    }

    .slides-container.dev-mode .slide.active {
      opacity: 1;
      pointer-events: auto;
      position: relative;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    
    // Set up observer for child changes
    this.observer = new MutationObserver(() => {
      this.extractSlideData()
      this.registerWithStore()
    })
    
    this.observer.observe(this, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['label', 'ai-prompt', 'notes', 'confidence']
    })
    
    // Initial extraction (might not have children yet)
    this.extractSlideData()
    this.registerWithStore()
    this.addEventListener('slide-data-updated', this.handleSlideDataUpdated)
    
    // Listen for global state changes
    window.addEventListener('iteration-deck:slide-changed', this.handleSlideChange)
    
    // Also try extracting after a short delay for React children
    setTimeout(() => {
      this.extractSlideData()
      this.registerWithStore()
    }, 0)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.observer?.disconnect()
    this.store.unregisterDeck(this.id)
    this.removeEventListener('slide-data-updated', this.handleSlideDataUpdated)
    window.removeEventListener('iteration-deck:slide-changed', this.handleSlideChange)
  }

  private extractSlideData() {
    const slideElements = Array.from(this.querySelectorAll('iteration-deck-slide'))
    this.slides = slideElements.map(element => ({
      label: element.getAttribute('label') || 'Untitled',
      aiPrompt: element.getAttribute('ai-prompt') || undefined,
      notes: element.getAttribute('notes') || undefined,
      confidence: element.hasAttribute('confidence') 
        ? parseFloat(element.getAttribute('confidence')!) 
        : undefined
    }))
  }

  private registerWithStore() {
    this.store.registerDeck({
      id: this.id,
      label: this.label,
      prompt: this.prompt,
      description: this.description,
      slides: this.slides,
      activeSlideIndex: this.activeSlideIndex,
      element: this
    })
  }

  // Public methods for testing
  public _extractSlideData() {
    this.extractSlideData()
  }
  
  public _registerWithStore() {
    this.registerWithStore()
  }

  private handleSlideDataUpdated = () => {
    this.extractSlideData()
    this.registerWithStore()
  }

  private handleSlideChange = (event: Event) => {
    const customEvent = event as CustomEvent
    const { deckId, slideIndex } = customEvent.detail
    
    if (deckId === this.id) {
      this.activeSlideIndex = slideIndex
      this.updateSlideVisibility()
    }
  }

  private updateSlideVisibility() {
    const slideElements = Array.from(this.querySelectorAll('iteration-deck-slide'))
    slideElements.forEach((slide, index) => {
      const isActive = index === this.activeSlideIndex
      slide.toggleAttribute('active', isActive)
    })
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('label') || 
        changedProperties.has('prompt') || 
        changedProperties.has('description')) {
      this.registerWithStore()
    }
    
    // Update slide visibility when component updates
    this.updateSlideVisibility()
  }

  render() {
    const isDev = isDevelopment()
    
    if (!isDev) {
      // Production: render only the first slide
      const firstSlide = this.querySelector('iteration-deck-slide')
      return html`
        <div class="iteration-deck">
          <slot name="first-slide"></slot>
          ${firstSlide ? html`<div class="slide active">${firstSlide}</div>` : html`<slot></slot>`}
        </div>
      `
    }

    // Development: render all slides with visibility control
    return html`
      <div class="iteration-deck">
        <div class="slides-container dev-mode">
          <slot></slot>
        </div>
      </div>
    `
  }
}