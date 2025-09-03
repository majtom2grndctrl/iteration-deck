import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    fs: {
      // Allow serving files from parent directories
      allow: ['../..'],
    },
  },
  resolve: {
    alias: {
      // Map /src to the actual src directory
      '/src': resolve(__dirname, '../../src'),
    },
  },
  css: {
    // Disable PostCSS processing since we're using Tailwind from CDN
    postcss: false,
  },
});