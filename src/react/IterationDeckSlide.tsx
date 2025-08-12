import { IterationDeckSlideProps } from '../core/types'

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