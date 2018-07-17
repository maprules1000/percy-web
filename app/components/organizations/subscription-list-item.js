import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  tagName: '',
  subscriptionData: service(),
  subscriptionService: service('subscriptions'),
  isCustom: computed(function() {
    return this.get('subscriptionData.PLAN_IDS').indexOf(this.get('planData.id')) === -1;
  }),

  actions: {
    updateExistingSubscription() {
      this.get('subscriptionService').changeSubscription.perform(
        this.get('organization'),
        this.get('planData.id'),
      );
    },
  },
});
