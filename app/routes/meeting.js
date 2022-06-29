import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  // queryParams: {
  //   search: {
  //     refreshModel: false 
  //   },
  //   tags_like: {
  //     refreshModel: false
  //   }
  // },

  //dataService: service('data'),
  model() {
    //return this.get('store').findAll('meeting');
    // return this.get('store').findAll('meeting');
    return RSVP.hash({
      books: this.get('store').findAll('book'),
      speakers: this.get('store').findAll('speaker'),
      meetings: this.get('store').findAll('meeting')
      //meetings: this.store.query('meeting', 'Ф')
    });
  },

  actions: {
    sessionChanged: function() {
      this.refresh();
    },
    
    // loading() {
    //   return false;
    // }
  }
});
