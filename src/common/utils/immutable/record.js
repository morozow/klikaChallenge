import { Record } from 'immutable';
import type { Record as TRecord } from 'immutable.js.flow';

/**
 * Convert plain js object to immutable record
 *
 * @param {{}} object - The plain js object
 * @returns {Record} - The Record class
 */
export function record(object: Object): TRecord {
  return new Record(object);
}
