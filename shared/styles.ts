/**
 * Shared Tailwind Styling System
 * 
 * This file exports Tailwind class strings as TypeScript constants for cross-framework consistency.
 * Used by both React and Lit components to ensure single source of truth for styling.
 * 
 * Benefits:
 * - TypeScript autocomplete and refactoring safety
 * - Tailwind's build optimization and purging
 * - Framework agnostic styling
 * - Prevents class string duplication
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
    'h-8', // Fixed height to prevent stretching
    'sm:h-10', // Slightly taller on larger screens
    
    // Spacing - mobile first
    'gap-1 px-2 py-1',
    'sm:gap-2 sm:px-1 sm:py-1 sm:bottom-4',
    
    // Visual design - signature pill shape
    'rounded-[40px]', // Large border radius
    'backdrop-blur-md',
    'shadow-lg',
    
    // Typography
    'font-medium text-sm leading-none',
    'text-gray-700',
    
    // Background with glass effect
    'bg-gray-200/80',
    'dark:bg-gray-900/80 dark:text-gray-200'
  ].join(' '),
  
  // Deck selector dropdown
  selector: {
    button: [
      // Layout
      'flex items-center justify-between',
      'h-6 min-w-30',
      'gap-3 px-3 py-2',
      
      // Visual design
      'bg-white border-2 border-gray-300',
      'rounded-3xl', // 24px border radius
      
      // Typography
      'text-sm font-normal leading-3',
      'text-gray-700',
      
      // Interactive
      'cursor-pointer select-none',
      'hover:bg-gray-50',
      'focus:outline-none focus:ring-2 focus:ring-gray-600'
    ].join(' '),
    
    menu: [
      // Positioning
      'absolute bottom-full mb-2 left-0',
      'min-w-full',
      
      // Visual design
      'bg-white border border-gray-300',
      'rounded-lg shadow-lg',
      
      // Animation
      'animate-in fade-in duration-150'
    ].join(' '),
    
    menuItem: [
      // Layout
      'block w-full px-3 py-2',
      
      // Typography
      'text-sm text-left text-gray-700',
      
      // Interactive
      'cursor-pointer',
      'hover:bg-gray-100',
      'focus:bg-gray-100 focus:outline-none'
    ].join(' ')
  },
  
  // Navigation buttons (segmented group)
  navigation: {
    container: [
      // Layout
      'flex items-center',
      'rounded-3xl', // 24px border radius
      'overflow-hidden',
      
      // Visual design
      'bg-white',
      'shadow-md'
    ].join(' '),
    
    button: [
      // Layout
      'flex items-center justify-center',
      'w-8 h-6', // 32px x 24px
      'px-2',
      
      // Typography
      'text-gray-600',
      
      // Interactive
      'cursor-pointer select-none',
      'hover:bg-gray-100 hover:text-gray-700',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600'
    ].join(' ')
  },
  
  // Slide counter
  counter: [
    // Typography
    'text-xs font-medium',
    'text-gray-500',
    'whitespace-nowrap min-w-[60px] text-center'
  ].join(' ')
} as const;

// =============================================================================
// ITERATION DECK STYLES
// =============================================================================

export const deckStyles = {
  // Main container
  container: [
    'block relative'
  ].join(' '),
  
  // Individual slides
  slide: {
    // Base slide wrapper
    wrapper: [
      'block'
    ].join(' '),
    
    // Hidden slide (not active)
    hidden: [
      'hidden'
    ].join(' '),
    
    // Active slide
    active: [
      'block'
    ].join(' ')
  }
} as const;

// =============================================================================
// CONFIDENCE BAR STYLES
// =============================================================================

export const confidenceStyles = {
  // Container
  indicator: [
    // Layout
    'inline-block relative',
    'bg-gray-100 bg-opacity-10',
    'rounded-8 overflow-hidden', // Large border radius for pill shape
    
    // Dark mode
    'dark:bg-white dark:bg-opacity-20'
  ].join(' '),
  
  // Size variations
  sizes: {
    small: 'w-10 h-[3px]',
    medium: 'w-15 h-1',
    large: 'w-20 h-[6px]'
  },
  
  // Confidence bar with gradient colors
  bar: [
    'h-full rounded-8',
    'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500',
    'origin-left transition-all duration-slow ease-in-out',
    
    // Reduced motion support
    'motion-reduce:transition-none'
  ].join(' ')
} as const;

// =============================================================================
// ANIMATION UTILITIES
// =============================================================================

export const animationStyles = {
  // Fade in animation
  fadeIn: 'animate-fade-in',
  
  // Slide up animation
  slideUp: 'animate-slide-up',
  
  // Glow effect for highlighting
  glow: [
    'animate-pulse',
    'ring-4 ring-blue-300 ring-opacity-75',
    'transition-all duration-1000'
  ].join(' ')
} as const;

// =============================================================================
// RESPONSIVE UTILITIES
// =============================================================================

export const responsiveStyles = {
  // Mobile-first responsive classes
  mobileFirst: {
    // Spacing
    gapSmall: 'gap-1 sm:gap-2',
    paddingSmall: 'px-2 py-1 sm:px-1 sm:py-1',
    
    // Sizing
    minWidthToolbar: 'min-w-[320px] sm:min-w-[384px]',
    
    // Positioning
    bottomPosition: 'bottom-2 sm:bottom-4'
  }
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ToolbarStyles = typeof toolbarStyles;
export type DeckStyles = typeof deckStyles;
export type ConfidenceStyles = typeof confidenceStyles;
export type AnimationStyles = typeof animationStyles;
export type ResponsiveStyles = typeof responsiveStyles;