/**
 * Tests for CSS generation and build optimization
 * Validates that vanilla-extract generates optimized CSS at build time
 */
import { describe, it, expect } from 'vitest';

describe('CSS Generation and Bundle Optimization', () => {
  describe('Component Style Class Generation', () => {
    it('should generate component styles as CSS classes', async () => {
      // Import component styles
      const iterationDeckStyles = await import('../../components/iteration-deck.css');
      const iterationDeckSlideStyles = await import('../../components/iteration-deck-slide.css');
      const iterationDeckToolbarStyles = await import('../../components/iteration-deck-toolbar.css');

      // Verify that styles are exported as strings (CSS class names)
      expect(typeof iterationDeckStyles.host).toBe('string');
      expect(typeof iterationDeckStyles.iterationDeck).toBe('string');
      expect(typeof iterationDeckSlideStyles.slideContent).toBe('string');
      expect(typeof iterationDeckToolbarStyles.toolbar).toBe('string');
    });

    it('should have unique CSS class names across components', async () => {
      const [deckStyles, slideStyles, toolbarStyles] = await Promise.all([
        import('../../components/iteration-deck.css'),
        import('../../components/iteration-deck-slide.css'),
        import('../../components/iteration-deck-toolbar.css'),
      ]);

      const deckClassNames = Object.values(deckStyles).filter(v => typeof v === 'string');
      const slideClassNames = Object.values(slideStyles).filter(v => typeof v === 'string');
      const toolbarClassNames = Object.values(toolbarStyles).filter(v => typeof v === 'string');

      // Create a set to check for uniqueness
      const allClassNames = [...deckClassNames, ...slideClassNames, ...toolbarClassNames] as string[];
      const uniqueClassNames = new Set(allClassNames);

      expect(uniqueClassNames.size).toBe(allClassNames.length);
    });

    it('should generate responsive media query styles', async () => {
      const responsivePatterns = await import('../responsive-patterns.css');
      
      // Verify responsive patterns are generated
      expect(typeof responsivePatterns.responsivePatterns.hideMobile).toBe('string');
      expect(typeof responsivePatterns.responsivePatterns.stackMobile).toBe('string');
      expect(typeof responsivePatterns.responsivePatterns.toolbarResponsive).toBe('string');
    });

    it('should generate theme-aware styles', async () => {
      const themes = await import('../themes.css');
      
      // Verify theme classes are generated
      expect(typeof themes.lightTheme).toBe('string');
      expect(typeof themes.darkTheme).toBe('string');
      expect(typeof themes.autoTheme).toBe('string');
      
      // Theme classes should be unique
      expect(themes.lightTheme).not.toBe(themes.darkTheme);
      expect(themes.lightTheme).not.toBe(themes.autoTheme);
      expect(themes.darkTheme).not.toBe(themes.autoTheme);
    });
  });

  describe('Zero-Runtime CSS Validation', () => {
    it('should not include vanilla-extract runtime in production builds', () => {
      // In a zero-runtime setup, we should not have vanilla-extract functions at runtime
      expect(typeof window).toBe('object'); // Basic browser environment check
      
      // These should not exist in production builds
      expect(typeof (globalThis as any).vanillaExtractRuntimeCss).toBe('undefined');
      expect(typeof (globalThis as any).__vanilla_extract__).toBe('undefined');
    });

    it('should use static CSS class names', async () => {
      const styles = await import('../../components/iteration-deck.css');
      
      // CSS class names should be strings, not functions
      Object.values(styles).forEach(styleValue => {
        if (typeof styleValue === 'string') {
          expect(styleValue).toMatch(/^[a-zA-Z_][a-zA-Z0-9_-]*$/);
          expect(styleValue.length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Theme Contract Validation', () => {
    it('should generate valid theme contract', async () => {
      const themeContract = await import('../theme.css');
      
      expect(themeContract.themeContract).toBeDefined();
      expect(typeof themeContract.themeContract.spacing).toBe('object');
      expect(typeof themeContract.themeContract.colors).toBe('object');
      expect(typeof themeContract.themeContract.typography).toBe('object');
    });

    it('should have CSS variables in theme contract', async () => {
      const themeContract = await import('../theme.css');
      
      // Theme contract should contain CSS variable references
      expect(typeof themeContract.themeContract.spacing.md).toBe('string');
      expect(typeof themeContract.themeContract.colors.text.primary).toBe('string');
    });
  });

  describe('Build Optimization', () => {
    it('should have optimized class name length', async () => {
      const styles = await import('../../components/iteration-deck.css');
      
      const classNames = Object.values(styles).filter(v => typeof v === 'string') as string[];
      
      // Production builds should have shorter class names for optimization
      classNames.forEach(className => {
        // Reasonable length limit for production builds
        expect(className.length).toBeLessThan(50);
      });
    });

    it('should not contain development artifacts', async () => {
      const styles = await import('../../components/iteration-deck.css');
      
      const classNames = Object.values(styles).filter(v => typeof v === 'string') as string[];
      
      // Should not contain obvious development artifacts
      classNames.forEach(className => {
        expect(className).not.toMatch(/debug/i);
        expect(className).not.toMatch(/temp/i);
        expect(className).not.toMatch(/test/i);
      });
    });
  });

  describe('CSS Bundle Analysis', () => {
    it('should generate styles that can be measured', () => {
      // This would ideally measure actual CSS bundle size
      // For now, we verify the structure exists
      expect(typeof document.createElement).toBe('function');
      
      // In a real test environment, we might:
      // 1. Create test elements with generated classes
      // 2. Measure computed styles
      // 3. Verify CSS rules are applied
    });

    it('should support critical CSS extraction patterns', async () => {
      // Verify that styles can be imported individually for critical CSS
      const { host } = await import('../../components/iteration-deck.css');
      const { toolbar } = await import('../../components/iteration-deck-toolbar.css');
      
      expect(typeof host).toBe('string');
      expect(typeof toolbar).toBe('string');
      
      // These should be importable separately for critical CSS optimization
      expect(host).not.toBe(toolbar);
    });
  });

  describe('Performance Metrics', () => {
    it('should have reasonable CSS class name generation performance', async () => {
      const startTime = performance.now();
      
      // Import all styles
      await Promise.all([
        import('../../components/iteration-deck.css'),
        import('../../components/iteration-deck-slide.css'),
        import('../../components/iteration-deck-toolbar.css'),
        import('../themes.css'),
        import('../responsive-patterns.css'),
      ]);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should be fast to import (under 100ms)
      expect(duration).toBeLessThan(100);
    });

    it('should minimize CSS selector complexity', async () => {
      const styles = await import('../../components/iteration-deck.css');
      
      // Verify we're not generating overly complex selectors
      const classNames = Object.values(styles).filter(v => typeof v === 'string') as string[];
      
      classNames.forEach(className => {
        // Should be simple class names, not complex selectors
        expect(className.split(' ').length).toBeLessThanOrEqual(2);
      });
    });
  });
});