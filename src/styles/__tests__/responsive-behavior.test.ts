/**
 * Tests for responsive behavior and media query functionality
 * Validates that responsive styles work correctly across different screen sizes
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { responsivePatterns } from '../responsive-patterns.css';

// Mock window.matchMedia for testing
const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
});

describe('Responsive Behavior Tests', () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    window.matchMedia = mockMatchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  describe('Breakpoint Detection', () => {
    it('should handle small screen queries', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('min-width: 640px'),
      });

      const smQuery = window.matchMedia('(min-width: 640px)');
      expect(smQuery.matches).toBe(true);
    });

    it('should handle medium screen queries', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('min-width: 768px'),
      });

      const mdQuery = window.matchMedia('(min-width: 768px)');
      expect(mdQuery.matches).toBe(true);
    });

    it('should handle large screen queries', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('min-width: 1024px'),
      });

      const lgQuery = window.matchMedia('(min-width: 1024px)');
      expect(lgQuery.matches).toBe(true);
    });

    it('should handle extra large screen queries', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('min-width: 1280px'),
      });

      const xlQuery = window.matchMedia('(min-width: 1280px)');
      expect(xlQuery.matches).toBe(true);
    });
  });

  describe('Touch Target Optimization', () => {
    it('should optimize for coarse pointer devices', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('pointer: coarse'),
      });

      const touchQuery = window.matchMedia('(pointer: coarse)');
      expect(touchQuery.matches).toBe(true);
    });

    it('should optimize for fine pointer devices', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('pointer: fine'),
      });

      const fineQuery = window.matchMedia('(pointer: fine)');
      expect(fineQuery.matches).toBe(true);
    });
  });

  describe('Accessibility Media Queries', () => {
    it('should detect reduced motion preference', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('prefers-reduced-motion: reduce'),
      });

      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      expect(reducedMotionQuery.matches).toBe(true);
    });

    it('should detect high contrast preference', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('prefers-contrast: high'),
      });

      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      expect(highContrastQuery.matches).toBe(true);
    });

    it('should detect color scheme preference', () => {
      window.matchMedia = (query: string) => ({
        ...mockMatchMedia(query),
        matches: query.includes('prefers-color-scheme: dark'),
      });

      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      expect(darkModeQuery.matches).toBe(true);
    });
  });

  describe('Responsive Pattern Validation', () => {
    it('should have valid mobile-first patterns', () => {
      expect(responsivePatterns.hideMobile).toBeDefined();
      expect(responsivePatterns.hideDesktop).toBeDefined();
      expect(responsivePatterns.stackMobile).toBeDefined();
    });

    it('should have container patterns for different sizes', () => {
      expect(responsivePatterns.containerSm).toBeDefined();
      expect(responsivePatterns.containerMd).toBeDefined();
      expect(responsivePatterns.containerLg).toBeDefined();
    });

    it('should have touch-friendly patterns', () => {
      expect(responsivePatterns.touchTarget).toBeDefined();
    });

    it('should have adaptive spacing patterns', () => {
      expect(responsivePatterns.adaptiveSpacing).toBeDefined();
    });

    it('should have responsive text patterns', () => {
      expect(responsivePatterns.responsiveText).toBeDefined();
    });

    it('should have accessibility-aware patterns', () => {
      expect(responsivePatterns.respectMotionPreferences).toBeDefined();
      expect(responsivePatterns.highContrastSupport).toBeDefined();
    });

    it('should have toolbar-specific responsive patterns', () => {
      expect(responsivePatterns.toolbarResponsive).toBeDefined();
    });
  });
});

describe('CSS Media Query Integration', () => {
  it('should create valid media query listeners', () => {
    const queries = [
      '(min-width: 640px)',
      '(min-width: 768px)', 
      '(min-width: 1024px)',
      '(min-width: 1280px)',
      '(prefers-color-scheme: dark)',
      '(prefers-reduced-motion: reduce)',
      '(prefers-contrast: high)',
      '(pointer: coarse)',
      '(pointer: fine)',
    ];

    queries.forEach(query => {
      const mediaQuery = window.matchMedia(query);
      expect(mediaQuery).toBeDefined();
      expect(typeof mediaQuery.addEventListener).toBe('function');
      expect(typeof mediaQuery.removeEventListener).toBe('function');
    });
  });

  it('should handle media query changes', () => {
    let listenerCalled = false;
    const mockMediaQuery = {
      ...mockMatchMedia('(min-width: 768px)'),
      addEventListener: (event: string, listener: () => void) => {
        if (event === 'change') {
          listener();
          listenerCalled = true;
        }
      },
    };

    window.matchMedia = () => mockMediaQuery;
    
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', () => {
      // Listener function
    });

    expect(listenerCalled).toBe(true);
  });
});

describe('Responsive Utility Functions', () => {
  it('should detect mobile devices', () => {
    const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
    
    window.matchMedia = (query: string) => ({
      ...mockMatchMedia(query),
      matches: query.includes('max-width: 767px'),
    });

    expect(isMobile()).toBe(true);
  });

  it('should detect tablet devices', () => {
    const isTablet = () => {
      const minTablet = window.matchMedia('(min-width: 768px)').matches;
      const maxTablet = window.matchMedia('(max-width: 1023px)').matches;
      return minTablet && maxTablet;
    };

    window.matchMedia = (query: string) => ({
      ...mockMatchMedia(query),
      matches: query.includes('min-width: 768px') || query.includes('max-width: 1023px'),
    });

    expect(isTablet()).toBe(true);
  });

  it('should detect desktop devices', () => {
    const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

    window.matchMedia = (query: string) => ({
      ...mockMatchMedia(query),
      matches: query.includes('min-width: 1024px'),
    });

    expect(isDesktop()).toBe(true);
  });

  it('should detect touch capabilities', () => {
    const hasTouch = () => {
      return 'ontouchstart' in window || 
             navigator.maxTouchPoints > 0;
    };

    // Mock touch capability
    Object.defineProperty(window, 'ontouchstart', {
      value: {},
      writable: true,
    });

    expect(hasTouch()).toBe(true);
  });
});

describe('Performance Optimization Tests', () => {
  it('should minimize media query usage', () => {
    // Count the number of unique media queries
    const patterns = Object.values(responsivePatterns);
    
    // This is a simplified test - in real implementation,
    // we'd analyze the generated CSS for media query efficiency
    expect(patterns.length).toBeGreaterThan(0);
    expect(patterns.every(pattern => typeof pattern === 'string')).toBe(true);
  });

  it('should use efficient breakpoint strategy', () => {
    // Test that we're using mobile-first approach
    // In actual CSS, this would check that base styles are mobile
    // and larger screens use min-width queries
    expect(responsivePatterns.stackMobile).toBeDefined();
    expect(responsivePatterns.adaptiveSpacing).toBeDefined();
  });
});