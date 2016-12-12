import { record } from 'utils/immutable';

const PageContainerRecord = record({
  type: null,
  component: void 0,
  appState: void 0, // init AppState
});

export class PageContainer extends PageContainerRecord {
  static create(...args) {
    return new PageContainer(...args);
  }

  static get empty() {
    return PageContainer.create();
  }

  constructor(...args) {
    const context = super(...args);
    return context;
  }
}