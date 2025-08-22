/**
 * Design Tokens - Central Export
 * 
 * Comprehensive design token system for the iteration-deck project.
 * Pure TypeScript constants compatible with Lit CSS tagged template literals.
 * 
 * Usage:
 * ```typescript
 * import { colors, spacing, typography, zIndex } from './tokens';
 * import { lightTheme, darkTheme, lightThemeCssVars, darkThemeCssVars } from './tokens';
 * ```
 */

// Re-export all design tokens
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './components';
export * from './animation';
export * from './zIndex';
export * from './breakpoints';

// Re-export commonly used types for convenience
export type {
  GrayScale,
  SemanticColors,
  ColorTheme,
  LightTheme,
  DarkTheme,
  LightThemeCssVars,
  DarkThemeCssVars,
  ColorUtils,
} from './colors';

export type {
  SpaceScale,
  Spacing,
  Layout,
  Dimensions,
  Responsive,
} from './spacing';

export type {
  FontStacks,
  FontSizes,
  FontWeights,
  LineHeights,
  LetterSpacing,
  TextStyles,
  ResponsiveTypography,
} from './typography';

export type {
  BorderRadius,
  Shadows,
  Backdrop,
  ComponentTokens,
  TouchTargets,
  ComponentTransitions,
} from './components';

export type {
  Duration,
  Easing,
  Delay,
  Transitions,
  Keyframes,
  Animations,
  Stagger,
  MotionPreferences,
  Performance,
} from './animation';

export type {
  ZIndexScale,
  ZIndex,
  ZIndexUtils,
  StackingContexts,
} from './zIndex';

export type {
  BreakpointValues,
  Breakpoints,
  MediaQueries,
  Devices,
  ComponentBreakpoints,
  BreakpointUtils,
  GridSystem,
} from './breakpoints';

// Convenience exports for common token groups
import { grayScale, semanticColors, lightTheme, darkTheme, colorTheme, lightThemeCssVars, darkThemeCssVars, colorUtils } from './colors';
import { spaceScale, spacing, layout, dimensions } from './spacing';
import { fontStacks, fontSizes, textStyles } from './typography';
import { borderRadius, shadows, componentTokens, componentTransitions } from './components';
import { duration, easing, transitions, animations } from './animation';
import { zIndexScale, zIndex } from './zIndex';
import { breakpoints, mediaQueries, devices, breakpointUtils } from './breakpoints';

// Primary token collections
export const tokens = {
  // Color tokens
  colors: {
    gray: grayScale,
    semantic: semanticColors,
    light: lightTheme,
    dark: darkTheme,
    theme: colorTheme,
    lightCssVars: lightThemeCssVars,
    darkCssVars: darkThemeCssVars,
    utils: colorUtils,
  },
  
  // Spacing tokens
  spacing: {
    scale: spaceScale,
    semantic: spacing,
    layout,
    dimensions,
  },
  
  // Typography tokens
  typography: {
    fonts: fontStacks,
    sizes: fontSizes,
    styles: textStyles,
  },
  
  // Component tokens
  components: {
    borderRadius,
    shadows,
    tokens: componentTokens,
    transitions: componentTransitions,
  },
  
  // Animation tokens
  animation: {
    duration,
    easing,
    transitions,
    animations,
  },
  
  // Layout tokens
  layout: {
    zIndex: zIndexScale,
    semantic: zIndex,
    breakpoints,
    media: mediaQueries,
    devices,
    utils: breakpointUtils,
  },
} as const;

// Theme configuration for CSS custom properties
export const themeConfig = {
  cssVarNames: colorTheme,
  light: lightTheme,
  dark: darkTheme,
  lightCssVars: lightThemeCssVars,
  darkCssVars: darkThemeCssVars,
} as const;

// Utility functions for working with tokens
export const tokenUtils = {
  /**
   * Get responsive value based on breakpoint
   */
  responsive: <T>(values: {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    '2xl'?: T;
  }): T | undefined => {
    if (typeof window === 'undefined') return values.md || values.sm || values.xs;
    
    const currentBreakpoint = breakpointUtils.getCurrentBreakpoint();
    if (!currentBreakpoint) return values.xs;
    
    // Return the value for current breakpoint or fallback to smaller breakpoint
    if (currentBreakpoint === '2xl') return values['2xl'] || values.xl || values.lg || values.md || values.sm || values.xs;
    if (currentBreakpoint === 'xl') return values.xl || values.lg || values.md || values.sm || values.xs;
    if (currentBreakpoint === 'lg') return values.lg || values.md || values.sm || values.xs;
    if (currentBreakpoint === 'md') return values.md || values.sm || values.xs;
    if (currentBreakpoint === 'sm') return values.sm || values.xs;
    return values.xs;
  },
  
  /**
   * Create theme-aware color value
   */
  themeColor: (lightColor: string, darkColor?: string): string => {
    if (typeof window === 'undefined') return lightColor;
    
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark && darkColor ? darkColor : lightColor;
  },
  
  /**
   * Convert spacing token to number
   */
  spacingToNumber: (spacingValue: string): number => {
    return parseInt(spacingValue.replace('px', ''), 10);
  },
  
  /**
   * Create CSS custom property name
   */
  cssVar: (tokenPath: string): string => {
    return `--${tokenPath.replace(/\./g, '-')}`;
  },
  
  /**
   * Check if motion should be reduced
   */
  shouldReduceMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
} as const;

// Design system metadata
export const designSystem = {
  name: 'Iteration Deck Design System',
  version: '1.0.0',
  description: 'Comprehensive design token system for AI-first prototyping workflows',
  
  // Design principles
  principles: [
    'Mobile-first responsive design',
    'Accessibility (WCAG 2.2 AA compliance)',
    'Type-safe styling with TypeScript',
    'ShadowDOM-encapsulated CSS with Lit tagged template literals',
    'Consistent 8px grid system',
    'Semantic color tokens',
    'System font stacks',
    'Designer-friendly neutral palette',
  ],
  
  // Supported frameworks
  frameworks: [
    'React (manual wrappers)',
    'Lit (web components foundation)',
    'Astro (SSR integration)',
    'Vue (web component usage)',
    'Angular (web component usage)',
    'Vanilla HTML/JS',
  ],
  
  // Browser support
  browsers: [
    'Chrome 91+',
    'Firefox 90+',
    'Safari 14+',
    'Edge 91+',
  ],
} as const;

// Export types for the complete token system
export type Tokens = typeof tokens;
export type ThemeConfig = typeof themeConfig;
export type TokenUtils = typeof tokenUtils;
export type DesignSystem = typeof designSystem;