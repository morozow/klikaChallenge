import { Map } from 'immutable';
import type { Map as TMap } from 'immutable.js.flow';

/**
 * Convert object or list to immutable map
 *
 * @param {Array<Array<string, any>>|{}} likeMapStructure - The object
 * @returns {Map} - The immutable map
 */
export function map(likeMapStructure: Array<[string, any]>|Object): TMap {
  return new Map(likeMapStructure);
}

export { Map };
