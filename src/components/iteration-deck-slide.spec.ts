import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckSlide } from './iteration-deck-slide';
import { isDevelopment } from '../core/store';

// Mock isDevelopment function
jest.mock('../core/store', () => {
  const originalModule = jest.requireActual('../core/store');
  return {
    ...originalModule,
    isDevelopment: jest.fn(() => true),
  };
});

describe('iteration-deck-slide', () => {
  beforeEach(() => {
    // Reset mock
    (isDevelopment as jest.Mock).mockReturnValue(true);
  });

  it('renders correctly', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });
    
    expect(page.root).toEqualHtml(`
      <iteration-deck-slide label="Test Slide" class="dev-mode">
        <mock:shadow-root>
          <div class="slide-content">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <div>Test Content</div>
      </iteration-deck-slide>
    `);
  });

  it('renders in production mode correctly', async () => {
    (isDevelopment as jest.Mock).mockReturnValue(false);
    
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });
    
    expect(page.root).toEqualHtml(`
      <iteration-deck-slide label="Test Slide">
        <mock:shadow-root>
          <div class="slide-content">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <div>Test Content</div>
      </iteration-deck-slide>
    `);
  });

  it('accepts all props correctly', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide 
        label="Test Slide" 
        ai-prompt="Test prompt" 
        notes="Test notes" 
        confidence="0.85">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });

    const component = page.rootInstance as IterationDeckSlide;
    
    expect(component.label).toBe('Test Slide');
    expect(component.aiPrompt).toBe('Test prompt');
    expect(component.notes).toBe('Test notes');
    expect(component.confidence).toBe(0.85);
  });

  it('emits slideDataUpdated event on load', async () => {
    const eventSpy = jest.fn();
    
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide 
        label="Test Slide" 
        ai-prompt="Test prompt" 
        notes="Test notes" 
        confidence="0.85">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });

    page.root!.addEventListener('slideDataUpdated', eventSpy);
    
    // Trigger componentDidLoad
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          label: 'Test Slide',
          aiPrompt: 'Test prompt',
          notes: 'Test notes',
          confidence: 0.85
        }
      })
    );
  });

  it('emits slideDataUpdated event when props change', async () => {
    const eventSpy = jest.fn();
    
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Initial Label">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });

    page.root!.addEventListener('slideDataUpdated', eventSpy);
    await page.waitForChanges();
    
    // Clear initial event
    eventSpy.mockClear();

    // Update prop
    page.root!.setAttribute('label', 'Updated Label');
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          label: 'Updated Label'
        })
      })
    );
  });

  it('handles missing optional props', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });

    const component = page.rootInstance as IterationDeckSlide;
    
    expect(component.label).toBe('Test Slide');
    expect(component.aiPrompt).toBeUndefined();
    expect(component.notes).toBeUndefined();
    expect(component.confidence).toBeUndefined();
  });

  it('handles confidence as number correctly', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide label="Test Slide" confidence="0.95">
        <div>Test Content</div>
      </iteration-deck-slide>`,
    });

    const component = page.rootInstance as IterationDeckSlide;
    
    expect(component.confidence).toBe(0.95);
    expect(typeof component.confidence).toBe('number');
  });
});