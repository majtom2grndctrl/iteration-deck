import { newSpecPage } from '@stencil/core/testing';
import { IterationDeckSlide } from '../iteration-deck-slide';

describe('iteration-deck-slide', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IterationDeckSlide],
      html: `<iteration-deck-slide></iteration-deck-slide>`,
    });
    expect(page.root).toEqualHtml(`
      <iteration-deck-slide>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </iteration-deck-slide>
    `);
  });
});
