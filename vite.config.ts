import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  build: {
    lib: {
      entry: {
        core: resolve(__dirname, 'src/index.ts'),
        react: resolve(__dirname, 'src/react/index.tsx'),
      },
      name: 'IterationDeck',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${ext}`;
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lit', 'zustand'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
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
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            lit: 'lit',
            zustand: 'zustand'
          }
        }
      ]
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});