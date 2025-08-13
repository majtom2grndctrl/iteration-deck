import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

// Unmock the environment module for these specific tests
jest.unmock('../environment')

// We need to explicitly import the environment module after clearing mocks
import { isDevelopment, isProduction } from '../environment'

describe('Environment Detection', () => {
  let originalImportMeta: any
  let originalProcess: any

  beforeEach(() => {
    // Store original values
    originalImportMeta = (global as any)['import.meta']
    originalProcess = global.process
    
    // Clear any existing mocks
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Restore original values
    if (originalImportMeta !== undefined) {
      (global as any)['import.meta'] = originalImportMeta
    } else {
      delete (global as any)['import.meta']
    }
    
    if (originalProcess !== undefined) {
      global.process = originalProcess
    } else {
      delete (global as any).process
    }
  })

  describe('isDevelopment', () => {
    it('should return true when import.meta.env.DEV is true', () => {
      const mockMeta = {
        env: { DEV: true }
      }
      
      // Mock import.meta
      ;(global as any)['import.meta'] = mockMeta
      
      expect(isDevelopment()).toBe(true)
    })

    it('should return false when import.meta.env.DEV is false', () => {
      // Remove process env to force import.meta path
      delete (global as any).process
      
      const mockMeta = {
        env: { DEV: false }
      }
      
      ;(global as any)['import.meta'] = mockMeta
      
      expect(isDevelopment()).toBe(false)
    })

    it('should fallback to process.env.NODE_ENV', () => {
      // Mock process.env
      const mockProcess = {
        env: { NODE_ENV: 'development' }
      }
      
      global.process = mockProcess as any
      // Remove import.meta
      delete (global as any)['import.meta']
      
      expect(isDevelopment()).toBe(true)
    })

    it('should return false by default', () => {
      // Remove both import.meta and process
      delete (global as any)['import.meta']
      delete (global as any).process
      
      // Clear jest mock if set
      jest.clearAllMocks()
      
      expect(isDevelopment()).toBe(false)
    })
  })

  describe('isProduction', () => {
    it('should return opposite of isDevelopment', () => {
      const mockMeta = {
        env: { DEV: true }
      }
      
      ;(global as any)['import.meta'] = mockMeta
      
      expect(isProduction()).toBe(false)
    })
  })
})