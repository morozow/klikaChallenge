import { record } from 'utils/immutable';
import eq from 'lodash-es/eq';

export const EVENT_TYPE_FILTER = 'filter';

const FilterEventRecord = record({
  type: EVENT_TYPE_FILTER,
  event: {
    originalEvent: void 0,
    field: '',
  },
});

export class FilterEvent extends FilterEventRecord {
  static create(...args) {
    return new FilterEvent(...args);
  }

  static get empty() {
    return FilterEvent.create();
  }

  constructor(...args) {
    const context = super(...args);
    return context;
  }

  get value() {
    return this.event.originalEvent.target.value;
  }

  get field() {
    return this.event.field;
  }
}

export const recognizeFilterEvent = ({ type }) => eq(EVENT_TYPE_FILTER, type);
