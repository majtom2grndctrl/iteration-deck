/**
 * IterationDeckToolbar Component Styles
 * 
 * Token-based @vanilla-extract/css styles for the pill-shaped development toolbar.
 * Uses design tokens for consistency across the component system.
 */

import { style, keyframes } from '@vanilla-extract/css';

// Import static token values directly (avoiding theme contracts which cause vanilla-extract errors)
const tokens = {
  colors: {
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#374151',
      800: '#27272a',
      900: '#18181b',
    },
    text: {
      primary: '#374151',
      secondary: '#52525b',
      tertiary: '#71717a',
      disabled: '#a1a1aa',
      inverse: '#ffffff',
    },
    background: {
      primary: '#fafafa',
      secondary: '#f4f4f5',
      tertiary: '#e4e4e7',
      elevated: '#ffffff',
    },
    border: {
      primary: '#d4d4d8',
      secondary: '#e4e4e7',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    pill: '64px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    toolbar: '0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
  },
  fonts: {
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
  },
  zIndex: {
    overlay: 9999,
  },
  transitions: {
    base: 'all 0.2s ease',
    smooth: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  mediaQueries: {
    mobile: '(max-width: 480px)',
    tablet: '(max-width: 768px)',
  },
};

// Main toolbar container - signature pill shape with backdrop blur
export const toolbarContainer = style({
  // Positioning
  position: 'fixed',
  bottom: tokens.spacing.xl,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: tokens.zIndex.overlay,
  
  // Layout and sizing
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  minWidth: '280px',
  height: '48px',
  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
  
  // Visual design - signature pill shape
  borderRadius: tokens.borderRadius.pill,
  background: `rgba(128, 128, 128, 0.15)`,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${tokens.colors.gray[200]}`,
  boxShadow: tokens.shadows.toolbar,
  
  // Typography
  fontFamily: tokens.fonts.system,
  fontSize: tokens.fontSizes.sm,
  fontWeight: '500',
  lineHeight: '1',
  color: tokens.colors.text.primary,
  
  // Transitions
  transition: tokens.transitions.base,
  
  // Dark mode support
  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'rgba(60, 60, 60, 0.15)',
      borderColor: `${tokens.colors.gray[700]}`,
      color: tokens.colors.text.inverse,
    },
    [tokens.mediaQueries.mobile]: {
      minWidth: '240px',
      height: '48px',
      padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
      gap: tokens.spacing.sm,
      fontSize: tokens.fontSizes.xs,
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  
  selectors: {
    '&:hover': {
      background: 'rgba(128, 128, 128, 0.2)',
      borderColor: `${tokens.colors.gray[300]}`,
      boxShadow: tokens.shadows.md,
    },
  },
});

// Deck selector dropdown container
export const deckSelector = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

// Deck selector button
export const deckSelectorButton = style({
  backgroundColor: 'red',
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.xs,
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  minHeight: '36px',
  
  background: tokens.colors.background.elevated,
  border: `1px solid ${tokens.colors.border.secondary}`,
  borderRadius: tokens.borderRadius['2xl'],
  
  color: tokens.colors.text.secondary,
  fontSize: tokens.fontSizes.sm,
  fontWeight: '500',
  lineHeight: '1',
  cursor: 'pointer',
  outline: 'none',
  
  transition: tokens.transitions.smooth,
  
  selectors: {
    '&:hover': {
      background: tokens.colors.background.elevated,
      borderColor: tokens.colors.border.primary,
      transform: 'translateY(-1px)',
      boxShadow: tokens.shadows.sm,
    },
    '&:focus': {
      outline: '2px solid #007AFF',
      outlineOffset: '2px',
      borderColor: '#007AFF',
    },
    '&:active': {
      background: `${tokens.colors.gray[50]}`,
      transform: 'translateY(0px)',
      boxShadow: tokens.shadows.sm,
    },
  },
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'rgba(60, 60, 60, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      
      selectors: {
        '&:hover': {
          background: 'rgba(80, 80, 80, 1)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:focus': {
          borderColor: '#0A84FF',
        },
      },
    },
    [tokens.mediaQueries.mobile]: {
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      fontSize: tokens.fontSizes.xs,
      gap: '2px',
    },
  },
});

// Dropdown menu (currently unused but ready for expansion)
export const dropdownMenu = style({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  marginBottom: '4px',
  
  minWidth: '200px',
  maxHeight: '280px',
  overflowY: 'auto',
  
  background: tokens.colors.background.elevated,
  border: `1px solid ${tokens.colors.border.secondary}`,
  borderRadius: tokens.borderRadius.md,
  boxShadow: tokens.shadows.lg,
  backdropFilter: 'blur(10px)',
  
  opacity: '0',
  visibility: 'hidden',
  transform: 'translateX(-50%) scale(0.95)',
  transition: tokens.transitions.base,
});

export const dropdownOpen = style({
  opacity: '1',
  visibility: 'visible',
  transform: 'translateX(-50%) scale(1)',
});

// Dropdown item
export const dropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  
  background: 'transparent',
  border: 'none',
  borderRadius: tokens.borderRadius.sm,
  
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSizes.sm,
  fontWeight: '400',
  lineHeight: '1.5',
  textAlign: 'left',
  cursor: 'pointer',
  
  transition: 'background 0.1s ease',
  
  selectors: {
    '&:hover': {
      background: tokens.colors.gray[100],
    },
    '&:focus': {
      outline: 'none',
      background: 'rgba(0, 122, 255, 0.1)',
    },
  },
});

// Selected dropdown item
export const dropdownItemSelected = style({
  background: 'rgba(0, 122, 255, 0.1)',
  color: '#007AFF',
  fontWeight: '500',
  
  selectors: {
    '&::after': {
      content: '✓',
      marginLeft: 'auto',
      color: '#007AFF',
    },
  },
});

// Navigation section
export const navigation = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  
  '@media': {
    [tokens.mediaQueries.mobile]: {
      gap: tokens.spacing.xs,
    },
  },
});

// Navigation button (Previous/Next)
export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: tokens.borderRadius.full,
  
  background: tokens.colors.background.elevated,
  border: `1px solid ${tokens.colors.border.secondary}`,
  
  color: tokens.colors.text.secondary,
  cursor: 'pointer',
  outline: 'none',
  
  transition: tokens.transitions.smooth,
  
  selectors: {
    '&:hover': {
      background: tokens.colors.background.elevated,
      borderColor: tokens.colors.border.primary,
      color: tokens.colors.text.primary,
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: tokens.shadows.md,
    },
    '&:focus': {
      outline: '2px solid #007AFF',
      outlineOffset: '2px',
      borderColor: '#007AFF',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(0.98)',
      boxShadow: tokens.shadows.sm,
    },
    '&:disabled': {
      color: tokens.colors.text.disabled,
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&:disabled:hover': {
      background: tokens.colors.background.elevated,
      borderColor: tokens.colors.border.secondary,
      transform: 'none',
      boxShadow: 'none',
    },
  },
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'rgba(60, 60, 60, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      
      selectors: {
        '&:hover': {
          background: 'rgba(80, 80, 80, 1)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:focus': {
          borderColor: '#0A84FF',
        },
        '&:disabled': {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
    },
    '(max-width: 480px)': {
      width: '28px',
      height: '28px',
    },
  },
});

// Navigation button icons
export const navButtonIcon = style({
  width: '16px',
  height: '16px',
  fill: 'currentColor',
  fontSize: '14px',
  
  '@media': {
    '(max-width: 480px)': {
      width: '14px',
      height: '14px',
      fontSize: '12px',
    },
  },
});

// Slide label display
export const slideLabel = style({
  flex: 1,
  textAlign: 'center',
  
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSizes.sm,
  fontWeight: '500',
  lineHeight: '1',
  
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '150px',
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      color: tokens.colors.text.inverse,
    },
    [tokens.mediaQueries.mobile]: {
      fontSize: tokens.fontSizes.xs,
      fontWeight: '400',
      maxWidth: '100px',
    },
  },
});

// Keyboard shortcut hint
export const keyboardHint = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.xs,
  marginLeft: tokens.spacing.xs,
  
  color: tokens.colors.text.tertiary,
  fontSize: tokens.fontSizes.xs,
  fontWeight: '400',
  lineHeight: '1',
  opacity: 0.7,
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      color: tokens.colors.gray[600],
    },
    [tokens.mediaQueries.tablet]: {
      display: 'none',
    },
  },
});

// Individual keyboard key
export const keyboardKey = style({
  padding: `2px ${tokens.spacing.xs}`,
  
  background: tokens.colors.gray[100],
  border: `1px solid ${tokens.colors.border.secondary}`,
  borderRadius: tokens.borderRadius.sm,
  
  fontSize: tokens.fontSizes.xs,
  fontWeight: '500',
  fontFamily: tokens.fonts.mono,
  
  minWidth: '16px',
  textAlign: 'center',
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
});

// Separator between toolbar sections
export const separator = style({
  width: '1px',
  height: tokens.spacing.xl,
  background: tokens.colors.border.secondary,
  opacity: 0.6,
  
  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    [tokens.mediaQueries.mobile]: {
      height: '20px',
    },
  },
});

// Deck glow animation keyframes
const deckGlowPulse = keyframes({
  '0%': {
    boxShadow: '0 0 0 0 rgba(0, 122, 255, 0.4)',
    transform: 'scale(1)',
  },
  '50%': {
    boxShadow: '0 0 0 20px rgba(0, 122, 255, 0.1)',
    transform: 'scale(1.02)',
  },
  '100%': {
    boxShadow: '0 0 0 0 rgba(0, 122, 255, 0)',
    transform: 'scale(1)',
  },
});

// Deck glow effect for highlighting selected decks
export const deckGlow = style({
  animation: `${deckGlowPulse} 2s ease-in-out`,
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      boxShadow: '0 0 0 2px rgba(0, 122, 255, 0.3)',
    },
  },
});

// Export style objects for use in component
export const styles = {
  toolbarContainer,
  deckSelector,
  deckSelectorButton,
  dropdownMenu,
  dropdownOpen,
  dropdownItem,
  dropdownItemSelected,
  navigation,
  navButton,
  navButtonIcon,
  slideLabel,
  keyboardHint,
  keyboardKey,
  separator,
  deckGlow,
} as const;

// Export for TypeScript usage
export type ToolbarStyles = typeof styles;