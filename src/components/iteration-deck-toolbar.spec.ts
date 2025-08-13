import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckToolbar } from './iteration-deck-toolbar';
import { getIterationDeckStore } from '../core/store';
import { isDevelopment } from '../core/environment';

// Mock isDevelopment function
jest.mock('../core/environment', () => ({
  isDevelopment: jest.fn(() => true),
}));

describe('iteration-deck-toolbar', () => {
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

  it('renders hidden when no decks exist', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    
    // Should render but be hidden when no decks exist
    expect(page.root).toEqualHtml(`
      <iteration-deck-toolbar style="display: none;">
        <mock:shadow-root></mock:shadow-root>
      </iteration-deck-toolbar>
    `);
  });

  it('renders toolbar when deck exists', async () => {
    // Register a deck
    store.registerDeck({
      id: 'test-deck',
      label: 'Test Deck',
      slides: [
        { label: 'Slide 1' },
        { label: 'Slide 2' }
      ],
      activeSlideIndex: 0
    });

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    await page.waitForChanges();

    expect(page.root?.shadowRoot?.querySelector('.toolbar')).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('.slide-label')?.textContent).toBe('Slide 1');
    expect(page.root?.shadowRoot?.querySelector('.slide-counter')?.textContent).toBe('1 / 2');
  });

  it('shows deck selector when multiple decks exist', async () => {
    // Register multiple decks
    store.registerDeck({
      id: 'deck-1',
      label: 'Deck 1',
      slides: [{ label: 'Slide 1' }],
      activeSlideIndex: 0
    });
    
    store.registerDeck({
      id: 'deck-2',
      label: 'Deck 2',
      slides: [{ label: 'Slide A' }],
      activeSlideIndex: 0
    });

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    await page.waitForChanges();

    const selector = page.root?.shadowRoot?.querySelector('.deck-selector') as HTMLSelectElement;
    expect(selector).toBeTruthy();
    expect(selector.options.length).toBe(2);
    expect(selector.options[0].textContent).toBe('Deck 1');
    expect(selector.options[1].textContent).toBe('Deck 2');
  });

  it('hides deck selector when only one deck exists', async () => {
    // Register only one deck
    store.registerDeck({
      id: 'test-deck',
      label: 'Test Deck',
      slides: [{ label: 'Slide 1' }],
      activeSlideIndex: 0
    });

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    await page.waitForChanges();

    const selector = page.root?.shadowRoot?.querySelector('.deck-selector');
    expect(selector).toBeFalsy();
  });

  it('handles navigation buttons correctly', async () => {
    const mockPreviousSlide = jest.spyOn(store, 'previousSlide');
    const mockNextSlide = jest.spyOn(store, 'nextSlide');

    // Register a deck with multiple slides
    store.registerDeck({
      id: 'test-deck',
      label: 'Test Deck',
      slides: [
        { label: 'Slide 1' },
        { label: 'Slide 2' },
        { label: 'Slide 3' }
      ],
      activeSlideIndex: 1
    });

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    await page.waitForChanges();

    const buttons = page.root?.shadowRoot?.querySelectorAll('.nav-button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBe(2);
    expect(buttons[0].disabled).toBe(false); // Previous button should be enabled
    expect(buttons[1].disabled).toBe(false); // Next button should be enabled

    // Click previous button
    buttons[0].click();
    await page.waitForChanges();
    expect(mockPreviousSlide).toHaveBeenCalled();

    // Click next button
    buttons[1].click();
    await page.waitForChanges();
    expect(mockNextSlide).toHaveBeenCalled();
  });

  it('disables navigation buttons when only one slide exists', async () => {
    // Register a deck with only one slide
    store.registerDeck({
      id: 'test-deck',
      label: 'Test Deck',
      slides: [{ label: 'Slide 1' }],
      activeSlideIndex: 0
    });

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    await page.waitForChanges();

    const buttons = page.root?.shadowRoot?.querySelectorAll('.nav-button') as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].disabled).toBe(true); // Previous button should be disabled
    expect(buttons[1].disabled).toBe(true); // Next button should be disabled
  });

  it('handles keyboard shortcuts', async () => {
    const mockPreviousSlide = jest.spyOn(store, 'previousSlide');
    const mockNextSlide = jest.spyOn(store, 'nextSlide');

    // Register a deck
    store.registerDeck({
      id: 'test-deck',
      label: 'Test Deck',
      slides: [
        { label: 'Slide 1' },
        { label: 'Slide 2' }
      ],
      activeSlideIndex: 0
    });

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    await page.waitForChanges();

    const component = page.rootInstance as IterationDeckToolbar;

    // Test Ctrl+ArrowLeft
    const leftKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      ctrlKey: true
    });
    component.handleKeydown(leftKeyEvent);
    expect(mockPreviousSlide).toHaveBeenCalled();

    // Test Cmd+ArrowRight
    const rightKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      metaKey: true
    });
    component.handleKeydown(rightKeyEvent);
    expect(mockNextSlide).toHaveBeenCalled();
  });

  it('ignores keyboard shortcuts in production mode', async () => {
    (isDevelopment as jest.Mock).mockReturnValue(false);
    
    const mockPreviousSlide = jest.spyOn(store, 'previousSlide');

    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    const component = page.rootInstance as IterationDeckToolbar;

    // Test keyboard shortcut in production mode
    const keyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      ctrlKey: true
    });
    component.handleKeydown(keyEvent);
    
    // Should not call store methods in production
    expect(mockPreviousSlide).not.toHaveBeenCalled();
  });

  it('updates state when store changes', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });

    // Initially should be hidden
    expect(page.root?.style.display).toBe('none');

    // Register a deck - should trigger update
    store.registerDeck({
      id: 'test-deck',
      label: 'Test Deck',
      slides: [{ label: 'Slide 1' }],
      activeSlideIndex: 0
    });

    await page.waitForChanges();

    // Should now be visible
    expect(page.root?.shadowRoot?.querySelector('.toolbar')).toBeTruthy();
  });
});