import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IterationDeck',
      fileName: 'iteration-deck-standalone'
    },
    rollupOptions: {
      // Don't externalize dependencies - bundle everything for standalone use
      external: [],
      output: {
        format: 'es',
        entryFileNames: 'iteration-deck-standalone.js',
      }
    },
    outDir: 'examples/dist',
    emptyOutDir: false,
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for demo debugging
        drop_debugger: true,
      },
    },
    // Source maps for debugging
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // Optimization for production builds
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
  }
});