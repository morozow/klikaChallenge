import React, { Component } from 'react';
import { Page, Loading, initPageState, PageStateStorage } from 'components/Page';

// create page cache storage instance
const StateStorage = new PageStateStorage();

export class PageContainerDefer extends Component {
  static async create(props) {
    return class PageContainer extends PageContainerDefer {

      state = {
        patch: void 0,
        pageState: !StateStorage.isEmpty()
          ? StateStorage.last().get('pageState')
          : initPageState(), // initPageState(),
        component: void 0,
      };

      patcher$subscriber = void 0;

      componentWillMount() {
        const { RouterComponent } = props;

        // after route component change creates new pageState patcher
        this.patcher$subscriber = props.update$$.subscribe((patch) => {
          const { pageState } = this.state;
          this.setState({ pageState: pageState.merge(patch), patch });
        });

        this.setState({ component: RouterComponent });
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
    };
  }
}
