import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import { detectEnvironment } from '../../utils/environment';
import * as styles from './iteration-deck-slide.css';

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

  connectedCallback() {
    // Detect environment
    const env = detectEnvironment();
    this.isProduction = env.isProduction;

    // Determine slide position within parent deck
    this.calculateSlideIndex();

    // Determine if this slide should be active
    this.updateActiveState();
  }

  private calculateSlideIndex() {
    const parent = this.el.closest('iteration-deck');
    if (parent) {
      const slides = Array.from(parent.querySelectorAll('iteration-deck-slide'));
      this.slideIndex = slides.findIndex(slide => slide === this.el);
    }
  }

  private updateActiveState() {
    const parent = this.el.closest('iteration-deck') as any;
    if (parent) {
      // In production, only first slide is active
      if (this.isProduction) {
        this.isActive = this.slideIndex === 0;
      } else {
        // In development, check parent's activeIndex
        this.isActive = this.slideIndex === (parent.activeIndex || 0);
      }
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

    return (
      <Host class={{
        [styles.host]: true,
        [styles.hostActive]: this.isActive,
        [styles.hostInactive]: !this.isActive,
        'active': this.isActive,
        'inactive': !this.isActive,
        'production-mode': this.isProduction,
        'development-mode': !this.isProduction
      }}>
        <div class={styles.slideContent}>
          <slot></slot>
        </div>
        {!this.isProduction && this.confidence && (
          <div class={styles.slideMetadata}>
            <div class={styles.confidenceScore} title={`AI confidence: ${Math.round(this.confidence * 100)}%`}>
              {Math.round(this.confidence * 100)}%
            </div>
          </div>
        )}
        {!this.isProduction && this.notes && (
          <div class={styles.slideNotes} title={this.notes}>
            <button class={styles.notesToggle} aria-label="Show notes">
              📝
            </button>
          </div>
        )}
      </Host>
    );
  }
}
