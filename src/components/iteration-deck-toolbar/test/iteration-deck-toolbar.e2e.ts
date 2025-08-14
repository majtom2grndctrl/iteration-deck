import { newE2EPage } from '@stencil/core/testing';

describe('iteration-deck-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<iteration-deck-toolbar></iteration-deck-toolbar>');

    const element = await page.find('iteration-deck-toolbar');
    expect(element).toHaveClass('hydrated');
  });
});
