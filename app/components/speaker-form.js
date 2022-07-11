import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: [
    validator('ds-error'),
    validator('presence', true),
  ],
  middleName: [
    validator('ds-error'),
    validator('presence', true),
  ],
  lastName: [
    validator('ds-error'),
    validator('presence', true),
  ],
});

export default Component.extend(Validations, {
  currentUser: service(),

  actions: {
    submitForm(e) {
      e.preventDefault();
      set(this, 'isInvalid', !this.get('validations.isValid'));
        if (!get(this, 'isInvalid')) {
        this.onsubmit({
          id: this.get('idSpeaker'),
          firstName: this.get('firstName'),
          middleName: this.get('middleName'),
          lastName: this.get('lastName'),
          user: this.get('currentUser.user')
        });
      }
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
