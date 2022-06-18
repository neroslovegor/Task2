import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  dataService: service('data'),
  model() {
    return this.get('dataService').getSpeakers();
  }
});
