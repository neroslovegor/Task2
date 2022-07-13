import Controller from '@ember/controller';
import { get } from '@ember/object';


export default Controller.extend({
  actions: {
    async saveUser(user) {
      let newUser;
      try {
        newUser = this.get('store').createRecord('user', user);
        await newUser.save();

        this.transitionToRoute('index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
