import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from './design-tokens.css';

/**
 * Global reset styles for Iteration Deck components
 */
globalStyle('iteration-deck, iteration-deck-slide, iteration-deck-toolbar', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('iteration-deck *, iteration-deck-slide *, iteration-deck-toolbar *', {
  boxSizing: 'border-box',
});

/**
 * Utility classes for common styling patterns
 */

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const focusRing = style({
  outline: 'none',
  ':focus': {
    outline: `2px solid ${tokens.colors.primary500}`,
    outlineOffset: '2px',
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.colors.primary500}`,
    outlineOffset: '2px',
  },
});

export const buttonReset = style({
  appearance: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
  padding: 0,
  textAlign: 'inherit',
  textDecoration: 'none',
});

export const touchTarget = style({
  minHeight: tokens.sizes.touchTarget,
  minWidth: tokens.sizes.touchTarget,
});

export const flexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const flexBetween = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const flexColumn = style({
  display: 'flex',
  flexDirection: 'column',
});

export const frostedGlass = style({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${tokens.colors.border}`,
});

export const pillShape = style({
  borderRadius: tokens.radii.full,
});

export const fadeIn = style({
  opacity: 0,
  animation: 'fadeIn 200ms ease-in-out forwards',
});

export const slideUp = style({
  transform: 'translateY(10px)',
  opacity: 0,
  animation: 'slideUp 250ms ease-out forwards',
});

export const pulse = style({
  animation: 'pulse 2s infinite',
});

// Define keyframes using CSS string
globalStyle('@keyframes fadeIn', {
  from: { opacity: 0 },
  to: { opacity: 1 },
} as any);

globalStyle('@keyframes slideUp', {
  from: { 
    transform: 'translateY(10px)',
    opacity: 0,
  },
  to: { 
    transform: 'translateY(0)',
    opacity: 1,
  },
} as any);

globalStyle('@keyframes pulse', {
  '0%, 100%': { 
    boxShadow: `0 0 0 0 rgba(59, 130, 246, 0.7)`,
  },
  '50%': { 
    boxShadow: `0 0 0 8px rgba(59, 130, 246, 0)`,
  },
} as any);

/**
 * Theme-aware text styles
 */
export const textPrimary = style({
  color: tokens.colors.text,
});

export const textSecondary = style({
  color: tokens.colors.textMuted,
});

/**
 * Responsive utilities
 */
export const hideOnMobile = style({
  display: 'block',
});

export const showOnMobile = style({
  display: 'block',
});

/**
 * Accessibility utilities
 */
export const reduceMotion = style({
  animation: 'none',
  transition: 'none',
});