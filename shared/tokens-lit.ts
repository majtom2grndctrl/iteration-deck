/**
 * Lit CSS Tagged Template Literals for Design Tokens
 * 
 * This module provides CSS tagged template literals for use in Lit components.
 * Imports tokens from the main tokens.ts file to ensure consistency.
 */

import { css, unsafeCSS } from 'lit';
import { 
  colorPrimitives, 
  glassPrimitives, 
  spacingLegacy,
  breakpoints,
  duration,
  easing 
} from './tokens.js';

// =============================================================================
// CSS CUSTOM PROPERTIES FOR LIT COMPONENTS
// =============================================================================

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
    --color-border-primary: ${unsafeCSS(colorPrimitives.gray400)};
    --color-border-secondary: ${unsafeCSS(colorPrimitives.gray300)};
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

// =============================================================================
// INDIVIDUAL TOKEN EXPORTS FOR DIRECT USAGE
// =============================================================================

// Re-export spacing with legacy names for Lit components
export const spacing = spacingLegacy;

// Re-export other tokens for direct usage in Lit CSS
export { breakpoints, duration, easing };

// =============================================================================
// TYPESCRIPT TYPES
// =============================================================================

export type ThemeTokens = typeof themeTokens;