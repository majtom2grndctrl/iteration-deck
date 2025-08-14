import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckToolbar } from '../iteration-deck-toolbar';

describe('iteration-deck-toolbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IterationDeckToolbar],
      html: `<iteration-deck-toolbar></iteration-deck-toolbar>`,
    });
    expect(page.root).toEqualHtml(`
      <iteration-deck-toolbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </iteration-deck-toolbar>
    `);
  });
});
