import Relay from 'react-relay';
import { Subject } from 'rxjs/Subject';
import { PageContainerDefer, PageSettings } from 'Page';

import { filter as filter$ } from 'rxjs/operator/filter';
import { map as map$ } from 'rxjs/operator/map';

import assign from 'lodash-es/assign';

// @section('constants')
export const VIEWS_TYPES = {
  grid: 'grid',
  view: 'view',
};
export const PAGE_CONTAINER_VIEWS = [VIEWS_TYPES.grid, VIEWS_TYPES.view];

// @section('logic')
const chooseViewTypes = ({ view }: PageSettings) => PAGE_CONTAINER_VIEWS.includes(view);
const relayContainerWithFragments = (settings: PageSettings) => {
  const { fragments, initialVariables = void 0, RouterComponent } = settings;
  return assign(settings, {
    RouterComponent: Relay.createContainer(RouterComponent, { fragments, initialVariables }),
  });
};
const initAndLoadPageContainer = ({ callback, ...props }: PageSettings) => {
  PageContainerDefer
    .create(props)
    .then((Container) => callback(null, Container));
};

// @section('main')
export const pageContainer$$ = new Subject();
pageContainer$$

  // Types filter. Use this to exclude container creation from process
  ::filter$(chooseViewTypes)

  // Relay container wrapper
  ::map$(relayContainerWithFragments)

  // Creates container from lazy loaded component
  // with process require.ensure callback on container.
  .subscribe(initAndLoadPageContainer);
