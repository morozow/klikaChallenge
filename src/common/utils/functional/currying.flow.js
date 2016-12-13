// @flow 

import {
  fill as fn$fill, filter as fn$filter,
  flow as fn$flow, warning as fn$warning,
  eq as fn$eq, pick as fn$pick,
  mapKeys as fn$mapKeys, remapKeys as fn$remapKeys,
  call as fn$call, instOf as fn$instOf,
  when as fn$when, has as fn$has,
} from './index';

import { funcGet } from './object';
export { pickAr3, noop } from './index';

export const fill = fn$fill.curry(2);
export const filter = fn$filter.curry(2);
export const flow = fn$flow.curry(2);
export const flowAr3 = fn$flow.curry(3);
export const flowAr4 = fn$flow.curry(4);
export const warning = fn$warning.curry(2);
export const get = funcGet.curry(3);
export const select = funcGet.rearg([1, 0]).curry(2);
export const pick = fn$pick.curry(2);
export const mapKeys = fn$mapKeys.curry(2);
export const remapKeys = fn$remapKeys.curry(2);
export const eq = fn$eq.curry(2);
export const call = fn$call.curry(2);
export const instOf = fn$instOf.curry(2);
export const when = fn$when.curry(2);
export const has = fn$has.curry(2);
export const whenAr3 = fn$when.curry(3);
export const whenAr4 = fn$when.curry(4);

