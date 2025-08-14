import React from 'react';
import { defineCustomElements } from '../../loader';

// Ensure web components are defined
defineCustomElements();

export interface IterationDeckSlideProps {
  /** Label for this slide/variation */
  label: string;
  /** Optional AI prompt refinements for this specific variation */
  aiPrompt?: string;
  /** Design rationale, AI feedback, or iteration insights */
  notes?: string;
  /** AI generation confidence score (0-1, dev mode only) */
  confidence?: number;
  /** React children to render inside the slide */
  children?: React.ReactNode;
}

/**
 * React wrapper for the iteration-deck-slide web component.
 * 
 * This component represents a single variation/slide within an IterationDeck,
 * providing a React-friendly interface with proper TypeScript support.
 * 
 * @example
 * ```tsx
 * import { IterationDeckSlide } from 'iteration-deck/react';
 * 
 * function MySlide() {
 *   return (
 *     <IterationDeckSlide 
 *       label="Primary Button"
 *       aiPrompt="Make it bold and attention-grabbing"
 *       confidence={0.95}
 *       notes="Designer preferred this for the hero section"
 *     >
 *       <button className="btn-primary">Get Started</button>
 *     </IterationDeckSlide>
 *   );
 * }
 * ```
 */
export const IterationDeckSlide: React.FC<IterationDeckSlideProps> = ({
  label,
  aiPrompt,
  notes,
  confidence,
  children,
  ...props
}) => {
  // Convert React props to web component attributes
  const webComponentProps = {
    label,
    ...(aiPrompt && { 'ai-prompt': aiPrompt }),
    ...(notes && { notes }),
    ...(confidence !== undefined && { confidence: confidence.toString() }),
    ...props,
  };

  return React.createElement('iteration-deck-slide', webComponentProps, children);
};

export default IterationDeckSlide;