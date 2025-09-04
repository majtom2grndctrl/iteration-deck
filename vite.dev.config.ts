import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss({
      content: [
        './src/**/*.{ts,tsx}',
        './dev/**/*.{html,js,ts,jsx,tsx}',
        './index.html'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3004,
    open: true
  },
  define: {
    __DEV__: 'true',
    'process.env.NODE_ENV': JSON.stringify('development')
  }
});