import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { isDevelopment } from './store.js'

@customElement('iteration-deck-slide')
export class IterationDeckSlide extends LitElement {
  @property() label!: string
  @property({ attribute: 'ai-prompt' }) aiPrompt?: string
  @property() notes?: string
  @property({ type: Number }) confidence?: number

  static styles = css`
    :host {
      display: block;
    }

    :host([active]) {
      /* Slide is currently active */
    }

    .slide-content {
      width: 100%;
    }

    /* Production mode - only show if this is the first slide */
    :host(:not([active])) {
      display: none;
    }

    /* Development mode - handle visibility through parent */
    .dev-mode :host(:not([active])) {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .dev-mode :host([active]) {
      opacity: 1;
      pointer-events: auto;
      position: relative;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.notifyParentOfSlideData()
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    super.attributeChangedCallback(name, _old, value)
    
    // Notify parent when slide attributes change
    if (['label', 'ai-prompt', 'notes', 'confidence'].includes(name)) {
      this.notifyParentOfSlideData()
    }
  }

  private notifyParentOfSlideData() {
    // Dispatch event to parent IterationDeck to update slide data
    this.dispatchEvent(new CustomEvent('slide-data-updated', {
      bubbles: true,
      detail: {
        label: this.label,
        aiPrompt: this.aiPrompt,
        notes: this.notes,
        confidence: this.confidence
      }
    }))
  }

  render() {
    const isDev = isDevelopment()
    
    return html`
      <div class="slide-content ${isDev ? 'dev-mode' : ''}">
        <slot></slot>
      </div>
    `
  }
}