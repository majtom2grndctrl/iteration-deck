import { Component, Prop, h, State, Listen, Method, Element } from '@stencil/core';
import { getIterationDeckStore, type SlideData } from '../core/store';
import { isDevelopment } from '../core/environment';

@Component({
  tag: 'iteration-deck',
  styleUrl: 'iteration-deck.css',
  shadow: true,
})
export class IterationDeck {
  @Element() el!: HTMLElement;
  
  @Prop() deckId!: string;
  @Prop() label?: string;
  @Prop() prompt?: string;
  @Prop() description?: string;
  
  @State() private activeSlideIndex = 0;
  @State() private slides: SlideData[] = [];

  private store = getIterationDeckStore();
  private observer?: MutationObserver;

  connectedCallback() {
    // Set up observer for child changes
    this.observer = new MutationObserver(() => {
      this.extractSlideData();
      this.registerWithStore();
    });
    
    this.observer.observe(this.el, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['label', 'ai-prompt', 'notes', 'confidence']
    });
    
    // Initial extraction
    this.extractSlideData();
    this.registerWithStore();
    
    // Also try extracting after a short delay for React children
    setTimeout(() => {
      this.extractSlideData();
      this.registerWithStore();
    }, 0);
  }

  disconnectedCallback() {
    this.observer?.disconnect();
    this.store.unregisterDeck(this.deckId);
  }

  @Listen('slide-data-updated')
  handleSlideDataUpdated() {
    this.extractSlideData();
    this.registerWithStore();
  }

  @Listen('iteration-deck:slide-changed', { target: 'window' })
  handleSlideChange(event: CustomEvent) {
    const { deckId, slideIndex } = event.detail;
    
    if (deckId === this.deckId) {
      this.activeSlideIndex = slideIndex;
      this.updateSlideVisibility();
    }
  }

  @Method()
  async extractSlideData() {
    const slideElements = Array.from(this.el.querySelectorAll('iteration-deck-slide'));
    this.slides = slideElements.map(element => ({
      label: element.getAttribute('label') || 'Untitled',
      aiPrompt: element.getAttribute('ai-prompt') || undefined,
      notes: element.getAttribute('notes') || undefined,
      confidence: element.hasAttribute('confidence') 
        ? parseFloat(element.getAttribute('confidence')!) 
        : undefined
    }));
  }

  @Method()
  async registerWithStore() {
    this.store.registerDeck({
      id: this.deckId,
      label: this.label,
      prompt: this.prompt,
      description: this.description,
      slides: this.slides,
      activeSlideIndex: this.activeSlideIndex,
      element: this.el
    });
  }

  private updateSlideVisibility() {
    const slideElements = Array.from(this.el.querySelectorAll('iteration-deck-slide'));
    slideElements.forEach((slide, index) => {
      const isActive = index === this.activeSlideIndex;
      slide.toggleAttribute('active', isActive);
    });
  }

  componentDidUpdate() {
    this.updateSlideVisibility();
  }

  render() {
    const isDev = isDevelopment();
    
    if (!isDev) {
      // Production: render only the first slide
      return (
        <div class="iterationDeck">
          <slot></slot>
        </div>
      );
    }

    // Development: render all slides with visibility control
    return (
      <div class="iterationDeck">
        <div class="slidesContainer dev-mode">
          <slot></slot>
        </div>
      </div>
    );
  }
}