import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async createSpeaker(speaker) {
      try {
        await this.get("dataService").createSpeaker(speaker);
        this.get('model').set('firstName', speaker.firstName);
        this.get('model').set('middleName', speaker.middleName);
        this.get('model').set('lastName', speaker.lastName);

        this.transitionToRoute('speaker.index');
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
