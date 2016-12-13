// @flow 

import capitalize from 'lodash-es/capitalize';
import _trim from 'lodash-es/trim';

import { wrap } from './utils';

/** @function */
export const funcCapitalize = wrap(capitalize);
export const trim = wrap(_trim);

export const escapeRegExp = wrap(function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
});
