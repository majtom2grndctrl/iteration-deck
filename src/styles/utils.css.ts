/**
 * Utility styles and responsive helpers for vanilla-extract
 */
import { style, styleVariants } from '@vanilla-extract/css';
import { themeContract } from './theme.css';

// Note: breakpoints moved to responsive-utils.ts

// Responsive utility styles
export const responsive = {
  // Spacing utilities
  spacing: styleVariants({
    xs: { margin: themeContract.spacing.xs },
    sm: { margin: themeContract.spacing.sm },
    md: { margin: themeContract.spacing.md },
    lg: { margin: themeContract.spacing.lg },
    xl: { margin: themeContract.spacing.xl },
    '2xl': { margin: themeContract.spacing['2xl'] },
    '3xl': { margin: themeContract.spacing['3xl'] },
    '4xl': { margin: themeContract.spacing['4xl'] },
    '5xl': { margin: themeContract.spacing['5xl'] },
    '6xl': { margin: themeContract.spacing['6xl'] },
  }),
  
  // Padding utilities
  padding: styleVariants({
    xs: { padding: themeContract.spacing.xs },
    sm: { padding: themeContract.spacing.sm },
    md: { padding: themeContract.spacing.md },
    lg: { padding: themeContract.spacing.lg },
    xl: { padding: themeContract.spacing.xl },
    '2xl': { padding: themeContract.spacing['2xl'] },
    '3xl': { padding: themeContract.spacing['3xl'] },
    '4xl': { padding: themeContract.spacing['4xl'] },
    '5xl': { padding: themeContract.spacing['5xl'] },
    '6xl': { padding: themeContract.spacing['6xl'] },
  }),
};

// Typography utilities
export const typography = styleVariants({
  xs: {
    fontSize: themeContract.typography.fontSize.xs,
    lineHeight: themeContract.typography.lineHeight.normal,
  },
  sm: {
    fontSize: themeContract.typography.fontSize.sm,
    lineHeight: themeContract.typography.lineHeight.normal,
  },
  md: {
    fontSize: themeContract.typography.fontSize.md,
    lineHeight: themeContract.typography.lineHeight.normal,
  },
  lg: {
    fontSize: themeContract.typography.fontSize.lg,
    lineHeight: themeContract.typography.lineHeight.normal,
  },
});

// Font weight utilities
export const fontWeight = styleVariants({
  normal: { fontWeight: themeContract.typography.fontWeight.normal },
  medium: { fontWeight: themeContract.typography.fontWeight.medium },
  semibold: { fontWeight: themeContract.typography.fontWeight.semibold },
});

// Z-index utilities
export const zIndex = styleVariants({
  base: { zIndex: themeContract.zIndex.base },
  dropdown: { zIndex: themeContract.zIndex.dropdown },
  sticky: { zIndex: themeContract.zIndex.sticky },
  fixed: { zIndex: themeContract.zIndex.fixed },
  modal: { zIndex: themeContract.zIndex.modal },
  popover: { zIndex: themeContract.zIndex.popover },
  tooltip: { zIndex: themeContract.zIndex.tooltip },
  toast: { zIndex: themeContract.zIndex.toast },
  toolbar: { zIndex: themeContract.zIndex.toolbar },
});

// Animation utilities
export const animation = {
  duration: styleVariants({
    fast: { transitionDuration: themeContract.animation.duration.fast },
    normal: { transitionDuration: themeContract.animation.duration.normal },
    slow: { transitionDuration: themeContract.animation.duration.slow },
  }),
  
  easing: styleVariants({
    ease: { transitionTimingFunction: themeContract.animation.easing.ease },
    easeIn: { transitionTimingFunction: themeContract.animation.easing.easeIn },
    easeOut: { transitionTimingFunction: themeContract.animation.easing.easeOut },
    easeInOut: { transitionTimingFunction: themeContract.animation.easing.easeInOut },
  }),
};

// Common component patterns
export const commonStyles = {
  // Flexbox utilities
  flex: styleVariants({
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    between: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
  
  // Position utilities
  position: styleVariants({
    relative: { position: 'relative' },
    absolute: { position: 'absolute' },
    fixed: { position: 'fixed' },
    sticky: { position: 'sticky' },
  }),
  
  // Visibility utilities
  visibility: styleVariants({
    visible: { visibility: 'visible' },
    hidden: { visibility: 'hidden' },
    srOnly: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: '0',
    },
  }),
};

// Interactive states
export const interactiveStates = {
  hover: style({
    ':hover': {
      backgroundColor: themeContract.colors.interactive.hover,
      transition: `background-color ${themeContract.animation.duration.fast} ${themeContract.animation.easing.easeOut}`,
    },
  }),
  
  focus: style({
    ':focus': {
      outline: `2px solid ${themeContract.colors.text.primary}`,
      outlineOffset: '2px',
    },
  }),
  
  disabled: style({
    opacity: themeContract.colors.interactive.disabled,
    pointerEvents: 'none',
  }),
};

// Note: Responsive helpers like createResponsiveStyle should be 
// exported from a separate .ts file (not .css.ts) since vanilla-extract
// only allows plain objects, arrays, strings, numbers and null/undefined
// in .css.ts files. See styles/responsive-utils.ts for helper functions.