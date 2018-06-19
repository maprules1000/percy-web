import {create, collection, hasClass} from 'ember-cli-page-object';

const SELECTORS = {
  BROWSER_FAMILY_SELECTOR: '[data-test-browser-family-selector]',
  BUTTON: '[data-test-browser-selector-button]',
};

export const BrowserSwitcher = {
  scope: SELECTORS.BROWSER_FAMILY_SELECTOR,

  buttons: collection({
    itemScope: SELECTORS.BUTTON,
    item: {
      isActive: hasClass('is-browser-active'),
      isChrome: hasClass('data-test-browser-selector-chrome'),
      isFirefox: hasClass('data-test-browser-selector-firefox'),
    },
  }),

  chromeButton: {
    isDescriptor: true,
    get() {
      return this.buttons()
        .toArray()
        .findBy('isChrome');
    },
  },

  firefoxButton: {
    isDescriptor: true,
    get() {
      return this.buttons()
        .toArray()
        .findBy('isFirefox');
    },
  },

  switchBrowser() {
    const activeBrowser = this.buttons()
      .toArray()
      .findBy('isActive');
    if (activeBrowser.isChrome) {
      return this.firefoxButton.click();
    } else {
      return this.chromeButton.click();
    }
  },
};

export default create(BrowserSwitcher);
