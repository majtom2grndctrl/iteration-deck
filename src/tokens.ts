/**
 * Design Tokens for Iteration Deck Components
 * Following 8px base grid system and neutral color palette
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
} as const

// Color primitives (internal use only - not exported)
const colorPrimitives = {
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#e5e5e5',
  gray300: '#d4d4d4',
  gray400: '#a3a3a3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  white: '#ffffff',
  black: '#000000',
  darkOverlay: '#1c1c1e'
} as const

// Semantic color mappings (references primitives)
export const colors = {
  background: {
    primary: colorPrimitives.gray50,
    secondary: colorPrimitives.gray100,
    overlay: `${colorPrimitives.white}f2`, // 95% opacity
    overlayDark: `${colorPrimitives.darkOverlay}f2` // 95% opacity
  },
  border: {
    light: `${colorPrimitives.black}1a`, // 10% opacity
    medium: `${colorPrimitives.black}33`, // 20% opacity
    dark: `${colorPrimitives.white}33`, // 20% opacity
    darkMedium: `${colorPrimitives.white}4d` // 30% opacity
  },
  text: {
    primary: colorPrimitives.gray900,
    secondary: colorPrimitives.gray600,
    disabled: colorPrimitives.gray400,
    inverse: colorPrimitives.white
  },
  interactive: {
    hover: `${colorPrimitives.black}0d`, // 5% opacity
    hoverDark: `${colorPrimitives.white}1a`, // 10% opacity
    disabled: '0.4'
  }
} as const

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
} as const

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
} as const

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
} as const

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
} as const

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
} as const