import React, { Component, PropTypes } from 'react';
import { Header, View, Footer } from 'components';
import { Subject } from 'rxjs/Subject';

import '../stylesheets/Page.scss';

export class Page extends Component {
  render() {
    const { event$$, update$$, test$$, pageState, RouterComponent, view } = this.props;
    console.log('Page props: ', this.props);

    const RenderComponent = React
      .cloneElement(<RouterComponent />, { pageState, event$$, update$$, test$$ });

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
