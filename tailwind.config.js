/** @type {import('tailwindcss').Config} */
import { tokens } from './shared/tokens.ts';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./examples/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      // Extend default theme with our design tokens
      colors: {
        // Map our gray scale to Tailwind's gray
        gray: {
          50: tokens.colors.gray[50],
          100: tokens.colors.gray[100],
          200: tokens.colors.gray[200],
          300: tokens.colors.gray[300],
          400: tokens.colors.gray[400],
          500: tokens.colors.gray[500],
          600: tokens.colors.gray[600],
          700: tokens.colors.gray[700],
          800: tokens.colors.gray[800],
          900: tokens.colors.gray[900],
        },
        // Add glass/backdrop colors
        glass: {
          light: tokens.colors.glass.lightGlass,
          'light-hover': tokens.colors.glass.lightGlassHover,
          dark: tokens.colors.glass.darkGlass,
          'dark-hover': tokens.colors.glass.darkGlassHover,
        }
      },
      spacing: {
        // Map our spacing tokens to Tailwind (they're already px values)
        ...Object.fromEntries(
          Object.entries(tokens.spacing).map(([key, value]) => [key, value])
        )
      },
      borderRadius: {
        // Map our border radius tokens
        ...tokens.borderRadius
      },
      boxShadow: {
        // Map our shadow tokens
        toolbar: tokens.shadows.toolbar,
        segmented: tokens.shadows.segmented,
      },
      animation: {
        // Map our animation tokens
        'fade-in': `fadeIn ${tokens.animation.duration.fast} ${tokens.animation.easing.easeOut}`,
        'slide-up': `slideUp ${tokens.animation.duration.normal} ${tokens.animation.easing.easeOut}`,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px', // Our standard blur
        'lg': '12px',
        'xl': '16px',
      }
    },
  },
  plugins: [],
};