/**
 * Iteration Deck Web Components
 * 
 * This module registers all web components and provides utilities for direct usage.
 * Import this module to register the custom elements globally.
 * 
 * @example
 * ```typescript
 * import 'iteration-deck/web-components'
 * 
 * // Now you can use the custom elements in your HTML
 * ```
 * 
 * @example
 * ```html
 * <iteration-deck id="hero" label="Hero Variations">
 *   <iteration-deck-slide label="Centered">
 *     <div>Your content here</div>
 *   </iteration-deck-slide>
 *   <iteration-deck-slide label="Split">
 *     <div>Different variation</div>
 *   </iteration-deck-slide>
 * </iteration-deck>
 * ```
 */

// Import components to register them
import './IterationDeck.js'
import './IterationDeckSlide.js'
import './IterationDeckToolbar.js'

// Export the store and utilities for programmatic access
export { isDevelopment } from './store.js'
export type { DeckData, SlideData } from './store.js'

// Export component classes for advanced usage
export { IterationDeck } from './IterationDeck.js'
export { IterationDeckSlide } from './IterationDeckSlide.js'  
export { IterationDeckToolbar } from './IterationDeckToolbar.js'

// Auto-mount toolbar in development mode
import { isDevelopment } from './store.js'

let toolbarMounted = false

function ensureToolbarMounted() {
  if (toolbarMounted || !isDevelopment()) return
  
  const toolbar = document.createElement('iteration-deck-toolbar')
  document.body.appendChild(toolbar)
  toolbarMounted = true
}

// Mount toolbar when first deck is registered
function handleFirstDeckRegistration() {
  window.addEventListener('iteration-deck:deck-registered', ensureToolbarMounted, { once: true })
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleFirstDeckRegistration)
} else {
  handleFirstDeckRegistration()
}

// Re-export core utilities for convenience
export { 
  createSlideFromVariation, 
  generateVariationLabel, 
  COMMON_VARIATION_PATTERNS,
  AI_PRESETS 
} from '../core/utilities.js'

export type { 
  IterationDeckProps,
  IterationDeckSlideProps 
} from '../core/types.js'

// Export design tokens for styling and theming
export {
  spacing,
  colors, 
  typography,
  components,
  animation,
  zIndex,
  breakpoints
} from '../tokens.js'