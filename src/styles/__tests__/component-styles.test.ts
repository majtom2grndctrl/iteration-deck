/**
 * Tests for component-specific vanilla-extract styles
 * Validates styling consistency and responsive behavior
 */
import { describe, it, expect } from '@jest/globals';
import * as iterationDeckStyles from '../../../components/iteration-deck.css';
import * as iterationDeckSlideStyles from '../../../components/iteration-deck-slide.css';
import * as iterationDeckToolbarStyles from '../../../components/iteration-deck-toolbar.css';
import { responsivePatterns } from '../responsive-patterns.css';

describe('IterationDeck Component Styles', () => {
  it('should export required style classes', () => {
    expect(iterationDeckStyles.host).toBeDefined();
    expect(iterationDeckStyles.iterationDeck).toBeDefined();
    expect(iterationDeckStyles.slide).toBeDefined();
    expect(iterationDeckStyles.slideActive).toBeDefined();
    expect(iterationDeckStyles.slidesContainer).toBeDefined();
    expect(iterationDeckStyles.slidesContainerDevMode).toBeDefined();
  });

  it('should have valid CSS class names', () => {
    const styleClasses = Object.values(iterationDeckStyles);
    
    styleClasses.forEach(styleClass => {
      if (typeof styleClass === 'string') {
        expect(styleClass).toMatch(/^[a-zA-Z_][a-zA-Z0-9_-]*$/);
        expect(styleClass.length).toBeGreaterThan(0);
      }
    });
  });

  it('should have performance optimizations', () => {
    expect(iterationDeckStyles.performanceOptimized).toBeDefined();
    expect(typeof iterationDeckStyles.performanceOptimized).toBe('string');
  });

  it('should have theme-aware styles', () => {
    expect(iterationDeckStyles.themeAware).toBeDefined();
    expect(typeof iterationDeckStyles.themeAware).toBe('string');
  });

  it('should have accessibility enhancements', () => {
    expect(iterationDeckStyles.accessibilityEnhanced).toBeDefined();
    expect(typeof iterationDeckStyles.accessibilityEnhanced).toBe('string');
  });

  it('should have responsive container styles', () => {
    expect(iterationDeckStyles.responsiveContainer).toBeDefined();
    expect(typeof iterationDeckStyles.responsiveContainer).toBe('string');
  });
});

describe('IterationDeckSlide Component Styles', () => {
  it('should export required style classes', () => {
    expect(iterationDeckSlideStyles.host).toBeDefined();
    expect(iterationDeckSlideStyles.hostActive).toBeDefined();
    expect(iterationDeckSlideStyles.hostHidden).toBeDefined();
    expect(iterationDeckSlideStyles.slideContent).toBeDefined();
    expect(iterationDeckSlideStyles.slideContentDevMode).toBeDefined();
  });

  it('should have animation states', () => {
    expect(iterationDeckSlideStyles.slideEnter).toBeDefined();
    expect(iterationDeckSlideStyles.slideEnterActive).toBeDefined();
    expect(iterationDeckSlideStyles.slideExit).toBeDefined();
    expect(iterationDeckSlideStyles.slideExitActive).toBeDefined();
  });

  it('should have content layout patterns', () => {
    expect(iterationDeckSlideStyles.contentLayout).toBeDefined();
    expect(iterationDeckSlideStyles.contentLayout.flexible).toBeDefined();
    expect(iterationDeckSlideStyles.contentLayout.aspectRatio).toBeDefined();
    expect(iterationDeckSlideStyles.contentLayout.fullHeight).toBeDefined();
  });

  it('should have mobile optimizations', () => {
    expect(iterationDeckSlideStyles.mobileOptimized).toBeDefined();
    expect(typeof iterationDeckSlideStyles.mobileOptimized).toBe('string');
  });

  it('should have development mode indicators', () => {
    expect(iterationDeckSlideStyles.devModeIndicator).toBeDefined();
    expect(typeof iterationDeckSlideStyles.devModeIndicator).toBe('string');
  });
});

describe('IterationDeckToolbar Component Styles', () => {
  it('should export required style classes', () => {
    expect(iterationDeckToolbarStyles.host).toBeDefined();
    expect(iterationDeckToolbarStyles.hostHidden).toBeDefined();
    expect(iterationDeckToolbarStyles.toolbar).toBeDefined();
    expect(iterationDeckToolbarStyles.deckSelector).toBeDefined();
    expect(iterationDeckToolbarStyles.navButton).toBeDefined();
    expect(iterationDeckToolbarStyles.slideInfo).toBeDefined();
  });

  it('should have navigation elements', () => {
    expect(iterationDeckToolbarStyles.navButtonIcon).toBeDefined();
    expect(iterationDeckToolbarStyles.slideLabel).toBeDefined();
    expect(iterationDeckToolbarStyles.slideCounter).toBeDefined();
    expect(iterationDeckToolbarStyles.divider).toBeDefined();
  });

  it('should have responsive layout variations', () => {
    expect(iterationDeckToolbarStyles.responsiveLayout).toBeDefined();
    expect(iterationDeckToolbarStyles.responsiveLayout.compact).toBeDefined();
    expect(iterationDeckToolbarStyles.responsiveLayout.standard).toBeDefined();
    expect(iterationDeckToolbarStyles.responsiveLayout.spacious).toBeDefined();
  });

  it('should have animation states', () => {
    expect(iterationDeckToolbarStyles.animationStates).toBeDefined();
    expect(iterationDeckToolbarStyles.animationStates.fadeIn).toBeDefined();
    expect(iterationDeckToolbarStyles.animationStates.fadeOut).toBeDefined();
    expect(iterationDeckToolbarStyles.animationStates.slideIn).toBeDefined();
  });

  it('should have accessibility enhancements', () => {
    expect(iterationDeckToolbarStyles.accessibilityEnhanced).toBeDefined();
    expect(typeof iterationDeckToolbarStyles.accessibilityEnhanced).toBe('string');
  });

  it('should have performance optimizations', () => {
    expect(iterationDeckToolbarStyles.performanceOptimized).toBeDefined();
    expect(typeof iterationDeckToolbarStyles.performanceOptimized).toBe('string');
  });
});

describe('Responsive Patterns', () => {
  it('should export required responsive patterns', () => {
    expect(responsivePatterns.hideMobile).toBeDefined();
    expect(responsivePatterns.hideDesktop).toBeDefined();
    expect(responsivePatterns.stackMobile).toBeDefined();
    expect(responsivePatterns.containerSm).toBeDefined();
    expect(responsivePatterns.containerMd).toBeDefined();
    expect(responsivePatterns.containerLg).toBeDefined();
  });

  it('should have iteration deck specific patterns', () => {
    expect(responsivePatterns.toolbarResponsive).toBeDefined();
    expect(responsivePatterns.touchTarget).toBeDefined();
    expect(responsivePatterns.adaptiveSpacing).toBeDefined();
    expect(responsivePatterns.responsiveText).toBeDefined();
  });

  it('should have accessibility patterns', () => {
    expect(responsivePatterns.respectMotionPreferences).toBeDefined();
    expect(responsivePatterns.highContrastSupport).toBeDefined();
  });

  it('should generate valid CSS classes', () => {
    const patterns = Object.values(responsivePatterns);
    
    patterns.forEach(pattern => {
      expect(typeof pattern).toBe('string');
      expect(pattern).toMatch(/^[a-zA-Z_][a-zA-Z0-9_-]*$/);
      expect(pattern.length).toBeGreaterThan(0);
    });
  });
});

describe('Style Consistency', () => {
  it('should use consistent naming patterns', () => {
    const allStyles = [
      ...Object.keys(iterationDeckStyles),
      ...Object.keys(iterationDeckSlideStyles),
      ...Object.keys(iterationDeckToolbarStyles),
    ];

    // Check for consistent camelCase naming
    allStyles.forEach(styleName => {
      expect(styleName).toMatch(/^[a-z][a-zA-Z0-9]*$/);
    });
  });

  it('should have consistent theme-aware patterns', () => {
    // Check that all components have theme-aware styles
    expect(iterationDeckStyles.themeAware).toBeDefined();
    expect(iterationDeckSlideStyles.themeAware).toBeDefined();
  });

  it('should have consistent performance patterns', () => {
    // Check that performance optimizations are consistent
    expect(iterationDeckStyles.performanceOptimized).toBeDefined();
    expect(iterationDeckSlideStyles.performanceOptimized).toBeDefined();
    expect(iterationDeckToolbarStyles.performanceOptimized).toBeDefined();
  });

  it('should have consistent accessibility patterns', () => {
    // Check that accessibility enhancements are consistent
    expect(iterationDeckStyles.accessibilityEnhanced).toBeDefined();
    expect(iterationDeckSlideStyles.accessibilityEnhanced).toBeDefined();
    expect(iterationDeckToolbarStyles.accessibilityEnhanced).toBeDefined();
  });
});

describe('CSS Class Name Uniqueness', () => {
  it('should generate unique class names across components', () => {
    const allClassNames = [
      ...Object.values(iterationDeckStyles).filter(v => typeof v === 'string'),
      ...Object.values(iterationDeckSlideStyles).filter(v => typeof v === 'string'),
      ...Object.values(iterationDeckToolbarStyles).filter(v => typeof v === 'string'),
    ] as string[];

    // Check for uniqueness
    const uniqueClassNames = new Set(allClassNames);
    expect(uniqueClassNames.size).toBe(allClassNames.length);
  });

  it('should not have conflicting class names', () => {
    const deckClasses = Object.values(iterationDeckStyles).filter(v => typeof v === 'string');
    const slideClasses = Object.values(iterationDeckSlideStyles).filter(v => typeof v === 'string');
    const toolbarClasses = Object.values(iterationDeckToolbarStyles).filter(v => typeof v === 'string');

    // No intersection between component styles
    const deckSet = new Set(deckClasses);
    const slideSet = new Set(slideClasses);
    const toolbarSet = new Set(toolbarClasses);

    expect([...deckSet].filter(c => slideSet.has(c))).toHaveLength(0);
    expect([...deckSet].filter(c => toolbarSet.has(c))).toHaveLength(0);
    expect([...slideSet].filter(c => toolbarSet.has(c))).toHaveLength(0);
  });
});