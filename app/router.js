import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('book', { path: '/books'}, function() {});
  this.route('create-book');
  this.route('edit-book', { path: '/books/:id/edit-book'});

  this.route('speaker', { path: '/speakers'}, function() {});
  this.route('create-speaker');
  this.route('edit-speaker', { path: '/speakers/:id/edit-speaker'});

  this.route('meeting', { path: '/meetings'}, function() {});
  this.route('create-meeting');
  this.route('edit-meeting', { path: '/meetings/:id/edit-meeting'});

  this.route('create-report');
  this.route('edit-report', { path: '/:id/edit-report'});

  this.route('404', { path: '*path'});
  this.route('error', { path: '/:error'});
});

export default Router;
