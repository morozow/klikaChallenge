import _capitalize from 'lodash-es/capitalize';
import _trim from 'lodash-es/trim';
import _isString from 'lodash-es/isString';

import { wrap } from './utils';

/** @function */
export const capitalize = wrap(_capitalize);
export const trim = wrap(_trim);
export const isString = wrap(_isString);

export const escapeRegExp = wrap(function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
});
