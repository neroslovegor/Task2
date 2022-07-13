import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';
import { get, set } from '@ember/object';

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

export default Component.extend(Validations, {
  actions: {
    submitForm(e) {
      e.preventDefault();

      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (!get(this, 'isInvalid')) {

        this.onsubmit({
          id: this.get('idBook'),
          title: this.get('title'),
          author: this.get('author'),
          pages: this.get('pages'),
          coverURL: this.get('coverURL'),
          descripURL: this.get('descripURL'),
          tags: this.get('tags')
        });
      }
    },

    changeUploadData(uploadData) {
      set(this, 'uploadData', uploadData);
    },
    changeTags(newTags) {
      set(this, 'tags', [...newTags]);
    },
  },

  didReceiveAttrs() {
    this._super(...arguments);
    
    this.setProperties({
      idBook: this.get('book.id') ? this.get('book.id') : undefined,
      title: this.get('book.title'),
      author: this.get('book.author'),
      pages: this.get('book.pages'),
      coverURL: this.get('book.coverURL'),
      descripURL: this.get('book.descripURL'),
      tags: this.get('book.tags')
    });
  }
});
