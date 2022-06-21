import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    sessionChanged: function() {
      this.refresh();
    }
  },
  setupController(controller/*, model*/) {
    this._super(...arguments);
    controller.reset();
  }
});
