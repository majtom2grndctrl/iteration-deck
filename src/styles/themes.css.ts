/**
 * Theme implementations for Iteration Deck
 * Maps design tokens to vanilla-extract theme contract
 */
import { createTheme } from '@vanilla-extract/css';
import { themeContract } from './theme.css';

// Import existing tokens to ensure consistency
import {
  spacing as spacingTokens,
  colors as colorTokens,
  typography as typographyTokens,
  components as componentTokens,
  animation as animationTokens,
  zIndex as zIndexTokens,
  breakpoints as breakpointTokens,
} from '../tokens';

// Light theme implementation
export const lightTheme = createTheme(themeContract, {
  spacing: {
    xs: spacingTokens.xs,
    sm: spacingTokens.sm,
    md: spacingTokens.md,
    lg: spacingTokens.lg,
    xl: spacingTokens.xl,
    '2xl': spacingTokens['2xl'],
    '3xl': spacingTokens['3xl'],
    '4xl': spacingTokens['4xl'],
    '5xl': spacingTokens['5xl'],
    '6xl': spacingTokens['6xl'],
  },
  colors: {
    gray: {
      50: colorTokens.gray[50],
      100: colorTokens.gray[100],
      200: colorTokens.gray[200],
      300: colorTokens.gray[300],
      400: colorTokens.gray[400],
      500: colorTokens.gray[500],
      600: colorTokens.gray[600],
      700: colorTokens.gray[700],
      800: colorTokens.gray[800],
      900: colorTokens.gray[900],
    },
    background: {
      primary: colorTokens.background.primary,
      secondary: colorTokens.background.secondary,
      overlay: colorTokens.background.overlay,
      overlayDark: colorTokens.background.overlayDark,
    },
    border: {
      light: colorTokens.border.light,
      medium: colorTokens.border.medium,
      dark: colorTokens.border.dark,
      darkMedium: colorTokens.border.darkMedium,
    },
    text: {
      primary: colorTokens.text.primary,
      secondary: colorTokens.text.secondary,
      disabled: colorTokens.text.disabled,
      inverse: colorTokens.text.inverse,
    },
    interactive: {
      hover: colorTokens.interactive.hover,
      hoverDark: colorTokens.interactive.hoverDark,
      disabled: colorTokens.interactive.disabled,
    },
  },
  typography: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: {
      xs: typographyTokens.fontSize.xs,
      sm: typographyTokens.fontSize.sm,
      md: typographyTokens.fontSize.md,
      lg: typographyTokens.fontSize.lg,
    },
    fontWeight: {
      normal: typographyTokens.fontWeight.normal,
      medium: typographyTokens.fontWeight.medium,
      semibold: typographyTokens.fontWeight.semibold,
    },
    lineHeight: {
      tight: typographyTokens.lineHeight.tight,
      normal: typographyTokens.lineHeight.normal,
      relaxed: typographyTokens.lineHeight.relaxed,
    },
  },
  components: {
    toolbar: {
      borderRadius: componentTokens.toolbar.borderRadius,
      minHeight: componentTokens.toolbar.minHeight,
      backdropFilter: componentTokens.toolbar.backdropFilter,
      boxShadow: componentTokens.toolbar.boxShadow,
      zIndex: componentTokens.toolbar.zIndex,
    },
    button: {
      borderRadius: componentTokens.button.borderRadius,
      minTouchTarget: componentTokens.button.minTouchTarget,
      size: {
        sm: componentTokens.button.size.sm,
        md: componentTokens.button.size.md,
      },
    },
    divider: {
      width: componentTokens.divider.width,
      height: componentTokens.divider.height,
    },
  },
  animation: {
    duration: {
      fast: animationTokens.duration.fast,
      normal: animationTokens.duration.normal,
      slow: animationTokens.duration.slow,
    },
    easing: {
      ease: animationTokens.easing.ease,
      easeIn: animationTokens.easing.easeIn,
      easeOut: animationTokens.easing.easeOut,
      easeInOut: animationTokens.easing.easeInOut,
    },
  },
  zIndex: {
    base: zIndexTokens.base,
    dropdown: zIndexTokens.dropdown,
    sticky: zIndexTokens.sticky,
    fixed: zIndexTokens.fixed,
    modal: zIndexTokens.modal,
    popover: zIndexTokens.popover,
    tooltip: zIndexTokens.tooltip,
    toast: zIndexTokens.toast,
    toolbar: zIndexTokens.toolbar,
  },
  breakpoints: {
    sm: breakpointTokens.sm,
    md: breakpointTokens.md,
    lg: breakpointTokens.lg,
    xl: breakpointTokens.xl,
  },
});

// Dark theme implementation (extends light theme with overrides)
export const darkTheme = createTheme(themeContract, {
  spacing: {
    xs: spacingTokens.xs,
    sm: spacingTokens.sm,
    md: spacingTokens.md,
    lg: spacingTokens.lg,
    xl: spacingTokens.xl,
    '2xl': spacingTokens['2xl'],
    '3xl': spacingTokens['3xl'],
    '4xl': spacingTokens['4xl'],
    '5xl': spacingTokens['5xl'],
    '6xl': spacingTokens['6xl'],
  },
  colors: {
    gray: {
      50: colorTokens.gray[900], // Invert gray scale for dark mode
      100: colorTokens.gray[800],
      200: colorTokens.gray[700],
      300: colorTokens.gray[600],
      400: colorTokens.gray[500],
      500: colorTokens.gray[400],
      600: colorTokens.gray[300],
      700: colorTokens.gray[200],
      800: colorTokens.gray[100],
      900: colorTokens.gray[50],
    },
    background: {
      primary: '#1c1c1e', // Dark background
      secondary: '#2c2c2e', // Slightly lighter dark
      overlay: colorTokens.background.overlayDark,
      overlayDark: colorTokens.background.overlay,
    },
    border: {
      light: colorTokens.border.dark,
      medium: colorTokens.border.darkMedium,
      dark: colorTokens.border.light,
      darkMedium: colorTokens.border.medium,
    },
    text: {
      primary: colorTokens.text.inverse,
      secondary: colorTokens.gray[300],
      disabled: colorTokens.gray[500],
      inverse: colorTokens.text.primary,
    },
    interactive: {
      hover: colorTokens.interactive.hoverDark,
      hoverDark: colorTokens.interactive.hover,
      disabled: colorTokens.interactive.disabled,
    },
  },
  typography: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: {
      xs: typographyTokens.fontSize.xs,
      sm: typographyTokens.fontSize.sm,
      md: typographyTokens.fontSize.md,
      lg: typographyTokens.fontSize.lg,
    },
    fontWeight: {
      normal: typographyTokens.fontWeight.normal,
      medium: typographyTokens.fontWeight.medium,
      semibold: typographyTokens.fontWeight.semibold,
    },
    lineHeight: {
      tight: typographyTokens.lineHeight.tight,
      normal: typographyTokens.lineHeight.normal,
      relaxed: typographyTokens.lineHeight.relaxed,
    },
  },
  components: {
    toolbar: {
      borderRadius: componentTokens.toolbar.borderRadius,
      minHeight: componentTokens.toolbar.minHeight,
      backdropFilter: componentTokens.toolbar.backdropFilter,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)', // Stronger shadow for dark mode
      zIndex: componentTokens.toolbar.zIndex,
    },
    button: {
      borderRadius: componentTokens.button.borderRadius,
      minTouchTarget: componentTokens.button.minTouchTarget,
      size: {
        sm: componentTokens.button.size.sm,
        md: componentTokens.button.size.md,
      },
    },
    divider: {
      width: componentTokens.divider.width,
      height: componentTokens.divider.height,
    },
  },
  animation: {
    duration: {
      fast: animationTokens.duration.fast,
      normal: animationTokens.duration.normal,
      slow: animationTokens.duration.slow,
    },
    easing: {
      ease: animationTokens.easing.ease,
      easeIn: animationTokens.easing.easeIn,
      easeOut: animationTokens.easing.easeOut,
      easeInOut: animationTokens.easing.easeInOut,
    },
  },
  zIndex: {
    base: zIndexTokens.base,
    dropdown: zIndexTokens.dropdown,
    sticky: zIndexTokens.sticky,
    fixed: zIndexTokens.fixed,
    modal: zIndexTokens.modal,
    popover: zIndexTokens.popover,
    tooltip: zIndexTokens.tooltip,
    toast: zIndexTokens.toast,
    toolbar: zIndexTokens.toolbar,
  },
  breakpoints: {
    sm: breakpointTokens.sm,
    md: breakpointTokens.md,
    lg: breakpointTokens.lg,
    xl: breakpointTokens.xl,
  },
});

// CSS variables for media query based theme switching
export const autoTheme = createTheme(themeContract, {
  spacing: {
    xs: spacingTokens.xs,
    sm: spacingTokens.sm,
    md: spacingTokens.md,
    lg: spacingTokens.lg,
    xl: spacingTokens.xl,
    '2xl': spacingTokens['2xl'],
    '3xl': spacingTokens['3xl'],
    '4xl': spacingTokens['4xl'],
    '5xl': spacingTokens['5xl'],
    '6xl': spacingTokens['6xl'],
  },
  colors: {
    gray: {
      50: 'light-dark(#fafafa, #171717)',
      100: 'light-dark(#f5f5f5, #262626)',
      200: 'light-dark(#e5e5e5, #404040)',
      300: 'light-dark(#d4d4d4, #525252)',
      400: 'light-dark(#a3a3a3, #737373)',
      500: 'light-dark(#737373, #a3a3a3)',
      600: 'light-dark(#525252, #d4d4d4)',
      700: 'light-dark(#404040, #e5e5e5)',
      800: 'light-dark(#262626, #f5f5f5)',
      900: 'light-dark(#171717, #fafafa)',
    },
    background: {
      primary: 'light-dark(#fafafa, #1c1c1e)',
      secondary: 'light-dark(#f5f5f5, #2c2c2e)',
      overlay: 'light-dark(rgba(255, 255, 255, 0.95), rgba(28, 28, 30, 0.95))',
      overlayDark: 'light-dark(rgba(28, 28, 30, 0.95), rgba(255, 255, 255, 0.95))',
    },
    border: {
      light: 'light-dark(rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.2))',
      medium: 'light-dark(rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.3))',
      dark: 'light-dark(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))',
      darkMedium: 'light-dark(rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.2))',
    },
    text: {
      primary: 'light-dark(#171717, #ffffff)',
      secondary: 'light-dark(#525252, #d4d4d4)',
      disabled: 'light-dark(#a3a3a3, #737373)',
      inverse: 'light-dark(#ffffff, #171717)',
    },
    interactive: {
      hover: 'light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1))',
      hoverDark: 'light-dark(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.05))',
      disabled: '0.4',
    },
  },
  typography: {
    fontFamily: typographyTokens.fontFamily,
    fontSize: {
      xs: typographyTokens.fontSize.xs,
      sm: typographyTokens.fontSize.sm,
      md: typographyTokens.fontSize.md,
      lg: typographyTokens.fontSize.lg,
    },
    fontWeight: {
      normal: typographyTokens.fontWeight.normal,
      medium: typographyTokens.fontWeight.medium,
      semibold: typographyTokens.fontWeight.semibold,
    },
    lineHeight: {
      tight: typographyTokens.lineHeight.tight,
      normal: typographyTokens.lineHeight.normal,
      relaxed: typographyTokens.lineHeight.relaxed,
    },
  },
  components: {
    toolbar: {
      borderRadius: componentTokens.toolbar.borderRadius,
      minHeight: componentTokens.toolbar.minHeight,
      backdropFilter: componentTokens.toolbar.backdropFilter,
      boxShadow: 'light-dark(0 4px 24px rgba(0, 0, 0, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4))',
      zIndex: componentTokens.toolbar.zIndex,
    },
    button: {
      borderRadius: componentTokens.button.borderRadius,
      minTouchTarget: componentTokens.button.minTouchTarget,
      size: {
        sm: componentTokens.button.size.sm,
        md: componentTokens.button.size.md,
      },
    },
    divider: {
      width: componentTokens.divider.width,
      height: componentTokens.divider.height,
    },
  },
  animation: {
    duration: {
      fast: animationTokens.duration.fast,
      normal: animationTokens.duration.normal,
      slow: animationTokens.duration.slow,
    },
    easing: {
      ease: animationTokens.easing.ease,
      easeIn: animationTokens.easing.easeIn,
      easeOut: animationTokens.easing.easeOut,
      easeInOut: animationTokens.easing.easeInOut,
    },
  },
  zIndex: {
    base: zIndexTokens.base,
    dropdown: zIndexTokens.dropdown,
    sticky: zIndexTokens.sticky,
    fixed: zIndexTokens.fixed,
    modal: zIndexTokens.modal,
    popover: zIndexTokens.popover,
    tooltip: zIndexTokens.tooltip,
    toast: zIndexTokens.toast,
    toolbar: zIndexTokens.toolbar,
  },
  breakpoints: {
    sm: breakpointTokens.sm,
    md: breakpointTokens.md,
    lg: breakpointTokens.lg,
    xl: breakpointTokens.xl,
  },
});