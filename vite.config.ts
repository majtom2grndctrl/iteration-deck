import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
    build: isDev ? undefined : {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'), // React as default export
        wc: resolve(__dirname, 'src/wc/index.ts'), // Web components at /wc
        'cli/index': resolve(__dirname, 'src/cli/index.ts'), // CLI tool
      },
      name: 'IterationDeck'
    },
    rollupOptions: {
      external: (id) => {
        // External modules - these won't be bundled
        const externalModules = [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'lit',
          'zustand',
          'commander', // CLI dependency
          'fs',        // Node.js built-ins for CLI
          'path',
          'child_process'
        ];
        return externalModules.some(dep =>
          id === dep || id.startsWith(dep + '/')
        );
      },
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          // Prevent chunking for library builds
          manualChunks: () => null,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'ReactJSXRuntime',
            lit: 'lit',
            zustand: 'zustand'
          }
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          // Prevent chunking for library builds
          manualChunks: () => null,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'ReactJSXRuntime',
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
    // Production optimizations (but preserve console for CLI)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for CLI output
        drop_debugger: true,
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