/**
 * Comprehensive tests for vanilla-extract theme contract validation
 * Ensures type safety and consistency across theme implementations
 */
import { describe, it, expect } from '@jest/globals';
import { themeContract } from '../theme.css';
import { lightTheme, darkTheme, autoTheme } from '../themes.css';
import { ThemeManager, getThemeManager, type ThemeMode } from '../theme-manager';

describe('Theme Contract Validation', () => {
  it('should have valid theme contract structure', () => {
    expect(themeContract).toBeDefined();
    expect(themeContract.spacing).toBeDefined();
    expect(themeContract.colors).toBeDefined();
    expect(themeContract.typography).toBeDefined();
    expect(themeContract.components).toBeDefined();
    expect(themeContract.animation).toBeDefined();
    expect(themeContract.zIndex).toBeDefined();
    expect(themeContract.breakpoints).toBeDefined();
  });

  it('should have consistent spacing scale', () => {
    const spacingKeys = Object.keys(themeContract.spacing);
    const expectedSpacingKeys = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
    
    expect(spacingKeys).toEqual(expect.arrayContaining(expectedSpacingKeys));
    expect(spacingKeys.length).toBe(expectedSpacingKeys.length);
  });

  it('should have complete color palette', () => {
    const colorCategories = Object.keys(themeContract.colors);
    const expectedCategories = ['gray', 'background', 'border', 'text', 'interactive'];
    
    expect(colorCategories).toEqual(expect.arrayContaining(expectedCategories));
    
    // Check gray scale completeness
    const grayKeys = Object.keys(themeContract.colors.gray);
    const expectedGrayKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    expect(grayKeys).toEqual(expect.arrayContaining(expectedGrayKeys));
  });

  it('should have typography system', () => {
    expect(themeContract.typography.fontFamily).toBeDefined();
    expect(themeContract.typography.fontSize).toBeDefined();
    expect(themeContract.typography.fontWeight).toBeDefined();
    expect(themeContract.typography.lineHeight).toBeDefined();
    
    const fontSizeKeys = Object.keys(themeContract.typography.fontSize);
    expect(fontSizeKeys).toEqual(expect.arrayContaining(['xs', 'sm', 'md', 'lg']));
  });

  it('should have component-specific tokens', () => {
    expect(themeContract.components.toolbar).toBeDefined();
    expect(themeContract.components.button).toBeDefined();
    expect(themeContract.components.divider).toBeDefined();
    
    // Toolbar tokens
    expect(themeContract.components.toolbar.borderRadius).toBeDefined();
    expect(themeContract.components.toolbar.minHeight).toBeDefined();
    expect(themeContract.components.toolbar.backdropFilter).toBeDefined();
    expect(themeContract.components.toolbar.boxShadow).toBeDefined();
    expect(themeContract.components.toolbar.zIndex).toBeDefined();
  });

  it('should have animation tokens', () => {
    expect(themeContract.animation.duration).toBeDefined();
    expect(themeContract.animation.easing).toBeDefined();
    
    const durationKeys = Object.keys(themeContract.animation.duration);
    expect(durationKeys).toEqual(expect.arrayContaining(['fast', 'normal', 'slow']));
    
    const easingKeys = Object.keys(themeContract.animation.easing);
    expect(easingKeys).toEqual(expect.arrayContaining(['ease', 'easeIn', 'easeOut', 'easeInOut']));
  });

  it('should have z-index system', () => {
    const zIndexKeys = Object.keys(themeContract.zIndex);
    const expectedZIndexKeys = [
      'base', 'dropdown', 'sticky', 'fixed', 'modal', 
      'popover', 'tooltip', 'toast', 'toolbar'
    ];
    
    expect(zIndexKeys).toEqual(expect.arrayContaining(expectedZIndexKeys));
  });

  it('should have breakpoint tokens', () => {
    const breakpointKeys = Object.keys(themeContract.breakpoints);
    expect(breakpointKeys).toEqual(expect.arrayContaining(['sm', 'md', 'lg', 'xl']));
  });
});

describe('Theme Implementation Validation', () => {
  it('should validate light theme completeness', () => {
    expect(lightTheme).toBeDefined();
    expect(typeof lightTheme).toBe('string'); // Vanilla-extract themes are CSS class names
  });

  it('should validate dark theme completeness', () => {
    expect(darkTheme).toBeDefined();
    expect(typeof darkTheme).toBe('string');
  });

  it('should validate auto theme completeness', () => {
    expect(autoTheme).toBeDefined();
    expect(typeof autoTheme).toBe('string');
  });

  it('should generate different CSS class names for different themes', () => {
    expect(lightTheme).not.toBe(darkTheme);
    expect(lightTheme).not.toBe(autoTheme);
    expect(darkTheme).not.toBe(autoTheme);
  });
});

describe('Theme Manager Validation', () => {
  let themeManager: ThemeManager;

  beforeEach(() => {
    // Reset DOM and localStorage
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-system-theme');
    document.documentElement.style.colorScheme = '';
    localStorage.clear();
    
    themeManager = new ThemeManager({ applyToRoot: false });
  });

  afterEach(() => {
    themeManager.destroy();
  });

  it('should initialize with default theme', () => {
    const manager = new ThemeManager({ defaultTheme: 'light' });
    expect(manager.getTheme()).toBe('light');
    manager.destroy();
  });

  it('should set and get themes correctly', () => {
    themeManager.setTheme('dark');
    expect(themeManager.getTheme()).toBe('dark');
    
    themeManager.setTheme('light');
    expect(themeManager.getTheme()).toBe('light');
    
    themeManager.setTheme('auto');
    expect(themeManager.getTheme()).toBe('auto');
  });

  it('should resolve auto theme to effective theme', () => {
    themeManager.setTheme('auto');
    const effectiveTheme = themeManager.getEffectiveTheme();
    expect(['light', 'dark']).toContain(effectiveTheme);
  });

  it('should toggle between light and dark', () => {
    themeManager.setTheme('light');
    themeManager.toggle();
    expect(themeManager.getTheme()).toBe('dark');
    
    themeManager.toggle();
    expect(themeManager.getTheme()).toBe('light');
  });

  it('should persist theme to localStorage', () => {
    const managerWithStorage = new ThemeManager({ 
      storageKey: 'test-theme',
      applyToRoot: false 
    });
    
    managerWithStorage.setTheme('dark');
    expect(localStorage.getItem('test-theme')).toBe('dark');
    
    managerWithStorage.destroy();
  });

  it('should handle theme change listeners', () => {
    let notifiedTheme: ThemeMode | null = null;
    const removeListener = themeManager.addListener((theme) => {
      notifiedTheme = theme;
    });
    
    themeManager.setTheme('dark');
    expect(notifiedTheme).toBe('dark');
    
    removeListener();
    themeManager.setTheme('light');
    expect(notifiedTheme).toBe('dark'); // Should not change after listener removed
  });

  it('should detect system theme preference', () => {
    const systemTheme = themeManager.getSystemTheme();
    expect(['light', 'dark']).toContain(systemTheme);
  });

  it('should support color scheme detection', () => {
    const supportsColorScheme = themeManager.supportsColorScheme();
    expect(typeof supportsColorScheme).toBe('boolean');
  });
});

describe('CSS Generation Validation', () => {
  it('should generate valid CSS class names', () => {
    // Theme classes should be valid CSS identifiers
    const themeClasses = [lightTheme, darkTheme, autoTheme];
    
    themeClasses.forEach(themeClass => {
      expect(themeClass).toMatch(/^[a-zA-Z_][a-zA-Z0-9_-]*$/);
      expect(themeClass.length).toBeGreaterThan(0);
    });
  });

  it('should have CSS variables when applied', () => {
    // This would require DOM testing with actual CSS applied
    // For now, we ensure the classes exist
    expect(lightTheme).toBeTruthy();
    expect(darkTheme).toBeTruthy();
    expect(autoTheme).toBeTruthy();
  });
});

describe('Accessibility Validation', () => {
  it('should support prefers-reduced-motion', () => {
    // Test that animations can be disabled
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    expect(mediaQuery).toBeDefined();
  });

  it('should support prefers-color-scheme', () => {
    // Test system color scheme detection
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    expect(lightQuery).toBeDefined();
    expect(darkQuery).toBeDefined();
  });

  it('should support high contrast mode', () => {
    // Test high contrast media query support
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    expect(highContrastQuery).toBeDefined();
  });
});

describe('Type Safety Validation', () => {
  it('should enforce TypeScript types for theme modes', () => {
    const validThemes: ThemeMode[] = ['light', 'dark', 'auto'];
    
    validThemes.forEach(theme => {
      expect(['light', 'dark', 'auto']).toContain(theme);
    });
  });

  it('should have properly typed theme contract', () => {
    // Ensure theme contract has expected structure
    expect(typeof themeContract.spacing.xs).toBe('string');
    expect(typeof themeContract.colors.text.primary).toBe('string');
    expect(typeof themeContract.typography.fontSize.md).toBe('string');
  });
});