import errorLog  from '../loggers/error';

export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.register('logger:error', errorLog);
  application.inject('component', 'applicationError', 'logger:error');
  application.inject('controller', 'applicationError', 'logger:error');
  application.inject('route', 'applicationError', 'logger:error');
}

export default {
  initialize
};
