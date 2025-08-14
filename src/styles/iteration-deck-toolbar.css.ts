/**
 * Vanilla Extract styles for IterationDeckToolbar component
 * Zero-runtime styling with comprehensive responsive design and theme support
 */
import { style, styleVariants } from '@vanilla-extract/css';
import { themeContract } from './theme.css';
import { breakpoints } from '../tokens';

// Media query helpers
const createMediaQuery = (breakpoint: string) => `screen and (min-width: ${breakpoint})`;

// Host element styles - Fixed positioning at bottom center
export const host = style({
  position: 'fixed',
  bottom: themeContract.spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: themeContract.zIndex.toolbar,
  fontFamily: themeContract.typography.fontFamily,
  fontSize: themeContract.typography.fontSize.sm,
  
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      bottom: themeContract.spacing.lg,
    },
    [createMediaQuery(breakpoints.md)]: {
      bottom: themeContract.spacing.xl,
    },
  },
});

// Host hidden state (production mode)
export const hostHidden = style([host, {
  display: 'none !important',
}]);

// Base toolbar class
export const toolbarBase = style({
  display: 'flex',
  alignItems: 'center',
});

// Main toolbar container - Pill-shaped with backdrop blur
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
  color: themeContract.colors.text.primary,
  
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      gap: themeContract.spacing.xs,
      padding: `${themeContract.spacing.xs} ${themeContract.spacing.md}`,
      fontSize: themeContract.typography.fontSize.xs,
    },
    [createMediaQuery(breakpoints.md)]: {
      gap: themeContract.spacing.sm,
      padding: `${themeContract.spacing.sm} ${themeContract.spacing.lg}`,
      fontSize: themeContract.typography.fontSize.sm,
    },
    '(prefers-reduced-motion: reduce)': {
      backdropFilter: 'none',
      transition: 'none',
    },
  },
  
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
    [createMediaQuery(breakpoints.sm)]: {
      minWidth: '80px',
      fontSize: themeContract.typography.fontSize.xs,
      padding: `${themeContract.spacing.xs} ${themeContract.spacing.sm}`,
    },
    [createMediaQuery(breakpoints.md)]: {
      minWidth: '120px',
      fontSize: themeContract.typography.fontSize.sm,
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
    [createMediaQuery(breakpoints.sm)]: {
      width: '32px',
      height: '32px',
    },
    [createMediaQuery(breakpoints.md)]: {
      width: themeContract.components.button.size.sm,
      height: themeContract.components.button.size.sm,
    },
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
    [createMediaQuery(breakpoints.sm)]: {
      width: themeContract.spacing.md,
      height: themeContract.spacing.md,
    },
    [createMediaQuery(breakpoints.md)]: {
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
    [createMediaQuery(breakpoints.sm)]: {
      minWidth: '60px',
      gap: '1px',
    },
    [createMediaQuery(breakpoints.md)]: {
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
    [createMediaQuery(breakpoints.sm)]: {
      maxWidth: '80px',
      fontSize: themeContract.typography.fontSize.xs,
    },
    [createMediaQuery(breakpoints.md)]: {
      maxWidth: '150px',
      fontSize: 'inherit',
    },
  },
});

// Slide counter (e.g., "1 of 3")
export const slideCounter = style({
  fontSize: themeContract.typography.fontSize.xs,
  opacity: '0.7',
  lineHeight: themeContract.typography.lineHeight.tight,
  
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      fontSize: '10px',
    },
    [createMediaQuery(breakpoints.md)]: {
      fontSize: themeContract.typography.fontSize.xs,
    },
  },
});

// Divider between toolbar sections
export const divider = style({
  width: themeContract.components.divider.width,
  height: themeContract.components.divider.height,
  backgroundColor: themeContract.colors.border.medium,
  margin: `0 ${themeContract.spacing.xs}`,
  
  '@media': {
    [createMediaQuery(breakpoints.sm)]: {
      display: 'none', // Hide dividers on mobile to save space
    },
    [createMediaQuery(breakpoints.md)]: {
      display: 'block',
    },
  },
});

// Performance optimizations
export const performanceOptimized = style({
  transform: 'translateZ(0)',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  contain: 'layout style paint',
  
  selectors: {
    '&:not(:hover):not(:focus-within)': {
      willChange: 'auto',
    },
  },
});

// Responsive layout variations
export const responsiveLayout = styleVariants({
  compact: {
    '@media': {
      [createMediaQuery(breakpoints.sm)]: {
        padding: `${themeContract.spacing.xs} ${themeContract.spacing.sm}`,
        gap: themeContract.spacing.xs,
      },
    },
  },
  standard: {
    '@media': {
      [createMediaQuery(breakpoints.md)]: {
        padding: `${themeContract.spacing.sm} ${themeContract.spacing.lg}`,
        gap: themeContract.spacing.sm,
      },
    },
  },
  spacious: {
    '@media': {
      [createMediaQuery(breakpoints.lg)]: {
        padding: `${themeContract.spacing.md} ${themeContract.spacing.xl}`,
        gap: themeContract.spacing.md,
      },
    },
  },
});

// Toolbar content wrapper
export const toolbarContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'inherit',
});

// Placeholder text styling
export const placeholderText = style({
  fontStyle: 'italic',
  opacity: '0.7',
  padding: `${themeContract.spacing.xs} ${themeContract.spacing.md}`,
});

// Accessibility enhancements
export const accessibilityEnhanced = style({
  selectors: {
    '&[role="toolbar"]': {
      // Ensure proper ARIA semantics
    },
    '@media (prefers-contrast: high)': {
      border: `2px solid ${themeContract.colors.text.primary}`,
      backgroundColor: themeContract.colors.background.primary,
    },
    '&:focus-within': {
      outline: `3px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
    },
  },
});