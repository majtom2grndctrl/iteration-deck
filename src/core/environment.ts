/**
 * Detects if the current environment is development mode
 * Used to determine whether to show the iteration deck toolbar and controls
 */
export function isDevelopment(): boolean {
  // Check process.env.NODE_ENV if available (Node.js environments)
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV === 'development';
  }
  
  // Check global process if available (browsers with process polyfill)
  if (typeof window !== 'undefined' && window['process'] && window['process']['env'] && window['process']['env']['NODE_ENV']) {
    return window['process']['env']['NODE_ENV'] === 'development';
  }
  
  // Stencil dev server detection - check for localhost and common dev ports
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    // Development indicators: localhost, 127.0.0.1, or common dev ports
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return true;
    }
    
    // Common development ports
    if (port && ['3000', '3333', '3334', '3335', '4200', '5173', '8080'].includes(port)) {
      return true;
    }
  }
  
  // Default to false (production mode) if we can't determine the environment
  return false;
}

/**
 * Detects if the current environment is production mode
 */
export const isProduction = (): boolean => {
  return !isDevelopment()
}