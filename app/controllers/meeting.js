import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export const PER_PAGE = 3;

export default Controller.extend({
  queryParams: ["book", "speaker", "dateMeeting", "page"],
  book: '',
  speaker: '',
  dateMeeting: '',
  page: 1,
  
  dataService: service('data'),
  session: service(),
  actions: {
    async deleteMeeting(meeting) {
      try {
        await meeting.destroyRecord();
        this.send("sessionChanged");
      } catch (error) {
        this.send('error', error);
      }
    },

    changeBook(book) {
      this.set('selectedBook', book);
    },
    changeSpeaker(speaker) {
      this.set('selectedSpeaker', speaker);
    },
    changeDate(dateMeeting) {
      this.set('selectedDate', dateMeeting);
    },
    
    searchMeeting(selectedSpeaker, selectedBook) {
      this.set('speaker', selectedSpeaker ? selectedSpeaker.id : '');
      this.set('book', selectedBook ? selectedBook.id : '');
      this.set('dateMeeting', this.get('selectedDate'));
    },

    clearSearch() {
      this.set('speaker', '');
      this.set('book', '');
      this.set('dateMeeting', '');
    }
  },

  selectedBook: computed('book', function() {
    const book = this.get('book');
    return book ? this.get('model.books').findBy('id', book) : null;
  }),
  selectedSpeaker: computed('speaker', function() {
    const speaker = this.get('speaker');
    return speaker ? this.get('model.speakers').findBy('id', speaker) : null;
  }),
  pages: computed('model.meetings.meta.total', function() {
    const total = Number(this.get('model.meetings.meta.total'));
    if (Number.isNaN(total) || total <= 0) {
      return [];
    }

    return new Array(Math.ceil(total / PER_PAGE))
      .fill()
      .map((value, index) => index + 1);
  })
});
