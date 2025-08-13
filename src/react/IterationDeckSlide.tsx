import { IterationDeckSlideProps } from '../core/types'

/**
 * IterationDeckSlide - React wrapper for iteration-deck-slide web component
 * 
 * This component wraps a single UI variation and provides metadata about it.
 * 
 * @example
 * ```tsx
 * // Simple slide - just wrap your component
 * <IterationDeckSlide label="Primary Button">
 *   <Button variant="primary">Click me</Button>
 * </IterationDeckSlide>
 * ```
 * 
 * @example
 * ```tsx
 * // Slide with AI metadata for better tracking
 * <IterationDeckSlide 
 *   label="Modern Card"
 *   aiPrompt="Make the card more modern with rounded corners and shadow"
 *   notes="This version tested better with users"
 *   confidence={0.92}
 * >
 *   <Card variant="modern">
 *     <CardTitle>Product Title</CardTitle>
 *     <CardContent>Product description here...</CardContent>
 *   </Card>
 * </IterationDeckSlide>
 * ```
 * 
 * @param props - IterationDeckSlideProps
 * @returns React wrapper around iteration-deck-slide web component
 */
export function IterationDeckSlide({
  label,
  aiPrompt,
  notes,
  confidence,
  children
}: IterationDeckSlideProps) {
  return (
    <iteration-deck-slide 
      label={label}
      ai-prompt={aiPrompt}
      notes={notes}
      confidence={confidence}
    >
      {children}
    </iteration-deck-slide>
  )
}