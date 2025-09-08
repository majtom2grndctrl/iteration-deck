/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        'glass-light': 'rgb(225 225 225 / 0.8)',
        'glass-light-hover': 'rgb(255 255 255 / 0.9)',
        'glass-dark': 'rgb(39 39 42 / 0.8)',
        'glass-dark-hover': 'rgb(50 50 50 / 0.9)',
      },
      boxShadow: {
        'toolbar': '0 8px 32px rgb(0 0 0 / 0.1), 0 2px 8px rgb(0 0 0 / 0.05)',
        'segmented': 'radial-gradient(ellipse 4px 44px at center, rgb(0 0 0 / 0.15) 40%, rgb(0 0 0 / 0.05) 60%, transparent 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
  darkMode: 'media', // Use system preference
}