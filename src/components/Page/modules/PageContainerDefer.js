import React, { Component } from 'react';
import Relay from 'react-relay';

import merge from 'lodash-es/merge';

import { Page, Loading, initPageState, PageStateStorage } from 'Page';

import { list as createList } from 'utils/immutable';

// create page cache storage instance
const StateStorage = new PageStateStorage();

export class PageContainerDefer extends Component {
  static async create(props) {
    // FIXME: Or make relay transformation here
    // FIXME: (or in creation stream? or in ensure?)
    class PageContainer extends PageContainerDefer {

      state = {
        patch: void 0,
        pageState: !StateStorage.isEmpty()
          ? StateStorage.last().get('pageState')
          : initPageState(), // initPageState(),
        component: void 0,
      };

      patcher$subscriber = void 0;

      async componentWillMount() {
        const { RouterComponent } = merge(props, this.props);
        this.patcher$subscriber = props.update$$.subscribe((patch) => {
          const { pageState } = this.state;
          this.setState({ pageState: pageState.merge(patch), patch });
        });

        // async get initial page data
        this.setState({ component: RouterComponent });
        // await (() => {
        //   setTimeout(() => {
        //     this.setState({ component: RouterComponent });
        //   }, 1000);
        // })();
      }

      componentWillUnmount() {
        StateStorage.save(this.state);
        this.patcher$subscriber.unsubscribe();
      }

      render() {
        const { pageState, component } = this.state;

        if (!component) {
          return <Loading />;
        }


        return (<Page
          {...props}
          component={component}
          pageState={pageState}
        />);
      }
    }

    const { fragments, initialVariables } = props;
    return Relay.createContainer(PageContainer, { initialVariables, fragments });
  }
}
