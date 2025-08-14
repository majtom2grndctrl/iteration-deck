/**
 * Integration Examples for the Zustand Store
 * 
 * This file shows how both React and Lit components can use the iteration store
 * following the patterns specified in TECHNICAL_SPEC.md
 */

import { iterationStore, useIterationStore } from './iteration-store';

// ===== React Component Usage Example =====

/**
 * Example React component using the Zustand store
 * Uses the useIterationStore hook for reactive updates
 */
/*
import React from 'react';

function ReactIterationDeck({ id, children }: { id: string; children: React.ReactNode }) {
  // Get state from store with automatic re-renders
  const { activeDecks, setActiveSlide, isProduction } = useIterationStore();
  const activeSlide = activeDecks[id];

  // In production, render only the first child
  if (isProduction) {
    return React.Children.toArray(children)[0] as React.ReactElement;
  }

  // In development, render with controls
  const handleSlideChange = (slideId: string) => {
    setActiveSlide(id, slideId);
  };

  return (
    <div>
      {children}
      <div>Active: {activeSlide || 'none'}</div>
      <button onClick={() => handleSlideChange('slide1')}>
        Slide 1
      </button>
    </div>
  );
}
*/

// ===== Lit Component Usage Example =====

/**
 * Example Lit component using the Zustand store
 * Uses store.subscribe() for reactive updates
 */
/*
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('lit-iteration-deck')
export class LitIterationDeck extends LitElement {
  @property() id!: string;
  @state() private activeSlide = '';
  private unsubscribe?: () => void;

  connectedCallback() {
    super.connectedCallback();
    
    // Subscribe to store changes
    this.unsubscribe = iterationStore.subscribe((state) => {
      this.activeSlide = state.activeDecks[this.id] || '';
    });
    
    // Get initial state
    this.activeSlide = iterationStore.getActiveSlide(this.id) || '';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  private handleSlideChange(slideId: string) {
    iterationStore.setActiveSlide(this.id, slideId);
  }

  render() {
    // In production, render only first slot content
    if (iterationStore.isProduction) {
      return html`<slot></slot>`;
    }

    // In development, render with controls
    return html`
      <div>
        <slot></slot>
        <div>Active: ${this.activeSlide || 'none'}</div>
        <button @click=${() => this.handleSlideChange('slide1')}>
          Slide 1
        </button>
      </div>
    `;
  }
}
*/

// ===== Utility Functions for Integration =====

/**
 * Helper function to initialize a deck with its first slide active
 * Useful for component setup
 */
export function initializeDeck(deckId: string, firstSlideId: string) {
  const currentActive = iterationStore.getActiveSlide(deckId);
  if (!currentActive) {
    iterationStore.setActiveSlide(deckId, firstSlideId);
  }
}

/**
 * Helper function to get all decks that are currently active
 * Useful for toolbar and debugging
 */
export function getActiveDecksList(): Array<{ deckId: string; slideId: string }> {
  const activeDecks = iterationStore.activeDecks;
  return Object.entries(activeDecks).map(([deckId, slideId]) => ({
    deckId,
    slideId,
  }));
}

/**
 * Helper function to check if any decks are registered
 * Useful for conditional toolbar rendering
 */
export function hasActiveDecks(): boolean {
  return Object.keys(iterationStore.activeDecks).length > 0;
}

export {};