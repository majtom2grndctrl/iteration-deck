/**
 * Test setup specifically for React components
 * Ensures proper DOM and event system initialization
 */

import '@testing-library/jest-dom';
import { beforeEach, afterEach, vi } from 'vitest';

// Configure React Testing Library
import { configure } from '@testing-library/react';
configure({ testIdAttribute: 'data-testid' });

beforeEach(() => {
  // Ensure window.event is properly initialized for React DOM
  if (typeof window !== 'undefined') {
    // Initialize the global event reference that React DOM may access
    (window as any).event = null;
  }
  
  // Reset document state
  document.body.innerHTML = '';
  
  // Mock noisy console methods
  vi.spyOn(console, 'debug').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

// Ensure proper global environment for React DOM
// Note: window.event is already declared in DOM typings, no need to redeclare

export {};