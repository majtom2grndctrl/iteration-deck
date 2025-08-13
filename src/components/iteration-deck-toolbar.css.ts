/**
 * Vanilla Extract styles for IterationDeckToolbar component
 * Migrated from Lit CSS template literals to zero-runtime styling
 * Enhanced with comprehensive responsive design and theme support
 */
import { style, styleVariants } from '@vanilla-extract/css';
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
  position: 'fixed',
  bottom: themeContract.spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: themeContract.zIndex.toolbar,
  fontFamily: themeContract.typography.fontFamily,
  fontSize: themeContract.typography.fontSize.sm,
  
  // Responsive positioning
  '@media': {
    [breakpoints.sm]: {
      bottom: themeContract.spacing.lg,
    },
    [breakpoints.md]: {
      bottom: themeContract.spacing.xl,
    },
  },
});

// Host hidden state
export const hostHidden = style({
  display: 'none !important',
});

// Main toolbar container
export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: themeContract.spacing.sm,
  background: themeContract.colors.background.overlay,
  backdropFilter: themeContract.components.toolbar.backdropFilter,
  border: `1px solid ${themeContract.colors.border.light}`,
  borderRadius: themeContract.components.toolbar.borderRadius,
  padding: `${themeContract.spacing.sm} ${themeContract.spacing.lg}`,
  boxShadow: themeContract.components.toolbar.boxShadow,
  minHeight: themeContract.components.toolbar.minHeight,
  userSelect: 'none',
  
  // Theme-aware styling with CSS custom properties
  color: themeContract.colors.text.primary,
  
  // Responsive adjustments
  '@media': {
    [breakpoints.sm]: {
      gap: themeContract.spacing.xs,
      padding: `${themeContract.spacing.xs} ${themeContract.spacing.md}`,
      fontSize: themeContract.typography.fontSize.xs,
    },
    [breakpoints.md]: {
      gap: themeContract.spacing.sm,
      padding: `${themeContract.spacing.sm} ${themeContract.spacing.lg}`,
      fontSize: themeContract.typography.fontSize.sm,
    },
    // Dark theme support via prefers-color-scheme
    '(prefers-color-scheme: dark)': {
      background: themeContract.colors.background.overlayDark,
      borderColor: themeContract.colors.border.dark,
      color: themeContract.colors.text.inverse,
    },
    // High contrast mode support
    '(prefers-contrast: high)': {
      border: `2px solid ${themeContract.colors.border.dark}`,
      boxShadow: 'none',
    },
    // Reduced motion support
    '(prefers-reduced-motion: reduce)': {
      backdropFilter: 'none',
      transition: 'none',
    },
  },
  
  // Focus management for accessibility
  selectors: {
    '&:focus-within': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
    },
  },
});

// Deck selector dropdown
export const deckSelector = style({
  background: 'none',
  border: 'none',
  padding: `${themeContract.spacing.xs} ${themeContract.spacing.md}`,
  borderRadius: themeContract.components.button.borderRadius,
  fontSize: themeContract.typography.fontSize.sm,
  fontFamily: 'inherit',
  cursor: 'pointer',
  minWidth: '120px',
  color: 'inherit',
  transition: `background-color ${themeContract.animation.duration.fast} ${themeContract.animation.easing.easeOut}`,
  
  selectors: {
    '&:hover': {
      backgroundColor: themeContract.colors.interactive.hover,
    },
    '&:focus': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '1px',
    },
  },
  
  '@media': {
    [breakpoints.sm]: {
      minWidth: '80px',
      fontSize: themeContract.typography.fontSize.xs,
      padding: `${themeContract.spacing.xs} ${themeContract.spacing.sm}`,
    },
    [breakpoints.md]: {
      minWidth: '120px',
      fontSize: themeContract.typography.fontSize.sm,
    },
    '(prefers-color-scheme: dark)': {
      color: themeContract.colors.text.inverse,
    },
  },
});

// Navigation buttons
export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: themeContract.components.button.size.sm,
  height: themeContract.components.button.size.sm,
  border: 'none',
  borderRadius: themeContract.components.button.borderRadius,
  background: 'none',
  cursor: 'pointer',
  transition: `background-color ${themeContract.animation.duration.fast} ${themeContract.animation.easing.easeOut}`,
  color: 'inherit',
  
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: themeContract.colors.interactive.hover,
    },
    '&:focus': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '1px',
    },
    '&:disabled': {
      opacity: themeContract.colors.interactive.disabled,
      cursor: 'not-allowed',
    },
  },
  
  '@media': {
    [breakpoints.sm]: {
      width: '32px',
      height: '32px',
    },
    [breakpoints.md]: {
      width: themeContract.components.button.size.sm,
      height: themeContract.components.button.size.sm,
    },
    '(prefers-color-scheme: dark)': {
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: themeContract.colors.interactive.hoverDark,
        },
      },
    },
    // Touch-friendly sizing
    '(pointer: coarse)': {
      width: themeContract.components.button.minTouchTarget,
      height: themeContract.components.button.minTouchTarget,
    },
  },
});

// SVG icons within nav buttons
export const navButtonIcon = style({
  width: themeContract.spacing.lg,
  height: themeContract.spacing.lg,
  fill: 'currentColor',
  
  '@media': {
    [breakpoints.sm]: {
      width: themeContract.spacing.md,
      height: themeContract.spacing.md,
    },
    [breakpoints.md]: {
      width: themeContract.spacing.lg,
      height: themeContract.spacing.lg,
    },
  },
});

// Slide information display
export const slideInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '100px',
  gap: '2px',
  
  '@media': {
    [breakpoints.sm]: {
      minWidth: '60px',
      gap: '1px',
    },
    [breakpoints.md]: {
      minWidth: '100px',
      gap: '2px',
    },
  },
});

// Slide label
export const slideLabel = style({
  fontWeight: themeContract.typography.fontWeight.medium,
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: themeContract.typography.lineHeight.tight,
  
  '@media': {
    [breakpoints.sm]: {
      maxWidth: '80px',
      fontSize: themeContract.typography.fontSize.xs,
    },
    [breakpoints.md]: {
      maxWidth: '150px',
      fontSize: 'inherit',
    },
  },
});

// Slide counter
export const slideCounter = style({
  fontSize: themeContract.typography.fontSize.xs,
  opacity: '0.7',
  lineHeight: themeContract.typography.lineHeight.tight,
  
  '@media': {
    [breakpoints.sm]: {
      fontSize: '10px',
    },
    [breakpoints.md]: {
      fontSize: themeContract.typography.fontSize.xs,
    },
  },
});

// Divider between sections
export const divider = style({
  width: themeContract.components.divider.width,
  height: themeContract.components.divider.height,
  backgroundColor: themeContract.colors.border.medium,
  margin: `0 ${themeContract.spacing.xs}`,
  
  '@media': {
    [breakpoints.sm]: {
      display: 'none', // Hide dividers on mobile to save space
    },
    [breakpoints.md]: {
      display: 'block',
    },
    '(prefers-color-scheme: dark)': {
      backgroundColor: themeContract.colors.border.darkMedium,
    },
  },
});

// Animation variants for different states
export const animationStates = styleVariants({
  fadeIn: {
    opacity: '0',
    transform: 'translateY(20px) translateX(-50%)',
    animation: 'fadeInUp 0.3s ease-out forwards',
  },
  fadeOut: {
    opacity: '1',
    animation: 'fadeOutDown 0.3s ease-in forwards',
  },
  slideIn: {
    transform: 'translateY(100%) translateX(-50%)',
    animation: 'slideInUp 0.3s ease-out forwards',
  },
});

// Performance optimizations
export const performanceOptimized = style({
  // Hardware acceleration
  transform: 'translateZ(0)',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  
  // Optimize repaints
  contain: 'layout style paint',
  
  selectors: {
    // Reduce GPU usage when not interacting
    '&:not(:hover):not(:focus-within)': {
      willChange: 'auto',
    },
  },
});

// Responsive layout variations
export const responsiveLayout = styleVariants({
  compact: {
    '@media': {
      [breakpoints.sm]: {
        padding: `${themeContract.spacing.xs} ${themeContract.spacing.sm}`,
        gap: themeContract.spacing.xs,
      },
    },
  },
  standard: {
    '@media': {
      [breakpoints.md]: {
        padding: `${themeContract.spacing.sm} ${themeContract.spacing.lg}`,
        gap: themeContract.spacing.sm,
      },
    },
  },
  spacious: {
    '@media': {
      [breakpoints.lg]: {
        padding: `${themeContract.spacing.md} ${themeContract.spacing.xl}`,
        gap: themeContract.spacing.md,
      },
    },
  },
});

// Accessibility enhancements
export const accessibilityEnhanced = style({
  selectors: {
    // Announce role for screen readers
    '&[role="toolbar"]': {
      // Ensure proper ARIA semantics
    },
    // High contrast mode improvements
    '@media (prefers-contrast: high)': {
      border: `2px solid ${themeContract.colors.text.primary}`,
      backgroundColor: themeContract.colors.background.primary,
    },
    // Focus management
    '&:focus-within': {
      outline: `3px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
    },
  },
});