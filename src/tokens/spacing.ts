/**
 * Spacing Design Tokens
 */

// Spacing scale - powers of 2 starting from 2px
export const spacing = {
  spacing00: '2px',   // 2px - finest detail
  spacing0: '4px',    // 4px - tight spacing
  spacing1: '8px',    // 8px - small spacing
  spacing2: '12px',   // 12px - new spacing value
  spacing3: '16px',   // 16px - medium spacing
  spacing4: '20px',   // 20px - added spacing
  spacing5: '24px',   // 24px - large spacing
  spacing6: '32px',   // 32px - extra large spacing
  spacing7: '40px',   // 40px - section spacing
  spacing8: '48px',   // 48px - large section spacing
  spacing9: '56px',   // 56px - page-level spacing
  spacing10: '64px',  // 64px - major layout spacing
} as const;

// Export types for TypeScript usage
export type Spacing = typeof spacing;