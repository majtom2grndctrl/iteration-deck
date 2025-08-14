import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import { detectEnvironment } from '../../utils/environment';
// import * as styles from './iteration-deck-slide.css';

@Component({
  tag: 'iteration-deck-slide',
  shadow: true,
})
export class IterationDeckSlide {
  @Element() el!: HTMLElement;

  /** Label for this slide/variation */
  @Prop() label!: string;
  
  /** Optional AI prompt refinements for this specific variation */
  @Prop() aiPrompt: string | undefined;
  
  /** Design rationale, AI feedback, or iteration insights */
  @Prop() notes: string | undefined;
  
  /** AI generation confidence score (0-1, dev mode only) */
  @Prop() confidence: number | undefined;

  @State() isProduction: boolean = false;
  @State() isActive: boolean = false;
  @State() slideIndex: number = 0;
  
  private attributeObserver?: MutationObserver;

  connectedCallback() {
    // Detect environment
    const env = detectEnvironment();
    this.isProduction = env.isProduction;

    // Determine slide position within parent deck
    this.calculateSlideIndex();

    // Determine if this slide should be active
    this.updateActiveState();
    
    // Watch for parent attribute changes
    this.setupAttributeObserver();
  }
  
  disconnectedCallback() {
    if (this.attributeObserver) {
      this.attributeObserver.disconnect();
    }
  }
  
  private setupAttributeObserver() {
    this.attributeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-parent-active-index') {
          this.updateActiveState();
        }
      });
    });
    
    this.attributeObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ['data-parent-active-index']
    });
  }

  private calculateSlideIndex() {
    const parent = this.el.closest('iteration-deck');
    if (parent) {
      const slides = Array.from(parent.querySelectorAll('iteration-deck-slide'));
      this.slideIndex = slides.findIndex(slide => slide === this.el);
    }
  }

  // Make this method public so parent can call it
  public updateActiveState() {
    const parent = this.el.closest('iteration-deck') as any;
    if (parent) {
      // In production, only first slide is active
      if (this.isProduction) {
        this.isActive = this.slideIndex === 0;
      } else {
        // In development, check parent's activeIndex
        this.isActive = this.slideIndex === (parent.activeIndex || 0);
      }
      
      // Since isActive is a @State, changing it should trigger a re-render automatically
    }
  }

  componentWillRender() {
    // Update active state before each render
    this.updateActiveState();
  }

  render() {
    // In production mode, only render if this is the first slide
    if (this.isProduction && this.slideIndex !== 0) {
      return null;
    }

    const hostStyles = {
      display: this.isActive || this.isProduction ? 'block' : 'none',
      transition: 'opacity 0.3s ease',
      opacity: (this.isActive || this.isProduction ? 1 : 0).toString()
    };

    return (
      <Host class={{
        'host': true,
        'host-active': this.isActive,
        'host-inactive': !this.isActive,
        'active': this.isActive,
        'inactive': !this.isActive,
        'production-mode': this.isProduction,
        'development-mode': !this.isProduction
      }} style={hostStyles}>
        <div class="slide-content" style={{ position: 'relative' }}>
          <slot></slot>
        </div>
        {!this.isProduction && this.confidence && (
          <div class="slide-metadata" style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            <div class="confidence-score" title={`AI confidence: ${Math.round(this.confidence * 100)}%`}>
              {Math.round(this.confidence * 100)}%
            </div>
          </div>
        )}
        {!this.isProduction && this.notes && (
          <div class="slide-notes" title={this.notes} style={{
            position: 'absolute',
            top: '8px',
            left: '8px'
          }}>
            <button class="notes-toggle" aria-label="Show notes" style={{
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              border: 'none',
              borderRadius: '12px',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              fontSize: '12px'
            }}>
              📝
            </button>
          </div>
        )}
      </Host>
    );
  }
}
