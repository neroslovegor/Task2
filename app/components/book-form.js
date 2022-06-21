import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('idBook'),
        title: this.get('title'),
        author: this.get('author'),
        pages: this.get('pages'),
        coverURL: this.get('coverURL'),
        descripURL: this.get('descripURL'),
        tags: this.get('tags')
      });
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
  },
});
