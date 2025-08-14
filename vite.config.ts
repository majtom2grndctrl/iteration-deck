import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isDev = mode === 'development';
  
  return {
    plugins: [vanillaExtractPlugin()],
    
    // Development server configuration
    server: {
      port: 3000,
      open: true,
    },

    // Build configuration - different for dev vs production
    build: isDev ? {
      // Development build - serve HTML pages
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          lit: resolve(__dirname, 'lit.html'),
          react: resolve(__dirname, 'react.html'),
        },
      },
      sourcemap: true,
      minify: false,
    } : {
      // Production build - library mode
      lib: {
        entry: {
          // Main entry point for web components
          index: resolve(__dirname, 'src/index.ts'),
          // React wrappers entry point
          react: resolve(__dirname, 'src/react/index.tsx'),
          // Lit components entry point
          lit: resolve(__dirname, 'src/lit/index.ts'),
        },
        name: 'IterationDeck',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format}.js`,
      },
      rollupOptions: {
        // External dependencies that shouldn't be bundled
        external: ['lit', 'react', 'react-dom', 'zustand'],
        output: {
          globals: {
            lit: 'Lit',
            react: 'React',
            'react-dom': 'ReactDOM',
            zustand: 'Zustand',
          },
        },
      },
      sourcemap: true,
      minify: false, // Keep readable for development
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    // Define environment variables
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});