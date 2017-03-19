import { browser, element, by } from 'protractor';

export class NgFirebaseBasicsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sj-root h1')).getText();
  }
}
