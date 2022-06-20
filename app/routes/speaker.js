import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: false
    }
  },

  dataService: service('data'),
  model({ search }) {
    if (search) {
      return this.get('dataService').getSpeakers(search);
    }
    return this.get('dataService').getSpeakers();
  },

  actions: {
    sessionChanged: function() {
      this.refresh();
    },
    
    loading() {
      return false;
    }
  }
});
