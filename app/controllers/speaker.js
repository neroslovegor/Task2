import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ["search"],
  search: '',

  dataService: service('data'),
  actions: {
    async deleteSpeaker(id) {
      try {
        await this.get('dataService').deleteSpeaker(id);
        this.send("sessionChanged");
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    },

    searchUpdate() {
      this.set('search', this.get('searchValue'));
      this.send("sessionChanged");   
    },
  }
});
