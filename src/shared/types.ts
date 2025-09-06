/**
 * Shared types for iteration deck components
 * Used by both React and Web Component implementations
 */

/**
 * Base props for IterationDeck component
 */
export interface IterationDeckProps {
  /** Unique identifier for this iteration deck */
  id: string;
  /** Label for this deck in the toolbar */
  label?: string;
  /** Optional AI prompt context for generation tracking */
  prompt?: string;
  /** Additional context for stakeholder presentations */
  description?: string;
  /** Enable functionality even in production builds */
  enableInProduction?: boolean;
}

/**
 * Base props for IterationDeckSlide component
 */
export interface IterationDeckSlideProps {
  /** Label for this slide/variation */
  label: string;
  /** Optional AI prompt refinements for this specific variation */
  aiPrompt?: string;
  /** Design rationale, AI feedback, or iteration insights */
  notes?: string;
  /** AI generation confidence score (0-1, dev mode only) */
  confidence?: number;
}