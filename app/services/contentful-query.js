import Service, {inject as service} from '@ember/service';

export default Service.extend({
  store: service(),

  getHero(pageType) {
    return this.store.queryRecord('hero-block', {
      'fields.page': pageType,
    });
  },

  getContentBlocks(pageType) {
    return this.store
      .query('content-block', {
        'fields.page': pageType,
      })
      .then(contentBlocks => {
        return contentBlocks.sortBy('order');
      });
  },

  getFooter(footerType) {
    return this.store.queryRecord('footer-cta', {
      'fields.type': footerType,
    });
  },
});
