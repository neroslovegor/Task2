import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ["search", "tags_like"],
  search: '',
  tags_like: '',
  
  dataService: service('data'),
  actions: {
    async deleteBook(id) {
      try {
        await this.get('dataService').deleteBook(id);
        this.send("sessionChanged");
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    },

    searchUpdate() {
      this.send("sessionChanged");
      // this.set('search', this.get('search'));
      // this.set('tags_like', this.get('tags_like'));   
    },
  }
});