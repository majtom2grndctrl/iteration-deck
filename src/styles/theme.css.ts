/**
 * Vanilla Extract Theme Contract for Iteration Deck
 * Defines the type-safe theme structure with CSS variables
 */
import { createThemeContract } from '@vanilla-extract/css';

export const themeContract = createThemeContract({
  spacing: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    '3xl': null,
    '4xl': null,
    '5xl': null,
    '6xl': null,
  },
  colors: {
    gray: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    background: {
      primary: null,
      secondary: null,
      overlay: null,
      overlayDark: null,
    },
    border: {
      light: null,
      medium: null,
      dark: null,
      darkMedium: null,
    },
    text: {
      primary: null,
      secondary: null,
      disabled: null,
      inverse: null,
    },
    interactive: {
      hover: null,
      hoverDark: null,
      disabled: null,
    },
  },
  typography: {
    fontFamily: null,
    fontSize: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
    },
    fontWeight: {
      normal: null,
      medium: null,
      semibold: null,
    },
    lineHeight: {
      tight: null,
      normal: null,
      relaxed: null,
    },
  },
  components: {
    toolbar: {
      borderRadius: null,
      minHeight: null,
      backdropFilter: null,
      boxShadow: null,
      zIndex: null,
    },
    button: {
      borderRadius: null,
      minTouchTarget: null,
      size: {
        sm: null,
        md: null,
      },
    },
    divider: {
      width: null,
      height: null,
    },
  },
  animation: {
    duration: {
      fast: null,
      normal: null,
      slow: null,
    },
    easing: {
      ease: null,
      easeIn: null,
      easeOut: null,
      easeInOut: null,
    },
  },
  zIndex: {
    base: null,
    dropdown: null,
    sticky: null,
    fixed: null,
    modal: null,
    popover: null,
    tooltip: null,
    toast: null,
    toolbar: null,
  },
  breakpoints: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
});