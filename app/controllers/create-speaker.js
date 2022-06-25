import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createSpeaker(speaker) {
      let newSpeaker = this.get('store').createRecord('speaker', speaker);
      await newSpeaker.save();

      this.transitionToRoute('speaker.index');
    }
  },

  reset() {
    set(this, 'firstName', '');
    set(this, 'middleName', '');
    set(this, 'lastName', '');
  }
});
