/**
 * Shared TypeScript interfaces for both React and Web Component implementations
 * These ensure API consistency between both versions
 */

/**
 * Core props for IterationDeck component
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
  /** Enable development features in production builds */
  enableInProduction?: boolean;
}

/**
 * Core props for IterationDeckSlide component  
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

/**
 * Environment detection
 */
export type Environment = 'development' | 'production';

/**
 * Navigation directions
 */
export type NavigationDirection = 'next' | 'previous';

/**
 * Store interface for state management
 */
export interface IterationStore {
  activeDecks: Record<string, string>;
  setActiveSlide: (deckId: string, slideId: string) => void;
  isProduction: boolean;
}

/**
 * Design tokens type (matches tokens.json structure)
 */
export interface DesignTokens {
  colors: {
    gray: Record<string, string>;
    white: string;
    black: string;
    glass: {
      light: string;
      lightHover: string;
      dark: string;
      darkHover: string;
    };
    focus: {
      ring: string;
      outline: string;
    };
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  animation: {
    duration: Record<string, string>;
    easing: Record<string, string>;
  };
}