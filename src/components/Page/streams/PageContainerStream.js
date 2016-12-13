import { Subject } from 'rxjs/Subject';
import { PageContainerDefer, PageSettings } from 'components/Page';

export const pageContainer$$ = new Subject();
pageContainer$$.subscribe(({ callback, ...props }: PageSettings) => {
  PageContainerDefer
    .create(props)
    .then((Container) => callback(null, Container));
});
