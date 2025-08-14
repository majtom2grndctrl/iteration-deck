import { newSpecPage } from '@stencil/core/testing';
import { IterationDeck } from '../iteration-deck';

describe('iteration-deck', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IterationDeck],
      html: `<iteration-deck></iteration-deck>`,
    });
    expect(page.root).toEqualHtml(`
      <iteration-deck>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </iteration-deck>
    `);
  });
});
