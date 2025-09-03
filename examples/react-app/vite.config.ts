import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve to the parent library source for development
      'iteration-deck/react': resolve(__dirname, '../../src/react/index.tsx'),
      'iteration-deck': resolve(__dirname, '../../src/index.ts'),
      '@': resolve(__dirname, '../../src'),
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3001,
    open: true
  },
  define: {
    __DEV__: 'true',
    'process.env.NODE_ENV': JSON.stringify('development')
  }
})