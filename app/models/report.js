import DS from 'ember-data';

export default DS.Model.extend({
  //date: DS.attr('date-string'),
  presentationURL: DS.attr('string'),
  videoURL: DS.attr('string'),
  review: DS.attr('string'),

  book: DS.belongsTo('book'),
  speaker: DS.belongsTo('speaker'),
  meeting: DS.belongsTo('meeting'),
});
