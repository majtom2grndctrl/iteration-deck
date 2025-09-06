/**
 * Vitest setup file for Lit component testing
 * 
 * This file configures the testing environment for Lit web components
 * with proper JSDOM setup, custom element registry, and test utilities.
 */

import { expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Custom DOM matchers are now available via @testing-library/jest-dom

// Global test setup
beforeEach(() => {
  // Clear the custom element registry between tests to avoid conflicts
  // Note: Custom element registry cannot be fully reset, so we need to work around this
  
  // Mock console methods that might be noisy during testing
  vi.spyOn(console, 'debug').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {}); // Suppress debug/validation logs during testing
  
  // Reset document body
  document.body.innerHTML = '';
  
  // Clear any existing iteration-deck-toolbar instances
  document.querySelectorAll('iteration-deck-toolbar').forEach(el => el.remove());
});

afterEach(() => {
  // Clean up any remaining elements
  document.body.innerHTML = '';
  
  // Remove any global event listeners that might have been added
  document.removeEventListener('keydown', () => {});
  
  // Restore console methods
  vi.restoreAllMocks();
});

// Global test utilities
declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveAttribute(name: string, value?: string): T;
      toHaveClass(className: string): T;
    }
  }
}

// Add custom element polyfill support for testing
if (!globalThis.customElements) {
  globalThis.customElements = window.customElements;
}

// Polyfill for ResizeObserver in tests
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Polyfill for MutationObserver in tests (should be available in happy-dom)
if (!globalThis.MutationObserver) {
  globalThis.MutationObserver = class MutationObserver {
    constructor(_callback: MutationCallback) {}
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}

// Export test utilities for use in test files
export { expect, beforeEach, afterEach, vi };