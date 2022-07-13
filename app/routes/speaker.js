import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  dataService: service('data'),
  model({ search }) {
    if (search) {
      return this.get('store').query('speaker', { q: search });
    }
    return this.get('store').findAll('speaker');
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
