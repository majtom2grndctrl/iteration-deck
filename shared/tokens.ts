/**
 * Comprehensive Design Tokens System
 * 
 * Single source of truth for all design tokens used across React and Web Component implementations.
 * Provides both JavaScript objects for runtime usage and CSS values for styling.
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

// Color primitives - simple hex values
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
  lightGlass: 'rgba(225, 225, 225, 0.8)',
  lightGlassHover: 'rgba(255, 255, 255, 0.9)',
  
  // Dark mode glass - subtle dark transparency  
  darkGlass: 'rgba(39, 39, 42, 0.8)',
  darkGlassHover: 'rgba(50, 50, 50, 0.9)',
} as const;

// Focus colors
export const focusColors = {
  ring: 'rgba(236, 72, 153, 0.2)',
  outline: 'rgba(236, 72, 153, 0.6)',
} as const;

// Unified color tokens for React usage
export const colors = {
  gray: {
    50: colorPrimitives.gray050,
    100: colorPrimitives.gray100,
    200: colorPrimitives.gray200,
    300: colorPrimitives.gray300,
    400: colorPrimitives.gray400,
    500: colorPrimitives.gray500,
    600: colorPrimitives.gray600,
    700: colorPrimitives.gray700,
    800: colorPrimitives.gray800,
    900: colorPrimitives.gray900,
  },
  white: colorPrimitives.white,
  black: colorPrimitives.black,
  glass: glassPrimitives,
  focus: focusColors,
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

// Spacing scale - powers of 2 starting from 2px
export const spacing = {
  0: '2px',   // 2px - finest detail
  1: '4px',   // 4px - tight spacing
  2: '8px',   // 8px - small spacing
  3: '12px',  // 12px - medium spacing
  4: '16px',  // 16px - large spacing
  5: '20px',  // 20px - extra spacing
  6: '24px',  // 24px - section spacing
  7: '32px',  // 32px - large section spacing
  8: '40px',  // 40px - major spacing
  9: '48px',  // 48px - page-level spacing
  10: '56px', // 56px - large page spacing
  11: '64px', // 64px - major layout spacing
} as const;

// Legacy spacing names for backwards compatibility
export const spacingLegacy = {
  spacing00: spacing[0],
  spacing0: spacing[1],
  spacing1: spacing[2],
  spacing2: spacing[3],
  spacing3: spacing[4],
  spacing4: spacing[5],
  spacing5: spacing[6],
  spacing6: spacing[7],
  spacing7: spacing[8],
  spacing8: spacing[9],
  spacing9: spacing[10],
  spacing10: spacing[11],
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const shadows = {
  toolbar: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
  segmented: 'radial-gradient(ellipse 4px 44px at center, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0.05) 60%, transparent 100%)',
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

// Duration tokens - only the values we actually use
export const duration = {
  fast: '0.15s',    // slide container transitions
  normal: '0.2s',   // opacity transitions, deck animations
  slow: '0.3s',     // confidence bar, content transitions  
  slower: '0.5s',   // toolbar glow effect
  loading: '1.5s',  // loading animations
} as const;

// Easing - only the curves we actually use
export const easing = {
  ease: 'ease',               // deck animations
  easeInOut: 'ease-in-out',   // most component animations
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
} as const;

// Combined animation tokens
export const animation = {
  duration,
  easing,
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

// Base breakpoint values in pixels
export const breakpointValues = {
  xs: 375,    // Small mobile devices
  sm: 640,    // Large mobile devices
  md: 768,    // Tablets
  lg: 1024,   // Small desktops
  xl: 1280,   // Large desktops
  '2xl': 1536, // Extra large desktops
} as const;

// Breakpoint tokens with units for CSS usage
export const breakpoints = {
  xs: `${breakpointValues.xs}px`,
  sm: `${breakpointValues.sm}px`,
  md: `${breakpointValues.md}px`,
  lg: `${breakpointValues.lg}px`,
  xl: `${breakpointValues.xl}px`,
  '2xl': `${breakpointValues['2xl']}px`,
} as const;

// Media query generators for CSS-in-JS
export const mediaQueries = {
  // Mobile-first media queries (min-width)
  xs: `screen and (min-width: ${breakpoints.xs})`,
  sm: `screen and (min-width: ${breakpoints.sm})`,
  md: `screen and (min-width: ${breakpoints.md})`,
  lg: `screen and (min-width: ${breakpoints.lg})`,
  xl: `screen and (min-width: ${breakpoints.xl})`,
  '2xl': `screen and (min-width: ${breakpoints['2xl']})`,
  
  // Max-width media queries (mobile-down)
  xsDown: `screen and (max-width: ${breakpointValues.xs - 1}px)`,
  smDown: `screen and (max-width: ${breakpointValues.sm - 1}px)`,
  mdDown: `screen and (max-width: ${breakpointValues.md - 1}px)`,
  lgDown: `screen and (max-width: ${breakpointValues.lg - 1}px)`,
  xlDown: `screen and (max-width: ${breakpointValues.xl - 1}px)`,
  
  // Range media queries (between breakpoints)
  xsToSm: `screen and (min-width: ${breakpoints.xs}) and (max-width: ${breakpointValues.sm - 1}px)`,
  smToMd: `screen and (min-width: ${breakpoints.sm}) and (max-width: ${breakpointValues.md - 1}px)`,
  mdToLg: `screen and (min-width: ${breakpoints.md}) and (max-width: ${breakpointValues.lg - 1}px)`,
  lgToXl: `screen and (min-width: ${breakpoints.lg}) and (max-width: ${breakpointValues.xl - 1}px)`,
  xlTo2xl: `screen and (min-width: ${breakpoints.xl}) and (max-width: ${breakpointValues['2xl'] - 1}px)`,
  
  // Specific device targeting
  mobile: `screen and (max-width: ${breakpointValues.md - 1}px)`,
  tablet: `screen and (min-width: ${breakpoints.md}) and (max-width: ${breakpointValues.lg - 1}px)`,
  desktop: `screen and (min-width: ${breakpoints.lg})`,
  
  // Reduced motion preference
  reduceMotion: '(prefers-reduced-motion: reduce)',
  
  // Color scheme preference
  lightMode: '(prefers-color-scheme: light)',
  darkMode: '(prefers-color-scheme: dark)',
} as const;

// =============================================================================
// UNIFIED TOKEN EXPORT (matches tokens.json structure)
// =============================================================================

// Main tokens object for compatibility with existing code
export const tokens = {
  colors,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints: breakpointValues,
  mediaQueries,
} as const;

// =============================================================================
// TYPESCRIPT TYPES
// =============================================================================

export type ColorPrimitives = typeof colorPrimitives;
export type GlassPrimitives = typeof glassPrimitives;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Duration = typeof duration;
export type Easing = typeof easing;
export type Animation = typeof animation;
export type BreakpointValues = typeof breakpointValues;
export type Breakpoints = typeof breakpoints;
export type MediaQueries = typeof mediaQueries;
export type Tokens = typeof tokens;

// Legacy type for compatibility
export type DesignTokens = Tokens;