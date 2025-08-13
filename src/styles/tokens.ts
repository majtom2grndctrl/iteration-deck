/**
 * Design Tokens for Iteration Deck Components
 * Structured TypeScript object that will be converted to CSS custom properties
 * via vanilla-extract's createGlobalTheme
 */

// Spacing tokens (8px base grid)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '56px',
  '6xl': '64px'
} as const;

// Color tokens (neutral gray scale with semantic variants)
export const colors = {
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717'
  },
  // Semantic color mappings
  background: {
    primary: '#fafafa',
    secondary: '#f5f5f5',
    overlay: 'rgba(255, 255, 255, 0.95)',
    overlayDark: 'rgba(28, 28, 30, 0.95)'
  },
  border: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(255, 255, 255, 0.2)',
    darkMedium: 'rgba(255, 255, 255, 0.3)'
  },
  text: {
    primary: '#171717',
    secondary: '#525252',
    disabled: '#a3a3a3',
    inverse: '#ffffff'
  },
  interactive: {
    hover: 'rgba(0, 0, 0, 0.05)',
    hoverDark: 'rgba(255, 255, 255, 0.1)',
    disabled: '0.4'
  }
} as const;

// Typography tokens
export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px'
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600'
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.6'
  }
} as const;

// Component-specific tokens
export const components = {
  toolbar: {
    borderRadius: '64px',
    minHeight: '44px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
    zIndex: '10000'
  },
  button: {
    borderRadius: '16px',
    minTouchTarget: '44px',
    size: {
      sm: '32px',
      md: '44px'
    }
  },
  divider: {
    width: '1px',
    height: '24px'
  }
} as const;

// Animation tokens
export const animation = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s'
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
} as const;

// Z-index scale
export const zIndex = {
  base: '1',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
  toast: '1070',
  toolbar: '10000'
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const;

/**
 * Combined design tokens object for vanilla-extract theme generation
 * This structure will be converted to CSS custom properties
 */
export const tokens = {
  spacing,
  colors,
  typography,
  components,
  animation,
  zIndex,
  breakpoints
} as const;

export type Tokens = typeof tokens;