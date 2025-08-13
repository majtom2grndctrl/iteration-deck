/**
 * Vanilla Extract Styling System
 * Exports for type-safe, zero-runtime CSS
 */

// Theme system
export { themeContract } from './theme.css';
export { lightTheme, darkTheme, autoTheme } from './themes.css';

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