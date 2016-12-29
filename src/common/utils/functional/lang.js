import _eq from 'lodash-es/eq';
import _clone from 'lodash-es/clone';
import _isObject from 'lodash-es/isObject';
import _isFunction from 'lodash-es/isFunction';

import { wrap } from './utils';

export const isObject = wrap(_isObject);
export const eq = wrap(_eq);
export const clone = wrap(_clone);
export const isFunction = wrap(_isFunction);
