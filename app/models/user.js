import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { 
      type: 'email' 
    })
  ],
  password: [
    validator('presence', true),
    validator('length', {
      min: 4,
      max: 8
    })
  ]
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  password: DS.attr(),
});
