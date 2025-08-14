import { Component, Host, h, Prop, State, Element, Watch, Listen } from '@stencil/core';
import { useIterationDeckStore, DeckInfo, SlideInfo } from '../../store/iteration-deck-store';
import { detectEnvironment, isDevMode } from '../../utils/environment';
// import * as styles from './iteration-deck.css';

// Toolbar singleton management
let toolbarCreated = false;
let toolbarElement: HTMLElement | null = null;

function ensureToolbarExists() {
  if (!isDevMode()) return;
  
  // Check if we already have a reference to a toolbar
  if (toolbarElement && document.body.contains(toolbarElement)) {
    return; // Toolbar already exists and is in DOM
  }
  
  // Check if toolbar already exists in DOM (from other instances)
  const existingToolbar = document.querySelector('iteration-deck-toolbar');
  if (existingToolbar) {
    toolbarElement = existingToolbar as HTMLElement;
    toolbarCreated = true;
    return;
  }
  
  // Create new toolbar only if none exists
  if (!toolbarCreated) {
    const toolbar = document.createElement('iteration-deck-toolbar');
    document.body.appendChild(toolbar);
    toolbarElement = toolbar;
    toolbarCreated = true;
  }
}

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
  @State() isActiveDeck: boolean = false;
  @State() justBecameActive: boolean = false;
  @State() showAttentionGlow: boolean = false;

  private deckStore = useIterationDeckStore;

  connectedCallback() {
    // Ensure activeIndex has a default value
    if (this.activeIndex === undefined || this.activeIndex === null) {
      this.activeIndex = 0;
    }
    
    // Detect environment
    const env = detectEnvironment();
    this.isProduction = env.isProduction;

    // Collect slides from child elements
    this.collectSlides();

    // Register this deck with the global store
    this.registerDeck();

    // Subscribe to store changes
    this.subscribeToStore();
    
    // Initialize active deck state
    const state = this.deckStore.getState();
    this.isActiveDeck = state.activeDeckId === this.deckId;
    
    // Initialize slide states after a brief delay to ensure slides are connected
    setTimeout(() => {
      this.updateSlideStates();
    }, 200);
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
    // Update all child slides about the active index change
    this.updateSlideStates();
    
    // Only update store if this is the active deck
    const state = this.deckStore.getState();
    if (state.activeDeckId === this.deckId) {
      state.setActiveSlide(newIndex);
    }
  }
  
  private updateSlideStates() {
    // Force all slides to re-evaluate their active state
    const slideElements = this.el.querySelectorAll('iteration-deck-slide');
    slideElements.forEach((slide: any) => {
      if (slide.updateActiveState) {
        slide.updateActiveState();
      }
      // Also manually set a data attribute that slides can observe
      slide.setAttribute('data-parent-active-index', this.activeIndex.toString());
    });
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
      slideCount: this.slides.length,
      activeSlideIndex: this.activeIndex
    };

    this.deckStore.getState().registerDeck(deckInfo);
    
    // Create toolbar singleton on first deck registration
    ensureToolbarExists();
  }

  private updateStoreSlides() {
    this.deckStore.getState().updateDeckSlides(this.deckId, this.slides);
  }

  private subscribeToStore() {
    this.storeSubscription = this.deckStore.subscribe((state) => {
      const wasActive = this.isActiveDeck;
      this.isActiveDeck = state.activeDeckId === this.deckId;
      
      // Trigger attention effects when deck becomes active
      if (!wasActive && this.isActiveDeck) {
        this.justBecameActive = true;
        this.showAttentionGlow = true;
        
        // Auto-scroll to this deck
        this.scrollIntoView();
        
        // Reset attention states after brief period
        setTimeout(() => {
          this.justBecameActive = false;
        }, 800); // Shorter duration for "just became active"
        
        setTimeout(() => {
          this.showAttentionGlow = false;
        }, 2000); // Slightly longer for glow effect
      }
      
      // Only respond to store changes if this is the active deck
      if (this.isActiveDeck) {
        const deck = state.decks.get(this.deckId);
        if (deck && deck.activeSlideIndex !== this.activeIndex) {
          this.activeIndex = deck.activeSlideIndex;
        }
      }
    });
  }
  
  private scrollIntoView() {
    if (!isDevMode()) return;
    
    // Scroll to bring the deck into the top half of the viewport
    const rect = this.el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const targetPosition = window.scrollY + rect.top - viewportHeight * 0.25;
    
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  }

  render() {
    const activeSlideIndex = this.isProduction ? 0 : this.activeIndex;
    const showVisualFeedback = !this.isProduction && isDevMode();
    
    // Add keyframe animation for attention pulse
    if (showVisualFeedback && this.showAttentionGlow && !document.getElementById('iteration-deck-attention-keyframes')) {
      const style = document.createElement('style');
      style.id = 'iteration-deck-attention-keyframes';
      style.textContent = `
        @keyframes iteration-deck-attention {
          0% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4);
            transform: scale(1.01);
          }
          100% {
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.15);
            transform: scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    const hostStyles = {
      display: 'block',
      margin: '1rem 0',
      borderRadius: '8px',
      ...(showVisualFeedback && this.showAttentionGlow && {
        animation: 'iteration-deck-attention 2s ease-out forwards',
      }),
      ...(showVisualFeedback && this.isActiveDeck && !this.showAttentionGlow && {
        boxShadow: '0 0 8px rgba(59, 130, 246, 0.15)',
        transition: 'box-shadow 0.3s ease'
      })
    };
    
    return (
      <Host class={{
        'host': true,
        'attention-glow': showVisualFeedback && this.showAttentionGlow,
        'active-deck': this.isActiveDeck,
        'production-mode': this.isProduction,
        'development-mode': !this.isProduction
      }} style={hostStyles}>
        <div class={{
          'deck-container': true,
          'deck-container-active': showVisualFeedback && this.isActiveDeck
        }} data-active-slide={activeSlideIndex} style={{ position: 'relative' }}>
          <slot onSlotchange={() => this.onSlotChange()}></slot>
        </div>
        {!this.isProduction && this.slides.length > 1 && (
          <div class="slide-indicator" style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            fontSize: '12px'
          }}>
            {this.slides.map((slide, index) => (
              <button
                class={`slide-dot ${index === activeSlideIndex ? 'slide-dot-active' : ''}`}
                onClick={() => this.activeIndex = index}
                aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                title={slide.label}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === activeSlideIndex ? '#3b82f6' : '#d1d5db',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
              ></button>
            ))}
            <div class="slide-label" style={{
              marginLeft: '8px',
              color: '#374151',
              fontWeight: '500'
            }}>
              {this.slides[activeSlideIndex]?.label || `Slide ${activeSlideIndex + 1}`}
            </div>
          </div>
        )}
      </Host>
    );
  }
}
