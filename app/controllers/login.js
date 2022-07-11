import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),

  actions: {
    async login(user) {
      try {
        await this.get('session').authenticate('authenticator:jwt', {
          email: user.email,
          password: user.password
        });
      }
      catch(e) {
        this.send('error', e);
      }
    },

    error(error, transition) {

      // const applicationError = get(this, 'applicationError');// error logger
      // applicationError.saveError('Error in login user')

      if (error instanceof Error) {
        return true;
      }
      this.set('errors', error.json.errors);
      // this.set('errors', error.errors);
      return false;
    }
  },

  resetErrors() {
    this.set('errors', {});
  }
});
