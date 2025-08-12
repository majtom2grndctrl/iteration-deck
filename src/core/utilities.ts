/**
 * Utility types and helpers for common IterationDeck patterns
 * These make it easier for AI agents to generate correct implementations
 */

import { ReactElement } from 'react'

/**
 * Helper type for common UI component variations
 * Use this when creating variations of the same component with different props
 * 
 * @example
 * ```tsx
 * // AI can generate this pattern easily
 * const buttonVariations: ComponentVariation<ButtonProps>[] = [
 *   { label: 'Primary', props: { variant: 'primary' } },
 *   { label: 'Secondary', props: { variant: 'secondary' } },
 * ]
 * ```
 */
export interface ComponentVariation<T = Record<string, any>> {
  /** Human-readable label for this variation */
  label: string
  /** Props to pass to the component */
  props: T
  /** Optional AI metadata */
  aiPrompt?: string
  notes?: string
  confidence?: number
}

/**
 * Helper type for layout variations
 * Common pattern when comparing different layouts of the same content
 */
export interface LayoutVariation {
  /** Name of the layout */
  label: string
  /** CSS class or style object for the layout */
  className?: string
  style?: React.CSSProperties
  /** Layout-specific props */
  layoutProps?: Record<string, any>
  /** AI metadata */
  aiPrompt?: string
  notes?: string
}

/**
 * Helper type for state variations
 * Common pattern when showing the same component in different states
 */
export interface StateVariation<T = Record<string, any>> {
  /** State name (Loading, Error, Success, etc.) */
  label: string
  /** State-specific props */
  state: T
  /** AI metadata */
  aiPrompt?: string
  notes?: string
}

/**
 * Utility function to create IterationDeckSlide from ComponentVariation
 * Makes it easier for AI agents to generate slides from variation data
 * 
 * @example
 * ```tsx
 * const variations: ComponentVariation<ButtonProps>[] = [
 *   { label: 'Primary', props: { variant: 'primary' } },
 *   { label: 'Secondary', props: { variant: 'secondary' } },
 * ]
 * 
 * // AI can generate this pattern
 * <IterationDeck id="buttons" label="Button Variations">
 *   {variations.map(variation => 
 *     createSlideFromVariation(variation, (props) => <Button {...props}>Click me</Button>)
 *   )}
 * </IterationDeck>
 * ```
 */
export function createSlideFromVariation<T>(
  variation: ComponentVariation<T>,
  renderComponent: (props: T) => ReactElement
): ReactElement {
  const { props } = variation
  
  return renderComponent(props)
}

/**
 * Common component patterns that AI agents should recognize
 */
export const COMMON_VARIATION_PATTERNS = {
  /** Button variations */
  BUTTONS: {
    variants: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    sizes: ['sm', 'md', 'lg', 'xl'],
    states: ['default', 'loading', 'disabled'],
  },
  
  /** Card variations */
  CARDS: {
    layouts: ['default', 'horizontal', 'compact', 'expanded'],
    elevations: ['none', 'sm', 'md', 'lg', 'xl'],
    borders: ['none', 'subtle', 'strong'],
  },
  
  /** Form variations */
  FORMS: {
    layouts: ['vertical', 'horizontal', 'inline'],
    states: ['default', 'loading', 'error', 'success'],
    sizes: ['sm', 'md', 'lg'],
  },
  
  /** Navigation variations */
  NAVIGATION: {
    orientations: ['horizontal', 'vertical'],
    styles: ['tabs', 'pills', 'underline', 'sidebar'],
    positions: ['top', 'bottom', 'left', 'right'],
  },
  
  /** Modal variations */
  MODALS: {
    sizes: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
    positions: ['center', 'top', 'bottom'],
    animations: ['fade', 'slide', 'zoom'],
  },
} as const

/**
 * Helper to generate variation labels
 * Useful for AI agents to create consistent naming
 */
export const generateVariationLabel = (
  componentName: string,
  _variationType: string,
  variationValue: string
): string => {
  const formatted = variationValue.charAt(0).toUpperCase() + variationValue.slice(1)
  return `${formatted} ${componentName}`
}

/**
 * AI-friendly preset for common comparison scenarios
 * AI agents can use these presets to quickly generate appropriate IterationDecks
 */
export const AI_PRESETS = {
  /** Compare different visual styles of the same component */
  STYLE_VARIATIONS: {
    suggestedId: (component: string) => `${component.toLowerCase()}-styles`,
    suggestedLabel: (component: string) => `${component} Style Variations`,
    commonLabels: ['Default', 'Primary', 'Secondary', 'Accent', 'Muted'],
  },
  
  /** Compare different sizes of the same component */
  SIZE_VARIATIONS: {
    suggestedId: (component: string) => `${component.toLowerCase()}-sizes`,
    suggestedLabel: (component: string) => `${component} Size Variations`,
    commonLabels: ['Small', 'Medium', 'Large', 'Extra Large'],
  },
  
  /** Compare different states of the same component */
  STATE_VARIATIONS: {
    suggestedId: (component: string) => `${component.toLowerCase()}-states`,
    suggestedLabel: (component: string) => `${component} State Variations`,
    commonLabels: ['Default', 'Loading', 'Success', 'Error', 'Disabled'],
  },
  
  /** Compare different layouts */
  LAYOUT_VARIATIONS: {
    suggestedId: (context: string) => `${context.toLowerCase()}-layouts`,
    suggestedLabel: (context: string) => `${context} Layout Options`,
    commonLabels: ['Centered', 'Split', 'Grid', 'Stack', 'Sidebar'],
  },
  
  /** Compare responsive breakpoints */
  RESPONSIVE_VARIATIONS: {
    suggestedId: (component: string) => `${component.toLowerCase()}-responsive`,
    suggestedLabel: (component: string) => `${component} Responsive Layouts`,
    commonLabels: ['Mobile', 'Tablet', 'Desktop', 'Large Screen'],
  },
} as const