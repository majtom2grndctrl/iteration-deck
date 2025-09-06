/**
 * IterationDeck Lit Web Component
 * 
 * Simple container component that wraps AI-generated UI variations.
 * Uses the shared design tokens for consistency with React implementation.
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Import shared types and utilities
import type { 
  IterationDeckProps,
} from '../../shared/types.js';
import { 
  isDevelopmentMode,
  tokens 
} from '../../shared/index.js';

@customElement('iteration-deck')
export class IterationDeck extends LitElement implements IterationDeckProps {
  @property({ type: String, reflect: true })
  id!: string;

  @property({ type: String, reflect: false })
  label?: string;

  @property({ type: String, reflect: false })
  prompt?: string;

  @property({ type: String, reflect: false })
  description?: string;

  @property({ type: Boolean, attribute: 'enable-in-production' })
  enableInProduction = false;

  @state()
  private _isProduction = !isDevelopmentMode();

  static styles = css`
    :host {
      display: block;
      min-height: 1px;
      
      --iteration-deck-bg: ${unsafeCSS(tokens.colors.white)};
      --iteration-deck-border: ${unsafeCSS(tokens.colors.gray[200])};
      --iteration-deck-radius: ${unsafeCSS(tokens.borderRadius.md)};
    }
    
    @media (prefers-color-scheme: dark) {
      :host {
        --iteration-deck-bg: ${unsafeCSS(tokens.colors.gray[900])};
        --iteration-deck-border: ${unsafeCSS(tokens.colors.gray[700])};
      }
    }
    
    .container {
      display: block;
      min-height: inherit;
      background: var(--iteration-deck-bg);
      border: 1px solid var(--iteration-deck-border);
      border-radius: var(--iteration-deck-radius);
      padding: ${unsafeCSS(tokens.spacing[4])};
      transition: all ${unsafeCSS(tokens.animation.duration.normal)} ${unsafeCSS(tokens.animation.easing.ease)};
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    
    if (!this.id) {
      console.error('IterationDeck requires an id property');
      return;
    }
  }

  private _shouldActivate(): boolean {
    return !this._isProduction || this.enableInProduction;
  }

  render() {
    if (!this.id) {
      return html`<slot></slot>`;
    }

    const containerClass = this._shouldActivate() ? 'container development' : 'container production';

    return html`
      <div class="${containerClass}">
        <slot></slot>
      </div>
    `;
  }
}