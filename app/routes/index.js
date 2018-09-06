import Route from '@ember/routing/route';
import ResetScrollMixin from '../mixins/reset-scroll';
import metaTagLookup from 'percy-web/lib/meta-tags';
import {variation} from 'ember-launch-darkly';
import {hash} from 'rsvp';
import {inject as service} from '@ember/service';

export default Route.extend(ResetScrollMixin, {
  headTags: metaTagLookup('root'),
  contentfulQuery: service(),

  beforeModel() {
    if (variation('updated-marketing-site')) {
      this.set('templateName', 'new-index');
    }
  },

  pageType: 'Home',
  footerType: 'Generic',

  model() {
    return hash({
      hero: this.get('contentfulQuery').getHero(this.get('pageType')),
      contentBlocks: this.get('contentfulQuery').getContentBlocks(this.get('pageType')),
      footer: this.get('contentfulQuery').getFooter(this.get('footerType')),
      logos: this.get('contentfulQuery').getCustomerLogos(),
    });
  },

  actions: {
    didTransition() {
      this._super.apply(this, arguments);

      // TODO: Add organization tracking
      this.analytics.track('Home Viewed');
    },
  },
});
