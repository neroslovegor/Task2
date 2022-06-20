import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async saveSpeaker(speaker) {
      try {
        await this.get('dataService').updateSpeaker(speaker);
        this.transitionToRoute('speaker.index');
      } catch (error) {
        this.send('error', new Error('Connection failed'));
      }
    }
  }
});
