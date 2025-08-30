/**
 * @fileoverview IterationConfidenceBar - Reusable AI confidence indicator component
 * 
 * A standalone component for displaying AI generation confidence scores (0-1 scale)
 * with visual color-coding and accessibility support.
 * 
 * Features:
 * - Visual confidence bar with gradient colors (red → yellow → green)
 * - Three confidence levels: low (<0.6), medium (0.6-0.8), high (≥0.8)
 * - Customizable size and positioning
 * - ShadowDOM encapsulated styling
 * - Accessibility support with ARIA labels
 * - Development/production mode awareness
 * 
 * @example
 * ```html
 * <iteration-confidence-bar confidence="0.85" size="small"></iteration-confidence-bar>
 * ```
 * 
 * @author Claude Code (claude.ai/code)
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Import design tokens
import { spacing, duration, easing } from '../../tokens/index.js';

export interface IterationConfidenceBarProps {
  /** AI confidence score (0-1 scale) */
  confidence?: number;
  /** Visual size variant */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show in production mode */
  showInProduction?: boolean;
}

/**
 * IterationConfidenceBar component for displaying AI generation confidence
 */
@customElement('iteration-confidence-bar')
export class IterationConfidenceBar extends LitElement {
  
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    /* Base confidence indicator styling */
    .confidence-indicator {
      background: rgba(0, 0, 0, 0.1);
      border-radius: ${unsafeCSS(spacing.spacing8)}; /* Large border radius for pill shape */
      overflow: hidden;
      position: relative;
    }
    
    /* Size variations */
    .confidence-indicator.small {
      width: 40px;
      height: 3px;
    }
    
    .confidence-indicator.medium {
      width: 60px;
      height: 4px;
    }
    
    .confidence-indicator.large {
      width: 80px;
      height: 6px;
    }
    
    /* Confidence bar with gradient colors */
    .confidence-bar {
      height: 100%;
      background: linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%);
      border-radius: ${unsafeCSS(spacing.spacing8)}; /* Large border radius for pill shape */
      transform-origin: left center;
      transition: width ${unsafeCSS(duration.slow)} ${unsafeCSS(easing.easeInOut)};
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .confidence-indicator {
        background: rgba(255, 255, 255, 0.2);
      }
    }
    
    /* Accessibility: respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .confidence-bar {
        transition: none;
      }
    }
  `;

  @property({ type: Number })
  confidence?: number;

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'show-in-production' })
  showInProduction = false;

  /**
   * Check if component should be visible
   */
  private get shouldShow(): boolean {
    const isProduction = process.env.NODE_ENV === 'production';
    return !isProduction || this.showInProduction;
  }

  /**
   * Validate and clamp confidence value
   */
  private get validatedConfidence(): number | null {
    if (this.confidence === undefined || this.confidence === null) return null;
    
    // Clamp to valid range
    const clamped = Math.max(0, Math.min(1, this.confidence));
    
    // Value automatically clamped to valid range
    
    return clamped;
  }

  /**
   * Get confidence level for styling and accessibility
   */
  private getConfidenceLevel(): 'low' | 'medium' | 'high' | null {
    const confidence = this.validatedConfidence;
    if (confidence === null) return null;
    
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.6) return 'medium';
    return 'low';
  }

  /**
   * Get accessibility label for confidence level
   */
  private getAriaLabel(): string {
    const confidence = this.validatedConfidence;
    if (confidence === null) return 'No confidence score';
    
    const percentage = Math.round(confidence * 100);
    const level = this.getConfidenceLevel();
    
    return `AI confidence: ${percentage}% (${level} confidence)`;
  }

  render() {
    const confidence = this.validatedConfidence;
    
    // Hide if not in development mode (unless explicitly shown)
    if (!this.shouldShow) {
      return html``;
    }
    
    // Hide if no valid confidence score
    if (confidence === null) {
      return html``;
    }
    
    const confidenceLevel = this.getConfidenceLevel();
    const percentage = Math.round(confidence * 100);
    
    return html`
      <div 
        class="confidence-indicator ${this.size}"
        role="progressbar"
        aria-valuenow="${percentage}"
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-label="${this.getAriaLabel()}"
        title="${this.getAriaLabel()}"
      >
        <div 
          class="confidence-bar"
          style="width: ${percentage}%"
          data-level="${confidenceLevel}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'iteration-confidence-bar': IterationConfidenceBar;
  }
}