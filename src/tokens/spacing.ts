/**
 * Spacing Design Tokens
 */

// Spacing scale - powers of 2 starting from 2px
export const spacing = {
  spacing00: '2px',   // 2px - finest detail
  spacing0: '4px',    // 4px - tight spacing
  spacing1: '8px',    // 8px - small spacing  
  spacing2: '16px',   // 16px - medium spacing
  spacing3: '24px',   // 24px - large spacing
  spacing4: '32px',   // 32px - extra large spacing
  spacing5: '40px',   // 40px - section spacing
  spacing6: '48px',   // 48px - large section spacing
  spacing7: '56px',   // 56px - page-level spacing
  spacing8: '64px',   // 64px - major layout spacing
} as const;

// Export types for TypeScript usage
export type Spacing = typeof spacing;