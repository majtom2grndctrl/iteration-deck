/**
 * Web Component Type Definitions for Iteration Deck
 * 
 * This file provides comprehensive TypeScript declarations for working
 * with Iteration Deck web components in a type-safe manner across
 * different frameworks and vanilla JavaScript/TypeScript environments.
 */

import { defineCustomElements } from 'iteration-deck/loader';

// Initialize web components
defineCustomElements();

// ============================================================================
// Core Web Component Type Definitions
// ============================================================================

/**
 * Custom element interface for iteration-deck
 */
interface IterationDeckElementCore extends HTMLElement {
  // Properties (reflected as attributes)
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  activeIndex: number;
  
  // Methods (if exposed by the component)
  nextSlide(): void;
  previousSlide(): void;
  goToSlide(index: number): void;
  getTotalSlides(): number;
  getCurrentSlide(): HTMLElement | null;
  
  // Events (custom events dispatched by the component)
  addEventListener(type: 'slideChanged', listener: (event: CustomEvent<{ 
    slideIndex: number; 
    slideLabel: string;
    deckId: string;
  }>) => void): void;
  
  addEventListener(type: 'deckRegistered', listener: (event: CustomEvent<{
    deckId: string;
    label?: string;
  }>) => void): void;
  
  addEventListener(type: 'deckUnregistered', listener: (event: CustomEvent<{
    deckId: string;
  }>) => void): void;
}

/**
 * Custom element interface for iteration-deck-slide
 */
interface IterationDeckSlideElementCore extends HTMLElement {
  // Properties (reflected as attributes)
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
  
  // State properties
  isActive: boolean;
  index: number;
  
  // Methods
  activate(): void;
  deactivate(): void;
  getContent(): HTMLElement[];
  
  // Events
  addEventListener(type: 'slideActivated', listener: (event: CustomEvent<{
    slideId: string;
    label: string;
    index: number;
  }>) => void): void;
}

/**
 * Custom element interface for iteration-deck-toolbar
 */
interface IterationDeckToolbarElementCore extends HTMLElement {
  // Properties
  visible: boolean;
  activeDeckId?: string;
  
  // Methods
  show(): void;
  hide(): void;
  setActiveDeck(deckId: string): void;
  refreshDeckList(): void;
  
  // Events
  addEventListener(type: 'toolbarAction', listener: (event: CustomEvent<{
    action: 'next' | 'previous' | 'deckChanged';
    deckId?: string;
    slideIndex?: number;
  }>) => void): void;
}

// ============================================================================
// Framework-Specific Type Extensions
// ============================================================================

/**
 * React JSX element definitions
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iteration-deck': React.DetailedHTMLProps<
        React.HTMLAttributes<IterationDeckElementCore>, 
        IterationDeckElementCore
      > & {
        id: string;
        label?: string;
        prompt?: string;
        description?: string;
        'active-index'?: number | string;
        
        // Event handlers
        onSlideChanged?: (event: CustomEvent<{ 
          slideIndex: number; 
          slideLabel: string;
          deckId: string;
        }>) => void;
        onDeckRegistered?: (event: CustomEvent<{
          deckId: string;
          label?: string;
        }>) => void;
      };
      
      'iteration-deck-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<IterationDeckSlideElementCore>,
        IterationDeckSlideElementCore
      > & {
        label: string;
        'ai-prompt'?: string;
        notes?: string;
        confidence?: number | string;
        
        // Event handlers
        onSlideActivated?: (event: CustomEvent<{
          slideId: string;
          label: string;
          index: number;
        }>) => void;
      };
      
      'iteration-deck-toolbar': React.DetailedHTMLProps<
        React.HTMLAttributes<IterationDeckToolbarElementCore>,
        IterationDeckToolbarElementCore
      > & {
        visible?: boolean | string;
        'active-deck-id'?: string;
        
        // Event handlers
        onToolbarAction?: (event: CustomEvent<{
          action: 'next' | 'previous' | 'deckChanged';
          deckId?: string;
          slideIndex?: number;
        }>) => void;
      };
    }
  }
}

/**
 * Vue 3 component type definitions
 */
export interface VueIterationDeckProps {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  activeIndex?: number;
}

export interface VueIterationDeckSlideProps {
  label: string;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

export interface VueIterationDeckEvents {
  slideChanged: (payload: { 
    slideIndex: number; 
    slideLabel: string;
    deckId: string;
  }) => void;
  deckRegistered: (payload: {
    deckId: string;
    label?: string;
  }) => void;
}

/**
 * Angular component interface
 */
export interface AngularIterationDeckComponent {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  activeIndex?: number;
  
  slideChanged: EventEmitter<{ 
    slideIndex: number; 
    slideLabel: string;
    deckId: string;
  }>;
  deckRegistered: EventEmitter<{
    deckId: string;
    label?: string;
  }>;
}

// ============================================================================
// Type-Safe Event Handling
// ============================================================================

/**
 * Type-safe event listener utilities
 */
export class TypeSafeEventManager {
  private listeners = new Map<string, Set<Function>>();
  
  /**
   * Add a type-safe event listener to an iteration deck
   */
  addDeckListener<T extends keyof IterationDeckEvents>(
    deck: IterationDeckElementCore,
    eventType: T,
    listener: (event: CustomEvent<IterationDeckEvents[T]>) => void
  ): () => void {
    const wrappedListener = listener as EventListener;
    deck.addEventListener(eventType, wrappedListener);
    
    // Store for cleanup
    const key = `${deck.id}-${eventType}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);
    
    // Return cleanup function
    return () => {
      deck.removeEventListener(eventType, wrappedListener);
      this.listeners.get(key)?.delete(listener);
    };
  }
  
  /**
   * Remove all listeners for a deck
   */
  cleanup(deckId: string): void {
    for (const [key, listeners] of this.listeners.entries()) {
      if (key.startsWith(`${deckId}-`)) {
        listeners.clear();
        this.listeners.delete(key);
      }
    }
  }
  
  /**
   * Remove all listeners
   */
  cleanupAll(): void {
    this.listeners.clear();
  }
}

/**
 * Event payload type definitions
 */
export interface IterationDeckEvents {
  slideChanged: { 
    slideIndex: number; 
    slideLabel: string;
    deckId: string;
  };
  deckRegistered: {
    deckId: string;
    label?: string;
  };
  deckUnregistered: {
    deckId: string;
  };
}

export interface IterationDeckSlideEvents {
  slideActivated: {
    slideId: string;
    label: string;
    index: number;
  };
}

export interface IterationDeckToolbarEvents {
  toolbarAction: {
    action: 'next' | 'previous' | 'deckChanged';
    deckId?: string;
    slideIndex?: number;
  };
}

// ============================================================================
// Type Guards and Utilities
// ============================================================================

/**
 * Type guard for iteration-deck element
 */
export function isIterationDeckElement(element: Element): element is IterationDeckElementCore {
  return element.tagName.toLowerCase() === 'iteration-deck';
}

/**
 * Type guard for iteration-deck-slide element
 */
export function isIterationDeckSlideElement(element: Element): element is IterationDeckSlideElementCore {
  return element.tagName.toLowerCase() === 'iteration-deck-slide';
}

/**
 * Type guard for iteration-deck-toolbar element
 */
export function isIterationDeckToolbarElement(element: Element): element is IterationDeckToolbarElementCore {
  return element.tagName.toLowerCase() === 'iteration-deck-toolbar';
}

/**
 * Safe element selector with type checking
 */
export function selectDeck(selector: string): IterationDeckElementCore | null {
  const element = document.querySelector(selector);
  return element && isIterationDeckElement(element) ? element : null;
}

export function selectAllDecks(): IterationDeckElementCore[] {
  const elements = document.querySelectorAll('iteration-deck');
  return Array.from(elements).filter(isIterationDeckElement);
}

export function selectSlide(selector: string): IterationDeckSlideElementCore | null {
  const element = document.querySelector(selector);
  return element && isIterationDeckSlideElement(element) ? element : null;
}

export function selectAllSlides(deckElement?: IterationDeckElementCore): IterationDeckSlideElementCore[] {
  const scope = deckElement || document;
  const elements = scope.querySelectorAll('iteration-deck-slide');
  return Array.from(elements).filter(isIterationDeckSlideElement);
}

// ============================================================================
// Type-Safe Configuration Objects
// ============================================================================

/**
 * Configuration for creating iteration decks programmatically
 */
export interface IterationDeckConfig {
  id: string;
  label?: string;
  prompt?: string;
  description?: string;
  initialSlideIndex?: number;
  slides: IterationDeckSlideConfig[];
  events?: {
    onSlideChange?: (slideIndex: number, slideLabel: string) => void;
    onRegister?: () => void;
    onUnregister?: () => void;
  };
}

export interface IterationDeckSlideConfig {
  label: string;
  content: string | HTMLElement;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
  metadata?: Record<string, any>;
}

/**
 * Type-safe deck builder utility
 */
export class TypeSafeDeckBuilder {
  private config: IterationDeckConfig;
  
  constructor(id: string) {
    this.config = {
      id,
      slides: [],
    };
  }
  
  setLabel(label: string): this {
    this.config.label = label;
    return this;
  }
  
  setPrompt(prompt: string): this {
    this.config.prompt = prompt;
    return this;
  }
  
  setDescription(description: string): this {
    this.config.description = description;
    return this;
  }
  
  addSlide(slideConfig: IterationDeckSlideConfig): this {
    this.config.slides.push(slideConfig);
    return this;
  }
  
  onSlideChange(handler: (slideIndex: number, slideLabel: string) => void): this {
    if (!this.config.events) this.config.events = {};
    this.config.events.onSlideChange = handler;
    return this;
  }
  
  build(): HTMLElement {
    const deckElement = document.createElement('iteration-deck') as IterationDeckElementCore;
    deckElement.id = this.config.id;
    
    if (this.config.label) deckElement.label = this.config.label;
    if (this.config.prompt) deckElement.prompt = this.config.prompt;
    if (this.config.description) deckElement.description = this.config.description;
    
    // Add slides
    for (const slideConfig of this.config.slides) {
      const slideElement = document.createElement('iteration-deck-slide') as IterationDeckSlideElementCore;
      slideElement.label = slideConfig.label;
      
      if (slideConfig.aiPrompt) slideElement.aiPrompt = slideConfig.aiPrompt;
      if (slideConfig.notes) slideElement.notes = slideConfig.notes;
      if (slideConfig.confidence !== undefined) slideElement.confidence = slideConfig.confidence;
      
      // Add content
      if (typeof slideConfig.content === 'string') {
        slideElement.innerHTML = slideConfig.content;
      } else {
        slideElement.appendChild(slideConfig.content);
      }
      
      deckElement.appendChild(slideElement);
    }
    
    // Add event listeners
    if (this.config.events?.onSlideChange) {
      deckElement.addEventListener('slideChanged', (event) => {
        this.config.events!.onSlideChange!(event.detail.slideIndex, event.detail.slideLabel);
      });
    }
    
    return deckElement;
  }
  
  getConfig(): IterationDeckConfig {
    return { ...this.config };
  }
}

// ============================================================================
// Usage Examples
// ============================================================================

/**
 * Example: Type-safe deck creation and management
 */
export function demonstrateTypeSafeUsage(): void {
  console.log('🔧 Demonstrating type-safe web component usage...');
  
  // Create a type-safe event manager
  const eventManager = new TypeSafeEventManager();
  
  // Find existing deck with type safety
  const existingDeck = selectDeck('#example-deck');
  if (existingDeck) {
    console.log(`Found deck: ${existingDeck.id} with ${existingDeck.getTotalSlides()} slides`);
    
    // Add type-safe event listener
    const unsubscribe = eventManager.addDeckListener(existingDeck, 'slideChanged', (event) => {
      console.log(`Slide changed: ${event.detail.slideLabel} (index: ${event.detail.slideIndex})`);
    });
    
    // Use the deck methods
    existingDeck.goToSlide(0);
    existingDeck.nextSlide();
    
    // Cleanup when done
    setTimeout(() => {
      unsubscribe();
      console.log('✅ Event listener cleaned up');
    }, 5000);
  }
  
  // Create a new deck programmatically
  const newDeck = new TypeSafeDeckBuilder('programmatic-deck')
    .setLabel('Programmatic Deck')
    .setPrompt('Generated programmatically with type safety')
    .addSlide({
      label: 'First Slide',
      content: '<h3>Type-Safe Slide</h3><p>Created with TypeScript!</p>',
      aiPrompt: 'Create a simple introductory slide',
      confidence: 0.9,
    })
    .addSlide({
      label: 'Second Slide',
      content: '<h3>Another Slide</h3><p>Also type-safe!</p>',
      confidence: 0.85,
    })
    .onSlideChange((index, label) => {
      console.log(`Programmatic deck slide changed: ${label} (${index})`);
    })
    .build();
  
  // Add to DOM (in a real app, you'd append to a specific container)
  // document.body.appendChild(newDeck);
  
  console.log('✅ Type-safe demonstration complete');
}

// ============================================================================
// Module Exports
// ============================================================================

export type {
  IterationDeckElementCore,
  IterationDeckSlideElementCore,
  IterationDeckToolbarElementCore,
  VueIterationDeckProps,
  VueIterationDeckSlideProps,
  VueIterationDeckEvents,
  AngularIterationDeckComponent,
  IterationDeckConfig,
  IterationDeckSlideConfig,
};

export {
  TypeSafeEventManager,
  TypeSafeDeckBuilder,
  isIterationDeckElement,
  isIterationDeckSlideElement,
  isIterationDeckToolbarElement,
  selectDeck,
  selectAllDecks,
  selectSlide,
  selectAllSlides,
  demonstrateTypeSafeUsage,
};

// Auto-run demonstration if in development
if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
  setTimeout(demonstrateTypeSafeUsage, 1000);
}