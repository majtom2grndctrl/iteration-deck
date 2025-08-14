/**
 * Vanilla Extract Styling System
 * Exports for type-safe, zero-runtime CSS
 */

// Theme system
export { themeContract } from './theme.css';
export { lightTheme, darkTheme, autoTheme } from './themes.css';

// Component styles
export * as iterationDeckStyles from './iteration-deck.css';
export * as iterationDeckSlideStyles from './iteration-deck-slide.css';
export * as iterationDeckToolbarStyles from './iteration-deck-toolbar.css';

// Utility styles (from .css.ts files)
export {
  responsive,
  typography,
  fontWeight,
  zIndex,
  animation,
  commonStyles,
  interactiveStates,
} from './utils.css';

// Responsive utilities (from .ts files)
export {
  breakpoints,
  createResponsiveStyle,
  createThemeStyle,
} from './responsive-utils';

// Responsive patterns (from .css.ts files)
export {
  responsivePatterns,
} from './responsive-patterns.css';

// Re-export vanilla-extract core for component usage
export { style, styleVariants, globalStyle } from '@vanilla-extract/css';
export { assignInlineVars } from '@vanilla-extract/dynamic';