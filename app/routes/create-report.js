import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  // setupController(controller, model) {
  //   this._super(...arguments);
  //   //controller.reset();
  // }

  model() {
    return RSVP.hash({
      books: this.get('store').findAll('book'),
      speakers: this.get('store').findAll('speaker')
    });
  },
});
