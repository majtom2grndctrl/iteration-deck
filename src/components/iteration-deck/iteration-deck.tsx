import { Component, Host, h, Prop, State, Element, Watch, Listen } from '@stencil/core';
import { useIterationDeckStore, DeckInfo, SlideInfo } from '../../store/iteration-deck-store';
import { detectEnvironment } from '../../utils/environment';
import * as styles from './iteration-deck.css';

@Component({
  tag: 'iteration-deck',
  shadow: true,
})
export class IterationDeck {
  @Element() el!: HTMLElement;

  /** Unique identifier for this iteration deck */
  @Prop() deckId!: string;
  
  /** Label for this deck in the toolbar */
  @Prop() label: string | undefined;
  
  /** Optional AI prompt context for generation tracking */
  @Prop() prompt: string | undefined;
  
  /** Additional context for stakeholder presentations */
  @Prop() description: string | undefined;
  
  /** Currently active slide index */
  @Prop({ mutable: true }) activeIndex: number = 0;

  @State() isProduction: boolean = false;
  @State() slides: SlideInfo[] = [];
  @State() storeSubscription: (() => void) | null = null;

  private deckStore = useIterationDeckStore;

  connectedCallback() {
    // Detect environment
    const env = detectEnvironment();
    this.isProduction = env.isProduction;

    // Collect slides from child elements
    this.collectSlides();

    // Register this deck with the global store
    this.registerDeck();

    // Subscribe to store changes
    this.subscribeToStore();
  }

  disconnectedCallback() {
    // Unregister from store
    this.deckStore.getState().unregisterDeck(this.deckId);
    
    // Cleanup subscription
    if (this.storeSubscription) {
      this.storeSubscription();
    }
  }

  @Watch('activeIndex')
  onActiveIndexChange(newIndex: number) {
    this.deckStore.getState().setActiveSlide(this.deckId, newIndex);
  }

  @Listen('slotchange')
  onSlotChange() {
    // Re-collect slides when content changes
    this.collectSlides();
    this.updateStoreSlides();
  }

  private collectSlides() {
    const slideElements = this.el.querySelectorAll('iteration-deck-slide');
    this.slides = Array.from(slideElements).map((slideEl) => {
      const element = slideEl as any; // Type assertion for custom element properties
      return {
        label: element.label || 'Untitled Slide',
        aiPrompt: element.aiPrompt,
        notes: element.notes,
        confidence: element.confidence
      };
    });
  }

  private registerDeck() {
    const deckInfo: DeckInfo = {
      id: this.deckId,
      label: this.label,
      prompt: this.prompt,
      description: this.description,
      slides: this.slides,
      activeSlideIndex: this.activeIndex
    };

    this.deckStore.getState().registerDeck(deckInfo);
  }

  private updateStoreSlides() {
    this.deckStore.getState().updateDeckSlides(this.deckId, this.slides);
  }

  private subscribeToStore() {
    this.storeSubscription = this.deckStore.subscribe((state) => {
      const deck = state.decks.get(this.deckId);
      if (deck && deck.activeSlideIndex !== this.activeIndex) {
        this.activeIndex = deck.activeSlideIndex;
      }
    });
  }

  render() {
    const activeSlideIndex = this.isProduction ? 0 : this.activeIndex;
    
    return (
      <Host class={{
        [styles.host]: true,
        'production-mode': this.isProduction,
        'development-mode': !this.isProduction
      }}>
        <div class={styles.deckContainer} data-active-slide={activeSlideIndex}>
          <slot onSlotchange={() => this.onSlotChange()}></slot>
        </div>
        {!this.isProduction && this.slides.length > 1 && (
          <div class={styles.slideIndicator}>
            {this.slides.map((slide, index) => (
              <button
                class={`${styles.slideDot} ${index === activeSlideIndex ? styles.slideDotActive : ''}`}
                onClick={() => this.activeIndex = index}
                aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                title={slide.label}
              ></button>
            ))}
            <div class={styles.slideLabel}>
              {this.slides[activeSlideIndex]?.label || `Slide ${activeSlideIndex + 1}`}
            </div>
          </div>
        )}
      </Host>
    );
  }
}
