import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  session: service(),

  currentUser: computed.alias('session.currentUser'),
  isGithubPurchase: computed.notEmpty('marketplaceListingPlanId'),
  hasGithubIdentity: computed.notEmpty('currentUser.hasGithubIdentity'),

  isSubmitDisabled: computed(function() {
    // false if not GH purchase or gh purchase with gh account
    if (this.get('isGithubPurchase') && !this.get('hasGithubIdentity')) {
      return true;
    } else if (this.get('isGithubPurchase') && this.get('hasGithubIdentity')) {
      return false;
    } else {
      return false;
    }
  }),
});
