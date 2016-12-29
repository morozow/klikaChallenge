import { wrap } from './utils';

import _debounce from 'lodash-es/debounce';
import _id from 'lodash-es/identity';
import _throttle from 'lodash-es/throttle';
import _flow from 'lodash-es/flow';
import _cond from 'lodash-es/cond';

/**
 * (...Function[]) -> Function
 *
 * @function
 */
export const flow = wrap(function funcFlow(...args) {
  return wrap(_flow(...args));
});
export const cond = wrap(_cond);
export const debounce = wrap(_debounce);
export function when(...args) {
  return _cond(...args);
}
export const id = wrap(_id);
export const throttle = wrap(_throttle);

wrap(when);

export const call = wrap(function safeFuncCall(func, value) {
  let result;
  try {
    result = func(value);
  } catch (error) {
    result = error;
  }
  return result;
});
