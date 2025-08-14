/**
 * Vanilla Extract styles for IterationDeckSlide component
 * Zero-runtime styling with design token integration
 */
import { style, styleVariants } from '@vanilla-extract/css';
import { themeContract } from './theme.css';
import { breakpoints } from '../tokens';

// Media query helpers
const createMediaQuery = (breakpoint: string) => `screen and (min-width: ${breakpoint})`;

// Host element styles
export const host = style({
  display: 'block',
  width: '100%',
});

// Host element when active
export const hostActive = style([host, {
  display: 'block',
}]);

// Host element when hidden (production mode for non-first slides)
export const hostHidden = style([host, {
  display: 'none',
}]);

// Base slide wrapper class
export const slide = style({
  width: '100%',
  position: 'relative',
});

// Slide content container
export const slideContent = style({
  width: '100%',
  position: 'relative',
});

// Development mode slide content with transition effects
export const slideContentDev = style([slideContent, {
  selectors: {
    '&[data-dev-mode="true"]': {
      transition: `opacity ${themeContract.animation.duration.fast} ${themeContract.animation.easing.easeOut}`,
    },
  },
}]);

// Responsive slide patterns
export const responsiveSlide = style({
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      padding: themeContract.spacing.xs,
      minHeight: 'auto',
    },
    [createMediaQuery(breakpoints.md)]: {
      padding: themeContract.spacing.sm,
      minHeight: 'auto',
    },
    [createMediaQuery(breakpoints.lg)]: {
      padding: themeContract.spacing.md,
    },
  },
});

// Accessibility enhancements
export const accessibilityEnhanced = style({
  selectors: {
    '&:focus-within': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
      borderRadius: themeContract.components.button.borderRadius,
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
    '@media (prefers-contrast: high)': {
      border: `1px solid ${themeContract.colors.border.dark}`,
    },
  },
});

// Performance optimizations
export const performanceOptimized = style({
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  
  selectors: {
    '&[data-transitioning="true"]': {
      willChange: 'opacity, transform',
    },
    '&:not([data-transitioning="true"])': {
      willChange: 'auto',
    },
  },
});

// Animation states for slide transitions
export const slideTransitions = styleVariants({
  enter: {
    opacity: '0',
    transform: 'translateX(20px)',
    transition: `opacity ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}, transform ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}`,
  },
  enterActive: {
    opacity: '1',
    transform: 'translateX(0)',
  },
  exit: {
    opacity: '1',
    transform: 'translateX(0)',
    transition: `opacity ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeIn}, transform ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeIn}`,
  },
  exitActive: {
    opacity: '0',
    transform: 'translateX(-20px)',
  },
});

// Content layout patterns
export const contentLayout = styleVariants({
  flexible: {
    display: 'flex',
    flexDirection: 'column',
    gap: themeContract.spacing.sm,
    minHeight: 'min-content',
  },
  aspectRatio: {
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullHeight: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
});

// Mobile-specific optimizations
export const mobileOptimized = style({
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      minHeight: themeContract.components.button.minTouchTarget,
      padding: themeContract.spacing.sm,
    },
    [`${createMediaQuery(breakpoints.sm)} and (pointer: coarse)`]: {
      minHeight: themeContract.components.button.minTouchTarget,
      padding: themeContract.spacing.md,
    },
  },
});