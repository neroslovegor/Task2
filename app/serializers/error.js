import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalize(model, hash) {
    hash = this._super(...arguments);
    return hash;
  },

  extractRelationship(relationshipModelName, relationshipHash) {
    return this._super(...arguments);
  },
});
