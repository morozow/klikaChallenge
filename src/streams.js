import { Subject } from 'rxjs/Subject';
/**
 * Creates default state with update and event streams
 * @returns {{update$$: Subject, event$$: Subject}}
 */
export function initApplicationStreams() {
  const event$$ = new Subject();

  return { event$$ };
}
