/**
 * Component Design Tokens
 * 
 * Component-specific design tokens including 64px border-radius for pill-shaped toolbar,
 * 44px minimum touch targets, and other component-specific styling properties.
 */

import { spacing, dimensions } from './spacing';
import { grayScale } from './colors';

// Border radius tokens
export const borderRadius = {
  none: '0px',
  sm: '4px',      // Small radius - buttons, inputs
  md: '8px',      // Medium radius - cards, panels
  lg: '12px',     // Large radius - modals, large cards
  xl: '16px',     // Extra large radius
  '2xl': '24px',  // Very large radius
  pill: '64px',   // Pill-shaped - toolbar, badges
  full: '9999px', // Fully rounded - avatars, icons
} as const;

// Shadow tokens for depth and elevation
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Component-specific shadows
  toolbar: '0 4px 12px -2px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
  dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  focus: '0 0 0 3px rgba(113, 113, 122, 0.2)',
} as const;

// Backdrop filter effects
export const backdrop = {
  none: 'none',
  blur: 'blur(8px)',
  blurSm: 'blur(4px)',
  blurMd: 'blur(12px)',
  blurLg: 'blur(16px)',
  
  // Component-specific backdrop effects
  toolbar: 'blur(8px) saturate(180%)',
  modal: 'blur(4px)',
} as const;

// Component-specific design tokens
export const componentTokens = {
  // Iteration Deck component
  iterationDeck: {
    minHeight: '200px',
    borderRadius: borderRadius.md,
    background: 'transparent',
    overflow: 'hidden',
  },
  
  // Iteration Deck Slide component
  iterationDeckSlide: {
    minHeight: '200px',
    padding: spacing.slide.padding,
    borderRadius: borderRadius.md,
    transition: 'opacity 0.2s ease-in-out',
  },
  
  // Iteration Deck Toolbar component
  iterationDeckToolbar: {
    height: dimensions.toolbar.height,
    minWidth: dimensions.toolbar.minWidth,
    borderRadius: borderRadius.pill, // 64px pill shape
    padding: spacing.toolbar.padding,
    gap: spacing.toolbar.gap,
    shadow: shadows.toolbar,
    backdrop: backdrop.toolbar,
    
    // Positioning
    position: 'fixed',
    bottom: spacing.toolbar.margin,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    
    // Background and borders
    background: 'rgba(255, 255, 255, 0.8)',
    border: `1px solid rgba(212, 212, 216, 0.6)`,
    
    // Interactive states
    hover: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: `1px solid rgba(212, 212, 216, 0.8)`,
    },
  },
  
  // Button component tokens
  button: {
    // Base button properties
    base: {
      minHeight: dimensions.button.minWidth, // 44px touch target
      minWidth: dimensions.button.minWidth,
      padding: `${spacing.xs} ${spacing.md}`, // 4px 12px
      borderRadius: borderRadius.sm,
      border: '1px solid transparent',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1',
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      
      // Focus styles
      focus: {
        outline: 'none',
        boxShadow: shadows.focus,
      },
    },
    
    // Button variants
    variants: {
      primary: {
        background: grayScale[600],
        color: '#ffffff',
        border: `1px solid ${grayScale[600]}`,
        
        hover: {
          background: grayScale[700],
          border: `1px solid ${grayScale[700]}`,
        },
        
        active: {
          background: grayScale[800],
          border: `1px solid ${grayScale[800]}`,
        },
        
        disabled: {
          background: grayScale[300],
          color: grayScale[500],
          border: `1px solid ${grayScale[300]}`,
          cursor: 'not-allowed',
        },
      },
      
      secondary: {
        background: 'transparent',
        color: grayScale[600],
        border: `1px solid ${grayScale[300]}`,
        
        hover: {
          background: grayScale[50],
          border: `1px solid ${grayScale[400]}`,
        },
        
        active: {
          background: grayScale[100],
          border: `1px solid ${grayScale[400]}`,
        },
        
        disabled: {
          background: 'transparent',
          color: grayScale[400],
          border: `1px solid ${grayScale[200]}`,
          cursor: 'not-allowed',
        },
      },
      
      ghost: {
        background: 'transparent',
        color: grayScale[600],
        border: '1px solid transparent',
        
        hover: {
          background: grayScale[100],
        },
        
        active: {
          background: grayScale[200],
        },
        
        disabled: {
          background: 'transparent',
          color: grayScale[400],
          cursor: 'not-allowed',
        },
      },
    },
  },
  
  // Dropdown component tokens
  dropdown: {
    minWidth: '160px',
    maxHeight: '240px',
    padding: spacing.xs,
    borderRadius: borderRadius.md,
    background: '#ffffff',
    border: `1px solid ${grayScale[300]}`,
    shadow: shadows.dropdown,
    
    // Dropdown item
    item: {
      padding: `${spacing.xs} ${spacing.md}`, // 4px 12px
      borderRadius: borderRadius.sm,
      fontSize: '14px',
      lineHeight: '1.5',
      cursor: 'pointer',
      transition: 'all 0.1s ease-in-out',
      
      hover: {
        background: grayScale[100],
      },
      
      active: {
        background: grayScale[200],
        color: grayScale[700],
      },
      
      selected: {
        background: grayScale[200],
        color: grayScale[700],
        fontWeight: '500',
      },
    },
  },
  
  // Input component tokens
  input: {
    height: dimensions.input.height,
    minWidth: dimensions.input.minWidth,
    padding: `${spacing.xs} ${spacing.md}`, // 4px 12px
    borderRadius: borderRadius.sm,
    border: `1px solid ${grayScale[300]}`,
    background: '#ffffff',
    fontSize: '14px',
    lineHeight: '1.5',
    transition: 'all 0.15s ease-in-out',
    
    // Input states
    focus: {
      outline: 'none',
      border: `1px solid ${grayScale[500]}`,
      boxShadow: shadows.focus,
    },
    
    disabled: {
      background: grayScale[100],
      color: grayScale[400],
      border: `1px solid ${grayScale[200]}`,
      cursor: 'not-allowed',
    },
    
    error: {
      border: '1px solid #ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
  },
  
  // Badge component tokens
  badge: {
    padding: `2px ${spacing.xs}`, // 2px 4px
    borderRadius: borderRadius.pill,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1',
    
    variants: {
      default: {
        background: grayScale[200],
        color: grayScale[700],
      },
      
      primary: {
        background: grayScale[600],
        color: '#ffffff',
      },
      
      success: {
        background: '#10b981',
        color: '#ffffff',
      },
      
      warning: {
        background: '#f59e0b',
        color: '#ffffff',
      },
      
      error: {
        background: '#ef4444',
        color: '#ffffff',
      },
    },
  },
} as const;

// Touch target utilities
export const touchTargets = {
  // Minimum touch target sizes (44x44px for accessibility)
  minSize: '44px',
  comfortable: '48px',
  large: '56px',
  
  // Touch target padding helpers
  padding: {
    sm: spacing.xs,   // 4px
    md: spacing.sm,   // 8px
    lg: spacing.md,   // 12px
  },
  
  // Touch target spacing
  spacing: {
    tight: spacing.xs,    // 4px between touch targets
    normal: spacing.sm,   // 8px between touch targets
    loose: spacing.md,    // 12px between touch targets
  },
} as const;

// Component transition tokens
export const componentTransitions = {
  // Duration tokens
  duration: {
    fast: '0.1s',
    normal: '0.15s',
    slow: '0.2s',
    slower: '0.3s',
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    
    // Custom easing curves
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Common transition combinations
  all: 'all 0.15s ease-in-out',
  colors: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, color 0.15s ease-in-out',
  transform: 'transform 0.15s ease-in-out',
  opacity: 'opacity 0.2s ease-in-out',
} as const;

// Export types for TypeScript usage
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Backdrop = typeof backdrop;
export type ComponentTokens = typeof componentTokens;
export type TouchTargets = typeof touchTargets;
export type ComponentTransitions = typeof componentTransitions;