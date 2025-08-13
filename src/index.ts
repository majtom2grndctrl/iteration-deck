// Main exports for the iteration-deck library
export { IterationDeck } from './react/IterationDeck'
export { IterationDeckSlide } from './react/IterationDeckSlide'

// Export types for TypeScript users
export type { 
  IterationDeckProps, 
  IterationDeckSlideProps 
} from './core/types'

// Export utility types and helpers for AI agents
export type {
  ComponentVariation,
  LayoutVariation, 
  StateVariation
} from './core/utilities'

export {
  createSlideFromVariation,
  COMMON_VARIATION_PATTERNS,
  generateVariationLabel,
  AI_PRESETS
} from './core/utilities'

// Export design tokens for external use
export {
  spacing,
  colors, 
  typography,
  components,
  animation,
  zIndex,
  breakpoints
} from './tokens'