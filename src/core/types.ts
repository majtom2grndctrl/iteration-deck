import { ReactElement, ReactNode } from 'react'

/**
 * Props for IterationDeck component - the main container for AI-generated UI variations
 * 
 * @example
 * ```tsx
 * // Basic usage for comparing AI-generated button variations
 * <IterationDeck id="cta-buttons" label="Call to Action Buttons">
 *   <IterationDeckSlide label="Primary">
 *     <Button variant="primary">Get Started</Button>
 *   </IterationDeckSlide>
 *   <IterationDeckSlide label="Secondary">
 *     <Button variant="secondary">Get Started</Button>
 *   </IterationDeckSlide>
 * </IterationDeck>
 * ```
 * 
 * @example
 * ```tsx
 * // Advanced usage with AI prompt tracking
 * <IterationDeck 
 *   id="hero-sections" 
 *   label="Hero Section Variations"
 *   prompt="Create 3 modern hero section layouts"
 *   description="Comparing different hero approaches for landing page"
 * >
 *   <IterationDeckSlide 
 *     label="Centered" 
 *     aiPrompt="Center-aligned with large heading"
 *     confidence={0.92}
 *   >
 *     <HeroCentered />
 *   </IterationDeckSlide>
 *   <IterationDeckSlide 
 *     label="Split" 
 *     aiPrompt="50/50 split with image"
 *     confidence={0.88}
 *     notes="Designer prefers this layout"
 *   >
 *     <HeroSplit />
 *   </IterationDeckSlide>
 * </IterationDeck>
 * ```
 */
export interface IterationDeckProps {
  /** Unique identifier for this iteration deck - use descriptive names like "button-variations" or "hero-layouts" */
  id: string
  /** Label for this deck in the toolbar - will be shown in dropdown when multiple decks exist */
  label?: string
  /** Optional AI prompt context for generation tracking - the original prompt used to generate these variations */
  prompt?: string
  /** Additional context for stakeholder presentations - useful for design reviews */
  description?: string
  /** Array of IterationDeckSlide components containing the UI variations to compare */
  children: ReactElement<IterationDeckSlideProps>[]
}

/**
 * Props for IterationDeckSlide component - individual UI variation within an IterationDeck
 * 
 * @example
 * ```tsx
 * // Simple slide with just content
 * <IterationDeckSlide label="Primary Button">
 *   <Button variant="primary">Click me</Button>
 * </IterationDeckSlide>
 * ```
 * 
 * @example
 * ```tsx
 * // Slide with AI metadata for tracking and review
 * <IterationDeckSlide 
 *   label="Gradient Button"
 *   aiPrompt="Make it more modern with gradient background"
 *   notes="High contrast version for accessibility"
 *   confidence={0.95}
 * >
 *   <Button variant="gradient">Click me</Button>
 * </IterationDeckSlide>
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
  /** The React content to render for this variation - can be any valid React element */
  children: ReactNode
}

export interface IterationDeckState {
  decks: Map<string, DeckState>
  activeDeckId: string | null
  globalToolbarVisible: boolean
}

export interface DeckState {
  id: string
  label?: string
  prompt?: string
  description?: string
  slides: SlideState[]
  activeSlideIndex: number
}

export interface SlideState {
  label: string
  aiPrompt?: string
  notes?: string
  confidence?: number
}

export interface IterationDeckStore extends IterationDeckState {
  registerDeck: (deck: DeckState) => void
  unregisterDeck: (id: string) => void
  setActiveSlideIndex: (deckId: string, index: number) => void
  setActiveDeck: (deckId: string | null) => void
  nextSlide: () => void
  previousSlide: () => void
  setGlobalToolbarVisible: (visible: boolean) => void
}