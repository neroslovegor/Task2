import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { get } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),

  beforeModel() {
    this._super(...arguments);

    this.loadUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);

    this.loadUser();
  },

  sessionInvalidated() {
    this.get('currentUser').resetCurrentUser();
    window.location.replace('/login');
  },

  loadUser() {
    if (this.get('session.isAuthenticated')) {
      this.get('currentUser').load();
    }
  },

  actions: {
    error(error, transition) {
      // const applicationError = get(this, 'applicationError');
      // applicationError.saveError(error.message)

      if (transition) {
        transition.abort();
      }
      this.intermediateTransitionTo('error', { error: error.message });
      return true;
    }
  }
});
