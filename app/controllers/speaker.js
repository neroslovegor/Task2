import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';

export default Controller.extend({
  queryParams: ["search"],
  search: '',

  dataService: service('data'),
  session: service(),
  actions: {
    async deleteSpeaker(speaker) {
      try {
        await speaker.destroyRecord();
        this.send("sessionChanged");
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    },

    searchUpdate() {
      this.set('search', this.get('searchValue'));
      this.send("sessionChanged");   
    },

    searchSpeaker() {
      debounce(() => {
        this.set("search", this.get("searchValue"));
      }, 2000);
    }
  }
});
