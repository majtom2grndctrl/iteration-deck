/**
 * Simple IterationDeckToolbar Component Tests
 * 
 * Basic test suite that doesn't rely on complex mocking
 */

import { describe, it, expect, afterEach } from 'vitest';
import { LitElement } from 'lit';
import { IterationDeckToolbar, getToolbarInstance } from './iteration-deck-toolbar.js';

// Import the component to register it
import './iteration-deck-toolbar.js';

describe('IterationDeckToolbar Basic Tests', () => {
  let toolbar: IterationDeckToolbar;
  
  afterEach(async () => {
    if (toolbar && toolbar.parentNode) {
      toolbar.parentNode.removeChild(toolbar);
    }
    document.querySelectorAll('iteration-deck-toolbar').forEach(el => el.remove());
    document.body.innerHTML = '';
  });

  describe('Basic Functionality', () => {
    it('should create element', () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      expect(toolbar).toBeInstanceOf(IterationDeckToolbar);
      expect(toolbar).toBeInstanceOf(LitElement);
    });

    it('should render without errors', async () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      await toolbar.updateComplete;
      
      expect(toolbar.shadowRoot).toBeTruthy();
    });

    it('should support custom element registration', () => {
      const element = document.createElement('iteration-deck-toolbar');
      expect(element.constructor.name).toBe('IterationDeckToolbar');
    });
  });

  describe('Singleton Pattern', () => {
    it('should track singleton instance', () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      expect(getToolbarInstance()).toBe(toolbar);
    });

    it('should clear singleton reference on disconnect', async () => {
      toolbar = document.createElement('iteration-deck-toolbar') as IterationDeckToolbar;
      document.body.appendChild(toolbar);
      
      expect(getToolbarInstance()).toBe(toolbar);
      
      toolbar.remove();
      await new Promise(resolve => setTimeout(resolve, 0)); // Allow disconnectedCallback to run
      
      expect(getToolbarInstance()).toBeNull();
    });
  });

  describe('Utility Functions', () => {
    it('should export utility functions', () => {
      expect(typeof getToolbarInstance).toBe('function');
    });
  });
});