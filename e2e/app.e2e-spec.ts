import { SeminarioPage } from './app.po';

describe('seminario App', () => {
  let page: SeminarioPage;

  beforeEach(() => {
    page = new SeminarioPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
