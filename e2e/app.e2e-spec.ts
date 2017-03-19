import { NgFirebaseBasicsPage } from './app.po';

describe('ng-firebase-basics App', () => {
  let page: NgFirebaseBasicsPage;

  beforeEach(() => {
    page = new NgFirebaseBasicsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sj works!');
  });
});
