import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: false 
    },
    tags_like: {
      refreshModel: false
    }
  },

  dataService: service('data'),
  model({ search, tags_like }) {
    return this.get('store').query('book', { q: search, tags_like: tags_like });
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
