import _constant from 'lodash-es/constant';
import _isNil from 'lodash-es/isNil';
import _isPlainObject from 'lodash-es/isPlainObject';
import _isBoolean from 'lodash-es/isBoolean';
import _isEmpty from 'lodash-es/isEmpty';

import { wrap } from './utils';

let index = 0;
export const uniqueId = (prefix = '') => (`${prefix}${index++}`);
export const isPlainObject = wrap(_isPlainObject);
export const isBoolean = wrap(_isBoolean);
export const isNil = wrap(_isNil);
export const constant = wrap(_constant);
export const isEmpty = wrap(_isEmpty);

export const warning = wrap(function warning(message, item) {
  _warning(message, item);
  return item;
});
