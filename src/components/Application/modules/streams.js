import { Subject } from 'rxjs/Subject';
/**
 * Creates default state with update and event streams
 * Common for all pages state (e.g. playing track, current organization)
 * @returns {{update$$: Subject, event$$: Subject}}
 */
export function initApplicationStreams() {
  const event$$ = new Subject();
  const update$$ = new Subject();

  return {
    event$$,
    update$$,
  };
}
