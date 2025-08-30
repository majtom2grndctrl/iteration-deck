/**
 * IterationDeckSlide Component Tests
 * 
 * Test suite for the IterationDeckSlide Lit component
 */

import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { LitElement } from 'lit';
import { IterationDeckSlide } from './iteration-deck-slide.js';

// Import the component to register it
import './iteration-deck-slide.js';

describe('IterationDeckSlide Component Tests', () => {
  let slide: IterationDeckSlide;
  
  afterEach(async () => {
    if (slide && slide.parentNode) {
      slide.parentNode.removeChild(slide);
    }
    document.body.innerHTML = '';
  });

  describe('Basic Functionality', () => {
    it('should create element', () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      expect(slide).toBeInstanceOf(IterationDeckSlide);
      expect(slide).toBeInstanceOf(LitElement);
    });

    it('should have required properties', () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'Test Slide';
      slide.aiPrompt = 'Test AI prompt';
      slide.notes = 'Test notes';
      slide.confidence = 0.85;
      
      expect(slide.label).toBe('Test Slide');
      expect(slide.aiPrompt).toBe('Test AI prompt');
      expect(slide.notes).toBe('Test notes');
      expect(slide.confidence).toBe(0.85);
    });

    it('should render without errors', async () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'Test Slide';
      document.body.appendChild(slide);
      
      await slide.updateComplete;
      
      expect(slide.shadowRoot).toBeTruthy();
    });

    it('should support custom element registration', () => {
      const element = document.createElement('iteration-deck-slide');
      expect(element.constructor.name).toBe('IterationDeckSlide');
    });

    it('should render slot content', async () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'Content Test';
      slide.innerHTML = '<div id="test-content">Test Content</div>';
      document.body.appendChild(slide);
      
      await slide.updateComplete;
      
      const slotContent = slide.querySelector('#test-content');
      expect(slotContent).toBeTruthy();
      expect(slotContent?.textContent).toBe('Test Content');
    });
  });

  describe('Properties', () => {
    beforeEach(() => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      document.body.appendChild(slide);
    });

    it('should handle label property', async () => {
      slide.label = 'Dynamic Label';
      await slide.updateComplete;
      
      expect(slide.label).toBe('Dynamic Label');
      expect(slide.getAttribute('label')).toBe('Dynamic Label');
    });

    it('should handle confidence property with validation', async () => {
      // Valid confidence
      slide.label = 'Valid Confidence';
      slide.confidence = 0.75;
      await slide.updateComplete;
      
      expect(slide.confidence).toBe(0.75);
    });

    it('should handle slideId property', async () => {
      slide.label = 'ID Test';
      slide.slideId = 'custom-slide-id';
      await slide.updateComplete;
      
      expect(slide.slideId).toBe('custom-slide-id');
    });
  });

  describe('Public API', () => {
    beforeEach(async () => {
      slide = document.createElement('iteration-deck-slide') as IterationDeckSlide;
      slide.label = 'API Test';
      slide.confidence = 0.9;
      document.body.appendChild(slide);
      await slide.updateComplete;
    });

    it('should provide getSlideData method', () => {
      const slideData = slide.getSlideData();
      
      expect(slideData).toBeDefined();
      expect(slideData.label).toBe('API Test');
      expect(slideData.confidence).toBe(0.9);
      expect(typeof slideData.isActive).toBe('boolean');
    });

    it('should provide isActiveSlide method', () => {
      const isActive = slide.isActiveSlide();
      
      expect(typeof isActive).toBe('boolean');
    });

    it('should provide activate method', () => {
      expect(typeof slide.activate).toBe('function');
      
      // Should not throw when called
      expect(() => slide.activate()).not.toThrow();
    });
  });
});