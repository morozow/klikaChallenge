import React, { Component } from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import Relay from 'react-relay';

import { Application } from 'components/Application';

import { lazyComponents } from '../modules/lazyComponents';

const PlaylistQuery = {
  playlist: comp => Relay.QL`
      query StartRelay {
          playlist {
              ${comp.getFragment('playlist')}
          }
      }
  `,
};


export class AppRouter extends Component {

  render() {
    const { playList, track } = lazyComponents;

    return (
      <Router
        history={browserHistory}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
      >
        <Route path={'/'} component={Application}>
          <IndexRoute getComponent={playList} queries={PlaylistQuery}/>
          <Route path={'playlist'} getComponent={playList} queries={PlaylistQuery}/>
          <Route path={'track'} getComponent={track.view} queries={PlaylistQuery}/>
          <Route path={'track/dialog'} getComponent={track.dialog('new')} queries={PlaylistQuery}>
            <Route path={':id'} getComponent={track.dialog('edit')} queries={PlaylistQuery}/>
          </Route>
        </Route>
      </Router>
    );
  }
}
