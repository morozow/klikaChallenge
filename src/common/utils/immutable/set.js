import { Set } from 'immutable';
import type { Set as TSet } from 'immutable.js.flow';

/**
 * Convert plain js array to immutable set
 *
 * @param {[]} list - The object with iterable interface
 * @returns {Set} - The immutable set
 */
export function set(list: any[]): TSet {
  return new Set(list);
}
