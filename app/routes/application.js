import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    error(error, transition) {
      if (transition) {
        transition.abort();
      }
      this.intermediateTransitionTo('error', { error: error.message });
      //return true;
    }
  }
});
