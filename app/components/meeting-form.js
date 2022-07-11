import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('idMeeting'),
        dateMeeting: this.get('dateMeeting')
      });
    },

    changeDate(selectedDate) {
      this.set('selectedDate', selectedDate);
    },
    sessionChanged: function() {
      this.refresh();
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      idMeeting: this.get('meeting.id') ? this.get('meeting.id') : undefined,
      dateMeeting: this.get('meeting.dateMeeting')
    });
  },
});
