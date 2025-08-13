/**
 * Runtime theme management utilities
 * Provides JavaScript API for theme switching and detection
 */

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeManagerOptions {
  /** Default theme mode */
  defaultTheme?: ThemeMode;
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Whether to apply theme to document root */
  applyToRoot?: boolean;
  /** Custom root element to apply theme to */
  rootElement?: HTMLElement;
}

/**
 * Theme manager class for handling runtime theme switching
 */
export class ThemeManager {
  private currentTheme: ThemeMode;
  private readonly storageKey: string;
  private readonly rootElement: HTMLElement;
  private readonly applyToRoot: boolean;
  private mediaQueryList: MediaQueryList;
  private listeners: Set<(theme: ThemeMode) => void> = new Set();

  constructor(options: ThemeManagerOptions = {}) {
    this.storageKey = options.storageKey ?? 'iteration-deck-theme';
    this.applyToRoot = options.applyToRoot ?? true;
    this.rootElement = options.rootElement ?? document.documentElement;
    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme
    this.currentTheme = this.detectInitialTheme(options.defaultTheme);
    this.applyTheme(this.currentTheme);
    
    // Listen for system theme changes
    this.mediaQueryList.addEventListener('change', this.handleSystemThemeChange);
  }

  /**
   * Get the current theme mode
   */
  getTheme(): ThemeMode {
    return this.currentTheme;
  }

  /**
   * Set the theme mode
   */
  setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.persistTheme(theme);
    this.notifyListeners(theme);
  }

  /**
   * Get the effective theme (resolves 'auto' to 'light' or 'dark')
   */
  getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'auto') {
      return this.mediaQueryList.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  /**
   * Toggle between light and dark themes
   */
  toggle(): void {
    const newTheme = this.getEffectiveTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Add a listener for theme changes
   */
  addListener(listener: (theme: ThemeMode) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Detect system theme preference
   */
  getSystemTheme(): 'light' | 'dark' {
    return this.mediaQueryList.matches ? 'dark' : 'light';
  }

  /**
   * Check if the system supports color scheme detection
   */
  supportsColorScheme(): boolean {
    return window.matchMedia && typeof window.matchMedia === 'function';
  }

  /**
   * Clean up event listeners
   */
  destroy(): void {
    this.mediaQueryList.removeEventListener('change', this.handleSystemThemeChange);
    this.listeners.clear();
  }

  private detectInitialTheme(defaultTheme: ThemeMode = 'auto'): ThemeMode {
    // Try to get theme from localStorage
    try {
      const stored = localStorage.getItem(this.storageKey) as ThemeMode;
      if (stored && ['light', 'dark', 'auto'].includes(stored)) {
        return stored;
      }
    } catch {
      // localStorage not available or blocked
    }

    return defaultTheme;
  }

  private applyTheme(theme: ThemeMode): void {
    if (!this.applyToRoot) return;

    // Set data attribute for CSS targeting
    this.rootElement.setAttribute('data-theme', theme);
    
    // Set color-scheme for browsers that support it
    if (theme === 'auto') {
      this.rootElement.style.colorScheme = 'light dark';
    } else {
      this.rootElement.style.colorScheme = theme;
    }

    // Set system theme data attribute for detection
    this.rootElement.setAttribute('data-system-theme', this.getSystemTheme());
  }

  private persistTheme(theme: ThemeMode): void {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // localStorage not available or blocked
    }
  }

  private handleSystemThemeChange = (): void => {
    // Update system theme data attribute
    this.rootElement.setAttribute('data-system-theme', this.getSystemTheme());
    
    // If current theme is auto, notify listeners of effective change
    if (this.currentTheme === 'auto') {
      this.notifyListeners(this.currentTheme);
    }
  };

  private notifyListeners(theme: ThemeMode): void {
    this.listeners.forEach(listener => {
      try {
        listener(theme);
      } catch (error) {
        console.error('Error in theme change listener:', error);
      }
    });
  }
}

/**
 * Global theme manager instance
 */
let globalThemeManager: ThemeManager | null = null;

/**
 * Get or create the global theme manager
 */
export function getThemeManager(options?: ThemeManagerOptions): ThemeManager {
  if (!globalThemeManager) {
    globalThemeManager = new ThemeManager(options);
  }
  return globalThemeManager;
}

/**
 * Initialize theme management for iteration-deck components
 */
export function initializeThemeManagement(options?: ThemeManagerOptions): ThemeManager {
  return getThemeManager(options);
}

/**
 * Hook for React components to use theme management
 */
export function useTheme() {
  const manager = getThemeManager();
  return {
    theme: manager.getTheme(),
    effectiveTheme: manager.getEffectiveTheme(),
    setTheme: (theme: ThemeMode) => manager.setTheme(theme),
    toggle: () => manager.toggle(),
    systemTheme: manager.getSystemTheme(),
  };
}

/**
 * CSS class name utilities for theme-aware styling
 */
export const themeClassNames = {
  container: 'iteration-deck-theme-container',
  light: 'iteration-deck-theme-light',
  dark: 'iteration-deck-theme-dark',
  auto: 'iteration-deck-theme-auto',
} as const;

/**
 * Utility to get theme-aware CSS class names
 */
export function getThemeClassName(theme: ThemeMode): string {
  return `${themeClassNames.container} ${themeClassNames[theme]}`;
}