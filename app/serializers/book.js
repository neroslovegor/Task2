import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    reports: {
      // embedded: 'always'
      serialize: 'ids',
      deserialize: 'records'
    }
  },
  
  normalize(model, hash) {
    hash = this._super(...arguments);
    return hash;
  }
});
