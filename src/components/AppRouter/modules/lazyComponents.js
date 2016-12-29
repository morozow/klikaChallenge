import Relay from 'react-relay';
import { pageContainer$$ } from 'Page';
import { Subject } from 'rxjs/Subject';

const requirePlaylistComponent = (_, callback) => {
  return require.ensure([], (require) => {
    const { Playlist } = require('Playlist');

    const config = {
      view: 'grid',
      // @try
      fragments: {
        playlist: () => Relay.QL`
            fragment on Playlist {
                id,
                tracks(first: $first) {
                    edges {
                        node {
                            id,
                            index,
                            song,
                            artist,
                            genre,
                            year
                        },
                        cursor
                    }
                }
            }
        `,
      },
      initialVariables: {
        first: 11,
      },
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
    const { Track } = require('Track');
    const config = {
      view: 'view',
      fragments: {
        playlist: () => Relay.QL`
            fragment on Playlist {
                id,
                tracks(first: 10) {
                    edges {
                        node {
                            id,
                            song,
                            index,
                            artist,
                            genre,
                            year
                        },
                        cursor
                    }
                }
            }
        `,
      },
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
    const { TrackDialog } = require('Track');
    const config = {
      view: 'view',
      fragments: {
        playlist: () => Relay.QL`
            fragment on Playlist {
                id,
                tracks(first: 10) {
                    edges {
                        node {
                            id,
                            index,
                            song,
                            artist,
                            genre,
                            year
                        },
                        cursor
                    }
                }
            }
        `,
      },
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
