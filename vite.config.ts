import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === 'library'
  
  return {
    plugins: [
      react()
    ],
    ...(isLibraryMode ? {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'IterationDeck',
          formats: ['es'],
          fileName: 'index'
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        },
        cssCodeSplit: false
      }
    } : {})
  }
})
