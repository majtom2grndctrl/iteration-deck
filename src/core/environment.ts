/**
 * Detects if the current environment is development mode
 * Used to determine whether to show the iteration deck toolbar and controls
 */
export const isDevelopment = (): boolean => {
  try {
    // In Vite, import.meta.env.DEV is the standard way to check development mode
    if (typeof import !== 'undefined' && typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env.DEV
    }
  } catch (e) {
    // import.meta not supported in this environment (e.g., Jest)
  }
  
  // Fallback for other bundlers or environments
  if (typeof globalThis !== 'undefined' && (globalThis as any).process?.env) {
    return (globalThis as any).process.env.NODE_ENV === 'development'
  }
  
  // Check global mock set up in tests
  if (typeof globalThis !== 'undefined' && (globalThis as any)['import.meta']?.env?.DEV !== undefined) {
    return (globalThis as any)['import.meta'].env.DEV
  }
  
  // Default to production behavior if we can't determine the environment
  return false
}

/**
 * Detects if the current environment is production mode
 */
export const isProduction = (): boolean => {
  return !isDevelopment()
}