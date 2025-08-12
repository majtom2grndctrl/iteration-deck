import { IterationDeckSlideProps } from '../core/types'

/**
 * IterationDeckSlide - Individual UI variation within an IterationDeck
 * 
 * This component wraps a single UI variation and provides metadata about it.
 * The actual rendering and navigation logic is handled by the parent IterationDeck.
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
 * @returns React fragment containing the children (transparent wrapper)
 */
export function IterationDeckSlide({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  label: _label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  aiPrompt: _aiPrompt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  notes: _notes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  confidence: _confidence,
  children
}: IterationDeckSlideProps) {
  // This component is just a wrapper that passes through its children
  // The actual slide management is handled by IterationDeck
  // The props are used by IterationDeck to build the slide state
  return <>{children}</>
}