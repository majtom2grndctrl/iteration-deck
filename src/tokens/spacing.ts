/**
 * Spacing Design Tokens
 * 
 * 8px base grid system with consistent progression for layouts and components.
 * Follows design system best practices with semantic naming.
 */

// Base spacing scale - 8px grid system
export const spaceScale = {
  0: '0px',
  1: '4px',    // 0.5 * base (8px) - tight spacing
  2: '8px',    // 1 * base - base unit  
  3: '12px',   // 1.5 * base - small spacing
  4: '16px',   // 2 * base - medium spacing
  6: '24px',   // 3 * base - large spacing
  8: '32px',   // 4 * base - extra large spacing
  10: '40px',  // 5 * base - section spacing
  12: '48px',  // 6 * base - large section spacing
  14: '56px',  // 7 * base - page-level spacing
  16: '64px',  // 8 * base - major layout spacing
} as const;

// Semantic spacing tokens for component usage
export const spacing = {
  // Component internal spacing
  xs: spaceScale[1],    // 4px - tight internal spacing
  sm: spaceScale[2],    // 8px - small internal spacing
  md: spaceScale[3],    // 12px - medium internal spacing
  lg: spaceScale[4],    // 16px - large internal spacing
  xl: spaceScale[6],    // 24px - extra large internal spacing
  
  // Layout spacing
  section: spaceScale[10],  // 40px - between sections
  page: spaceScale[14],     // 56px - page-level margins
  major: spaceScale[16],    // 64px - major layout spacing
  
  // Component-specific spacing
  toolbar: {
    padding: spaceScale[3],     // 12px - internal padding
    gap: spaceScale[2],         // 8px - between toolbar items
    margin: spaceScale[4],      // 16px - from screen edges
  },
  
  slide: {
    padding: spaceScale[4],     // 16px - slide content padding
    gap: spaceScale[6],         // 24px - between slides
  },
  
  // Interactive element spacing
  touchTarget: {
    minSize: '44px',           // Minimum touch target size
    padding: spaceScale[3],    // 12px - padding around interactive elements
  },
  
  // Border and outline spacing
  border: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
  
  // Focus ring spacing
  focus: {
    offset: spaceScale[1],     // 4px - focus ring offset
    width: '2px',              // Focus ring width
  },
} as const;

// Layout utilities
export const layout = {
  // Container spacing
  container: {
    padding: {
      mobile: spaceScale[4],   // 16px - mobile container padding
      tablet: spaceScale[6],   // 24px - tablet container padding  
      desktop: spaceScale[8],  // 32px - desktop container padding
    },
    maxWidth: '1200px',        // Maximum container width
  },
  
  // Grid spacing
  grid: {
    gap: {
      sm: spaceScale[2],       // 8px - small grid gap
      md: spaceScale[4],       // 16px - medium grid gap  
      lg: spaceScale[6],       // 24px - large grid gap
    },
  },
  
  // Stack spacing (vertical rhythm)
  stack: {
    xs: spaceScale[2],         // 8px - tight vertical spacing
    sm: spaceScale[3],         // 12px - small vertical spacing
    md: spaceScale[4],         // 16px - medium vertical spacing
    lg: spaceScale[6],         // 24px - large vertical spacing
    xl: spaceScale[8],         // 32px - extra large vertical spacing
  },
} as const;

// Component dimension tokens
export const dimensions = {
  // Toolbar dimensions
  toolbar: {
    height: '48px',            // Fixed toolbar height
    minWidth: '240px',         // Minimum toolbar width
    borderRadius: '64px',      // Pill-shaped border radius
  },
  
  // Slide dimensions
  slide: {
    minHeight: '200px',        // Minimum slide height
  },
  
  // Interactive elements
  button: {
    height: {
      sm: '32px',              // Small button height
      md: '40px',              // Medium button height
      lg: '48px',              // Large button height
    },
    minWidth: '44px',          // Minimum button width (touch target)
  },
  
  // Input elements
  input: {
    height: '40px',            // Standard input height
    minWidth: '120px',         // Minimum input width
  },
} as const;

// Responsive spacing modifiers
export const responsive = {
  // Mobile-first responsive spacing multipliers
  mobile: {
    multiplier: 0.8,           // 80% of base spacing on mobile
    maxPadding: spaceScale[4], // Maximum padding on mobile (16px)
  },
  
  tablet: {
    multiplier: 1,             // Base spacing on tablet
    maxPadding: spaceScale[6], // Maximum padding on tablet (24px)
  },
  
  desktop: {
    multiplier: 1.2,           // 120% of base spacing on desktop
    maxPadding: spaceScale[8], // Maximum padding on desktop (32px)
  },
} as const;

// Spacing utilities for runtime calculations
export const spacingUtils = {
  /**
   * Convert spacing token to number (without px)
   */
  toNumber: (space: string): number => 
    parseInt(space.replace('px', ''), 10),
  
  /**
   * Add two spacing values
   */
  add: (space1: string, space2: string): string => {
    const num1 = spacingUtils.toNumber(space1);
    const num2 = spacingUtils.toNumber(space2);
    return `${num1 + num2}px`;
  },
  
  /**
   * Multiply spacing by a factor
   */
  multiply: (space: string, factor: number): string => {
    const num = spacingUtils.toNumber(space);
    return `${Math.round(num * factor)}px`;
  },
  
  /**
   * Get responsive spacing based on viewport
   */
  responsive: (space: string, viewport: 'mobile' | 'tablet' | 'desktop' = 'tablet'): string => {
    const multiplier = responsive[viewport].multiplier;
    return spacingUtils.multiply(space, multiplier);
  },
} as const;

// Export types for TypeScript usage
export type SpaceScale = typeof spaceScale;
export type Spacing = typeof spacing;
export type Layout = typeof layout;
export type Dimensions = typeof dimensions;
export type Responsive = typeof responsive;