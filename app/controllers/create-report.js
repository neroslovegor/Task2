import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
   dataService: service('data'),
  actions: {
    async createReport(report) {
      let newReport = this.get('store').createRecord('report', report);
      await newReport.save();
      history.back();

      //this.transitionToRoute('speaker.index');
    },

    changeBook(book) {
      this.set('selectedBook', book);
    },
    changeSpeaker(speaker) {
      this.set('selectedSpeaker', speaker);
    },
  },

  // reset() {
  //   set(this, 'firstName', '');
  //   set(this, 'middleName', '');
  //   set(this, 'lastName', '');
  // },

  selectedBook: computed('book', function() {
    const book = this.get('book');
    return book ? this.get('model.books').findBy('id', book) : null;
  }),
  selectedSpeaker: computed('speaker', function() {
    const speaker = this.get('speaker');
    return speaker ? this.get('model.speakers').findBy('id', speaker) : null;
  }),
});
