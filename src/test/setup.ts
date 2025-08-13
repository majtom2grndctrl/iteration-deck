import '@testing-library/jest-dom'

// Mock import.meta globally for Jest
;(global as any)['import.meta'] = {
  env: {
    DEV: true, // Default to development mode in tests
  }
}

// Mock environment detection for tests using Jest
jest.mock('../core/environment', () => ({
  isDevelopment: jest.fn(() => true),
  isProduction: jest.fn(() => false),
}))

// Mock vanilla-extract for test environment
jest.mock('@vanilla-extract/css', () => ({
  createThemeContract: jest.fn((contract) => {
    // Return a mock contract structure with the same shape as the actual contract
    function createMockStructure(obj: any): any {
      if (typeof obj === 'object' && obj !== null) {
        const mock: any = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            mock[key] = createMockStructure(obj[key]);
          }
        }
        return mock;
      }
      return `var(--mock-${Math.random().toString(36).substr(2, 9)})`;
    }
    return createMockStructure(contract);
  }),
  createTheme: jest.fn(() => `mock-theme-${Math.random().toString(36).substr(2, 9)}`),
  style: jest.fn(() => `mock-style-${Math.random().toString(36).substr(2, 9)}`),
  styleVariants: jest.fn((variants) => {
    const mockVariants: any = {};
    if (typeof variants === 'object' && variants !== null) {
      for (const key in variants) {
        mockVariants[key] = `mock-variant-${key}-${Math.random().toString(36).substr(2, 9)}`;
      }
    }
    return mockVariants;
  }),
  globalStyle: jest.fn(),
}))

jest.mock('@vanilla-extract/dynamic', () => ({
  assignInlineVars: jest.fn(() => ({}))
}))

