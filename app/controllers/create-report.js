import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
   dataService: service('data'),
  actions: {
    async createReport(e, meetingId, dateReport) {
      e.preventDefault();

      let newReport = this.get('store').createRecord('report', {
        dateReport: dateReport,
        presentationURL: this.get('presentationURL'),
        videoURL: this.get('videoURL'),
        review: this.get('review'),
        speakerId: this.get('selectedSpeaker').id,
        bookId: this.get('selectedBook').id,
        meetingId: meetingId
      });
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

    goBack() {
      history.back();
      return false;
    }
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
