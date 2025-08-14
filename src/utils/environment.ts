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
  // Check for explicit environment variables first
  if (typeof process !== 'undefined' && process.env) {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'production') {
      return {
        isDevelopment: false,
        isProduction: true,
        showDevTools: false,
        enableToolbar: false
      };
    }
    if (nodeEnv === 'development') {
      return {
        isDevelopment: true,
        isProduction: false,
        showDevTools: true,
        enableToolbar: true
      };
    }
  }

  // Check for build-time flags
  if (typeof window !== 'undefined') {
    // Check if we're running with dev server or hot reloading
    const hasDevServer = !!(window as any).__stencil_dev_server__ || 
                        !!(window as any).__webpack_dev_server__ ||
                        !!(window as any).__vite_dev_server__;
    
    // Check for localhost or common dev ports
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '0.0.0.0';
    
    const isDevPort = ['3000', '3333', '4200', '5173', '8080'].includes(window.location.port);
    
    // Check for query parameters that force dev mode
    const urlParams = new URLSearchParams(window.location.search);
    const forceDevMode = urlParams.has('iteration-deck-dev') || urlParams.has('dev');
    
    const isDevelopment = hasDevServer || (isLocalhost && isDevPort) || forceDevMode;
    
    return {
      isDevelopment,
      isProduction: !isDevelopment,
      showDevTools: isDevelopment,
      enableToolbar: isDevelopment
    };
  }

  // Default to production mode if we can't determine environment
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