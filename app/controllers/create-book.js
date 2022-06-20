import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createBook(book) {
      try {
        await this.get("dataService").createBook(book);
        this.get('model').set('title', book.title);
        this.get('model').set('author', book.author);
        this.get('model').set('pages', book.pages);
        this.get('model').set('coverURL', book.coverURL);
        this.get('model').set('descripURL', book.descripURL);
        this.get('model').set('tags', book.tags);

        this.transitionToRoute('book.index');
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
