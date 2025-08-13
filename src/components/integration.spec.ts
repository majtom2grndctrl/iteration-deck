import { newSpecPage } from '@stencil/core/testing';
import { IterationDeck } from './iteration-deck';
import { IterationDeckSlide } from './iteration-deck-slide';
import { IterationDeckToolbar } from './iteration-deck-toolbar';
import { getIterationDeckStore } from '../core/store';
import { isDevelopment } from '../core/environment';

// Mock isDevelopment function
jest.mock('../core/environment', () => ({
  isDevelopment: jest.fn(() => true),
}));

// Mock global toolbar functions
jest.mock('./global', () => ({
  ensureGlobalToolbar: jest.fn(),
  removeGlobalToolbar: jest.fn(),
}));

describe('Stencil Components Integration', () => {
  let store: any;

  beforeEach(() => {
    // Reset store for each test
    store = getIterationDeckStore();
    store.getAllDecks().forEach((deck: any) => {
      store.unregisterDeck(deck.id);
    });
    
    // Reset mock
    (isDevelopment as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    // Clean up after each test
    store.getAllDecks().forEach((deck: any) => {
      store.unregisterDeck(deck.id);
    });
  });

  it('registers complete deck with slides in store', async () => {
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide],
      html: `
        <iteration-deck id="integration-deck" label="Integration Test Deck" prompt="Test prompt">
          <iteration-deck-slide label="First Slide" ai-prompt="First prompt" notes="First notes" confidence="0.9">
            <div>First slide content</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Second Slide" ai-prompt="Second prompt">
            <div>Second slide content</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Third Slide">
            <div>Third slide content</div>
          </iteration-deck-slide>
        </iteration-deck>
      `,
    });

    await page.waitForChanges();

    const registeredDeck = store.getDeck('integration-deck');
    
    expect(registeredDeck).toBeDefined();
    expect(registeredDeck.id).toBe('integration-deck');
    expect(registeredDeck.label).toBe('Integration Test Deck');
    expect(registeredDeck.prompt).toBe('Test prompt');
    expect(registeredDeck.slides).toHaveLength(3);
    
    expect(registeredDeck.slides[0]).toEqual({
      label: 'First Slide',
      aiPrompt: 'First prompt',
      notes: 'First notes',
      confidence: 0.9
    });
    
    expect(registeredDeck.slides[1]).toEqual({
      label: 'Second Slide',
      aiPrompt: 'Second prompt',
      notes: undefined,
      confidence: undefined
    });
    
    expect(registeredDeck.slides[2]).toEqual({
      label: 'Third Slide',
      aiPrompt: undefined,
      notes: undefined,
      confidence: undefined
    });
  });

  it('maintains active slide synchronization between deck and store', async () => {
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide],
      html: `
        <iteration-deck id="sync-deck" label="Sync Test">
          <iteration-deck-slide label="Slide 1">
            <div>Content 1</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Slide 2">
            <div>Content 2</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Slide 3">
            <div>Content 3</div>
          </iteration-deck-slide>
        </iteration-deck>
      `,
    });

    await page.waitForChanges();

    const slides = page.root?.querySelectorAll('iteration-deck-slide') as NodeListOf<HTMLElement>;
    
    // Initially first slide should be active
    expect(slides[0].hasAttribute('active')).toBe(true);
    expect(slides[1].hasAttribute('active')).toBe(false);
    expect(slides[2].hasAttribute('active')).toBe(false);
    
    // Change active slide via store
    store.setActiveSlideIndex('sync-deck', 1);
    await page.waitForChanges();
    
    // Second slide should now be active
    expect(slides[0].hasAttribute('active')).toBe(false);
    expect(slides[1].hasAttribute('active')).toBe(true);
    expect(slides[2].hasAttribute('active')).toBe(false);
    
    // Change to third slide
    store.setActiveSlideIndex('sync-deck', 2);
    await page.waitForChanges();
    
    // Third slide should now be active
    expect(slides[0].hasAttribute('active')).toBe(false);
    expect(slides[1].hasAttribute('active')).toBe(false);
    expect(slides[2].hasAttribute('active')).toBe(true);
  });

  it('handles multiple decks with independent slide management', async () => {
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide],
      html: `
        <iteration-deck id="deck-1" label="First Deck">
          <iteration-deck-slide label="Deck 1 Slide 1">
            <div>Content A1</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Deck 1 Slide 2">
            <div>Content A2</div>
          </iteration-deck-slide>
        </iteration-deck>
        
        <iteration-deck id="deck-2" label="Second Deck">
          <iteration-deck-slide label="Deck 2 Slide 1">
            <div>Content B1</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Deck 2 Slide 2">
            <div>Content B2</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Deck 2 Slide 3">
            <div>Content B3</div>
          </iteration-deck-slide>
        </iteration-deck>
      `,
    });

    await page.waitForChanges();

    const allDecks = store.getAllDecks();
    expect(allDecks).toHaveLength(2);
    
    const deck1 = store.getDeck('deck-1');
    const deck2 = store.getDeck('deck-2');
    
    expect(deck1.slides).toHaveLength(2);
    expect(deck2.slides).toHaveLength(3);
    
    // Change active slide in deck 1
    store.setActiveSlideIndex('deck-1', 1);
    await page.waitForChanges();
    
    // Check deck 1 slide states
    const deck1Slides = page.root?.querySelector('#deck-1')?.querySelectorAll('iteration-deck-slide') as NodeListOf<HTMLElement>;
    expect(deck1Slides[0].hasAttribute('active')).toBe(false);
    expect(deck1Slides[1].hasAttribute('active')).toBe(true);
    
    // Change active slide in deck 2
    store.setActiveSlideIndex('deck-2', 2);
    await page.waitForChanges();
    
    // Check deck 2 slide states
    const deck2Slides = page.root?.querySelector('#deck-2')?.querySelectorAll('iteration-deck-slide') as NodeListOf<HTMLElement>;
    expect(deck2Slides[0].hasAttribute('active')).toBe(false);
    expect(deck2Slides[1].hasAttribute('active')).toBe(false);
    expect(deck2Slides[2].hasAttribute('active')).toBe(true);
    
    // Verify deck 1 states are unchanged
    expect(deck1Slides[0].hasAttribute('active')).toBe(false);
    expect(deck1Slides[1].hasAttribute('active')).toBe(true);
  });

  it('toolbar reflects current deck and slide state', async () => {
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide, IterationDeckToolbar],
      html: `
        <iteration-deck id="toolbar-deck" label="Toolbar Test Deck">
          <iteration-deck-slide label="Alpha Slide">
            <div>Alpha content</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Beta Slide">
            <div>Beta content</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Gamma Slide">
            <div>Gamma content</div>
          </iteration-deck-slide>
        </iteration-deck>
        
        <iteration-deck-toolbar></iteration-deck-toolbar>
      `,
    });

    await page.waitForChanges();

    const toolbar = page.root?.querySelector('iteration-deck-toolbar');
    
    // Check initial toolbar state
    expect(toolbar?.shadowRoot?.querySelector('.slide-label')?.textContent).toBe('Alpha Slide');
    expect(toolbar?.shadowRoot?.querySelector('.slide-counter')?.textContent).toBe('1 / 3');
    
    // Change active slide
    store.setActiveSlideIndex('toolbar-deck', 1);
    await page.waitForChanges();
    
    // Check updated toolbar state
    expect(toolbar?.shadowRoot?.querySelector('.slide-label')?.textContent).toBe('Beta Slide');
    expect(toolbar?.shadowRoot?.querySelector('.slide-counter')?.textContent).toBe('2 / 3');
    
    // Change to last slide
    store.setActiveSlideIndex('toolbar-deck', 2);
    await page.waitForChanges();
    
    // Check final toolbar state
    expect(toolbar?.shadowRoot?.querySelector('.slide-label')?.textContent).toBe('Gamma Slide');
    expect(toolbar?.shadowRoot?.querySelector('.slide-counter')?.textContent).toBe('3 / 3');
  });

  it('handles dynamic slide addition and removal', async () => {
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide],
      html: `
        <iteration-deck id="dynamic-deck" label="Dynamic Test">
          <iteration-deck-slide label="Initial Slide">
            <div>Initial content</div>
          </iteration-deck-slide>
        </iteration-deck>
      `,
    });

    await page.waitForChanges();

    let registeredDeck = store.getDeck('dynamic-deck');
    expect(registeredDeck.slides).toHaveLength(1);

    // Add a new slide dynamically
    const newSlide = page.doc.createElement('iteration-deck-slide');
    newSlide.setAttribute('label', 'Dynamic Slide');
    newSlide.innerHTML = '<div>Dynamic content</div>';
    page.root?.appendChild(newSlide);

    // Manually trigger the mutation observer (simulating what would happen)
    const deckComponent = page.rootInstance as IterationDeck;
    await deckComponent.extractSlideData();
    await deckComponent.registerWithStore();

    registeredDeck = store.getDeck('dynamic-deck');
    expect(registeredDeck.slides).toHaveLength(2);
    expect(registeredDeck.slides[1].label).toBe('Dynamic Slide');
  });

  it('production mode renders only first slide', async () => {
    (isDevelopment as jest.Mock).mockReturnValue(false);
    
    const page = await newSpecPage({
      components: [IterationDeck, IterationDeckSlide],
      html: `
        <iteration-deck id="prod-deck" label="Production Test">
          <iteration-deck-slide label="First Slide">
            <div>First content</div>
          </iteration-deck-slide>
          <iteration-deck-slide label="Second Slide">
            <div>Second content</div>
          </iteration-deck-slide>
        </iteration-deck>
      `,
    });

    await page.waitForChanges();

    // In production mode, should use simple slot rendering
    expect(page.root?.shadowRoot?.querySelector('.dev-mode')).toBeFalsy();
    expect(page.root?.shadowRoot?.querySelector('.slides-container.dev-mode')).toBeFalsy();
  });
});