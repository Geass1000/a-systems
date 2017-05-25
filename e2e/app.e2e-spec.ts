import { ASystemsPage } from './app.po';

describe('a-systems App', () => {
  let page : ASystemsPage;

  beforeEach(() => {
    page = new ASystemsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
