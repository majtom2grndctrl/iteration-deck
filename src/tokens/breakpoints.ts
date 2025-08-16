/**
 * Breakpoints Design Tokens
 * 
 * Responsive design breakpoints for consistent layouts across devices.
 * Mobile-first approach with semantic naming and utility functions.
 */

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

// Media query generators for vanilla-extract and CSS-in-JS
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
  
  // Orientation queries
  portrait: 'screen and (orientation: portrait)',
  landscape: 'screen and (orientation: landscape)',
  
  // High-density displays
  retina: 'screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi)',
  
  // Touch vs pointer devices
  touch: '(hover: none) and (pointer: coarse)',
  pointer: '(hover: hover) and (pointer: fine)',
  
  // Reduced motion preference
  reduceMotion: '(prefers-reduced-motion: reduce)',
  
  // Color scheme preference
  lightMode: '(prefers-color-scheme: light)',
  darkMode: '(prefers-color-scheme: dark)',
} as const;

// Semantic device categories
export const devices = {
  mobile: {
    min: 0,
    max: breakpointValues.md - 1,
    mediaQuery: mediaQueries.mobile,
    description: 'Mobile devices (phones)',
  },
  tablet: {
    min: breakpointValues.md,
    max: breakpointValues.lg - 1,
    mediaQuery: mediaQueries.tablet,
    description: 'Tablet devices',
  },
  desktop: {
    min: breakpointValues.lg,
    max: Infinity,
    mediaQuery: mediaQueries.desktop,
    description: 'Desktop devices',
  },
} as const;

// Container max-widths for different breakpoints
export const containerSizes = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Component-specific responsive tokens
export const componentBreakpoints = {
  // Iteration Deck Toolbar responsive behavior
  iterationDeckToolbar: {
    // Stack toolbar items vertically on small screens
    stackAt: breakpointValues.sm,
    stackMediaQuery: mediaQueries.smDown,
    
    // Hide labels on very small screens
    hideLabelsAt: breakpointValues.xs,
    hideLabelsMediaQuery: mediaQueries.xsDown,
    
    // Adjust positioning on mobile
    mobilePosition: {
      bottom: '16px',
      left: '16px',
      right: '16px',
      transform: 'none',
    },
  },
  
  // Iteration Deck responsive layout
  iterationDeck: {
    // Switch to single column on mobile
    singleColumnAt: breakpointValues.md,
    singleColumnMediaQuery: mediaQueries.mdDown,
    
    // Reduce padding on small screens
    compactPaddingAt: breakpointValues.sm,
    compactPaddingMediaQuery: mediaQueries.smDown,
  },
} as const;

// Breakpoint utilities for runtime usage
export const breakpointUtils = {
  /**
   * Check if viewport is at or above a breakpoint
   */
  isAtLeast: (breakpoint: keyof typeof breakpointValues): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= breakpointValues[breakpoint];
  },
  
  /**
   * Check if viewport is below a breakpoint
   */
  isBelow: (breakpoint: keyof typeof breakpointValues): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpointValues[breakpoint];
  },
  
  /**
   * Check if viewport is between two breakpoints
   */
  isBetween: (
    min: keyof typeof breakpointValues,
    max: keyof typeof breakpointValues
  ): boolean => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width >= breakpointValues[min] && width < breakpointValues[max];
  },
  
  /**
   * Get current breakpoint name
   */
  getCurrentBreakpoint: (): keyof typeof breakpointValues | null => {
    if (typeof window === 'undefined') return null;
    
    const width = window.innerWidth;
    
    if (width >= breakpointValues['2xl']) return '2xl';
    if (width >= breakpointValues.xl) return 'xl';
    if (width >= breakpointValues.lg) return 'lg';
    if (width >= breakpointValues.md) return 'md';
    if (width >= breakpointValues.sm) return 'sm';
    return 'xs';
  },
  
  /**
   * Get device category
   */
  getDeviceCategory: (): keyof typeof devices => {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    
    if (width < breakpointValues.md) return 'mobile';
    if (width < breakpointValues.lg) return 'tablet';
    return 'desktop';
  },
  
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  /**
   * Check if user prefers dark mode
   */
  prefersDarkMode: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },
  
  /**
   * Check if device supports touch
   */
  isTouchDevice: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  },
  
  /**
   * Check if device is high-density display
   */
  isRetinaDisplay: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches;
  },
} as const;

// Grid system configuration
export const gridSystem = {
  // Container configuration
  container: {
    maxWidth: containerSizes,
    padding: {
      xs: '16px',
      sm: '24px',
      md: '32px',
      lg: '40px',
      xl: '48px',
    },
  },
  
  // Grid columns
  columns: {
    xs: 4,    // 4 columns on mobile
    sm: 6,    // 6 columns on large mobile
    md: 8,    // 8 columns on tablet
    lg: 12,   // 12 columns on desktop
    xl: 12,   // 12 columns on large desktop
  },
  
  // Grid gaps
  gap: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '28px',
    xl: '32px',
  },
} as const;

// Export types for TypeScript usage
export type BreakpointValues = typeof breakpointValues;
export type Breakpoints = typeof breakpoints;
export type MediaQueries = typeof mediaQueries;
export type Devices = typeof devices;
export type ComponentBreakpoints = typeof componentBreakpoints;
export type BreakpointUtils = typeof breakpointUtils;
export type GridSystem = typeof gridSystem;