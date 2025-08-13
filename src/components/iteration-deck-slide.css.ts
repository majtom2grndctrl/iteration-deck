/**
 * Vanilla Extract styles for IterationDeckSlide component
 * Migrated from Lit CSS template literals to zero-runtime styling
 */
import { style } from '@vanilla-extract/css';
import { themeContract } from '../styles/theme.css';
import { breakpoints as breakpointTokens } from '../tokens';

// Media query definitions
const breakpoints = {
  sm: `screen and (min-width: ${breakpointTokens.sm})`,
  md: `screen and (min-width: ${breakpointTokens.md})`,
  lg: `screen and (min-width: ${breakpointTokens.lg})`,
  xl: `screen and (min-width: ${breakpointTokens.xl})`,
};

// Host element styles
export const host = style({
  display: 'block',
  width: '100%',
});

// Host element when active
export const hostActive = style({
  // Active slide styling
  display: 'block',
});

// Host element when not active (hidden in production)
export const hostHidden = style({
  display: 'none',
});

// Slide content container
export const slideContent = style({
  width: '100%',
  position: 'relative',
});

// Development mode slide content
export const slideContentDevMode = style({
  width: '100%',
  position: 'relative',
  
  selectors: {
    // In dev mode, handle visibility through parent positioning
    '&[data-dev-mode="true"]': {
      transition: `opacity ${themeContract.animation.duration.fast} ${themeContract.animation.easing.easeOut}`,
    },
  },
});

// Responsive container patterns
export const responsiveSlide = style({
  '@media': {
    [breakpoints.sm]: {
      // Mobile-first approach
      padding: themeContract.spacing.xs,
      minHeight: 'auto',
    },
    [breakpoints.md]: {
      // Tablet optimizations
      padding: themeContract.spacing.sm,
      minHeight: 'auto',
    },
    [breakpoints.lg]: {
      // Desktop optimizations
      padding: themeContract.spacing.md,
    },
  },
});

// Accessibility enhancements
export const accessibilityEnhanced = style({
  selectors: {
    // Focus management for keyboard navigation
    '&:focus-within': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
      borderRadius: themeContract.components.button.borderRadius,
    },
    // Reduced motion support
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
    // High contrast mode support
    '@media (prefers-contrast: high)': {
      border: `1px solid ${themeContract.colors.border.dark}`,
    },
  },
});

// Theme-aware styling
export const themeAware = style({
  // Inherit theme colors from parent
  color: 'inherit',
  backgroundColor: 'transparent',
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      // Dark theme optimizations if needed
      color: 'inherit',
    },
  },
});

// Development mode specific styles
export const devModeIndicator = style({
  selectors: {
    // Add subtle indicator for non-active slides in dev mode
    '&[data-dev-mode="true"]:not([data-active="true"])': {
      position: 'relative',
    },
    '&[data-dev-mode="true"]:not([data-active="true"])::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: themeContract.colors.background.overlay,
      opacity: '0.1',
      pointerEvents: 'none',
      zIndex: themeContract.zIndex.base,
    },
  },
});

// Performance optimizations
export const performanceOptimized = style({
  // Enable hardware acceleration for smooth transitions
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  
  selectors: {
    // Optimize for transitions
    '&[data-transitioning="true"]': {
      willChange: 'opacity, transform',
    },
    '&:not([data-transitioning="true"])': {
      willChange: 'auto',
    },
  },
});

// Animation states for slide transitions
export const slideEnter = style({
  opacity: '0',
  transform: 'translateX(20px)',
  transition: `opacity ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}, transform ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}`,
});

export const slideEnterActive = style({
  opacity: '1',
  transform: 'translateX(0)',
});

export const slideExit = style({
  opacity: '1',
  transform: 'translateX(0)',
  transition: `opacity ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeIn}, transform ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeIn}`,
});

export const slideExitActive = style({
  opacity: '0',
  transform: 'translateX(-20px)',
});

// Mobile-specific optimizations
export const mobileOptimized = style({
  '@media': {
    // Touch-friendly spacing on mobile
    [breakpoints.sm]: {
      minHeight: themeContract.components.button.minTouchTarget,
      padding: themeContract.spacing.sm,
    },
    // Ensure proper touch targets
    [`${breakpoints.sm} and (pointer: coarse)`]: {
      minHeight: themeContract.components.button.minTouchTarget,
      padding: themeContract.spacing.md,
    },
  },
});

// Content layout patterns
export const contentLayout = {
  // Flexible content that adapts to its container
  flexible: style({
    display: 'flex',
    flexDirection: 'column',
    gap: themeContract.spacing.sm,
    minHeight: 'min-content',
  }),
  
  // Fixed aspect ratio content
  aspectRatio: style({
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  
  // Full height content
  fullHeight: style({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),
};