import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('idBook'),
        title: this.get('author.firstName'),
        author: this.get('author.lastName'),
        pages: this.get('author.lastName'),
        coverURL: this.get('author.lastName'),
        descripURL: this.get('author.lastName'),
        tags: this.get('author.lastName')
      });
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      idBook: this.get('author.id') ? this.get('author.id') : undefined,
      title: this.get('author.firstName'),
      author: this.get('author.lastName'),
      pages: this.get('author.lastName'),
      coverURL: this.get('author.lastName'),
      descripURL: this.get('author.lastName'),
      tags: this.get('author.lastName')
    });
  },
});
