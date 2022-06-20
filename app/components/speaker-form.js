import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('idSpeaker'),
        firstName: this.get('firstName'),
        middleName: this.get('middleName'),
        lastName: this.get('lastName')
      });
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      idSpeaker: this.get('speaker.id') ? this.get('speaker.id') : undefined,
      firstName: this.get('speaker.firstName'),
      middleName: this.get('speaker.middleName'),
      lastName: this.get('speaker.lastName')
    });
  },
});
