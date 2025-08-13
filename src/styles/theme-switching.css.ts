/**
 * Theme switching utilities for iteration-deck
 * Provides runtime theme management with CSS custom properties
 */
import { style, createTheme } from '@vanilla-extract/css';
import { themeContract } from './theme.css';
import { lightTheme, darkTheme, autoTheme } from './themes.css';

// Theme mode data attributes for runtime switching
export const themeDataAttributes = {
  light: '[data-theme="light"]',
  dark: '[data-theme="dark"]',
  auto: '[data-theme="auto"]',
} as const;

// Base theme switching container
export const themeContainer = style({
  // Default to auto theme for CSS-only switching
  backgroundColor: themeContract.colors.background.primary,
  color: themeContract.colors.text.primary,
  transition: `background-color ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}, color ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}`,
  
  // Respect user motion preferences
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
});

// Manual theme overrides using data attributes
export const lightThemeOverride = style({
  selectors: {
    [`${themeDataAttributes.light} &`]: {
      backgroundColor: '#fafafa',
      color: '#171717',
    },
  },
});

export const darkThemeOverride = style({
  selectors: {
    [`${themeDataAttributes.dark} &`]: {
      backgroundColor: '#1c1c1e',
      color: '#ffffff',
    },
  },
});

// Auto theme uses CSS light-dark() function for automatic switching
export const autoThemeSwitch = style({
  selectors: {
    [`${themeDataAttributes.auto} &, &:not([data-theme])`]: {
      backgroundColor: 'light-dark(#fafafa, #1c1c1e)',
      color: 'light-dark(#171717, #ffffff)',
    },
  },
});

// Component-specific theme overrides
export const toolbarThemeOverrides = {
  light: style({
    selectors: {
      [`${themeDataAttributes.light} &`]: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        color: '#171717',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
      },
    },
  }),
  
  dark: style({
    selectors: {
      [`${themeDataAttributes.dark} &`]: {
        background: 'rgba(28, 28, 30, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  }),
  
  auto: style({
    selectors: {
      [`${themeDataAttributes.auto} &, &:not([data-theme])`]: {
        background: 'light-dark(rgba(255, 255, 255, 0.95), rgba(28, 28, 30, 0.95))',
        borderColor: 'light-dark(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.2))',
        color: 'light-dark(#171717, #ffffff)',
        boxShadow: 'light-dark(0 4px 24px rgba(0, 0, 0, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4))',
      },
    },
  }),
};

export const interactiveThemeOverrides = {
  light: style({
    selectors: {
      [`${themeDataAttributes.light} &:hover`]: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
    },
  }),
  
  dark: style({
    selectors: {
      [`${themeDataAttributes.dark} &:hover`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  }),
  
  auto: style({
    selectors: {
      [`${themeDataAttributes.auto} &:hover, &:not([data-theme]):hover`]: {
        backgroundColor: 'light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1))',
      },
    },
  }),
};

// Comprehensive theme switching system
export const themeAwareComponent = style({
  // Base styling using theme contract
  backgroundColor: themeContract.colors.background.primary,
  color: themeContract.colors.text.primary,
  borderColor: themeContract.colors.border.light,
  
  // Smooth transitions
  transition: `
    background-color ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut},
    color ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut},
    border-color ${themeContract.animation.duration.normal} ${themeContract.animation.easing.easeOut}
  `,
  
  // Respect accessibility preferences
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
    '(prefers-contrast: high)': {
      border: `2px solid ${themeContract.colors.text.primary}`,
    },
  },
});

// Theme detection utilities for runtime
export const themeDetectionRoot = style({
  selectors: {
    // Support system preference detection
    '&[data-system-theme="light"]': {
      colorScheme: 'light',
    },
    '&[data-system-theme="dark"]': {
      colorScheme: 'dark',
    },
    '&[data-system-theme="auto"]': {
      colorScheme: 'light dark',
    },
  },
});

// Forced color mode support (Windows High Contrast, etc.)
export const forcedColorSupport = style({
  '@media': {
    '(forced-colors: active)': {
      backgroundColor: 'Canvas',
      color: 'CanvasText',
      borderColor: 'ButtonBorder',
    },
  },
});

// Print styles that respect theme
export const printFriendly = style({
  '@media': {
    print: {
      backgroundColor: 'white !important',
      color: 'black !important',
      boxShadow: 'none !important',
      border: '1px solid black !important',
    },
  },
});