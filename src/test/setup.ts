import '@testing-library/jest-dom'

// Mock environment detection for tests
vi.mock('../core/environment', () => ({
  isDevelopment: vi.fn(() => true),
  isProduction: vi.fn(() => false),
}))