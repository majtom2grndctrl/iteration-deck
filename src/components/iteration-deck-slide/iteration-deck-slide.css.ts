/**
 * IterationDeckSlide CSS - Simplified @vanilla-extract styles
 * 
 * Minimal styling for individual slide components to fix architectural violations.
 */

import { style, styleVariants } from '@vanilla-extract/css';

// Base slide container
export const slideContainer = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  minHeight: '200px',
  borderRadius: '8px',
  background: 'transparent',
  transition: 'opacity 0.2s ease-in-out',
  isolation: 'isolate',
  outline: 'none',
});

// Slide state variants
export const slideStates = styleVariants({
  active: {
    opacity: '1',
    pointerEvents: 'auto',
    zIndex: 1,
  },
  inactive: {
    opacity: '0',
    pointerEvents: 'none',
    zIndex: 0,
  },
  loading: {
    opacity: '0.6',
    pointerEvents: 'none',
  },
  error: {
    opacity: '0.4',
    pointerEvents: 'none',
    border: '1px solid #ef4444',
    background: 'rgba(239, 68, 68, 0.05)',
  },
});

// Slide content wrapper
export const slideContent = style({
  width: '100%',
  minHeight: 'inherit',
  position: 'relative',
  zIndex: 1,
});

// AI metadata overlay system (development mode only)
export const metadataOverlay = style({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  gap: '12px',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  color: '#333',
  opacity: '0',
  visibility: 'hidden',
  pointerEvents: 'none',
  transition: 'all 0.2s ease',
  zIndex: 10,
});

// AI confidence indicator
export const confidenceIndicator = style({
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '60px',
  height: '4px',
  background: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '64px',
  overflow: 'hidden',
  zIndex: 100,
  opacity: '0',
});

export const confidenceBar = style({
  height: '100%',
  background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)',
  borderRadius: '64px',
  transformOrigin: 'left center',
});

// Confidence score variants
export const confidenceVariants = styleVariants({
  low: {
    width: '33%',
  },
  medium: {
    width: '66%',
  },
  high: {
    width: '100%',
  },
});

// AI metadata components
export const metadataTitle = style({
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '1.4',
  color: '#333',
  margin: '0',
  marginBottom: '8px',
});

export const metadataPrompt = style({
  width: '100%',
  maxWidth: '400px',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#666',
  background: 'rgba(0, 0, 0, 0.05)',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  margin: '0',
  marginBottom: '12px',
});

export const metadataNotes = style({
  width: '100%',
  maxWidth: '400px',
  fontSize: '13px',
  lineHeight: '1.5',
  color: '#999',
  fontStyle: 'italic',
  margin: '0',
});

export const metadataScore = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  fontWeight: '500',
  color: '#666',
  marginTop: '8px',
});

export const scoreLabel = style({
  color: '#999',
});

export const scoreValue = style({
  fontWeight: '600',
  fontVariantNumeric: 'tabular-nums',
});

// Hover interaction states (development mode)
export const hoverContainer = style({
  selectors: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.02)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  },
});

// Accessibility enhancements
export const accessibilityEnhancements = style({
  selectors: {
    '&[aria-hidden="true"]': {
      position: 'absolute',
      left: '-10000px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
    },
    '&[tabindex="0"]:focus': {
      outline: '3px solid #007AFF',
      outlineOffset: '2px',
    },
  },
});

// Responsive design variants
export const responsiveVariants = styleVariants({
  mobile: {
    '@media': {
      '(max-width: 640px)': {
        minHeight: '150px',
        padding: '12px',
      },
    },
  },
  tablet: {
    '@media': {
      '(min-width: 641px) and (max-width: 1024px)': {
        minHeight: '200px',
        padding: '16px',
      },
    },
  },
  desktop: {
    '@media': {
      '(min-width: 1025px)': {
        padding: '24px',
      },
    },
  },
});

// Production mode styles
export const productionMode = style({
  selectors: {
    '&[data-env="production"]': {
      opacity: '1',
      background: 'transparent',
      transform: 'none',
      boxShadow: 'none',
    },
  },
});

// Utility classes
export const utilityClasses = {
  hidden: style({
    display: 'none',
  }),
  visible: style({
    display: 'block',
  }),
  skeleton: style({
    background: 'linear-gradient(90deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%)',
    backgroundSize: '200% 100%',
  }),
  errorState: style({
    border: '2px dashed #ef4444',
    background: 'rgba(239, 68, 68, 0.05)',
    color: '#ef4444',
  }),
};

// Main exports for component usage
export const slideStyles = {
  container: slideContainer,
  content: slideContent,
  states: slideStates,
  metadata: {
    overlay: metadataOverlay,
    title: metadataTitle,
    prompt: metadataPrompt,
    notes: metadataNotes,
    score: metadataScore,
    scoreLabel,
    scoreValue,
  },
  confidence: {
    indicator: confidenceIndicator,
    bar: confidenceBar,
    variants: confidenceVariants,
  },
  hover: hoverContainer,
  accessibility: accessibilityEnhancements,
  responsive: responsiveVariants,
  production: productionMode,
  utilities: utilityClasses,
};