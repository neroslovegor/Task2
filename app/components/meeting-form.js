import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  dateMeeting: [
    validator('ds-error'),
    validator('presence', true),
    validator('date')
  ]
});

export default Component.extend(Validations, {
  currentUser: service(),

  actions: {
    submitForm(e) {
      e.preventDefault();
      
      set(this, 'isInvalid', !this.get('validations.isValid'));
      if (!get(this, 'isInvalid')) {
        this.onsubmit({
          id: this.get('idMeeting'),
          dateMeeting: this.get('dateMeeting'),
          user: this.get('currentUser.user')
        });
      }
    },

    changeDate(selectedDate) {
      this.set('selectedDate', selectedDate);
    },
    sessionChanged: function() {
      this.refresh();
    },
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      idMeeting: this.get('meeting.id') ? this.get('meeting.id') : undefined,
      dateMeeting: this.get('meeting.dateMeeting')
    });
  },
});
