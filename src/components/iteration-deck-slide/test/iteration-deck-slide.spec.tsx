import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckSlide } from '../iteration-deck-slide';

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

describe('iteration-deck-slide', () => {
  beforeEach(() => {
    // Reset DOM and globals before each test
    document.body.innerHTML = '';
  });

  it('renders with basic props', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide">Test Content</iteration-deck-slide>`,
    });
    
    expect(page.root).toBeTruthy();
    expect(page.rootInstance.label).toBe('Test Slide');
  });

  it('renders slot content correctly', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `
        <iteration-deck-slide label="Test Slide">
          <div class="test-content">Custom slot content</div>
        </iteration-deck-slide>
      `,
    });
    
    const slotContent = page.root?.querySelector('.test-content');
    expect(slotContent).toBeTruthy();
    expect(slotContent?.textContent).toBe('Custom slot content');
  });

  it('handles AI metadata props', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `
        <iteration-deck-slide 
          label="AI Slide"
          ai-prompt="Make it beautiful"
          notes="This variation focuses on aesthetics"
          confidence="0.87">
          Test content
        </iteration-deck-slide>
      `,
    });
    
    expect(page.rootInstance.label).toBe('AI Slide');
    expect(page.rootInstance.aiPrompt).toBe('Make it beautiful');
    expect(page.rootInstance.notes).toBe('This variation focuses on aesthetics');
    expect(page.rootInstance.confidence).toBe(0.87);
  });

  it('shows confidence score in development mode', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `
        <iteration-deck-slide 
          label="Test Slide"
          confidence="0.92">
          Test content
        </iteration-deck-slide>
      `,
    });
    
    // Force development mode for testing
    page.rootInstance.isProduction = false;
    await page.waitForChanges();
    
    // Check that confidence was parsed correctly
    expect(page.rootInstance.confidence).toBe(0.92);
    
    // In dev mode with confidence, should render confidence UI
    if (!page.rootInstance.isProduction && page.rootInstance.confidence) {
      const metadata = page.root?.shadowRoot?.querySelector('.slide-metadata');
      expect(metadata).toBeTruthy();
    }
  });

  it('shows notes toggle in development mode', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `
        <iteration-deck-slide 
          label="Test Slide"
          notes="This is a test note">
          Test content
        </iteration-deck-slide>
      `,
    });
    
    // Force development mode for testing
    page.rootInstance.isProduction = false;
    await page.waitForChanges();
    
    // Check that notes were parsed correctly
    expect(page.rootInstance.notes).toBe('This is a test note');
    
    // In dev mode with notes, should render notes UI
    if (!page.rootInstance.isProduction && page.rootInstance.notes) {
      const notesToggle = page.root?.shadowRoot?.querySelector('.notes-toggle');
      expect(notesToggle).toBeTruthy();
    }
  });

  it('initializes with proper defaults', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide">Content</iteration-deck-slide>`,
    });
    
    expect(typeof page.rootInstance.isProduction).toBe('boolean');
    expect(page.rootInstance.isActive).toBe(false);
    expect(page.rootInstance.slideIndex).toBe(0);
    expect(page.rootInstance.label).toBe('Test Slide');
  });

  it('calculates slide index within parent', async () => {
    // Create a mock parent element
    const parentElement = document.createElement('iteration-deck');
    const slide1 = document.createElement('iteration-deck-slide');
    const slide2 = document.createElement('iteration-deck-slide');
    
    slide1.setAttribute('label', 'Slide 1');
    slide2.setAttribute('label', 'Slide 2');
    
    parentElement.appendChild(slide1);
    parentElement.appendChild(slide2);
    document.body.appendChild(parentElement);
    
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide">Content</iteration-deck-slide>`,
    });
    
    // Manually set up the DOM relationship for testing
    if (page.root) {
      parentElement.appendChild(page.root);
    }
    
    // Trigger the slide index calculation
    page.rootInstance.calculateSlideIndex();
    
    expect(page.rootInstance.slideIndex).toBe(2); // Third slide in the deck
  });
});
