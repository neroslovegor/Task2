import Component from '@ember/component';
import config from 'task2/config/environment';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import fetch from 'fetch';

const Validations = buildValidations({
  email: [
    validator('ds-error'),
    validator('presence', true),
    validator('format', { 
      type: 'email' 
    })
  ],
  password: [
    validator('ds-error'),
    validator('presence', true),
    validator('length', {
      min: 4,
      max: 8
    })
  ]
});

export default Component.extend(Validations, {
  i18n: service(),
  iAmRobot: true,
  reset: false,
  isFormValid: computed.alias('validations.isValid'),

  actions: {
    async saveUser(e) {
      e.preventDefault();
      
      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (this.get('isFormValid')) {
        this.get('onSubmit')({
          email: this.email,
          password: this.password
        });
      }
    },

    async verified(key) {
      try {
        const { success } = await (await fetch(`${config.backendURL}/recaptcha?key=${key}`)).json();

        this.set('iAmRobot', !success);
      } catch (error) {
        this.set('reset', true);
      }
    },
    expired() {
      this.set('iAmRobot', true);
    },

    goBack() {
      history.back();
      return false;
    }
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get('user.email'),
      password: this.get('user.password'),
    });
  }
});
