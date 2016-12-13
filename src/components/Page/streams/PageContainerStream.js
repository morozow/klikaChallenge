import { Subject } from 'rxjs/Subject';
import set from 'lodash-es/set';
import { ContainerDefer, PageSettings } from 'components/Page';

export const pageContainer$$ = new Subject();
pageContainer$$.subscribe(async ({ callback, ...props }: PageSettings) => {
  // request preparing component data in case of each component type
  //    Also we can do it while require config and put preparing data to configuration
  //
  // load data according page configuration with streams

  // eslint-disable-next-line
  // const initialPageProps = await props.set('initials', require(`../data/${view}`));
  const initialPageProps = set(props, 'initials', {/* load initial data */});

  ContainerDefer
    .create(initialPageProps)
    .then((Container) => callback(null, Container));
});
