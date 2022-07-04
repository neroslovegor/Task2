import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async updateMeeting(meeting) {
      this.get('model').setProperties(meeting);   
      await this.get('model').save();
      
      this.transitionToRoute('meeting.index');
    }
  },

  reset() {
    set(this, 'id', this.get('model.id'));
    set(this, 'dateMeeting', this.get('model.dateMeeting'));
  }
});
