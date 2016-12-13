import { record } from 'utils/immutable';

const PageSettingsRecord = record({
  // view type [view | grid | dialog | analytics | ...]
  view: void 0,

  // component to render as view
  RouterComponent: null, // DummyComponent, // 404 can be used

  // Dialog Type [new | edit | etc ..]
  dialogType: void 0,

  // Page streams
  event$$: void 0,
  update$$: void 0,

  // initial container state. Depends on page type in general
  initials: void 0,

  // appState, // not used now

  // router callback to start rendering
  callback: () => console.warning('Callback is not ready yet.'),
});

export class PageSettings extends PageSettingsRecord {
  static create(...args) {
    return new PageSettings(...args);
  }

  static get empty() {
    return PageSettings.create();
  }

  constructor(...args) {
    const context = super(...args);
    return context;
  }
}
