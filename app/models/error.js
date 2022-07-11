import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date-string'),
  ip: DS.attr('string'),
  url: DS.attr('string'),
  text: DS.attr('string'),
});
