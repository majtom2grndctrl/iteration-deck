import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckTest } from './iteration-deck-test';

describe('iteration-deck-test', () => {
  it('renders with default message', async () => {
    const { root } = await newSpecPage({
      components: [IterationDeckTest],
      html: '<iteration-deck-test></iteration-deck-test>',
    });
    
    expect(root).toEqualHtml(`
      <iteration-deck-test>
        <mock:shadow-root>
          <div class="test-component">
            <h1>Hello from Stencil!</h1>
            <p>This is a test component to verify Stencil is working correctly.</p>
          </div>
        </mock:shadow-root>
      </iteration-deck-test>
    `);
  });

  it('renders with custom message', async () => {
    const { root } = await newSpecPage({
      components: [IterationDeckTest],
      html: '<iteration-deck-test message="Custom Test Message"></iteration-deck-test>',
    });
    
    expect(root).toEqualHtml(`
      <iteration-deck-test message="Custom Test Message">
        <mock:shadow-root>
          <div class="test-component">
            <h1>Custom Test Message</h1>
            <p>This is a test component to verify Stencil is working correctly.</p>
          </div>
        </mock:shadow-root>
      </iteration-deck-test>
    `);
  });
});