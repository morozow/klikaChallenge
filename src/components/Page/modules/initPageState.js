import { map } from 'utils/immutable';

export function initPageState(defaultPageState = {}) {
  return map({
    track: void 0,
    team: void 0,
  }).merge(defaultPageState);
}
