import { Angular2SitePage } from './app.po';

describe('angular2-site App', function() {
  let page: Angular2SitePage;

  beforeEach(() => {
    page = new Angular2SitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
