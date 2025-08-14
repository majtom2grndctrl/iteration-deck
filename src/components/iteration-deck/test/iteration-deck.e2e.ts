import { newE2EPage } from '@stencil/core/testing';

describe('iteration-deck', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<iteration-deck></iteration-deck>');

    const element = await page.find('iteration-deck');
    expect(element).toHaveClass('hydrated');
  });
});
