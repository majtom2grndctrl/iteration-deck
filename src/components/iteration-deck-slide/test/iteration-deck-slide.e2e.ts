import { newE2EPage } from '@stencil/core/testing';

describe('iteration-deck-slide', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<iteration-deck-slide></iteration-deck-slide>');

    const element = await page.find('iteration-deck-slide');
    expect(element).toHaveClass('hydrated');
  });
});
