/**
 * Vanilla Extract styles for IterationDeck component
 * Zero-runtime styling with design token integration
 */
import { style } from '@vanilla-extract/css';
import { themeContract } from './theme.css';
import { breakpoints } from '../tokens';

// Media query helpers
const createMediaQuery = (breakpoint: string) => `screen and (min-width: ${breakpoint})`;

// Host element styles
export const host = style({
  display: 'block',
  width: '100%',
});

// Main container styles
export const iterationDeck = style({
  position: 'relative',
  width: '100%',
  backgroundColor: themeContract.colors.background.primary,
  color: themeContract.colors.text.primary,
});

// Slides container
export const slidesContainer = style({
  position: 'relative',
  width: '100%',
});

// Development mode container (when all slides are rendered)
export const slidesContainerDev = style([slidesContainer, {
  selectors: {
    '&[data-dev-mode="true"]': {
      position: 'relative',
    },
  },
}]);

// Base slide styles
export const slide = style({
  display: 'none',
  width: '100%',
  
  selectors: {
    // Production mode: only first slide is visible
    '&:first-child': {
      display: 'block',
    },
    
    // Development mode: active slide is visible
    '&[data-active="true"]': {
      display: 'block',
    },
    
    // Development mode: all slides positioned absolutely for smooth transitions
    [`${slidesContainerDev} &`]: {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      opacity: '0',
      pointerEvents: 'none',
      transition: `opacity ${themeContract.animation.duration.fast} ${themeContract.animation.easing.easeOut}`,
    },
    
    // Active slide in dev mode
    [`${slidesContainerDev} &[data-active="true"]`]: {
      position: 'relative',
      opacity: '1',
      pointerEvents: 'auto',
    },
  },
});

// Responsive container patterns
export const responsiveContainer = style({
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      padding: themeContract.spacing.sm,
    },
    [createMediaQuery(breakpoints.md)]: {
      padding: themeContract.spacing.md,
    },
    [createMediaQuery(breakpoints.lg)]: {
      padding: themeContract.spacing.lg,
    },
  },
});

// Accessibility enhancements
export const accessibilityEnhanced = style({
  selectors: {
    '&:focus-within': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// Performance optimizations
export const performanceOptimized = style({
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  
  selectors: {
    '&[data-transitioning="true"]': {
      willChange: 'transform, opacity',
    },
    '&:not([data-transitioning="true"])': {
      willChange: 'auto',
    },
  },
});