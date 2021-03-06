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
  actions: {
    async updateBook(e) {
      e.preventDefault();
      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (!get(this, 'isInvalid')) {
        set(this, 'isUploadingFile', true);
        //const uploadData = get(this, 'uploadData');
  
        this.get('model').setProperties({
          id: this.get('id'),
          title: this.get('title'),
          author: this.get('author'),
          pages: this.get('pages'),
          descripURL: this.get('descripURL'),
          tags: this.get('tags'),
          coverURL: this.get('coverURL')
        });
  
        // let data = this.get('dataService');
        // let uploadData = get(this, 'uploadData');
        
        await this.get('model').save();
        // .then( function() {
        //   data.saveImg(uploadData, this.get('id'))
        // });
  
        set(this, 'isUploadingFile', false);
        this.transitionToRoute('book.index');
      }
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
    set(this, 'id', this.get('model.id'));
    set(this, 'title', this.get('model.title'));
    set(this, 'author', this.get('model.author'));
    set(this, 'pages', this.get('model.pages'));
    set(this, 'descripURL', this.get('model.descripURL'));
    set(this, 'tags', this.get('model.tags'));
    set(this, 'coverURL', this.get('model.coverURL'));
    set(this, 'uploadData', null);
  }
});
