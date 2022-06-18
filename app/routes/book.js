import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: false
    },
    search_by_tag: {
      refreshModel: false
    }
  },

  dataService: service('data'),
  model({ search, search_by_tag }) {
    if (search || search_by_tag) {
      return this.get('dataService').getBooks(search);
    }
    return this.get('dataService').getBooks();
  },

  actions: {
    sessionChanged: function() {
      this.refresh();
    }
  }
});
