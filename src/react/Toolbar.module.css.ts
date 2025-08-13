/**
 * React Toolbar Module Styles - Vanilla Extract Migration
 * Migrated from Toolbar.module.css with design token integration
 */

import { style } from '@vanilla-extract/css';
import { theme } from '../styles/theme.css';

/* Main toolbar container with pill-shaped design */
export const toolbar = style({
  position: 'fixed',
  bottom: theme.spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: theme.zIndex.toolbar,
  
  background: theme.colors.background.overlay,
  backdropFilter: theme.components.toolbar.backdropFilter,
  border: `1px solid ${theme.colors.border.light}`,
  borderRadius: theme.components.toolbar.borderRadius,
  boxShadow: theme.components.toolbar.boxShadow,
  
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  minHeight: theme.components.toolbar.minHeight,
  
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.lineHeight.normal,
  color: theme.colors.text.primary,

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: theme.colors.background.overlayDark,
      borderColor: theme.colors.border.dark,
      color: theme.colors.text.inverse,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)'
    }
  }
});

/* Deck selector dropdown */
export const deckSelector = style({
  background: 'transparent',
  border: `1px solid ${theme.colors.border.light}`,
  borderRadius: theme.components.button.borderRadius,
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  fontSize: theme.typography.fontSize.sm,
  color: 'inherit',
  cursor: 'pointer',
  minHeight: theme.components.button.minTouchTarget,
  minWidth: '120px',
  
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 8px center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px',
  paddingRight: '32px',

  ':hover': {
    backgroundColor: theme.colors.interactive.hover
  },

  ':focus': {
    outline: '2px solid #3b82f6',
    outlineOffset: '1px'
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: theme.colors.border.dark,
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%9ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      
      ':hover': {
        backgroundColor: theme.colors.interactive.hoverDark
      }
    }
  }
});

/* Navigation buttons */
export const navButton = style({
  background: 'transparent',
  border: `1px solid ${theme.colors.border.light}`,
  borderRadius: theme.components.button.borderRadius,
  padding: theme.spacing.sm,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: theme.components.button.minTouchTarget,
  minWidth: theme.components.button.minTouchTarget,
  color: 'inherit',
  transition: `all ${theme.animation.duration.fast} ${theme.animation.easing.ease}`,

  ':hover': {
    backgroundColor: theme.colors.interactive.hover
  },

  ':focus': {
    outline: '2px solid #3b82f6',
    outlineOffset: '1px'
  },

  ':disabled': {
    opacity: theme.colors.interactive.disabled,
    cursor: 'not-allowed'
  },

  ':disabled:hover': {
    backgroundColor: 'transparent'
  },

  '@media': {
    '(prefers-color-scheme: dark)': {
      borderColor: theme.colors.border.dark,
      
      ':hover:not(:disabled)': {
        backgroundColor: theme.colors.interactive.hoverDark
      }
    }
  }
});

/* Slide information container */
export const slideInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  padding: `0 ${theme.spacing.sm}`,
  minWidth: 0
});

/* Slide label */
export const slideLabel = style({
  fontWeight: theme.typography.fontWeight.medium,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px'
});

/* Slide counter */
export const slideCounter = style({
  color: theme.colors.text.secondary,
  fontSize: theme.typography.fontSize.xs,
  whiteSpace: 'nowrap',

  '@media': {
    '(prefers-color-scheme: dark)': {
      color: '#9ca3af'
    }
  }
});

/* Visual divider */
export const divider = style({
  width: theme.components.divider.width,
  height: theme.components.divider.height,
  background: theme.colors.border.light,
  margin: `0 ${theme.spacing.xs}`,

  '@media': {
    '(prefers-color-scheme: dark)': {
      background: theme.colors.border.dark
    }
  }
});

/* Navigation button icons */
export const navButtonIcon = style({
  width: '16px',
  height: '16px',
  fill: 'currentColor'
});