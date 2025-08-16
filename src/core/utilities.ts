/**
 * Core utility functions for iteration-deck components
 * Framework-agnostic helpers for deck/slide management, environment detection, and more
 */

// Simple types for utilities
export type Environment = 'development' | 'production';
export type NavigationDirection = 'prev' | 'next' | 'first' | 'last';

/**
 * Environment detection utilities
 */
export const detectEnvironment = (): Environment => {
  // Check for common production environment indicators
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
    return 'production';
  }
  
  // Check for Vite development mode
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'development';
  }
  
  // Fallback: assume development if we can't determine
  return 'development';
};

/**
 * Check if we're currently in production mode
 */
export const isProduction = (): boolean => {
  return detectEnvironment() === 'production';
};

/**
 * Check if we're currently in development mode
 */
export const isDevelopment = (): boolean => {
  return detectEnvironment() === 'development';
};

/**
 * Generate a unique slide ID based on deck ID and label
 */
export const generateSlideId = (deckId: string, label: string): string => {
  const safeLabel = label || 'slide';
  const sanitizedLabel = safeLabel.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${deckId}-${sanitizedLabel}`;
};

/**
 * Validate deck ID format
 */
export const validateDeckId = (id: string): boolean => {
  return /^[a-z0-9-_]+$/i.test(id);
};

/**
 * Debug logging (only in development)
 */
export const debugLog = (message: string, data?: any): void => {
  if (isDevelopment()) {
    console.log(`[IterationDeck] ${message}`, data || '');
  }
};

/**
 * Error logging
 */
export const errorLog = (message: string, error?: any): void => {
  console.error(`[IterationDeck ERROR] ${message}`, error || '');
};

/**
 * Warning logging
 */
export const warnLog = (message: string, data?: any): void => {
  console.warn(`[IterationDeck WARN] ${message}`, data || '');
};

/**
 * Throttle function to limit how often a function can be called
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Check if a keyboard event is a navigation shortcut
 */
export const isNavigationShortcut = (event: KeyboardEvent): NavigationDirection | null => {
  const { key, metaKey, ctrlKey } = event;
  const isModified = metaKey || ctrlKey;
  
  if (!isModified) return null;
  
  switch (key) {
    case 'ArrowLeft':
      return 'prev';
    case 'ArrowRight':
      return 'next';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    default:
      return null;
  }
};

/**
 * Simple debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

