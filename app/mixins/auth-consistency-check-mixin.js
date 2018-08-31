import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';
import localStorageProxy from 'percy-web/lib/localstorage';
import {AUTH_REDIRECT_LOCALSTORAGE_KEY} from 'percy-web/router';

var AuthConsistencyCheckMixin = Mixin.create({
  session: service(),

  async isLoginConsistent() {
    const isClientLoggedIn = this.get('session.isAuthenticated');
    const isApiLoggedIn = await this.isApiLoggedIn();

    return isApiLoggedIn === isClientLoggedIn;
  },

  redirectToLogin() {
    // it can redirect the logged in user back to the same page.
    const currentURL = this.router.url;
    localStorageProxy.set(AUTH_REDIRECT_LOCALSTORAGE_KEY, currentURL, {useSessionStorage: true});
    return this.transitionTo('login');
  },

  async isApiLoggedIn() {
    let isApiLoggedIn = false;
    try {
      const user = await this.get('session').forceReloadUser();
      isApiLoggedIn = !!user;
    } catch (e) {
      //no-op
    }
    return isApiLoggedIn;
  },
});

export default AuthConsistencyCheckMixin;
