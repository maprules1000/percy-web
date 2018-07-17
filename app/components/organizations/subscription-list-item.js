import Component from '@ember/component';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';

export default Component.extend({
  tagName: '',
  existingPlan: null,
  planData: null,
  organization: null,

  subscriptionData: service(),
  subscriptionService: service('subscriptions'),
  isCustom: computed(function() {
    return this.get('subscriptionData.PLAN_IDS').indexOf(this.get('planData.id')) === -1;
  }),

  isActivePlan: computed('existingPlan.id', 'planData.id', function() {
    return this.get('existingPlan.id') === this.get('planData.id');
  }),

  subscriptionButtonText: computed('buttonText', 'isActivePlan', function() {
    if (this.get('buttonText')) {
      return this.get('buttonText');
    } else if (this.get('isActivePlan')) {
      return 'Selected Plan';
    } else {
      return 'Select Plan';
    }
  }),

  isShowingCardUpdater: false,

  showCardUpdater() {
    this.set('isShowingCardUpdater', true);
  },

  updateExistingSubscription() {
    this.get('subscriptionService').changeSubscription.perform(
      this.get('organization'),
      this.get('planData.id'),
    );
  },

  actions: {
    handleSubscriptionSelection() {
      if (this.get('isCustom')) {
        return this.get('handleSelection')();
        // } else if (this.get('organization.subscription.isCustomer')) {
        //   return this.updateExistingSubscription();
      } else {
        this.showCardUpdater();
      }
    },
  },
});
