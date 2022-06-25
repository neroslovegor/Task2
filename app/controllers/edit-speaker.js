import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async updateSpeaker(speaker) {
      this.get('model').setProperties(speaker);   
      await this.get('model').save();
      
      this.transitionToRoute('speaker.index');
    }
  },

  reset() {
    set(this, 'id', this.get('model.id'));
    set(this, 'firstName', this.get('model.firstName'));
    set(this, 'middleName', this.get('model.middleName'));
    set(this, 'lastName', this.get('model.lastName'));
  }
});
