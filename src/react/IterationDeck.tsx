import { useEffect, useMemo } from 'react'
import { IterationDeckProps } from '../core/types'
import { useIterationDeckStore } from '../core/store'
import { isDevelopment } from '../core/environment'
import { ToolbarManager } from './ToolbarManager'

/**
 * IterationDeck - Main component for AI-first prototyping workflows
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
  const { registerDeck, unregisterDeck, decks } = useIterationDeckStore()
  
  // Convert children to slide states
  const slides = useMemo(() => {
    if (!children) {
      return []
    }
    
    // Handle single child vs array of children
    const childrenArray = Array.isArray(children) ? children : [children]
    
    return childrenArray.map(child => ({
      label: child.props.label,
      aiPrompt: child.props.aiPrompt,
      notes: child.props.notes,
      confidence: child.props.confidence
    }))
  }, [children])

  // Register/update deck in global store
  useEffect(() => {
    const deckState = {
      id,
      label,
      prompt,
      description,
      slides,
      activeSlideIndex: 0
    }
    
    registerDeck(deckState)
    
    return () => {
      unregisterDeck(id)
    }
  }, [id, label, prompt, description, slides, registerDeck, unregisterDeck])

  // In production, only render the first slide
  if (!isDevelopment()) {
    if (!children) return null
    const childrenArray = Array.isArray(children) ? children : [children]
    return childrenArray[0] || null
  }

  // In development, render the active slide based on global state
  const currentDeck = decks.get(id)
  const activeSlideIndex = currentDeck?.activeSlideIndex ?? 0
  
  if (!children) {
    return (
      <>
        {null}
        <ToolbarManager />
      </>
    )
  }
  
  const childrenArray = Array.isArray(children) ? children : [children]
  const activeSlide = childrenArray[activeSlideIndex] || childrenArray[0] || null

  return (
    <>
      {activeSlide}
      <ToolbarManager />
    </>
  )
}