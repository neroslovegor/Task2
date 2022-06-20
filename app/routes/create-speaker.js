import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    return EmberObject.create({
      firstName: '',
      middleName: '',
      lastName: ''
    });
  },
  actions: {
    sessionChanged: function() {
      this.refresh();
    }
  }
});
