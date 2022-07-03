import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  middleName: DS.attr('string'),
  lastName: DS.attr('string'),

  fullName: computed('firstName', 'middleName', 'lastName', function() {
    return `${this.get('lastName')} ${this.get('firstName')} ${this.get('middleName')}`;
  }),

  reports: DS.hasMany('report')
});
