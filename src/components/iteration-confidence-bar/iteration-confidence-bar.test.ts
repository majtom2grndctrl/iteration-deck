/**
 * @fileoverview Simple tests for IterationConfidenceBar component
 */

import { expect, test } from 'vitest';
import './iteration-confidence-bar';
import type { IterationConfidenceBar } from './iteration-confidence-bar';

function createTestElement(): IterationConfidenceBar {
  const element = document.createElement('iteration-confidence-bar') as IterationConfidenceBar;
  document.body.appendChild(element);
  return element;
}

test('IterationConfidenceBar - Component Creation', async () => {
  const element = createTestElement();
  
  // Component should be created successfully
  expect(element).toBeDefined();
  expect(element.tagName.toLowerCase()).toBe('iteration-confidence-bar');
  
  // Default properties
  expect(element.size).toBe('medium');
  expect(element.showInProduction).toBe(false);
  expect(element.confidence).toBeUndefined();
  
  // Cleanup
  document.body.removeChild(element);
});

test('IterationConfidenceBar - Confidence Property', async () => {
  const element = createTestElement();
  
  // Set valid confidence
  element.confidence = 0.75;
  await element.updateComplete;
  
  expect(element.confidence).toBe(0.75);
  
  // Cleanup
  document.body.removeChild(element);
});

test('IterationConfidenceBar - Size Variants', async () => {
  const element = createTestElement();
  
  // Test different sizes
  element.size = 'small';
  await element.updateComplete;
  expect(element.size).toBe('small');
  
  element.size = 'large';
  await element.updateComplete;
  expect(element.size).toBe('large');
  
  // Cleanup
  document.body.removeChild(element);
});

test('IterationConfidenceBar - Production Mode', async () => {
  const element = createTestElement();
  
  // Test production visibility
  element.showInProduction = true;
  await element.updateComplete;
  expect(element.showInProduction).toBe(true);
  
  // Cleanup
  document.body.removeChild(element);
});