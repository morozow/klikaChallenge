import { map, Map } from 'utils/immutable';

class PageState extends Map {
  constructor(...args) {
    super(...args);
  }

  static create(...args) {
    return new PageState(...args);
  }
}

export function initPageState(defaultPageState = {}) {
  return map({
    player: map({
      play: false,
      track: void 0,
    }),
    track: void 0,
    team: void 0,
  }).merge(defaultPageState);
}
