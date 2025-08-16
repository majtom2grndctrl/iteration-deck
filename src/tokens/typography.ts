/**
 * Typography Design Tokens
 * 
 * System font stack matching OS/browser dev tools aesthetic.
 * Provides consistent typography scale and semantic text styles.
 */

// System font stacks for different contexts
export const fontStacks = {
  // Primary system font stack - matches dev tools/OS interface
  system: [
    '-apple-system',        // macOS San Francisco
    'BlinkMacSystemFont',   // macOS backup
    'Segoe UI',            // Windows
    'Roboto',              // Android/Chrome OS
    'Helvetica Neue',      // macOS fallback
    'Arial',               // Universal fallback
    'sans-serif',          // System fallback
  ].join(', '),
  
  // Monospace font stack for code/technical content
  mono: [
    'SF Mono',             // macOS
    'Monaco',              // macOS fallback
    'Consolas',            // Windows
    'Liberation Mono',     // Linux
    'Courier New',         // Universal fallback
    'monospace',           // System fallback
  ].join(', '),
  
  // System serif for enhanced readability (optional)
  serif: [
    'ui-serif',            // System UI serif
    'Georgia',             // Cross-platform serif
    'Times New Roman',     // Universal fallback
    'serif',               // System fallback
  ].join(', '),
} as const;

// Font size scale - modular scale based on 16px base
export const fontSizes = {
  xs: '12px',     // 0.75rem - small text, captions
  sm: '14px',     // 0.875rem - small body text
  base: '16px',   // 1rem - base body text
  lg: '18px',     // 1.125rem - large body text
  xl: '20px',     // 1.25rem - small headings
  '2xl': '24px',  // 1.5rem - medium headings  
  '3xl': '30px',  // 1.875rem - large headings
  '4xl': '36px',  // 2.25rem - extra large headings
  '5xl': '48px',  // 3rem - display headings
} as const;

// Font weights - system font weights
export const fontWeights = {
  light: '300',     // Light weight
  normal: '400',    // Normal/regular weight
  medium: '500',    // Medium weight
  semibold: '600',  // Semi-bold weight
  bold: '700',      // Bold weight
} as const;

// Line heights - optimized for readability
export const lineHeights = {
  none: '1',        // 1 - tight line height
  tight: '1.25',    // 1.25 - compact text
  snug: '1.375',    // 1.375 - comfortable reading
  normal: '1.5',    // 1.5 - default body text
  relaxed: '1.625', // 1.625 - loose reading
  loose: '2',       // 2 - very loose spacing
} as const;

// Letter spacing values
export const letterSpacing = {
  tighter: '-0.05em',  // Tight tracking
  tight: '-0.025em',   // Slightly tight
  normal: '0',         // Default spacing
  wide: '0.025em',     // Slightly loose
  wider: '0.05em',     // Loose tracking
  widest: '0.1em',     // Very loose tracking
} as const;

// Semantic typography styles for components
export const textStyles = {
  // Body text variants
  body: {
    sm: {
      fontSize: fontSizes.sm,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    base: {
      fontSize: fontSizes.base,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
    lg: {
      fontSize: fontSizes.lg,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.normal,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
  },
  
  // Heading variants
  heading: {
    h1: {
      fontSize: fontSizes['5xl'],
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tighter,
    },
    h2: {
      fontSize: fontSizes['4xl'],
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.tight,
      letterSpacing: letterSpacing.tighter,
    },
    h3: {
      fontSize: fontSizes['3xl'],
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.tight,
    },
    h4: {
      fontSize: fontSizes['2xl'],
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.tight,
    },
    h5: {
      fontSize: fontSizes.xl,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
    h6: {
      fontSize: fontSizes.lg,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.normal,
      letterSpacing: letterSpacing.normal,
    },
  },
  
  // Component-specific text styles
  toolbar: {
    label: {
      fontSize: fontSizes.sm,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacing.normal,
    },
    button: {
      fontSize: fontSizes.sm,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.none,
      letterSpacing: letterSpacing.wide,
    },
  },
  
  slide: {
    label: {
      fontSize: fontSizes.base,
      fontFamily: fontStacks.system,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.snug,
      letterSpacing: letterSpacing.normal,
    },
  },
  
  // Utility text styles
  caption: {
    fontSize: fontSizes.xs,
    fontFamily: fontStacks.system,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacing.wide,
  },
  
  code: {
    fontSize: fontSizes.sm,
    fontFamily: fontStacks.mono,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.snug,
    letterSpacing: letterSpacing.normal,
  },
  
  link: {
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: fontWeights.medium,
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    textDecoration: 'none',
  },
  
  // Screen reader only text
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
} as const;

// Typography utilities
export const typographyUtils = {
  /**
   * Convert font size to rem units
   */
  toRem: (px: string): string => {
    const num = parseInt(px.replace('px', ''), 10);
    return `${num / 16}rem`;
  },
  
  /**
   * Convert font size to em units
   */
  toEm: (px: string, base: string = fontSizes.base): string => {
    const num = parseInt(px.replace('px', ''), 10);
    const baseNum = parseInt(base.replace('px', ''), 10);
    return `${num / baseNum}em`;
  },
  
  /**
   * Get responsive font size
   */
  responsiveSize: (size: string, factor: number = 0.875): string => {
    const num = parseInt(size.replace('px', ''), 10);
    return `${Math.round(num * factor)}px`;
  },
  
  /**
   * Combine text style properties into CSS object
   */
  combineStyles: (style: typeof textStyles.body.base) => ({
    fontSize: style.fontSize,
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  }),
} as const;

// Responsive typography breakpoints
export const responsiveTypography = {
  mobile: {
    // Scale down typography for mobile
    scaleFactor: 0.875,  // 87.5% of base sizes
    maxLineLength: '45ch', // Optimal reading length on mobile
  },
  
  tablet: {
    // Base typography for tablet
    scaleFactor: 1,       // 100% of base sizes
    maxLineLength: '60ch', // Optimal reading length on tablet
  },
  
  desktop: {
    // Scale up slightly for desktop
    scaleFactor: 1.125,   // 112.5% of base sizes
    maxLineLength: '75ch', // Optimal reading length on desktop
  },
} as const;

// Export types for TypeScript usage
export type FontStacks = typeof fontStacks;
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type LineHeights = typeof lineHeights;
export type LetterSpacing = typeof letterSpacing;
export type TextStyles = typeof textStyles;
export type ResponsiveTypography = typeof responsiveTypography;