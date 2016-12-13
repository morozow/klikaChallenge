import {
  fill as _fill, filter as _filter,
  flow as _flow, warning as _warning,
  eq as _eq, pick as _pick, has as _has,
  mapKeys as _mapKeys, remapKeys as _remapKeys,
  call as _call, instOf as _instOf, when as _when,
  map as _map,
} from './index';

import { get as _get } from './object';
export { pickAr3, noop } from './index';

export const fill = _fill.curry(2);
export const filter = _filter.curry(2);
export const flow = _flow.curry(2);
export const flowAr3 = _flow.curry(3);
export const flowAr4 = _flow.curry(4);
export const warning = _warning.curry(2);
export const get = _get.curry(3);
export const select = _get.rearg([1, 0]).curry(2);
export const pick = _pick.curry(2);
export const mapKeys = _mapKeys.curry(2);
export const remapKeys = _remapKeys.curry(2);
export const eq = _eq.curry(2);
export const call = _call.curry(2);
export const instOf = _instOf.curry(2);
export const when = _when.curry(2);
export const has = _has.curry(2);
export const whenAr3 = _when.curry(3);
export const whenAr4 = _when.curry(4);
export const map = _map.curry(2);

