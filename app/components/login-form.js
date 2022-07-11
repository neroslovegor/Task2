import Component from '@ember/component';
import { get, set, setProperties } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { 
      type: 'email' 
    })
  ],
  password: [
    validator('presence', true)
  ]
});

export default Component.extend(Validations, {
  isInvalid: false,

  actions: {
    login(e) {
      e.preventDefault();
      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (!get(this, 'isInvalid')) {
        this.get('onSubmit')({
          email: this.email,
          password: this.password
        });
      }
    },

    goBack() {
      history.back();
      return false;
    }
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get('user.email'),
      password: this.get('user.password')
    });
  }
});
