// @flow 

import { wrap } from './utils';
import { funcFlow as flow } from './function';
import {
  funcFill as fill, funcRange as range,
  funcFlatten as flatten,
} from './array';

import has from 'lodash-es/has';
import pick from 'lodash-es/pick';
import mapKeys from 'lodash-es/mapKeys';
import get from 'lodash-es/get';
import set from 'lodash-es/set';
import assign from 'lodash-es/assign';

export const funcGet = wrap(get);
export const funcPick = wrap(pick);
export const funcMapKeys = wrap(mapKeys);
export const funcAssign = wrap(assign);
export const funcSet = wrap(set);
export const funcHas = wrap(has);

export const create = wrap(function create(args, Constructor) {
  return new Constructor(...args);
});

/**
 * (string[]|string) -> (string[]|string) -> (Record) -> Record
 */
export const funcPickAr3 = wrap(function pickAr3(object, props) {
  return pick(object, flatten(props));
}).rest(1).curryRight(3);

export function funcInstOf(prototype: Object, object: Object) {
  return object instanceof prototype;
}

wrap(funcInstOf);

/**
 * (Map) -> (Record) -> Record
 */
export const funcRemapKeys = wrap(function remapKeys(newKeyMap, object) {
  return funcMapKeys(object, flow([
    (x) => x,
    fill.curry(2)(range(0, 2)),
    funcGet.spread(1).curry(2)(newKeyMap),
  ]).rearg(1, 0));
});
