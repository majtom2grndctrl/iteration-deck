/**
 * Component Design Tokens
 * 
 * Component-specific design tokens including 64px border-radius for pill-shaped toolbar,
 * 44px minimum touch targets, and other component-specific styling properties.
 * Self-contained pure TypeScript constants compatible with Lit CSS tagged template literals.
 */

// Local constants to avoid imports (inline values for self-contained file)
const localSpacing = {
  xs: '4px',    // spacing.xs
  sm: '8px',    // spacing.sm  
  md: '12px',   // spacing.md
  lg: '16px',   // spacing.lg
  xl: '24px',   // spacing.xl
  slide: {
    padding: '16px',  // spacing.slide.padding
  },
  toolbar: {
    padding: '12px',  // spacing.toolbar.padding
    gap: '8px',       // spacing.toolbar.gap
    margin: '16px',   // spacing.toolbar.margin
  },
} as const;

const localDimensions = {
  toolbar: {
    height: '48px',      // dimensions.toolbar.height
    minWidth: '240px',   // dimensions.toolbar.minWidth
  },
  button: {
    minWidth: '44px',    // dimensions.button.minWidth
  },
  input: {
    height: '40px',      // dimensions.input.height
    minWidth: '120px',   // dimensions.input.minWidth
  },
} as const;

const localGrayScale = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#374151',
  800: '#27272a',
  900: '#18181b',
} as const;

// Border radius tokens
export const borderRadius = {
  none: '0px',
  sm: '4px',      // Small radius - buttons, inputs
  md: '8px',      // Medium radius - cards, panels
  lg: '12px',     // Large radius - modals, large cards
  xl: '16px',     // Extra large radius
  xxl: '24px',  // Very large radius
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
    padding: localSpacing.slide.padding,
    borderRadius: borderRadius.md,
    transition: 'opacity 0.2s ease-in-out',
  },
  
  // Iteration Deck Toolbar component
  iterationDeckToolbar: {
    height: localDimensions.toolbar.height,
    minWidth: localDimensions.toolbar.minWidth,
    borderRadius: borderRadius.pill, // 64px pill shape
    padding: localSpacing.toolbar.padding,
    gap: localSpacing.toolbar.gap,
    shadow: shadows.toolbar,
    backdrop: backdrop.toolbar,
    
    // Positioning
    position: 'fixed',
    bottom: localSpacing.toolbar.margin,
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
      minHeight: localDimensions.button.minWidth, // 44px touch target
      minWidth: localDimensions.button.minWidth,
      padding: `${localSpacing.xs} ${localSpacing.md}`, // 4px 12px
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
        background: localGrayScale[600],
        color: '#ffffff',
        border: `1px solid ${localGrayScale[600]}`,
        
        hover: {
          background: localGrayScale[700],
          border: `1px solid ${localGrayScale[700]}`,
        },
        
        active: {
          background: localGrayScale[800],
          border: `1px solid ${localGrayScale[800]}`,
        },
        
        disabled: {
          background: localGrayScale[300],
          color: localGrayScale[500],
          border: `1px solid ${localGrayScale[300]}`,
          cursor: 'not-allowed',
        },
      },
      
      secondary: {
        background: 'transparent',
        color: localGrayScale[600],
        border: `1px solid ${localGrayScale[300]}`,
        
        hover: {
          background: localGrayScale[50],
          border: `1px solid ${localGrayScale[400]}`,
        },
        
        active: {
          background: localGrayScale[100],
          border: `1px solid ${localGrayScale[400]}`,
        },
        
        disabled: {
          background: 'transparent',
          color: localGrayScale[400],
          border: `1px solid ${localGrayScale[200]}`,
          cursor: 'not-allowed',
        },
      },
      
      ghost: {
        background: 'transparent',
        color: localGrayScale[600],
        border: '1px solid transparent',
        
        hover: {
          background: localGrayScale[100],
        },
        
        active: {
          background: localGrayScale[200],
        },
        
        disabled: {
          background: 'transparent',
          color: localGrayScale[400],
          cursor: 'not-allowed',
        },
      },
    },
  },
  
  // Dropdown component tokens
  dropdown: {
    minWidth: '160px',
    maxHeight: '240px',
    padding: localSpacing.xs,
    borderRadius: borderRadius.md,
    background: '#ffffff',
    border: `1px solid ${localGrayScale[300]}`,
    shadow: shadows.dropdown,
    
    // Dropdown item
    item: {
      padding: `${localSpacing.xs} ${localSpacing.md}`, // 4px 12px
      borderRadius: borderRadius.sm,
      fontSize: '14px',
      lineHeight: '1.5',
      cursor: 'pointer',
      transition: 'all 0.1s ease-in-out',
      
      hover: {
        background: localGrayScale[100],
      },
      
      active: {
        background: localGrayScale[200],
        color: localGrayScale[700],
      },
      
      selected: {
        background: localGrayScale[200],
        color: localGrayScale[700],
        fontWeight: '500',
      },
    },
  },
  
  // Input component tokens
  input: {
    height: localDimensions.input.height,
    minWidth: localDimensions.input.minWidth,
    padding: `${localSpacing.xs} ${localSpacing.md}`, // 4px 12px
    borderRadius: borderRadius.sm,
    border: `1px solid ${localGrayScale[300]}`,
    background: '#ffffff',
    fontSize: '14px',
    lineHeight: '1.5',
    transition: 'all 0.15s ease-in-out',
    
    // Input states
    focus: {
      outline: 'none',
      border: `1px solid ${localGrayScale[500]}`,
      boxShadow: shadows.focus,
    },
    
    disabled: {
      background: localGrayScale[100],
      color: localGrayScale[400],
      border: `1px solid ${localGrayScale[200]}`,
      cursor: 'not-allowed',
    },
    
    error: {
      border: '1px solid #ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
  },
  
  // Badge component tokens
  badge: {
    padding: `2px ${localSpacing.xs}`, // 2px 4px
    borderRadius: borderRadius.pill,
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1',
    
    variants: {
      default: {
        background: localGrayScale[200],
        color: localGrayScale[700],
      },
      
      primary: {
        background: localGrayScale[600],
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
    sm: localSpacing.xs,   // 4px
    md: localSpacing.sm,   // 8px
    lg: localSpacing.md,   // 12px
  },
  
  // Touch target spacing
  spacing: {
    tight: localSpacing.xs,    // 4px between touch targets
    normal: localSpacing.sm,   // 8px between touch targets
    loose: localSpacing.md,    // 12px between touch targets
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