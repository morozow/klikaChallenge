export { map, Map } from './map';
export { list } from './list';
export { set } from './set';
export { record } from './record';

import { default as immutable } from 'immutable';

export const isMap = immutable.Map.isMap;
export const isList = immutable.List.isList;
export const fromJS = immutable.fromJS;

export const directionSort = (list, by, direction, directions = { DESC: 'DESC', ASC: 'ASC' }) => {
  return list
    .sortBy(item => item[by])
    .update((l) => (direction === directions.DESC ? l.reverse() : l));
};
