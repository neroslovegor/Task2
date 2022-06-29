import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createBook(e) {
      e.preventDefault();

      set(this, 'isUploadingFile', true);
      const uploadData = get(this, 'uploadData');

      let newBook = this.get('store').createRecord('book', {
        title: this.get('title'),
        author: this.get('author'),
        pages: this.get('pages'),
        descripURL: this.get('descripURL'),
        tags: this.get('tags'),
        coverURL: ''
      });

      // let uploadData = get(this, 'uploadData');
      // let data = this.get('dataService');

      await newBook.save();
      // .then(function() {
      //   data.saveImg(uploadData, newBook.id);
      // });

      set(this, 'isUploadingFile', false);
      this.transitionToRoute('book.index');
    },
    
    changeTags(newTags) {
      set(this, 'tags', [...newTags]);
    },
  
    changeUploadData(uploadData) {
      set(this, 'uploadData', uploadData);
    }
  },

  reset() {
    set(this, 'isUploadingFile', false);
    set(this, 'title', '');
    set(this, 'author', '');
    set(this, 'pages', '');
    set(this, 'descripURL', '');
    set(this, 'tags', []);
    set(this, 'uploadData', null);
  }
});
