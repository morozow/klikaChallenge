import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Subject } from 'rxjs/Subject';

import { Application } from 'components/Application';
import { pageContainer$$ } from 'components/Page';

export class AppRouter extends Component {

  render() {
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

    return (
      <Router history={browserHistory}>
        <Route path={'/'} component={Application}>
          <IndexRoute path={''} getComponent={requirePlaylistComponent} />
          <Route path={'playlist'} getComponent={requirePlaylistComponent} />
          <Route path={'track'} getComponent={requireTrackComponent}/>
        </Route>
      </Router>
    );
  }
}
