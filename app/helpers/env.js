import { get } from '@ember/object'
import { helper } from '@ember/component/helper';
import config from 'task2/config/environment';

export function env([propertyName]) {
  return get(config, propertyName);
}

export default helper(env);
