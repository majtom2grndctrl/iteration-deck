/**
 * Responsive utility functions for vanilla-extract
 * Note: This is a .ts file (not .css.ts) because it contains functions
 */
import { style } from '@vanilla-extract/css';
import { breakpoints as breakpointTokens } from '../tokens';

// Media query helpers using actual values (not CSS variables)
export const breakpoints = {
  sm: `screen and (min-width: ${breakpointTokens.sm})`,
  md: `screen and (min-width: ${breakpointTokens.md})`,
  lg: `screen and (min-width: ${breakpointTokens.lg})`,
  xl: `screen and (min-width: ${breakpointTokens.xl})`,
};

// Responsive style creator function
export const createResponsiveStyle = (styles: Record<string, any>) => {
  const mediaQueries: Record<string, any> = {};
  let baseStyle: any = {};

  Object.entries(styles).forEach(([breakpoint, styleObj]) => {
    if (breakpoint === 'base') {
      baseStyle = styleObj;
    } else if (breakpoints[breakpoint as keyof typeof breakpoints]) {
      mediaQueries[breakpoints[breakpoint as keyof typeof breakpoints]] = styleObj;
    }
  });

  return style({
    ...baseStyle,
    ...(Object.keys(mediaQueries).length > 0 && {
      '@media': mediaQueries,
    }),
  });
};

// Utility to create conditional styles based on theme
export const createThemeStyle = (
  lightStyle: any,
  darkStyle: any,
  selector = '@media (prefers-color-scheme: dark)'
) => {
  return style({
    ...lightStyle,
    [selector]: darkStyle,
  });
};

// Note: responsivePatterns moved to responsive-patterns.css.ts 
// to avoid calling style() during module import