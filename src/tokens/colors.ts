/**
 * Color Design Tokens
 * 
 * Color primitives as JSON objects with light/dark themes as CSS tagged template literals.
 * Components use CSS custom properties directly.
 */

import { css, unsafeCSS } from 'lit';

// Color primitives - simple JSON object
export const colorPrimitives = {
  // Grayscale primitives (50-900 scale)
  gray050: '#fafafa',   // Lightest
  gray100: '#f4f4f5',   // Very light
  gray200: '#e4e4e7',   // Light
  gray300: '#d4d4d8',   // Light medium
  gray400: '#a1a1aa',   // Medium
  gray500: '#71717a',   // Medium dark
  gray600: '#52525b',   // Dark
  gray700: '#374151',   // Darker
  gray800: '#27272a',   // Very dark
  gray900: '#18181b',   // Darkest
  
  // Pure colors
  white: '#ffffff',
  black: '#000000',
} as const;

// Glass effect colors with rgba for backdrop effects
export const glassPrimitives = {
  // Light mode glass - subtle white transparency
  lightGlass: 'rgba(255, 255, 255, 0.8)',
  lightGlassHover: 'rgba(255, 255, 255, 0.9)',
  
  // Dark mode glass - subtle dark transparency  
  darkGlass: 'rgba(39, 39, 42, 0.8)',
  darkGlassHover: 'rgba(50, 50, 50, 0.9)',
} as const;

// Unified theme system with automatic light/dark switching
export const themeTokens = css`
  :host {
    /* Light theme by default */
    /* Background colors */
    --color-bg-primary: ${unsafeCSS(colorPrimitives.gray050)};
    --color-bg-secondary: ${unsafeCSS(colorPrimitives.gray100)};
    --color-bg-tertiary: ${unsafeCSS(colorPrimitives.gray200)};
    --color-bg-elevated: ${unsafeCSS(colorPrimitives.white)};
    --color-bg-glass: ${unsafeCSS(glassPrimitives.lightGlass)};
    --color-bg-glass-hover: ${unsafeCSS(glassPrimitives.lightGlassHover)};
    
    /* Text colors */
    --color-text-primary: ${unsafeCSS(colorPrimitives.gray700)};
    --color-text-secondary: ${unsafeCSS(colorPrimitives.gray600)};
    --color-text-tertiary: ${unsafeCSS(colorPrimitives.gray500)};
    --color-text-disabled: ${unsafeCSS(colorPrimitives.gray400)};
    --color-text-inverse: ${unsafeCSS(colorPrimitives.white)};
    
    /* Border colors */
    --color-border-primary: ${unsafeCSS(colorPrimitives.gray300)};
    --color-border-secondary: ${unsafeCSS(colorPrimitives.gray200)};
    --color-border-focus: ${unsafeCSS(colorPrimitives.gray600)};
    --color-border-disabled: ${unsafeCSS(colorPrimitives.gray200)};
    
    /* Interactive colors */
    --color-interactive-hover: ${unsafeCSS(colorPrimitives.gray100)};
    --color-interactive-active: ${unsafeCSS(colorPrimitives.gray200)};
    --color-interactive-selected: ${unsafeCSS(colorPrimitives.gray200)};
    --color-interactive-focus: rgba(113, 113, 122, 0.2);
    
    /* Toolbar-specific tokens */
    --toolbar-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
    --segmented-shadow: radial-gradient(ellipse 4px 44px at center, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.05) 60%, transparent 100%);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      /* Dark theme overrides */
      /* Background colors */
      --color-bg-primary: ${unsafeCSS(colorPrimitives.gray900)};
      --color-bg-secondary: ${unsafeCSS(colorPrimitives.gray800)};
      --color-bg-tertiary: ${unsafeCSS(colorPrimitives.gray700)};
      --color-bg-elevated: ${unsafeCSS(colorPrimitives.gray800)};
      --color-bg-glass: ${unsafeCSS(glassPrimitives.darkGlass)};
      --color-bg-glass-hover: ${unsafeCSS(glassPrimitives.darkGlassHover)};
      
      /* Text colors */
      --color-text-primary: ${unsafeCSS(colorPrimitives.gray200)};
      --color-text-secondary: ${unsafeCSS(colorPrimitives.gray300)};
      --color-text-tertiary: ${unsafeCSS(colorPrimitives.gray400)};
      --color-text-disabled: ${unsafeCSS(colorPrimitives.gray500)};
      --color-text-inverse: ${unsafeCSS(colorPrimitives.gray900)};
      
      /* Border colors */
      --color-border-primary: ${unsafeCSS(colorPrimitives.gray600)};
      --color-border-secondary: ${unsafeCSS(colorPrimitives.gray700)};
      --color-border-focus: ${unsafeCSS(colorPrimitives.gray400)};
      --color-border-disabled: ${unsafeCSS(colorPrimitives.gray700)};
      
      /* Interactive colors */
      --color-interactive-hover: ${unsafeCSS(colorPrimitives.gray800)};
      --color-interactive-active: ${unsafeCSS(colorPrimitives.gray700)};
      --color-interactive-selected: ${unsafeCSS(colorPrimitives.gray700)};
      --color-interactive-focus: rgba(161, 161, 170, 0.2);
      
      /* Dark mode toolbar tokens */
      --toolbar-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
      --segmented-shadow: radial-gradient(ellipse 4px 44px at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
    }
  }
`;

// Legacy exports for backward compatibility (deprecated)
export const lightTheme = css`
  :host {
    /* Background colors */
    --color-bg-primary: ${unsafeCSS(colorPrimitives.gray050)};
    --color-bg-secondary: ${unsafeCSS(colorPrimitives.gray100)};
    --color-bg-tertiary: ${unsafeCSS(colorPrimitives.gray200)};
    --color-bg-elevated: ${unsafeCSS(colorPrimitives.white)};
    --color-bg-glass: ${unsafeCSS(glassPrimitives.lightGlass)};
    --color-bg-glass-hover: ${unsafeCSS(glassPrimitives.lightGlassHover)};
    
    /* Text colors */
    --color-text-primary: ${unsafeCSS(colorPrimitives.gray700)};
    --color-text-secondary: ${unsafeCSS(colorPrimitives.gray600)};
    --color-text-tertiary: ${unsafeCSS(colorPrimitives.gray500)};
    --color-text-disabled: ${unsafeCSS(colorPrimitives.gray400)};
    --color-text-inverse: ${unsafeCSS(colorPrimitives.white)};
    
    /* Border colors */
    --color-border-primary: ${unsafeCSS(colorPrimitives.gray300)};
    --color-border-secondary: ${unsafeCSS(colorPrimitives.gray200)};
    --color-border-focus: ${unsafeCSS(colorPrimitives.gray600)};
    --color-border-disabled: ${unsafeCSS(colorPrimitives.gray200)};
    
    /* Interactive colors */
    --color-interactive-hover: ${unsafeCSS(colorPrimitives.gray100)};
    --color-interactive-active: ${unsafeCSS(colorPrimitives.gray200)};
    --color-interactive-selected: ${unsafeCSS(colorPrimitives.gray200)};
    --color-interactive-focus: rgba(113, 113, 122, 0.2);
  }
`;

// Dark theme CSS custom properties (deprecated - use themeTokens instead)
export const darkTheme = css`
  :host {
    /* Background colors */
    --color-bg-primary: ${unsafeCSS(colorPrimitives.gray900)};
    --color-bg-secondary: ${unsafeCSS(colorPrimitives.gray800)};
    --color-bg-tertiary: ${unsafeCSS(colorPrimitives.gray700)};
    --color-bg-elevated: ${unsafeCSS(colorPrimitives.gray800)};
    --color-bg-glass: ${unsafeCSS(glassPrimitives.darkGlass)};
    --color-bg-glass-hover: ${unsafeCSS(glassPrimitives.darkGlassHover)};
    
    /* Text colors */
    --color-text-primary: ${unsafeCSS(colorPrimitives.gray200)};
    --color-text-secondary: ${unsafeCSS(colorPrimitives.gray300)};
    --color-text-tertiary: ${unsafeCSS(colorPrimitives.gray400)};
    --color-text-disabled: ${unsafeCSS(colorPrimitives.gray500)};
    --color-text-inverse: ${unsafeCSS(colorPrimitives.gray900)};
    
    /* Border colors */
    --color-border-primary: ${unsafeCSS(colorPrimitives.gray600)};
    --color-border-secondary: ${unsafeCSS(colorPrimitives.gray700)};
    --color-border-focus: ${unsafeCSS(colorPrimitives.gray400)};
    --color-border-disabled: ${unsafeCSS(colorPrimitives.gray700)};
    
    /* Interactive colors */
    --color-interactive-hover: ${unsafeCSS(colorPrimitives.gray800)};
    --color-interactive-active: ${unsafeCSS(colorPrimitives.gray700)};
    --color-interactive-selected: ${unsafeCSS(colorPrimitives.gray700)};
    --color-interactive-focus: rgba(161, 161, 170, 0.2);
  }
`;

// Export types for TypeScript usage
export type ColorPrimitives = typeof colorPrimitives;
export type GlassPrimitives = typeof glassPrimitives;