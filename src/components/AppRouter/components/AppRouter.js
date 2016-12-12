import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Subject } from 'rxjs/Subject';
import { map as map$ } from 'rxjs/operator/map';
import { filter as filter$ } from 'rxjs/operator/filter';
import { defer } from 'rxjs/observable/defer';
import { fromPromise } from 'rxjs/observable/fromPromise';

import identity from 'lodash-es/identity';
import set from 'lodash-es/set';

import { Application } from 'components/Application';
import { Page, initPageState } from 'components/Page';

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

pageContainer$$.subscribe(async ({ callback, ...props }: PageSettings) => {
  // request preparing component data in case of each component type
  //    Also we can do it while require config and put preparing data to configuration
  //
  // load data according page configuration with streams

  // const initSettings$$ = new Subject();
  // initSettings$$::map$(({ type }) => defer(fromPromise(new Promise((resolve) => {
  //
  //   resolve({ type });
  // }))));

  const { view, update$$ } = props;

  // eslint-disable-next-line
  // const initialPageProps = await props.set('initials', require(`../data/${view}`));
  const initialPageProps = set(props, 'initials', {/* load initial data */});

  const Container = () => {
    return class PageContainer extends Component {

      state = {
        patch: void 0,
        pageState: initPageState(), // initPageState(),
      };

      patcher$subscriber = void 0;

      componentDidMount() {
        const { pageState } = this.state;
        // after route component change creates new pageState patcher
        const patcher$ = update$$::map$(identity);
        this.patcher$subscriber = patcher$.subscribe((patch) => {
          this.setState({ pageState: pageState.merge(patch), patch });
        });
      }

      componentWillUnmount() {
        this.patcher$subscriber.unsubscribe();
      }

      static render() {
        return <Page {...initialPageProps}/>;
      }
    };
  };
  callback(null, Container);
});

// @practice const requireComponent = (location, callback) => () => ...;

export class AppRouter extends Component {

  render() {
    // FIXME: replace from render? Is React Router re-renders after router changed?
    const event$$ = new Subject();
    const update$$ = new Subject();

    const requirePlaylistComponent = (_, callback) => {
      return require.ensure([], (require) => {
        const { Playlist } = require('components/Playlist');
        const config = {
          view: 'grid',
          RouterComponent: Playlist,
          event$$,
          update$$,
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
          event$$,
          update$$,
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
