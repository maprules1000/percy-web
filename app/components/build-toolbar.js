import Component from '@ember/component';

export default Component.extend({
  build: null,
  allDiffsShown: null,
  toggleAllDiffs: null,

  classNames: ['BuildToolbar'],

  actions: {
    toggleOverlay() {
      this.get('toggleAllDiffs')({trackSource: 'clicked_toggle'});
    },
    switchBrowsers(newBrowser) {
      window.scrollTo(0, 0);
      this.get('updateActiveBrowser')(newBrowser);
    },
  },
});
