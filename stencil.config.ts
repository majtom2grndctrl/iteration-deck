import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'iteration-deck',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: '**/*.html'
        }
      ]
    },
  ],
  testing: {
    browserHeadless: "shell",
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.spec.{ts,tsx}',
      '!src/**/*.e2e.{ts,tsx}',
      '!src/test-setup.ts'
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  },
  devServer: {
    reloadStrategy: 'pageReload',
    port: 3333
  }
};
