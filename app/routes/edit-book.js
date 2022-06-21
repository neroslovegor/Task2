import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  dataService: service('data'),
  model({ id }) {
    return this.get("dataService").getBook(id);
  },
  setupController(controller/*, model*/) {
    this._super(...arguments);
    controller.reset();
  }
});