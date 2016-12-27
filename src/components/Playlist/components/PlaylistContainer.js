import Relay from 'react-relay';
import { Playlist } from 'Playlist';

export const PlaylistContainer = Relay.createContainer(Playlist, {
  fragments: {
    playlist: () => Relay.QL`
      fragment on Playlist {
        id,
      }
    `,
  },
});
