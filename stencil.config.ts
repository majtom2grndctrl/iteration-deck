import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';

export const config: Config = {
  namespace: 'iteration-deck',
  srcDir: 'src',
  globalStyle: 'src/styles/global.css',
  buildEs5: 'prod',
  extras: {
    // Enable all experimental features for better DX
    experimentalImportInjection: true,
    // Enable modern features for better performance
    enableImportInjection: true,
    experimentalSlotFixes: true,
  },
  outputTargets: [
    // Main distribution for web components (universal support)
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'styles/global.css',
          dest: 'iteration-deck/global.css'
        }
      ]
    },
    
    // Custom elements build for direct import (Astro compatible)
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
      dir: 'dist/components',
    },
    
    // React output target for auto-generated React components
    reactOutputTarget({
      componentCorePackage: 'iteration-deck',
      proxiesFile: './src/generated/react/components.ts',
      includeDefineCustomElements: true,
      outDir: './dist/generated/react',
    }),
    
    // Documentation generation
    {
      type: 'docs-readme',
      dir: 'docs'
    },
    
    // Development server and testing
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: '../index.html',
          dest: 'index.html'
        }
      ]
    }
  ],
  
  // Testing configuration
  testing: {
    browserHeadless: "shell",
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/test/**',
      '!src/**/__tests__/**',
      '!src/**/*.css.ts' // Exclude vanilla-extract CSS files from coverage
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/www/'],
    moduleNameMapper: {
      // Mock CSS files and vanilla-extract styles
      '\\.css$': 'identity-obj-proxy',
      '\\.css\\.ts$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': '@stencil/core/testing/jest-preprocessor.js'
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@stencil|@vanilla-extract)/)'
    ]
  },
  
  // Enhanced development server configuration
  devServer: {
    reloadStrategy: 'hmr',
    openBrowser: false,
    port: 3333,
    host: '0.0.0.0', // Allow external connections for development
    historyApiFallback: true, // Enable SPA routing support
    logRequests: true, // Log HTTP requests for debugging
    root: 'www', // Serve files from www directory
    watchGlob: '**/*.{ts,tsx,css,html}', // Watch additional file types
    initialLoadTimeout: 5000, // Timeout for initial page load
    websocket: true, // Enable WebSocket for hot reload
    gzip: true, // Enable gzip compression for development
    
    // Enhanced error handling and logging
    errorReporting: true, // Show build errors in browser
    logLevel: 'info', // Enable detailed logging: 'error', 'warn', 'info', 'debug'
    
    // Custom headers for development
    responseHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  },
  
  // TypeScript configuration for Stencil
  tsconfig: './tsconfig.json',
  
  // Enable advanced features
  enableCache: true,
  hashFileNames: true,
  minifyJs: true,
  minifyCss: true,
  
  // Plugins configuration
  plugins: [],
  
  // Bundle configuration with vanilla-extract enabled
  rollupPlugins: {
    before: [
      vanillaExtractPlugin()
    ],
    after: []
  }
};