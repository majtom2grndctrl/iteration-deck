/**
 * Detects if the current environment is development mode
 * Used to determine whether to show the iteration deck toolbar and controls
 */
export const isDevelopment = (): boolean => {
  // In Vite, import.meta.env.DEV is the standard way to check development mode
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env.DEV
  }
  
  // Fallback for other bundlers or environments
  if (typeof globalThis !== 'undefined' && (globalThis as any).process?.env) {
    return (globalThis as any).process.env.NODE_ENV === 'development'
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