import React, { Component, PropTypes } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

import '../stylesheets/Page.scss';

/**
 * Includes Router params
 */
export class Page extends Component {
  render() {
    const { event$$, update$$, pageState, RouterComponent, view } = this.props;

    const RenderComponent = React
      .cloneElement(<RouterComponent />, { pageState, event$$, update$$ });

    return (
      <div className="Page">
        <Header pageState={pageState} view={view} update$$={update$$}/>
        {RenderComponent}
        <Footer/>
      </div>
    );
  }
}

Page.propTypes = {
  pageState: PropTypes.any,
  event$$: PropTypes.any,
  update$$: PropTypes.any,
  view: PropTypes.string,
  RouterComponent: PropTypes.any,
  // children: PropTypes.any,
};
