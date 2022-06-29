import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  // queryParams: ["search", "tags_like"],
  // search: '',
  // tags_like: '',
  
  dataService: service('data'),
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

    // searchUpdate() {
    //   this.set('search', this.get('searchValue'));
    //   this.set('tags_like', this.get('searchTag'));
    //   this.send("sessionChanged");
    // },
  }
});
