/**
 * Core TypeScript type definitions for iteration-deck components
 * Framework-agnostic interfaces and types
 */

// Re-export utility types
export type { Environment, NavigationDirection } from './utilities.js';

/**
 * Props interface for IterationDeck component
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
 * Props interface for IterationDeckSlide component
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
  /** Optional slide ID override */
  slideId?: string;
}

/**
 * Internal slide data structure
 */
export interface SlideElementData {
  id: string;
  label: string;
  element: Element;
  aiPrompt?: string;
  notes?: string;
  confidence?: number;
}

/**
 * Event fired when slide changes
 */
export interface SlideChangeEvent {
  deckId: string;
  previousSlideId: string;
  currentSlideId: string;
  slideIndex: number;
}

/**
 * Event fired when deck is registered
 */
export interface DeckRegistrationEvent {
  deckId: string;
  label: string;
  slideCount: number;
}

/**
 * Deck registration information for store
 */
export interface DeckRegistration {
  id: string;
  label: string;
  slideIds: string[];
  activeSlideId: string;
  registeredAt: number;
}