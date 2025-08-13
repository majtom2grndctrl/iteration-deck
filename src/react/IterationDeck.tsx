import React from 'react'
import { IterationDeckProps } from '../core/types'
// Import web components to register them
import '../web-components/index.js'

/**
 * IterationDeck - React wrapper for iteration-deck web component
 * 
 * Wraps multiple UI variations (slides) and provides navigation between them.
 * In development mode, shows a toolbar for switching between variations.
 * In production mode, only renders the first variation.
 * 
 * @example
 * ```tsx
 * // Basic usage - AI generates multiple button variations
 * <IterationDeck id="buttons" label="CTA Buttons">
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
 *   label="Hero Layouts"
 *   prompt="Create modern hero sections for SaaS landing page"
 * >
 *   <IterationDeckSlide 
 *     label="Centered" 
 *     aiPrompt="Center-aligned with large CTA"
 *     confidence={0.9}
 *   >
 *     <HeroCentered />
 *   </IterationDeckSlide>
 *   <IterationDeckSlide 
 *     label="Split"
 *     aiPrompt="50/50 split layout with image"
 *     confidence={0.85}
 *   >
 *     <HeroSplit />
 *   </IterationDeckSlide>
 * </IterationDeck>
 * ```
 * 
 * @param props - IterationDeckProps
 * @returns React component that renders active slide + development toolbar
 */
export function IterationDeck({
  id,
  label,
  prompt,
  description,
  children
}: IterationDeckProps) {
  return (
    <iteration-deck id={id} label={label} prompt={prompt} description={description}>
      {children}
    </iteration-deck>
  )
}