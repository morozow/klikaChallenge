import React, { Component } from 'react';
import { Page, initPageState, PageStateStorage } from 'components/Page';

// create page cache storage instance
const StateStorage = new PageStateStorage();

export class ContainerDefer extends Component {
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
