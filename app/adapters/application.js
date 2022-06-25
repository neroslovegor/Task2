import DS from 'ember-data';
import config from 'task2/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.backendURL,

  init() {
    this._super(...arguments);
    this.set('headers', {
      'Content-Type': 'application/json'
    });
  },

  // buildURL(modelName, id, snapshot, requestType) {
  //   let url = this._super(...arguments);
  //   if (modelName === 'book' && requestType === 'findAll' && id) {
  //     url += '?_embed=reports';
  //   }
  //   if (modelName === 'speaker' && requestType === 'findRecord' && id) {
  //     url += '?_embed=reports';
  //   }

  //   return url;
  // }
});
