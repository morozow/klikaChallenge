import { pageContainer$$ } from 'components/Page';
import { Subject } from 'rxjs/Subject';

const requirePlaylistComponent = (_, callback) => {
  return require.ensure([], (require) => {
    const { Playlist } = require('components/Playlist');

    const config = {
      view: 'grid',
      RouterComponent: Playlist,
      event$$: new Subject(),
      update$$: new Subject(),
      callback,
    };

    pageContainer$$.next(config);
  });
};

const requireTrackComponent = (_, callback) => {
  return require.ensure([], (require) => {
    const { Track } = require('components/Track');
    const config = {
      view: 'view',
      RouterComponent: Track,
      event$$: new Subject(),
      update$$: new Subject(),
      callback,
    };

    pageContainer$$.next(config);
  });
};

const requireTrackDialogComponent = (dialogType) => (_, callback) => {
  return require.ensure([], (require) => {
    const { TrackDialog } = require('components/Track');
    const config = {
      view: 'view',
      dialogType,
      RouterComponent: TrackDialog,
      event$$: new Subject(),
      update$$: new Subject(),
      callback,
    };

    pageContainer$$.next(config);
  });
};

export const lazyComponents = {
  playList: requirePlaylistComponent,
  track: {
    view: requireTrackComponent,
    dialog: requireTrackDialogComponent,
  },
};