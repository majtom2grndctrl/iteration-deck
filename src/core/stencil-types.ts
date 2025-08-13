/**
 * Props for IterationDeck Stencil component - the main container for AI-generated UI variations
 * These correspond to @Prop() decorators in the Stencil component
 * 
 * @example
 * ```html
 * <!-- Basic usage for comparing AI-generated button variations -->
 * <iteration-deck deck-id="cta-buttons" label="Call to Action Buttons">
 *   <iteration-deck-slide label="Primary">
 *     <button class="primary">Get Started</button>
 *   </iteration-deck-slide>
 *   <iteration-deck-slide label="Secondary">
 *     <button class="secondary">Get Started</button>
 *   </iteration-deck-slide>
 * </iteration-deck>
 * ```
 * 
 * @example
 * ```html
 * <!-- Advanced usage with AI prompt tracking -->
 * <iteration-deck 
 *   deck-id="hero-sections" 
 *   label="Hero Section Variations"
 *   prompt="Create 3 modern hero section layouts"
 *   description="Comparing different hero approaches for landing page"
 * >
 *   <iteration-deck-slide 
 *     label="Centered" 
 *     ai-prompt="Center-aligned with large heading"
 *     confidence="0.92"
 *   >
 *     <div class="hero-centered">...</div>
 *   </iteration-deck-slide>
 *   <iteration-deck-slide 
 *     label="Split" 
 *     ai-prompt="50/50 split with image"
 *     confidence="0.88"
 *     notes="Designer prefers this layout"
 *   >
 *     <div class="hero-split">...</div>
 *   </iteration-deck-slide>
 * </iteration-deck>
 * ```
 */
export interface IterationDeckProps {
  /** Unique identifier for this iteration deck - use descriptive names like "button-variations" or "hero-layouts" */
  deckId: string
  /** Label for this deck in the toolbar - will be shown in dropdown when multiple decks exist */
  label?: string
  /** Optional AI prompt context for generation tracking - the original prompt used to generate these variations */
  prompt?: string
  /** Additional context for stakeholder presentations - useful for design reviews */
  description?: string
}

/**
 * Props for IterationDeckSlide Stencil component - individual UI variation within an IterationDeck
 * These correspond to @Prop() decorators in the Stencil component
 * 
 * @example
 * ```html
 * <!-- Simple slide with just content -->
 * <iteration-deck-slide label="Primary Button">
 *   <button class="primary">Click me</button>
 * </iteration-deck-slide>
 * ```
 * 
 * @example
 * ```html
 * <!-- Slide with AI metadata for tracking and review -->
 * <iteration-deck-slide 
 *   label="Gradient Button"
 *   ai-prompt="Make it more modern with gradient background"
 *   notes="High contrast version for accessibility"
 *   confidence="0.95"
 * >
 *   <button class="gradient">Click me</button>
 * </iteration-deck-slide>
 * ```
 */
export interface IterationDeckSlideProps {
  /** Label for this slide/variation - shown in toolbar and navigation */
  label: string
  /** Optional AI prompt refinements for this specific variation - the specific prompt used to generate this slide */
  aiPrompt?: string
  /** Design rationale, AI feedback, or iteration insights - useful for design reviews and documentation */
  notes?: string
  /** AI generation confidence score (0-1, dev mode only) - how confident the AI was in this variation */
  confidence?: number
}

/**
 * Props for IterationDeckToolbar Stencil component - development toolbar for navigation
 * This component is automatically managed and doesn't typically need props
 */
export interface IterationDeckToolbarProps {
  // No props - toolbar is automatically managed
}

// Store interfaces for advanced usage
export interface DeckData {
  id: string
  label?: string
  prompt?: string
  description?: string
  slides: SlideData[]
  activeSlideIndex: number
  element: HTMLElement
}

export interface SlideData {
  label: string
  aiPrompt?: string
  notes?: string
  confidence?: number
}

export interface IterationDeckStore {
  registerDeck: (deck: DeckData) => void
  unregisterDeck: (id: string) => void
  setActiveDeck: (deckId: string | null) => void
  getActiveDeck: () => DeckData | null
  getActiveDeckId: () => string | null
  getAllDecks: () => DeckData[]
  nextSlide: () => void
  previousSlide: () => void
  setGlobalToolbarVisible: (visible: boolean) => void
  isGlobalToolbarVisible: () => boolean
}