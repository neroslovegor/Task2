import DateTransform from 'ember-data/transforms/date';
import { inject as service } from '@ember/service';

export default DateTransform.extend({
  moment: service(),
  deserialize(serialized) {
    let date = this._super(serialized);
    if (date instanceof Date && !isNaN(date)) {
      //let formattedDate = this.get('moment').moment(date).format('DD.MM.YYYY');
      let formattedDate = this.get('moment').moment(date).format('MM.DD.YYYY');
      return formattedDate;
    }

    return null;
  },

  serialize(deserialized) {
    let deserializedDate = deserialized ? this.get('moment').moment(deserialized).toDate() : null;
    return this._super(deserializedDate);
  }
});
