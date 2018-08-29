import {inject as service} from '@ember/service';
import {alias} from '@ember/object/computed';
import Route from '@ember/routing/route';
import localStorageProxy from 'percy-web/lib/localstorage';
import {task} from 'ember-concurrency';
import handleOptionalAuthGetError from 'percy-web/lib/handle-optionally-authenticated-fetch-error';
import isUserMemberPromise from 'percy-web/lib/is-user-member-of-org';
import utils from 'percy-web/lib/utils';
import EnsureStatefulLogin from 'percy-web/mixins/ensure-stateful-login';
import {AUTH_REDIRECT_LOCALSTORAGE_KEY} from 'percy-web/router';
import {getOwner} from '@ember/application';

export default Route.extend(EnsureStatefulLogin, {
  intercom: service(),
  session: service(),
  store: service(),
  currentUser: alias('session.currentUser'),

  async beforeModel(transition) {
    const user = this.get('session').forceReloadUser();
    const isApiLoggedIn = !!user;
    const isClientLoggedIn = this.get('session.isAuthenticated');
    console.log('isApiLoggedIn', isApiLoggedIn, 'isClientLoggedIn', isClientLoggedIn);

    if (isApiLoggedIn && !isClientLoggedIn) {
      // it can redirect the logged in user back to the same page.
      const currentURL = this.router.url;
      // const currentURL = getOwner(this).lookup('controller:application').target.currentURL;
      localStorageProxy.set(AUTH_REDIRECT_LOCALSTORAGE_KEY, currentURL, {useSessionStorage: true});
      return this.transitionTo('login');
    }

    // If we get an organization, it is accessible to whoever's asking for it. Keep going.
    try {
      const org = await this.get('_getOrganization').perform(transition.params);
      this.set('_organization', org);
      return this._super(...arguments);
    } catch (e) {
      const currentUser = this.get('currentUser');
      return handleOptionalAuthGetError(e, currentUser, this);
    }
  },

  model() {
    // set by beforeModel, if successful.
    return this.get('_organization');
  },

  afterModel(model) {
    this._setupIntercom(model);
    this._setLastOrganizationSlug(model);
  },

  async _setupIntercom(organization) {
    if (await isUserMemberPromise(organization)) {
      this.get('intercom').associateWithCompany(this.get('currentUser'), organization);
    }
  },

  _setLastOrganizationSlug(organization) {
    localStorageProxy.set('lastOrganizationSlug', organization.get('slug'));
  },

  _getOrganization: task(function*(params) {
    const orgSlug = params['organization'].organization_id;
    const preloadedOrg = this.get('store')
      .peekAll('organization')
      .findBy('slug', orgSlug);
    if (preloadedOrg) {
      return preloadedOrg;
    } else {
      return yield this.get('store').findRecord('organization', orgSlug);
    }
  }),
});
