import { useEffect, useMemo } from 'react'
import { IterationDeckProps } from '../core/types'
import { useIterationDeckStore } from '../core/store'
import { isDevelopment } from '../core/environment'
import { ToolbarManager } from './ToolbarManager'

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