/**
 * Z-Index Design Tokens
 * 
 * Layering system for proper stacking context management.
 * Provides semantic z-index values to prevent conflicts and ensure proper layering.
 */

// Base z-index scale - semantic layering system
export const zIndexScale = {
  hide: -1,         // Hidden behind everything
  auto: 0,          // Default stacking context
  base: 1,          // Base layer for most content
  docked: 10,       // Docked elements (sidebars, headers)
  sticky: 20,       // Sticky elements
  banner: 30,       // Banners and announcements
  overlay: 40,      // Background overlays
  dropdown: 50,     // Dropdown menus and popovers
  fixed: 60,        // Fixed positioned elements
  modal: 70,        // Modal dialogs
  popover: 80,      // Popovers and tooltips
  skip: 90,         // Skip links and accessibility
  toast: 100,       // Toast notifications
  tooltip: 110,     // Tooltips (highest priority)
} as const;

// Semantic z-index tokens for component usage
export const zIndex = {
  // Layout layers
  background: zIndexScale.hide,         // Background elements
  content: zIndexScale.base,            // Main content area
  header: zIndexScale.docked,           // Site header
  footer: zIndexScale.docked,           // Site footer
  sidebar: zIndexScale.docked,          // Navigation sidebar
  
  // Interactive layers
  button: zIndexScale.base,             // Buttons in normal flow
  input: zIndexScale.base,              // Form inputs
  link: zIndexScale.base,               // Links in normal flow
  
  // Floating elements
  dropdown: zIndexScale.dropdown,       // Dropdown menus
  popover: zIndexScale.popover,         // Popover content
  tooltip: zIndexScale.tooltip,         // Tooltip content
  
  // Modal and overlay layers
  backdrop: zIndexScale.overlay,        // Modal backdrop
  modal: zIndexScale.modal,             // Modal content
  drawer: zIndexScale.modal,            // Side drawer
  
  // Notification layers
  toast: zIndexScale.toast,             // Toast notifications
  alert: zIndexScale.banner,            // Alert banners
  
  // Component-specific z-index values
  iterationDeck: {
    container: zIndexScale.base,        // Main deck container
    slide: zIndexScale.base,            // Individual slides
    toolbar: zIndexScale.fixed,         // Toolbar (fixed position)
    dropdown: zIndexScale.dropdown,     // Toolbar dropdown
    backdrop: zIndexScale.overlay,      // Toolbar backdrop blur
  },
  
  // Accessibility layers
  skipLink: zIndexScale.skip,           // Skip navigation links
  focusRing: zIndexScale.popover,       // Focus indicators
  screenReader: zIndexScale.skip,       // Screen reader announcements
} as const;

// Z-index utilities for dynamic usage
export const zIndexUtils = {
  /**
   * Get z-index value above a given layer
   */
  above: (baseZIndex: number): number => baseZIndex + 1,
  
  /**
   * Get z-index value below a given layer
   */
  below: (baseZIndex: number): number => Math.max(0, baseZIndex - 1),
  
  /**
   * Check if one z-index is above another
   */
  isAbove: (zIndex1: number, zIndex2: number): boolean => zIndex1 > zIndex2,
  
  /**
   * Get the highest z-index from a list
   */
  max: (...zIndexes: number[]): number => Math.max(...zIndexes),
  
  /**
   * Get the lowest z-index from a list
   */
  min: (...zIndexes: number[]): number => Math.min(...zIndexes),
  
  /**
   * Create a new stacking context (useful for isolating layers)
   */
  createContext: (): number => zIndexScale.auto,
} as const;

// Stacking context guidelines
export const stackingContexts = {
  // Elements that create new stacking contexts
  isolators: [
    'position: relative/absolute/fixed with z-index',
    'opacity < 1',
    'transform (not none)',
    'filter (not none)',
    'perspective (not none)',
    'clip-path (not none)',
    'mask (not none)',
    'mix-blend-mode (not normal)',
    'will-change: transform/opacity',
  ],
  
  // Best practices for z-index management
  guidelines: [
    'Use semantic z-index tokens instead of arbitrary numbers',
    'Group related elements in the same z-index range',
    'Leave gaps between layers for future additions',
    'Document the layering hierarchy in complex components',
    'Use CSS custom properties for component-specific z-indexes',
    'Test with browser dev tools to verify stacking order',
  ],
} as const;

// Export types for TypeScript usage
export type ZIndexScale = typeof zIndexScale;
export type ZIndex = typeof zIndex;
export type ZIndexUtils = typeof zIndexUtils;
export type StackingContexts = typeof stackingContexts;