import React, { Component, PropTypes } from 'react';
import { Header, View, Footer } from 'components';

import '../stylesheets/Page.scss';

export class Page extends Component {
  render() {
    const { event$$, update$$, pageState, RouterComponent, view } = this.props;

    const RenderComponent = React
      .cloneElement(<RouterComponent />, { pageState, event$$ });

    return (
      <div className="Page">
        <Header pageState={pageState} view={view}/>
        {RenderComponent}
        <Footer/>
      </div>
    );
  }
}

Page.propTypes = {
  pageState: PropTypes.any,
  event$$: PropTypes.any,
  view: PropTypes.string,
  RouterComponent: PropTypes.any,
  // children: PropTypes.any,
};
