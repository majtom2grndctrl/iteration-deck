/**
 * Design Tokens for Iteration Deck
 * Central design system tokens used throughout the component library
 */

// Color System - Neutral gray scale with semantic variants
export const colors = {
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Semantic colors for theme system
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    overlay: 'rgba(255, 255, 255, 0.95)',
    overlayDark: 'rgba(28, 28, 30, 0.95)',
  },
  border: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(255, 255, 255, 0.2)',
    darkMedium: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    primary: '#171717',
    secondary: '#525252',
    disabled: '#a3a3a3',
    inverse: '#ffffff',
  },
  interactive: {
    hover: 'rgba(0, 0, 0, 0.05)',
    hoverDark: 'rgba(255, 255, 255, 0.1)',
    disabled: '0.4',
  },
} as const;

// Spacing System - 8px base grid
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '56px',
  '6xl': '64px',
} as const;

// Typography System - System font stack
export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px - renamed from 'base' to match theme contract
    lg: '1.125rem',   // 18px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const;

// Component-specific tokens
export const components = {
  toolbar: {
    borderRadius: '64px', // Pill-shaped
    minHeight: '48px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
    zIndex: '100',
  },
  button: {
    borderRadius: '8px',
    minTouchTarget: '44px', // WCAG 2.2 AA requirement
    size: {
      sm: '32px',
      md: '40px',
    },
  },
  divider: {
    width: '1px',
    height: '20px',
  },
} as const;

// Animation tokens
export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
} as const;

// Z-Index Scale
export const zIndex = {
  base: '0',
  dropdown: '10',
  sticky: '20',
  fixed: '30',
  modal: '40',
  popover: '50',
  tooltip: '60',
  toast: '70',
  toolbar: '100', // Iteration deck toolbar
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

// Legacy tokens object for backward compatibility
export const tokens = {
  colors,
  spacing,
  typography,
  components,
  animation,
  zIndex,
  breakpoints,
} as const;

// Type exports for TypeScript
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
export type FontWeightToken = keyof typeof tokens.typography.fontWeight;