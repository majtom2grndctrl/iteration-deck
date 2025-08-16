/**
 * Animation Design Tokens
 * 
 * Comprehensive animation and transition tokens for smooth, performant interactions.
 * Follows design system best practices with semantic naming and accessibility considerations.
 */

// Duration tokens - semantic timing values
export const duration = {
  instant: '0ms',      // Instant - no animation
  fast: '100ms',       // Fast interactions - hovers, focus
  normal: '150ms',     // Standard interactions - buttons, inputs
  slow: '200ms',       // Deliberate animations - slide transitions
  slower: '300ms',     // Content transitions - modals, dropdowns
  slowest: '500ms',    // Page-level transitions
  
  // Component-specific durations
  toolbar: '200ms',    // Toolbar animations
  slide: '300ms',      // Slide transitions
  dropdown: '150ms',   // Dropdown animations
  modal: '300ms',      // Modal animations
} as const;

// Easing curves - semantic motion curves
export const easing = {
  // Basic easing
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier curves for better UX
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',        // Smooth, natural motion
  snappy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy, playful
  crisp: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',   // Sharp, responsive
  
  // Motion-specific curves
  entrance: 'cubic-bezier(0, 0, 0.2, 1)',        // Elements entering
  exit: 'cubic-bezier(0.4, 0, 1, 1)',            // Elements leaving
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',      // Emphasized motion
  
  // Component-specific easing
  toolbar: 'cubic-bezier(0.4, 0, 0.2, 1)',       // Toolbar interactions
  slide: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Slide transitions
  dropdown: 'cubic-bezier(0, 0, 0.2, 1)',        // Dropdown animations
} as const;

// Delay tokens for staggered animations
export const delay = {
  none: '0ms',
  xs: '50ms',
  sm: '100ms',
  md: '150ms',
  lg: '200ms',
  xl: '300ms',
} as const;

// Common transition combinations
export const transitions = {
  // All properties
  all: `all ${duration.normal} ${easing.smooth}`,
  allFast: `all ${duration.fast} ${easing.smooth}`,
  allSlow: `all ${duration.slow} ${easing.smooth}`,
  
  // Specific properties
  colors: `background-color ${duration.normal} ${easing.smooth}, border-color ${duration.normal} ${easing.smooth}, color ${duration.normal} ${easing.smooth}`,
  transform: `transform ${duration.normal} ${easing.smooth}`,
  opacity: `opacity ${duration.slow} ${easing.smooth}`,
  visibility: `visibility ${duration.normal} ${easing.smooth}, opacity ${duration.normal} ${easing.smooth}`,
  
  // Interactive elements
  button: `background-color ${duration.fast} ${easing.smooth}, border-color ${duration.fast} ${easing.smooth}, color ${duration.fast} ${easing.smooth}, box-shadow ${duration.fast} ${easing.smooth}`,
  input: `border-color ${duration.normal} ${easing.smooth}, box-shadow ${duration.normal} ${easing.smooth}`,
  link: `color ${duration.fast} ${easing.smooth}`,
  
  // Layout transitions
  height: `height ${duration.slower} ${easing.smooth}`,
  width: `width ${duration.slower} ${easing.smooth}`,
  size: `width ${duration.slower} ${easing.smooth}, height ${duration.slower} ${easing.smooth}`,
  
  // Component-specific transitions
  toolbar: `background-color ${duration.toolbar} ${easing.toolbar}, border-color ${duration.toolbar} ${easing.toolbar}, backdrop-filter ${duration.toolbar} ${easing.toolbar}`,
  slide: `opacity ${duration.slide} ${easing.slide}, transform ${duration.slide} ${easing.slide}`,
  dropdown: `opacity ${duration.dropdown} ${easing.dropdown}, transform ${duration.dropdown} ${easing.dropdown}`,
} as const;

// Keyframe animations
export const keyframes = {
  // Fade animations
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  
  // Slide animations
  slideInUp: {
    '0%': { 
      opacity: '0', 
      transform: 'translateY(16px)' 
    },
    '100%': { 
      opacity: '1', 
      transform: 'translateY(0)' 
    },
  },
  slideInDown: {
    '0%': { 
      opacity: '0', 
      transform: 'translateY(-16px)' 
    },
    '100%': { 
      opacity: '1', 
      transform: 'translateY(0)' 
    },
  },
  slideInLeft: {
    '0%': { 
      opacity: '0', 
      transform: 'translateX(-16px)' 
    },
    '100%': { 
      opacity: '1', 
      transform: 'translateX(0)' 
    },
  },
  slideInRight: {
    '0%': { 
      opacity: '0', 
      transform: 'translateX(16px)' 
    },
    '100%': { 
      opacity: '1', 
      transform: 'translateX(0)' 
    },
  },
  
  // Scale animations
  scaleIn: {
    '0%': { 
      opacity: '0', 
      transform: 'scale(0.95)' 
    },
    '100%': { 
      opacity: '1', 
      transform: 'scale(1)' 
    },
  },
  scaleOut: {
    '0%': { 
      opacity: '1', 
      transform: 'scale(1)' 
    },
    '100%': { 
      opacity: '0', 
      transform: 'scale(0.95)' 
    },
  },
  
  // Pulse animation for loading states
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  
  // Bounce animation for emphasis
  bounce: {
    '0%, 20%, 53%, 80%, 100%': { 
      transform: 'translateY(0)' 
    },
    '40%, 43%': { 
      transform: 'translateY(-8px)' 
    },
    '70%': { 
      transform: 'translateY(-4px)' 
    },
    '90%': { 
      transform: 'translateY(-2px)' 
    },
  },
  
  // Spin animation for loading indicators
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  
  // Shake animation for errors
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
  },
} as const;

// Animation presets for common use cases
export const animations = {
  // Entrance animations
  fadeIn: `fadeIn ${duration.slow} ${easing.entrance}`,
  slideInUp: `slideInUp ${duration.slow} ${easing.entrance}`,
  slideInDown: `slideInDown ${duration.slow} ${easing.entrance}`,
  slideInLeft: `slideInLeft ${duration.slow} ${easing.entrance}`,
  slideInRight: `slideInRight ${duration.slow} ${easing.entrance}`,
  scaleIn: `scaleIn ${duration.slow} ${easing.entrance}`,
  
  // Exit animations
  fadeOut: `fadeOut ${duration.normal} ${easing.exit}`,
  scaleOut: `scaleOut ${duration.normal} ${easing.exit}`,
  
  // Utility animations
  pulse: `pulse ${duration.slowest} ${easing.easeInOut} infinite`,
  bounce: `bounce ${duration.slowest} ${easing.easeInOut}`,
  spin: `spin 1s ${easing.linear} infinite`,
  shake: `shake 0.5s ${easing.easeInOut}`,
  
  // Component-specific animations
  toolbarEnter: `slideInUp ${duration.toolbar} ${easing.toolbar}`,
  toolbarExit: `fadeOut ${duration.normal} ${easing.exit}`,
  slideChange: `fadeIn ${duration.slide} ${easing.slide}`,
  dropdownEnter: `slideInDown ${duration.dropdown} ${easing.dropdown}`,
  dropdownExit: `fadeOut ${duration.fast} ${easing.exit}`,
} as const;

// Stagger utilities for sequential animations
export const stagger = {
  // Calculate stagger delay for nth child
  delay: (index: number, baseDelay: number = 50): string => 
    `${index * baseDelay}ms`,
  
  // Common stagger patterns
  children: {
    fast: '25ms',    // Quick stagger between elements
    normal: '50ms',  // Standard stagger timing
    slow: '100ms',   // Deliberate stagger timing
  },
} as const;

// Motion preferences and accessibility
export const motionPreferences = {
  // Respect user's motion preferences
  reduceMotion: {
    // Reduced motion alternatives
    duration: duration.fast,
    easing: easing.easeOut,
    
    // Disable complex animations for accessibility
    disableTransforms: true,
    disableParallax: true,
    disableAutoplay: true,
  },
  
  // High contrast mode adjustments
  highContrast: {
    // Ensure animations are visible in high contrast
    emphasizeTransitions: true,
    solidColors: true,
  },
} as const;

// Performance optimization hints
export const performance = {
  // Properties that trigger GPU acceleration
  gpuAccelerated: [
    'transform',
    'opacity',
    'filter',
  ],
  
  // Properties to avoid animating (cause layout)
  avoidAnimating: [
    'width',
    'height',
    'padding',
    'margin',
    'border-width',
    'top',
    'left',
    'right',
    'bottom',
  ],
  
  // Optimization utilities
  willChange: {
    auto: 'auto',
    transform: 'transform',
    opacity: 'opacity',
    scroll: 'scroll-position',
  },
} as const;

// Export types for TypeScript usage
export type Duration = typeof duration;
export type Easing = typeof easing;
export type Delay = typeof delay;
export type Transitions = typeof transitions;
export type Keyframes = typeof keyframes;
export type Animations = typeof animations;
export type Stagger = typeof stagger;
export type MotionPreferences = typeof motionPreferences;
export type Performance = typeof performance;