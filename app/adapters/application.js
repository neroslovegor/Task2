import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import config from 'task2/config/environment';

export default DS.JSONAPIAdapter.extend({
  session: service(),
  host: config.backendURL,

  headers: computed(function() {
    let resultHeaders = {
      'Content-Type': 'application/json'
    };

    if (this.get('session.isAuthenticated')) {
      resultHeaders['Authorization'] = `Bearer ${this.session.data.authenticated.token}`;
    }

    return resultHeaders;
  }).volatile(),
  
  buildURL(modelName, id, snapshot, requestType, query) {
    let url = this._super(...arguments);
    if (modelName === 'meeting' && requestType === 'findAll') {
      url += '?_embed=reports';
    }
    if (modelName === 'meeting' && requestType === 'query') {
      url += '?_embed=reports';
    }

    return url;
  },

  handleResponse(status, headers, payload) {
    const meta = {
      total: headers['x-total-count'],
    };

    payload.meta = meta;

    return this._super(status, headers, payload);
  }
});
