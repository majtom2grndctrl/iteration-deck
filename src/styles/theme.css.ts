/**
 * Vanilla Extract Theme for Iteration Deck Components
 * This file creates CSS custom properties from TypeScript design tokens
 */

import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';
import { tokens } from './tokens';

// Create global theme variables from tokens
export const vars = createGlobalTheme(':root', tokens);

// Add dark mode theme support
globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [vars.colors.background.overlay]: tokens.colors.background.overlayDark,
        [vars.colors.border.light]: tokens.colors.border.dark,
        [vars.colors.border.medium]: tokens.colors.border.darkMedium,
        [vars.colors.text.primary]: tokens.colors.text.inverse,
        [vars.colors.interactive.hover]: tokens.colors.interactive.hoverDark,
      }
    }
  }
});

// Export the theme contract for use in component styles
export const theme = vars;