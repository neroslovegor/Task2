import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ["search", "search_by_tag"],
  search: '',
  search_by_tag: '',
  dataService: service('data'),
  actions: {
    async deleteBook(id) {
      try {
        await this.get('dataService').deleteBook(id);
        this.send("sessionChanged");
        //alert('Book Deleted!');    
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    },
  },
});
