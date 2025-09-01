/**
 * Core Utilities Tests
 * 
 * Tests essential keyboard navigation and utility functions
 */

import { describe, it, expect } from 'vitest';
import { isNavigationShortcut } from './utilities.js';

describe('Keyboard Navigation', () => {
  describe('isNavigationShortcut', () => {
    it('should detect Ctrl+Alt+[ as previous navigation', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'BracketLeft',
        ctrlKey: true,
        metaKey: false,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBe('prev');
    });

    it('should detect Cmd+Option+[ as previous navigation', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'BracketLeft',
        ctrlKey: false,
        metaKey: true,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBe('prev');
    });

    it('should detect Ctrl+Alt+] as next navigation', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'BracketRight',
        ctrlKey: true,
        metaKey: false,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBe('next');
    });

    it('should detect Cmd+Option+] as next navigation', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'BracketRight',
        ctrlKey: false,
        metaKey: true,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBe('next');
    });

    it('should detect Ctrl+Alt+Home as first navigation', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'Home',
        ctrlKey: true,
        metaKey: false,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBe('first');
    });

    it('should detect Ctrl+Alt+End as last navigation', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'End',
        ctrlKey: true,
        metaKey: false,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBe('last');
    });

    it('should return null for non-modified keys', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'BracketLeft',
        ctrlKey: false,
        metaKey: false,
        altKey: false
      });
      
      expect(isNavigationShortcut(event)).toBeNull();
    });
    
    it('should return null for missing alt key', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'BracketLeft',
        ctrlKey: true,
        metaKey: false,
        altKey: false
      });
      
      expect(isNavigationShortcut(event)).toBeNull();
    });

    it('should return null for unknown keys', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'KeyA',
        ctrlKey: true,
        metaKey: false,
        altKey: true
      });
      
      expect(isNavigationShortcut(event)).toBeNull();
    });

    it('should not detect old arrow key shortcuts', () => {
      const leftEvent = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        ctrlKey: true,
        metaKey: false
      });
      
      const rightEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        ctrlKey: true,
        metaKey: false
      });
      
      expect(isNavigationShortcut(leftEvent)).toBeNull();
      expect(isNavigationShortcut(rightEvent)).toBeNull();
    });
  });
});
