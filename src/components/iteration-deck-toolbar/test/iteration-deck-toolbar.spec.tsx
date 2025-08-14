import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckToolbar } from '../iteration-deck-toolbar';

// Mock environment detection to return development mode for testing
jest.mock('../../../utils/environment', () => ({
  detectEnvironment: () => ({
    isDevelopment: true,
    isProduction: false,
    showDevTools: true,
    enableToolbar: true
  }),
  isDevMode: () => true,
  isDevelopmentMode: () => true,
  isProductionMode: () => false,
  shouldShowDevTools: () => true,
  shouldEnableToolbar: () => true
}));

// Mock the store
const mockStore = {
  getState: () => ({
    decks: new Map([
      ['deck1', { id: 'deck1', label: 'Test Deck 1', slides: [{ label: 'Slide 1' }, { label: 'Slide 2' }], slideCount: 2, activeSlideIndex: 0 }],
      ['deck2', { id: 'deck2', label: 'Test Deck 2', slides: [{ label: 'Slide A' }], slideCount: 1, activeSlideIndex: 0 }]
    ]),
    activeDeckId: 'deck1',
    activeSlideIndex: 0,
    setActiveDeck: jest.fn(),
    setActiveSlide: jest.fn(),
    registerDeck: jest.fn(),
    unregisterDeck: jest.fn(),
    updateDeckSlides: jest.fn()
  }),
  subscribe: jest.fn(() => () => {}) // Returns unsubscribe function
};

jest.mock('../../../store/iteration-deck-store', () => ({
  useIterationDeckStore: mockStore
}));

describe('iteration-deck-toolbar', () => {
  beforeEach(() => {
    // Reset DOM and mocks before each test
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('renders in development mode', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    
    expect(page.root).toBeTruthy();
    // Should render since we're in dev mode and have decks
  });

  it('does not render in production mode', async () => {
    // Mock production environment
    jest.resetModules();
    jest.doMock('../../../utils/environment', () => ({
      isDevMode: () => false
    }));
    
    const { IterationDeckToolbar: ProdToolbar } = await import('../iteration-deck-toolbar');
    
    const page = await newSpecPage({
      components: [ProdToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    
    // Should return null in production mode
    expect(page.root?.shadowRoot?.innerHTML).toBe('');
  });

  it('renders when in development mode and has decks', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    
    // Check basic rendering - toolbar should exist in component
    expect(page.root).toBeTruthy();
    expect(page.rootInstance).toBeTruthy();
  });

  it('handles store state properly', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    
    // Check that component can access store state
    expect(page.rootInstance.storeState).toBeTruthy();
    expect(typeof page.rootInstance.storeState).toBe('object');
  });

  it('has required methods for navigation', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    
    // Check that navigation methods exist
    expect(typeof page.rootInstance.handlePrevSlide).toBe('function');
    expect(typeof page.rootInstance.handleNextSlide).toBe('function');
    expect(typeof page.rootInstance.handleDeckSelect).toBe('function');
  });
});
