/**
 * Common responsive patterns using vanilla-extract
 */
import { style } from '@vanilla-extract/css';
import { themeContract } from './theme.css';
import { breakpoints as breakpointTokens } from '../tokens';

// Media query definitions using actual values
const breakpoints = {
  sm: `screen and (min-width: ${breakpointTokens.sm})`,
  md: `screen and (min-width: ${breakpointTokens.md})`,
  lg: `screen and (min-width: ${breakpointTokens.lg})`,
  xl: `screen and (min-width: ${breakpointTokens.xl})`,
};

// Common responsive patterns
export const responsivePatterns = {
  // Hide on mobile, show on desktop
  hideMobile: style({
    display: 'none',
    '@media': {
      [breakpoints.md]: {
        display: 'block',
      },
    },
  }),

  // Show on mobile, hide on desktop
  hideDesktop: style({
    display: 'block',
    '@media': {
      [breakpoints.md]: {
        display: 'none',
      },
    },
  }),

  // Stack on mobile, row on desktop
  stackMobile: style({
    display: 'flex',
    flexDirection: 'column',
    gap: themeContract.spacing.md,
    '@media': {
      [breakpoints.md]: {
        flexDirection: 'row',
        gap: themeContract.spacing.lg,
      },
    },
  }),

  // Center content with max width
  containerSm: style({
    width: '100%',
    margin: '0 auto',
    padding: `0 ${themeContract.spacing.md}`,
    '@media': {
      [breakpoints.sm]: {
        maxWidth: '640px',
      },
    },
  }),

  containerMd: style({
    width: '100%',
    margin: '0 auto',
    padding: `0 ${themeContract.spacing.md}`,
    '@media': {
      [breakpoints.md]: {
        maxWidth: '768px',
      },
    },
  }),

  containerLg: style({
    width: '100%',
    margin: '0 auto',
    padding: `0 ${themeContract.spacing.md}`,
    '@media': {
      [breakpoints.lg]: {
        maxWidth: '1024px',
      },
    },
  }),

  // Iteration Deck specific responsive patterns
  toolbarResponsive: style({
    // Mobile-first approach for toolbar
    bottom: themeContract.spacing.lg,
    left: themeContract.spacing.md,
    right: themeContract.spacing.md,
    transform: 'none',
    '@media': {
      [breakpoints.md]: {
        bottom: themeContract.spacing.xl,
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
      },
    },
  }),

  // Touch-friendly interactions
  touchTarget: style({
    minHeight: themeContract.components.button.minTouchTarget,
    minWidth: themeContract.components.button.minTouchTarget,
    '@media': {
      '(pointer: coarse)': {
        minHeight: '48px',
        minWidth: '48px',
        padding: themeContract.spacing.md,
      },
      '(pointer: fine)': {
        minHeight: themeContract.components.button.size.sm,
        minWidth: themeContract.components.button.size.sm,
        padding: themeContract.spacing.sm,
      },
    },
  }),

  // Adaptive spacing based on screen size
  adaptiveSpacing: style({
    padding: themeContract.spacing.sm,
    '@media': {
      [breakpoints.sm]: {
        padding: themeContract.spacing.md,
      },
      [breakpoints.md]: {
        padding: themeContract.spacing.lg,
      },
      [breakpoints.lg]: {
        padding: themeContract.spacing.xl,
      },
    },
  }),

  // Responsive text scaling
  responsiveText: style({
    fontSize: themeContract.typography.fontSize.sm,
    lineHeight: themeContract.typography.lineHeight.normal,
    '@media': {
      [breakpoints.sm]: {
        fontSize: themeContract.typography.fontSize.md,
      },
      [breakpoints.lg]: {
        fontSize: themeContract.typography.fontSize.lg,
      },
    },
  }),

  // Optimized for reduced motion
  respectMotionPreferences: style({
    transition: `all ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}`,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
        animation: 'none',
        transform: 'none',
      },
    },
  }),

  // High contrast mode support
  highContrastSupport: style({
    '@media': {
      '(prefers-contrast: high)': {
        border: `2px solid ${themeContract.colors.text.primary}`,
        backgroundColor: themeContract.colors.background.primary,
        color: themeContract.colors.text.primary,
      },
    },
  }),
};