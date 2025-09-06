import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: './dev',
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../..'),
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