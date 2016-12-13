import _fill from 'lodash-es/fill';
import _filter from 'lodash-es/filter';
import _zip from 'lodash-es/zipObject';
import _fromPairs from 'lodash-es/fromPairs';
import _range from 'lodash-es/range';
import _flatten from 'lodash-es/flatten';
import _invert from 'lodash-es/invert';
import _head from 'lodash-es/head';
import _map from 'lodash-es/map';


import { wrap } from './utils';

export const flatten = wrap(_flatten);
export const range = wrap(_range);
export const fill = wrap(_fill);
export const filter = wrap(_filter).rearg([1, 0]);
export const zip = wrap(_zip);
export const invert = wrap(_invert);
export const fromPairs = wrap(_fromPairs);
export const invertZip = wrap((items) => invert(fromPairs(items)));
export const head = wrap(_head);
export const map = wrap(_map).rearg([1, 0]);
