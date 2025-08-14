import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import * as styles from '../styles/iteration-deck-slide.css'

@customElement('iteration-deck-slide')
export class IterationDeckSlide extends LitElement {
  @property() label!: string
  @property({ attribute: 'ai-prompt' }) aiPrompt?: string
  @property() notes?: string
  @property({ type: Number }) confidence?: number

  @state() private isActive = false
  
  // Styles are applied via CSS classes from @vanilla-extract
  // No static styles needed as we use external stylesheets

  connectedCallback() {
    super.connectedCallback()
    // Parent notification will be implemented when full functionality is added
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    super.attributeChangedCallback(name, _old, value)
    // Slide data change notifications will be implemented later
  }

  render() {
    const isDevelopment = import.meta.env.DEV
    
    return html`
      <div class="${styles.slide} ${styles.slideContent}" 
           data-active="${this.isActive}"
           data-dev-mode="${isDevelopment}">
        <slot></slot>
      </div>
    `
  }
}