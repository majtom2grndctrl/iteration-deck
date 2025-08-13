/**
 * Vanilla Extract styles for IterationDeck component
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
});

// Main container styles
export const iterationDeck = style({
  position: 'relative',
  width: '100%',
});

// Base slide styles
export const slide = style({
  display: 'none',
  width: '100%',
});

// Active slide styles
export const slideActive = style({
  display: 'block',
});

// Development mode container
export const slidesContainer = style({
  position: 'relative',
  width: '100%',
});

// Development mode styles for slides container
export const slidesContainerDevMode = style({
  selectors: {
    // In dev mode, all slides are rendered but positioned absolutely
    [`${slidesContainer}&`]: {
      position: 'relative',
    },
  },
});

// Development mode slide styles
export const slideDevMode = style({
  selectors: {
    // Override base slide display in dev mode
    [`${slidesContainerDevMode} &`]: {
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
    [`${slidesContainerDevMode} &${slideActive}`]: {
      opacity: '1',
      pointerEvents: 'auto',
      position: 'relative',
    },
  },
});

// Responsive styles for mobile optimization
export const responsiveContainer = style({
  '@media': {
    [breakpoints.sm]: {
      // Smaller spacing on mobile
      padding: themeContract.spacing.sm,
    },
    [breakpoints.md]: {
      // Standard spacing on tablet and up
      padding: themeContract.spacing.md,
    },
    [breakpoints.lg]: {
      // Larger spacing on desktop
      padding: themeContract.spacing.lg,
    },
  },
});

// Production mode optimizations
export const productionMode = style({
  // Optimize for production by removing dev-only styles
  selectors: {
    '&:not([data-dev-mode])': {
      // Ensure only first slide is visible in production
      position: 'relative',
    },
  },
});

// Accessibility improvements
export const accessibilityEnhanced = style({
  selectors: {
    // Focus management
    '&:focus-within': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
    },
    // Reduced motion support
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// Theme-aware styles with auto-detection
export const themeAware = style({
  // Light theme (default)
  backgroundColor: themeContract.colors.background.primary,
  color: themeContract.colors.text.primary,
  
  // Dark theme via CSS custom properties
  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: themeContract.colors.background.primary,
      color: themeContract.colors.text.primary,
    },
  },
});

// Performance optimized styles
export const performanceOptimized = style({
  // Enable hardware acceleration
  transform: 'translateZ(0)',
  // Optimize repaint performance
  willChange: 'transform, opacity',
  // Enable GPU compositing
  backfaceVisibility: 'hidden',
  
  selectors: {
    // Only apply performance optimizations during transitions
    '&[data-transitioning]': {
      willChange: 'transform, opacity',
    },
    // Reset will-change after transitions
    '&:not([data-transitioning])': {
      willChange: 'auto',
    },
  },
});