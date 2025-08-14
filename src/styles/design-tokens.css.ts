import { createGlobalTheme } from '@vanilla-extract/css';

/**
 * Design tokens for Iteration Deck components
 * Following a numeric sizing scale: 25, 50, 75, 100, 200, then incrementing by 100
 * Semantic colors reference primitive color values for consistency
 */

// Define base color primitives
const colorPrimitives = {
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  primary50: '#eff6ff',
  primary100: '#dbeafe',
  primary200: '#bfdbfe',
  primary300: '#93c5fd',
  primary400: '#60a5fa',
  primary500: '#3b82f6',
  primary600: '#2563eb',
  primary700: '#1d4ed8',
  primary800: '#1e40af',
  primary900: '#1e3a8a',
  
  white: '#ffffff',
};

export const tokens = createGlobalTheme(':root', {
  space: {
    space25: '2px',
    space50: '4px',
    space75: '6px',
    space100: '8px',
    space200: '16px',
    space300: '24px',
    space400: '32px',
    space500: '40px',
    space600: '48px',
    space700: '56px',
    space800: '64px',
    space900: '72px',
    space1000: '80px',
  },
  
  colors: {
    gray50: colorPrimitives.gray50,
    gray100: colorPrimitives.gray100,
    gray200: colorPrimitives.gray200,
    gray300: colorPrimitives.gray300,
    gray400: colorPrimitives.gray400,
    gray500: colorPrimitives.gray500,
    gray600: colorPrimitives.gray600,
    gray700: colorPrimitives.gray700,
    gray800: colorPrimitives.gray800,
    gray900: colorPrimitives.gray900,
    
    primary50: colorPrimitives.primary50,
    primary100: colorPrimitives.primary100,
    primary200: colorPrimitives.primary200,
    primary300: colorPrimitives.primary300,
    primary400: colorPrimitives.primary400,
    primary500: colorPrimitives.primary500,
    primary600: colorPrimitives.primary600,
    primary700: colorPrimitives.primary700,
    primary800: colorPrimitives.primary800,
    primary900: colorPrimitives.primary900,
    
    white: colorPrimitives.white,
    
    // Semantic tokens reference color primitives
    background: colorPrimitives.white,
    backgroundDark: colorPrimitives.gray900,
    surface: colorPrimitives.gray50,
    surfaceDark: colorPrimitives.gray800,
    border: colorPrimitives.gray200,
    borderDark: colorPrimitives.gray700,
    text: colorPrimitives.gray900,
    textDark: colorPrimitives.gray50,
    textMuted: colorPrimitives.gray500,
    textMutedDark: colorPrimitives.gray400,
  },
  
  fonts: {
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },
  
  fontSizes: {
    'xs': '12px',
    'sm': '14px',
    'base': '16px',
    'lg': '18px',
    'xl': '20px',
    '2xl': '24px',
  },
  
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  
  radii: {
    none: '0',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  zIndex: {
    base: '0',
    raised: '10',
    overlay: '100',
    modal: '1000',
    tooltip: '2000',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  sizes: {
    touchTarget: '44px',
    toolbarHeight: '56px',
    slideIndicatorSize: '8px',
  }
});

/**
 * Media query breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Helper function to create media queries
 */
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  
  // Utility media queries
  hover: '@media (hover: hover)',
  reduced: '@media (prefers-reduced-motion: reduce)',
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
} as const;