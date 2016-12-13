import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Application } from 'components/Application';

import { lazyComponents } from '../modules/lazyComponents';

export class AppRouter extends Component {

  render() {
    const { playList, track } = lazyComponents;

    return (
      <Router history={browserHistory}>
        <Route path={'/'} component={Application}>
          <IndexRoute getComponent={playList} />
          <Route path={'playlist'} getComponent={playList} />
          <Route path={'track'} getComponent={track.view}/>
          <Route path={'track/dialog'} getComponent={track.dialog('new')}>
            <Route path={':id'} getComponent={track.dialog('edit')}/>
          </Route>
        </Route>
      </Router>
    );
  }
}
