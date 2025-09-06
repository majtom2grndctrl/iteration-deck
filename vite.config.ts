import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [],
    build: isDev ? undefined : {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'), // React as default export
        wc: resolve(__dirname, 'src/wc/index.ts'), // Web components at /wc
      },
      name: 'IterationDeck'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lit', 'zustand'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          // Disable chunking completely to avoid import path issues in NPM packages
          manualChunks: undefined,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            lit: 'lit',
            zustand: 'zustand'
          }
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          assetFileNames: 'assets/[name]-[hash][extname]',
          // Disable chunking completely to avoid import path issues in NPM packages
          manualChunks: undefined,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            lit: 'lit',
            zustand: 'zustand'
          }
        }
      ],
      // Enable tree-shaking optimizations
      treeshake: {
        moduleSideEffects: (id) => {
          // Preserve side effects for Lit component registration
          return id.includes('components/iteration-deck') || 
                 id.includes('src/lit/') ||
                 id.includes('src/components/');
        },
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    // Source maps for debugging
    sourcemap: true,
    // Report bundle size
    reportCompressedSize: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
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
  };
});