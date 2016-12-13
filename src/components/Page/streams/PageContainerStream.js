import { Subject } from 'rxjs/Subject';
import { PageContainerDefer, PageSettings } from 'components/Page';

import { filter as filter$ } from 'rxjs/operator/filter';

export const VIEWS_TYPES = {
  grid: 'grid',
  view: 'view',
};
export const PAGE_CONTAINER_VIEWS = [VIEWS_TYPES.grid, VIEWS_TYPES.view];

export const pageContainer$$ = new Subject();
pageContainer$$
  ::filter$(({ view }) => PAGE_CONTAINER_VIEWS.includes(view))
  .subscribe(async ({ callback, ...props }: PageSettings) => {
    PageContainerDefer
      .create(props)
      .then((Container) => callback(null, Container));
  });
