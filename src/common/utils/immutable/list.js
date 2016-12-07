import { List } from 'immutable';
import type { List as TList } from 'immutable.js.flow';

/**
 * Convert plain js array to immutablle list
 *
 * @param {[]} array - The iterable
 * @returns {List} - The immutable list
 */
export function list(array: any[]): TList {
  return new List(array);
}

export { List };