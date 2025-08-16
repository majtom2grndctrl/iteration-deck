/**
 * IterationDeck Component Styles
 * 
 * Simplified @vanilla-extract/css styles for the main IterationDeck component.
 */

import { style, styleVariants } from '@vanilla-extract/css';

// Main IterationDeck container styles
export const iterationDeck = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  minHeight: '200px',
  background: 'transparent',
  borderRadius: '8px',
  overflow: 'hidden',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#333',
  transition: 'all 0.2s ease',
});

// Content area within the deck
export const iterationDeckContent = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
  zIndex: 1,
});

// Slide container - manages individual slide visibility
export const iterationDeckSlides = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  minHeight: 'inherit',
});

// Development mode styles - only applied when toolbar is present
export const developmentMode = style({
  position: 'relative',
  marginBottom: '80px', // Space for toolbar
  
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '1px dashed rgba(0, 0, 0, 0.2)',
      borderRadius: 'inherit',
      opacity: 0.3,
      pointerEvents: 'none',
      zIndex: 0,
    },
  },
});

// Production mode styles - clean and minimal
export const productionMode = style({
  marginBottom: 0,
  
  selectors: {
    '&::before': {
      display: 'none',
    },
  },
});

// Responsive layout variants
export const responsiveVariants = styleVariants({
  compact: {
    '@media': {
      '(max-width: 640px)': {
        padding: '8px',
        minHeight: '150px',
      },
    },
  },
  standard: {
    '@media': {
      '(min-width: 641px)': {
        padding: '16px',
      },
      '(min-width: 1025px)': {
        padding: '24px',
      },
    },
  },
});

// Theme-specific styling variants
export const themeVariants = styleVariants({
  light: {
    // Light theme uses default token values
  },
  dark: {
    '@media': {
      '(prefers-color-scheme: dark)': {
        color: '#fff',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
});

// Accessibility enhancement styles
export const accessibilityEnhanced = style({
  selectors: {
    '&:focus-visible': {
      outline: '2px solid #007AFF',
      outlineOffset: '2px',
    },
    '&:focus-within': {
      outline: '3px solid #007AFF',
      outlineOffset: '2px',
    },
  },
  
  '@media': {
    '(prefers-contrast: high)': {
      border: '2px solid #333',
    },
  },
});

// Animation and transition utilities
export const animated = style({
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  willChange: 'transform, opacity',
  transform: 'translateZ(0)',
  
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      willChange: 'auto',
      transform: 'none',
      transition: 'none',
    },
  },
});

// Loading state styles
export const loading = style({
  position: 'relative',
  overflow: 'hidden',
  
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      animation: 'slideInRight 1.5s ease-in-out infinite',
    },
  },
  
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      selectors: {
        '&::after': {
          animation: 'none',
          background: 'rgba(255, 255, 255, 0.1)',
          opacity: 0.5,
        },
      },
    },
  },
});

// Error state styles
export const error = style({
  border: '2px solid #ef4444',
  backgroundColor: 'rgba(239, 68, 68, 0.05)',
  
  selectors: {
    '&::before': {
      borderColor: '#ef4444',
      borderStyle: 'solid',
      opacity: 0.8,
    },
  },
});

// Empty state styles
export const empty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  color: '#999',
  fontStyle: 'italic',
  
  selectors: {
    '&::before': {
      content: '"No slides available"',
      fontSize: '14px',
    },
  },
});

// RTL (Right-to-left) language support
export const rtl = style({
  selectors: {
    '[dir="rtl"] &': {
      direction: 'rtl',
    },
  },
});

// Container queries for advanced responsive design
export const containerResponsive = style({
  containerType: 'inline-size',
});

// Export grouped styles for easy importing
export const iterationDeckStyles = {
  // Core styles
  base: iterationDeck,
  content: iterationDeckContent,
  slides: iterationDeckSlides,
  
  // Mode variants
  development: developmentMode,
  production: productionMode,
  
  // Layout variants
  responsive: responsiveVariants,
  
  // Theme variants
  theme: themeVariants,
  
  // State variants
  loading,
  error,
  empty,
  
  // Enhancement styles
  accessibility: accessibilityEnhanced,
  animated,
  rtl,
  containerResponsive,
} as const;

// TypeScript type export for consumers
export type IterationDeckStyles = typeof iterationDeckStyles;