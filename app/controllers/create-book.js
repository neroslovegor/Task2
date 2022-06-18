import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createBook(book) {
      try {
        await this.get('dataService').createBook(book);
        this.transitionToRoute('book.index');
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
