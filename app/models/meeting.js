import DS from 'ember-data';

export default DS.Model.extend({
  dateMeeting: DS.attr('date-string'),

  reports: DS.hasMany('report'),
  user: DS.belongsTo('user')
});
