import _reduce from 'lodash-es/reduce';
import _find from 'lodash-es/find';
import _filter from 'lodash-es/filter';

import { wrap } from './utils';

export const reduce = wrap(_reduce);
export const find = wrap(_find);
export const filter = wrap(_filter);
