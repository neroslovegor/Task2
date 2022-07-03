import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import config from 'task2/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.backendURL,

  init() {
    this._super(...arguments);
    this.set('headers', {
      'Content-Type': 'application/json'
    });
  },

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
