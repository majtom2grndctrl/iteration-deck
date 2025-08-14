import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import * as styles from '../styles/iteration-deck.css'

@customElement('iteration-deck')
export class IterationDeck extends LitElement {
  @property() id!: string
  @property() label?: string
  @property() prompt?: string
  @property() description?: string
  
  @state() private activeSlideIndex = 0

  // Styles are applied via CSS classes from @vanilla-extract
  // No static styles needed as we use external stylesheets

  connectedCallback() {
    super.connectedCallback()
    // Environment detection stub - will be implemented later
    // For now, always show first slide in both dev and production
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    // Cleanup will be implemented when full functionality is added
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('id') || changedProperties.has('label')) {
      // Store registration will be implemented later
    }
  }

  render() {
    // Environment detection for production vs development behavior
    const isDevelopment = import.meta.env.DEV

    return html`
      <div class="${styles.iterationDeck} ${styles.responsiveContainer}" 
           data-dev-mode="${isDevelopment}">
        <div class="${isDevelopment ? styles.slidesContainerDev : styles.slidesContainer}">
          <slot></slot>
        </div>
      </div>
    `
  }
}