import curry from 'lodash-es/curry';
import curryRight from 'lodash-es/curryRight';
import rearg from 'lodash-es/rearg';
import partial from 'lodash-es/partial';
import spread from 'lodash-es/spread';
import rest from 'lodash-es/rest';

/**
 *
 * @param fnRef
 * @returns {function()} - The wrapped function
 */
export function wrap(fnRef) {
  const fn = fnRef;

  fn.partial = (args) => wrap(partial(fn, args));
  fn.rearg = (indexes) => wrap(rearg(fn, indexes));
  fn.curry = (arity) => wrap(curry(fn, arity));
  fn.curryRight = (arity) => wrap(curryRight(fn, arity));
  fn.ary = function ary(length) {
    const newFn = function arrFunc(...args) {
      return fn.apply(this, args);
    };
    Object.defineProperty(newFn, 'length', length);
    return newFn;
  };
  fn.spread = (startPosition = 0) => wrap(spread(fn, startPosition));
  fn.rest = (startPosition = 0) => wrap(rest(fn, startPosition));

  return fn;
}

