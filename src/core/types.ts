import { ReactElement, ReactNode } from 'react'

export interface IterationDeckProps {
  /** Unique identifier for this iteration deck */
  id: string
  /** Label for this deck in the toolbar */
  label?: string
  /** Optional AI prompt context for generation tracking */
  prompt?: string
  /** Additional context for stakeholder presentations */
  description?: string
  children: ReactElement<IterationDeckSlideProps>[]
}

export interface IterationDeckSlideProps {
  /** Label for this slide/variation */
  label: string
  /** Optional AI prompt refinements for this specific variation */
  aiPrompt?: string
  /** Design rationale, AI feedback, or iteration insights */
  notes?: string
  /** AI generation confidence score (0-1, dev mode only) */
  confidence?: number
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