/**
 * Environment detection utilities for Iteration Deck components
 * Determines whether components should run in development or production mode
 */

export interface EnvironmentInfo {
  isDevelopment: boolean;
  isProduction: boolean;
  showDevTools: boolean;
  enableToolbar: boolean;
}

/**
 * Detects the current environment and returns configuration flags
 * In development: Shows toolbar, dev tools, and all slides
 * In production: Hides toolbar, shows only first slide
 */
export function detectEnvironment(): EnvironmentInfo {
  // In browser environments, use simple heuristics for dev detection
  if (typeof window !== 'undefined') {
    // Check for Stencil dev markers (most reliable)
    const hasStencilDevMarkers = document.querySelector('script[data-stencil]') !== null;
    
    // Check for localhost
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '0.0.0.0';
    
    // Check for explicit dev mode via URL
    const forceDevMode = new URLSearchParams(window.location.search).has('dev');
    
    const isDevelopment = hasStencilDevMarkers || isLocalhost || forceDevMode;
    
    return {
      isDevelopment,
      isProduction: !isDevelopment,
      showDevTools: isDevelopment,
      enableToolbar: isDevelopment
    };
  }

  // Default to production mode (SSR, etc.)
  return {
    isDevelopment: false,
    isProduction: true,
    showDevTools: false,
    enableToolbar: false
  };
}

/**
 * Global environment info cached after first detection
 */
let cachedEnvironment: EnvironmentInfo | null = null;

/**
 * Gets the current environment info, caching the result
 */
export function getEnvironment(): EnvironmentInfo {
  if (!cachedEnvironment) {
    cachedEnvironment = detectEnvironment();
  }
  return cachedEnvironment;
}

/**
 * Forces re-detection of environment (useful for testing)
 */
export function resetEnvironmentCache(): void {
  cachedEnvironment = null;
}

/**
 * Checks if dev tools should be shown for the current environment
 */
export function shouldShowDevTools(): boolean {
  return getEnvironment().showDevTools;
}

/**
 * Checks if the toolbar should be enabled for the current environment
 */
export function shouldEnableToolbar(): boolean {
  return getEnvironment().enableToolbar;
}

/**
 * Checks if we're running in production mode
 */
export function isProductionMode(): boolean {
  return getEnvironment().isProduction;
}

/**
 * Checks if we're running in development mode
 */
export function isDevelopmentMode(): boolean {
  return getEnvironment().isDevelopment;
}

/**
 * Alias for isDevelopmentMode for convenience
 */
export function isDevMode(): boolean {
  return isDevelopmentMode();
}