/**
 * Color Design Tokens
 * 
 * Neutral gray scale with semantic variants supporting light/dark themes.
 * Pure TypeScript constants compatible with Lit CSS tagged template literals.
 */

// Base color palette - neutral grays (50-900 scale)
export const grayScale = {
  50: '#fafafa',   // Lightest - backgrounds
  100: '#f4f4f5',  // Very light backgrounds
  200: '#e4e4e7',  // Light borders, disabled states
  300: '#d4d4d8',  // Borders, separators
  400: '#a1a1aa',  // Placeholder text, icons
  500: '#71717a',  // Secondary text
  600: '#52525b',  // Primary text (light theme)
  700: '#374151',  // Headings (light theme)
  800: '#27272a',  // Dark theme backgrounds
  900: '#18181b',  // Darkest - dark theme text
} as const;

// Semantic color tokens for component usage
export const semanticColors = {
  // Background colors
  background: {
    primary: grayScale[50],     // Main page background
    secondary: grayScale[100],  // Card backgrounds, secondary areas
    tertiary: grayScale[200],   // Subtle background areas
    elevated: '#ffffff',        // Elevated surfaces (modals, dropdowns)
  },
  
  // Text colors
  text: {
    primary: grayScale[700],    // Main text
    secondary: grayScale[600],  // Secondary text
    tertiary: grayScale[500],   // Tertiary text, captions
    disabled: grayScale[400],   // Disabled text
    inverse: '#ffffff',         // Text on dark backgrounds
  },
  
  // Border colors  
  border: {
    primary: grayScale[300],    // Main borders
    secondary: grayScale[200],  // Subtle borders
    focus: grayScale[600],      // Focus rings
    disabled: grayScale[200],   // Disabled borders
    medium: grayScale[500],   // Medium emphasis borders
  },
  
  // Interactive colors
  interactive: {
    hover: grayScale[100],      // Hover backgrounds
    active: grayScale[200],     // Active/pressed states
    selected: grayScale[200],   // Selected items
    focus: 'rgba(113, 113, 122, 0.2)', // Focus backgrounds
  },
  
  // Component-specific colors
  toolbar: {
    background: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent white
    backdrop: 'rgba(255, 255, 255, 0.1)',    // Backdrop blur overlay
    border: 'rgba(212, 212, 216, 0.6)',      // Subtle border
    shadow: 'rgba(0, 0, 0, 0.1)',            // Drop shadow
  },
} as const;

// CSS custom property names for theme values (for runtime theme switching)
export const colorTheme = {
  // Background colors
  background: {
    primary: '--color-background-primary',
    secondary: '--color-background-secondary',
    tertiary: '--color-background-tertiary',
    elevated: '--color-background-elevated',
  },
  
  // Text colors
  text: {
    primary: '--color-text-primary',
    secondary: '--color-text-secondary',
    tertiary: '--color-text-tertiary',
    disabled: '--color-text-disabled',
    inverse: '--color-text-inverse',
  },
  
  // Border colors
  border: {
    primary: '--color-border-primary',
    secondary: '--color-border-secondary',
    focus: '--color-border-focus',
    disabled: '--color-border-disabled',
  },
  
  // Interactive colors
  interactive: {
    hover: '--color-interactive-hover',
    active: '--color-interactive-active',
    selected: '--color-interactive-selected',
    focus: '--color-interactive-focus',
  },
  
  // Component-specific colors
  toolbar: {
    background: '--color-toolbar-background',
    backdrop: '--color-toolbar-backdrop',
    border: '--color-toolbar-border',
    shadow: '--color-toolbar-shadow',
  },
} as const;

// Light theme implementation
export const lightTheme = {
  background: {
    primary: grayScale[50],
    secondary: grayScale[100], 
    tertiary: grayScale[200],
    elevated: '#ffffff',
  },
  text: {
    primary: grayScale[700],
    secondary: grayScale[600],
    tertiary: grayScale[500],
    disabled: grayScale[400],
    inverse: '#ffffff',
  },
  border: {
    primary: grayScale[300],
    secondary: grayScale[200],
    focus: grayScale[600],
    disabled: grayScale[200],
  },
  interactive: {
    hover: grayScale[100],
    active: grayScale[200],
    selected: grayScale[200],
    focus: 'rgba(113, 113, 122, 0.2)',
  },
  toolbar: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdrop: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(212, 212, 216, 0.6)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
} as const;

// Dark theme implementation
export const darkTheme = {
  background: {
    primary: grayScale[900],
    secondary: grayScale[800],
    tertiary: grayScale[700],
    elevated: grayScale[800],
  },
  text: {
    primary: grayScale[200],
    secondary: grayScale[300],
    tertiary: grayScale[400],
    disabled: grayScale[500],
    inverse: grayScale[900],
  },
  border: {
    primary: grayScale[600],
    secondary: grayScale[700],
    focus: grayScale[400],
    disabled: grayScale[700],
  },
  interactive: {
    hover: grayScale[800],
    active: grayScale[700],
    selected: grayScale[700],
    focus: 'rgba(161, 161, 170, 0.2)',
  },
  toolbar: {
    background: 'rgba(39, 39, 42, 0.8)',
    backdrop: 'rgba(0, 0, 0, 0.1)',
    border: 'rgba(82, 82, 91, 0.6)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

// CSS custom property mappings for theme switching
export const lightThemeCssVars = {
  '--color-background-primary': lightTheme.background.primary,
  '--color-background-secondary': lightTheme.background.secondary,
  '--color-background-tertiary': lightTheme.background.tertiary,
  '--color-background-elevated': lightTheme.background.elevated,
  '--color-text-primary': lightTheme.text.primary,
  '--color-text-secondary': lightTheme.text.secondary,
  '--color-text-tertiary': lightTheme.text.tertiary,
  '--color-text-disabled': lightTheme.text.disabled,
  '--color-text-inverse': lightTheme.text.inverse,
  '--color-border-primary': lightTheme.border.primary,
  '--color-border-secondary': lightTheme.border.secondary,
  '--color-border-focus': lightTheme.border.focus,
  '--color-border-disabled': lightTheme.border.disabled,
  '--color-interactive-hover': lightTheme.interactive.hover,
  '--color-interactive-active': lightTheme.interactive.active,
  '--color-interactive-selected': lightTheme.interactive.selected,
  '--color-interactive-focus': lightTheme.interactive.focus,
  '--color-toolbar-background': lightTheme.toolbar.background,
  '--color-toolbar-backdrop': lightTheme.toolbar.backdrop,
  '--color-toolbar-border': lightTheme.toolbar.border,
  '--color-toolbar-shadow': lightTheme.toolbar.shadow,
} as const;

export const darkThemeCssVars = {
  '--color-background-primary': darkTheme.background.primary,
  '--color-background-secondary': darkTheme.background.secondary,
  '--color-background-tertiary': darkTheme.background.tertiary,
  '--color-background-elevated': darkTheme.background.elevated,
  '--color-text-primary': darkTheme.text.primary,
  '--color-text-secondary': darkTheme.text.secondary,
  '--color-text-tertiary': darkTheme.text.tertiary,
  '--color-text-disabled': darkTheme.text.disabled,
  '--color-text-inverse': darkTheme.text.inverse,
  '--color-border-primary': darkTheme.border.primary,
  '--color-border-secondary': darkTheme.border.secondary,
  '--color-border-focus': darkTheme.border.focus,
  '--color-border-disabled': darkTheme.border.disabled,
  '--color-interactive-hover': darkTheme.interactive.hover,
  '--color-interactive-active': darkTheme.interactive.active,
  '--color-interactive-selected': darkTheme.interactive.selected,
  '--color-interactive-focus': darkTheme.interactive.focus,
  '--color-toolbar-background': darkTheme.toolbar.background,
  '--color-toolbar-backdrop': darkTheme.toolbar.backdrop,
  '--color-toolbar-border': darkTheme.toolbar.border,
  '--color-toolbar-shadow': darkTheme.toolbar.shadow,
} as const;

// Color utilities for component usage
export const colorUtils = {
  /**
   * Get alpha variant of a color
   */
  alpha: (color: string, alpha: number) => 
    color.indexOf('rgba') === 0
      ? color.replace(/[\d.]+\)$/g, `${alpha})`)
      : color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`),
  
  /**
   * Check if we're in dark mode (for runtime usage)
   */
  isDarkMode: () => 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches,

  /**
   * Get CSS custom property value
   */
  cssVar: (varName: string) => `var(${varName})`,
  
  /**
   * Get CSS custom property value with fallback
   */
  cssVarWithFallback: (varName: string, fallback: string) => `var(${varName}, ${fallback})`,
} as const;

// Export types for TypeScript usage
export type GrayScale = typeof grayScale;
export type SemanticColors = typeof semanticColors;
export type ColorTheme = typeof colorTheme;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type LightThemeCssVars = typeof lightThemeCssVars;
export type DarkThemeCssVars = typeof darkThemeCssVars;
export type ColorUtils = typeof colorUtils;