import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ["search", "tags_like"],
  search: '',
  tags_like: '',
  
  dataService: service('data'),
  actions: {
    async deleteBook(book) {
      try {
        await book.destroyRecord();
        this.send("sessionChanged");
      } catch (error) {
        this.send('error', error);
      }
    },

    searchUpdate() {
      this.set('search', this.get('searchValue'));
      this.set('tags_like', this.get('searchTag'));
      this.send("sessionChanged");
    },
  }
});
