/**
 * Shared utilities and environment detection
 */

/**
 * Detect if we're in development mode
 */
export function isDevelopmentMode(): boolean {
  // In a browser environment, check if we're in development
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port !== '';
  }
  
  // In Node.js environment, check NODE_ENV
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV !== 'production';
  }
  
  // Default to development mode if unsure
  return true;
}