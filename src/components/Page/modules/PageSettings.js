import { record } from 'utils/immutable';
// import { getComponentName, getReactComponent } from 'react-relay/lib/RelayContainerUtils';
// import type {  } from 'react-relay/lib/RelayContainerUtils';


const PageSettingsRecord = record({
  // view type [view | grid | dialog | analytics | ...]
  view: void 0,

  // GraphQL fragments
  fragments: void 0,

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
    // const { RouterComponent = <NoComponentComponent /> } = args;
    // const ComponentClass = getReactComponent(RouterComponent);
    // const componentName = getComponentName(RouterComponent);
    // const containerName = getContainerName(RouterComponent);
    // const fragments = spec.fragments;
    // const fragmentNames = Object.keys(fragments);
    // const initialVariables = spec.initialVariables || {};
    // const prepareVariables = spec.prepareVariables;
    // const specShouldComponentUpdate = spec.shouldComponentUpdate;

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
