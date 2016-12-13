import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Subject } from 'rxjs/Subject';
import { map as map$ } from 'rxjs/operator/map';
import { filter as filter$ } from 'rxjs/operator/filter';
import { defer } from 'rxjs/observable/defer';
import { fromPromise } from 'rxjs/observable/fromPromise';

import identity from 'lodash-es/identity';
import set from 'lodash-es/set';
import last from 'lodash-es/last';
import isEmpty from 'lodash-es/isEmpty';

import { Application } from 'components/Application';
import { Page, initPageState } from 'components/Page';

import { list as createList, map as createMap } from 'utils/immutable';

import { PageSettings } from '../modules/PageSettings';

const pageContainer$$ = new Subject();

// const abstractFilterDesicion = ({ view, dialog, grid }) => cond([
//   [view, ({ type }) => eq(type, 'view')],
//   [dialog, ({ type }) => eq(type, 'dialog')],
//   [grid, ({ type }) => eq(type, 'grid')],
// ]);
//
// const abstractMapDesicion = ({ view, dialog, grid }) => cond([
//   [view, containerWrapper],
//   [dialog, containerWrapper],
//   [grid, containerWrapper],
// ]);
// const pageMapDesicion = abstractMapDesicion();
// const pageDesicionX = pageContainer$$::map(pageDecision);

// additional cache manage? level up for all application?
// Maybe Redis cached state here? Something like fast cache/local, offline cache/etc...
class StateStorageCache {
  storage = createList([]);
  save(state) {
    this.storage = this.storage.push(createMap(state));
    return this;
  }
  last() {
    return this.storage.isEmpty() ? null : this.storage.last();
  }
  isEmpty() {
    return this.storage.isEmpty();
  }
}
const StateStorage = new StateStorageCache();

// FIXME A bit shitty solution with globals
class ContainerDefer extends Component {
  static async create(props) {
    return class PageContainer extends ContainerDefer {

      state = {
        patch: void 0,
        pageState: !StateStorage.isEmpty()
          ? StateStorage.last().get('pageState')
          : initPageState(), // initPageState(),
      };

      patcher$subscriber = void 0;

      componentWillMount() {
        // after route component change creates new pageState patcher
        this.patcher$subscriber = props.update$$.subscribe((patch) => {
          console.log('Update Page State...', patch);
          const { pageState } = this.state;
          this.setState({ pageState: pageState.merge(patch), patch });
        });
      }

      componentWillUnmount() {
        StateStorage.save(this.state);
        this.patcher$subscriber.unsubscribe();
      }

      render() {
        const { pageState } = this.state;
        return <Page {...props} pageState={pageState}/>;
      }
    };
  }
}

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

// @practice const requireComponent = (location, callback) => () => ...;

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
