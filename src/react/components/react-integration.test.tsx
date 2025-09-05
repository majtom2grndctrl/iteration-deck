/**
 * Essential React Integration Tests
 * 
 * Tests only the specific integration bug we fixed:
 * Event property mapping (previousSlideId vs previousSlide)
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { IterationDeck, IterationDeckSlide } from './index';

describe('React Integration (Essential)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('iteration-deck-toolbar').forEach(el => el.remove());
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  describe('Event Property Mapping Bug', () => {
    it('should fire slide-change events with currentSlideId and previousSlideId (not previousSlide)', async () => {
      const slideChangeEvents: any[] = [];
      
      const { container } = render(
        <IterationDeck 
          id="event-test"
          onSlideChange={(event) => {
            slideChangeEvents.push(event.detail);
          }}
        >
          <IterationDeckSlide label="First">Content 1</IterationDeckSlide>
          <IterationDeckSlide label="Second">Content 2</IterationDeckSlide>
        </IterationDeck>
      );

      const deckElement = container.querySelector('iteration-deck') as any;
      
      // Simulate slide change event with correct property names
      const slideChangeEvent = new CustomEvent('slide-change', {
        detail: {
          deckId: 'event-test',
          previousSlideId: 'event-test-first',
          currentSlideId: 'event-test-second',
          slideIndex: 1
        }
      });

      deckElement?.dispatchEvent(slideChangeEvent);

      await waitFor(() => {
        expect(slideChangeEvents).toHaveLength(1);
      });

      const event = slideChangeEvents[0];
      
      // These are the correct property names that should exist
      expect(event.currentSlideId).toBe('event-test-second');
      expect(event.previousSlideId).toBe('event-test-first');
      
      // These incorrect names should NOT exist (they were causing the original bug)
      expect(event.activeSlide).toBeUndefined();
      expect(event.previousSlide).toBeUndefined();
    });
  });
});