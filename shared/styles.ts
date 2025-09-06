/**
 * Shared Styling System
 * 
 * This file exports Tailwind class strings as TypeScript constants for cross-framework consistency.
 * These styles work with both React components and Lit web components, ensuring visual consistency
 * across the entire iteration-deck ecosystem.
 * 
 * Benefits:
 * - Cross-framework consistency (React, Lit, etc.)
 * - Type safety with TypeScript
 * - Tailwind's build optimization and purging
 * - Single source of truth for component styling
 */

// =============================================================================
// TOOLBAR STYLES
// =============================================================================

export const toolbarStyles = {
  // Base toolbar container - fixed positioning with pill shape
  container: [
    // Positioning
    'fixed bottom-2 left-1/2 -translate-x-1/2',
    'z-[9999]',
    
    // Layout
    'flex items-center',
    'min-w-80', // 320px equivalent
    'sm:min-w-96', // 384px equivalent
    'sm:h-10', // Slightly taller on larger screens

    // Spacing - mobile first
    'gap-1 px-2 py-1',
    'sm:gap-2 sm:px-1 sm:py-1 sm:bottom-4',
    'lg:p-3',
    
    // Visual design - signature pill shape
    'rounded-[40px]', // Large border radius
    'backdrop-blur-md',
    'shadow-lg',
    
    // Typography
    'font-medium text-sm leading-none',
    'text-gray-700',
    
    // Background with glass effect
    'bg-gray-200/80',
    'dark:bg-gray-900/70 dark:text-gray-200'
  ].join(' '),

  // Inner container for toolbar content
  inner: [
    'flex items-center gap-2 w-full'
  ].join(' '),
  
  // Deck selector dropdown
  selector: {
    container: [
      'relative flex items-center'
    ].join(' '),

    select: [
      'absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-[2]'
    ].join(' '),

    button: [
      // Layout
      'flex items-center justify-between',
      'h-7 min-w-30',
      'gap-3 px-3',
      
      // Visual design with dark mode
      'bg-white border-2 border-gray-300',
      'dark:bg-gray-800 dark:border-gray-600',
      'rounded-3xl', // 24px border radius
      
      // Typography with dark mode
      'text-sm font-normal leading-3',
      'text-gray-700 dark:text-gray-200',
      
      // Interactive with dark mode
      'cursor-pointer select-none',
      'hover:bg-gray-50 dark:hover:bg-gray-600',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
    ].join(' '),

    text: [
      'flex-1 overflow-hidden text-ellipsis whitespace-nowrap'
    ].join(' '),

    arrow: [
      'text-[8px] text-gray-500 dark:text-gray-400 pointer-events-none'
    ].join(' ')
  },

  // Separator between elements
  separator: [
    'w-px h-5 bg-gray-400/60 dark:bg-gray-500/70 sm:h-4'
  ].join(' '),

  // Slide navigation section
  slideNavigation: {
    container: [
      'flex items-center gap-0 sm:gap-1'
    ].join(' '),

    prevButton: [
      // Shape - left side of segmented control
      'rounded-l-3xl border-r-0',
      
      // Interactive states with dark mode - consistent with main button
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
      'dark:focus:ring-blue-400',
      'active:bg-gray-100 active:scale-95',
      'dark:active:bg-gray-500',
      
      // Disabled state with dark mode - consistent
      'disabled:opacity-40 disabled:cursor-not-allowed',
      'disabled:hover:bg-white disabled:active:scale-100',
      'dark:disabled:hover:bg-gray-700'
    ].join(' '),

    nextButton: [
      // Shape - right side of segmented control  
      'rounded-r-3xl border-l-0',
      
      // Interactive states with dark mode - consistent with main button
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
      'dark:focus:ring-blue-400',
      'active:bg-gray-100 active:scale-95',
      'dark:active:bg-gray-500',
      
      // Disabled state with dark mode - consistent
      'disabled:opacity-40 disabled:cursor-not-allowed',
      'disabled:hover:bg-white disabled:active:scale-100',
      'dark:disabled:hover:bg-gray-700'
    ].join(' ')
  },

  // Slide info section
  slideInfo: {
    container: [
      'flex-1 flex flex-col gap-0 sm:px-2 sm:max-w-4xl lg:max-w-none lg:w-80'
    ].join(' '),

    label: [
      'text-gray-700 dark:text-gray-200 text-xs font-medium leading-4 overflow-hidden text-ellipsis whitespace-nowrap sm:text-sm'
    ].join(' ')
  },

  // Slide indicators (dots)
  indicators: {
    container: [
      'flex items-center justify-start gap-1 w-full'
    ].join(' '),

    dot: [
      'w-1 h-1 rounded-full bg-gray-600 dark:bg-gray-400 transition-opacity duration-200'
    ].join(' '),

    dotActive: [
      'opacity-80'
    ].join(' '),

    dotInactive: [
      'opacity-40'
    ].join(' ')
  },
  
  // Navigation buttons (segmented group)
  navigation: {
    container: [
      // Layout
      'flex items-center',
      'rounded-3xl',
      'border-2 border-gray-300 dark:border-gray-600',
      'overflow-hidden',
      'h-7',
      
      // Visual design with dark mode
      'bg-gray-200 dark:bg-gray-600',
    ].join(' '),
    
    button: [
      // Layout
      'flex items-center justify-center',
      'w-8 h-full',
      
      // Background with dark mode - clean transitions
      'bg-white dark:bg-gray-800',
      'transition-all duration-150 ease-out',
      
      // Typography with dark mode
      'text-gray-600 dark:text-gray-300 text-sm',
      
      // Interactive states with dark mode support
      'cursor-pointer select-none',
      'hover:bg-gray-50 hover:text-gray-800',
      'dark:hover:bg-gray-600 dark:hover:text-gray-100',
      'active:bg-gray-100 active:scale-95',
      'dark:active:bg-gray-500',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
      'dark:focus:ring-blue-400',
      
      // Disabled state with dark mode
      'disabled:opacity-40 disabled:cursor-not-allowed',
      'disabled:hover:bg-white disabled:hover:text-gray-600',
      'dark:disabled:hover:bg-gray-700 dark:disabled:hover:text-gray-300',
      'disabled:active:scale-100'
    ].join(' ')
  }
} as const;

// =============================================================================
// ITERATION DECK STYLES
// =============================================================================

export const deckStyles = {
  // Basic deck container
  container: [
    'block min-h-1'
  ].join(' ')
} as const;

// =============================================================================
// CONFIDENCE BAR STYLES
// =============================================================================

export const confidenceStyles = {
  // Confidence indicator base
  container: [
    'inline-block relative'
  ].join(' '),
  
  bar: [
    'bg-gray-200 rounded-full overflow-hidden relative'
  ].join(' '),
  
  fill: [
    'h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-500'
  ].join(' ')
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ToolbarStyles = typeof toolbarStyles;
export type DeckStyles = typeof deckStyles;
export type ConfidenceStyles = typeof confidenceStyles;