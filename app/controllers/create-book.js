import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: [
    validator('ds-error'),
    validator('presence', true),
  ],
  author: [
    validator('ds-error'),
    validator('presence', true),
  ],
  pages: [
    validator('ds-error'),
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
    })
  ],
  descripURL: [
    validator('ds-error'),
    validator('presence', true),
    validator('format', {
      type: 'url'
    })
  ],
  tags: [
    validator('ds-error'),
    validator('presence', true),
  ],
});

export default Controller.extend(Validations, {
  dataService: service('data'),
  currentUser: service(),

  actions: {
    async createBook(e) {
      e.preventDefault();
      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (!get(this, 'isInvalid')) {
        set(this, 'isUploadingFile', true);
        //const uploadData = get(this, 'uploadData');

        let newBook = this.get('store').createRecord('book', {
          id: this.get('idBook'),
          title: this.get('title'),
          author: this.get('author'),
          pages: this.get('pages'),
          coverURL: this.get('coverURL'),
          descripURL: this.get('descripURL'),
          tags: this.get('tags'),
          user: this.get('currentUser.user'),
        });
        await newBook.save();

        set(this, 'isUploadingFile', false);
        this.transitionToRoute('book.index');
      }

      // let uploadData = get(this, 'uploadData');
      // let data = this.get('dataService');

      // .then(function() {
      //   data.saveImg(uploadData, newBook.id);
      // });
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
