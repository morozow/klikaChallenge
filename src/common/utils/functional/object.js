import { wrap } from './utils';
import { flow } from './function';
import { fill, range, flatten } from './array';

import _has from 'lodash-es/has';
import _pick from 'lodash-es/pick';
import _mapKeys from 'lodash-es/mapKeys';
import _get from 'lodash-es/get';
import _set from 'lodash-es/set';
import _assign from 'lodash-es/assign';

export const get = wrap(_get);
export const pick = wrap(_pick);
export const mapKeys = wrap(_mapKeys);
export const assign = wrap(_assign);
export const set = wrap(_set);
export const has = wrap(_has);

export const create = wrap(function create(args, Constructor) {
  return new Constructor(...args);
});

/**
 * (string[]|string) -> (string[]|string) -> (Record) -> Record
 */
export const pickAr3 = wrap(function pickAr3(object, props) {
  return _pick(object, flatten(props));
}).rest(1).curryRight(3);

export function instOf(prototype, object) {
  return object instanceof prototype;
}

wrap(instOf);

/**
 * (Map) -> (Record) -> Record
 */
export const remapKeys = wrap(function remapKeys(newKeyMap, object) {
  return mapKeys(object, flow([
    (x) => x,
    fill.curry(2)(range(0, 2)),
    get.spread(1).curry(2)(newKeyMap),
  ]).rearg(1, 0));
});
