export { map, Map } from './map';
export { list, List } from './list';
export { set } from './set';
export { record } from './record';

import { default as immutable } from 'immutable';

export const isMap = immutable.Map.isMap;
export const isList = immutable.List.isList;
export const fromJS = immutable.fromJS;

export const $mToJS = ($l) => $l.toJS();
export const $lToJS = ($m) => $m.toJS();

export const $lSortBy = (fn) => ($l) => $l.sortBy(fn);
export const $mSortBy = (fn) => ($m) => $m.sortBy(fn);

export const $mMap = (fn) => ($m) => $m.map(fn);
export const $lMap = (fn) => ($l) => $l.map(fn);


export const directionSort = (list, by, direction, directions = { DESC: 'DESC', ASC: 'ASC' }) => {
  return list
    .sortBy(item => item[by])
    .update((l) => (direction === directions.DESC ? l.reverse() : l));
};
