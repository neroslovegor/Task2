import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createMeeting(meeting) {
      let newMeeting = this.get('store').createRecord('meeting', meeting);
      await newMeeting.save();

      this.transitionToRoute('meeting.index');
    }
  },

  reset() {
    set(this, 'date', '');
  }
});
