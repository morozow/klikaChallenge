import { record } from 'utils/immutable';
import eq from 'lodash-es/eq';

export const EVENT_TYPE_ROUTER = 'router';

const RouterEventRecord = record({
  type: EVENT_TYPE_ROUTER,
  params: void 0,
});

export class RouterEvent extends RouterEventRecord {
  static create(...args) {
    return new RouterEvent(...args);
  }

  static get empty() {
    return RouterEvent.create();
  }

  constructor(...args) {
    const context = super(...args);
    return context;
  }
}

export const recognizeRouterEvent = ({ type }) => eq(EVENT_TYPE_ROUTER, type);
