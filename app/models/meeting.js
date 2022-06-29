import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date-string'),

  reports: DS.hasMany('report')
});
