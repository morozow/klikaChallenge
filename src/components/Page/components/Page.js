import React, { Component, PropTypes } from 'react';
import { Header, View, Footer } from 'components';

import '../stylesheets/Page.scss';

export class Page extends Component {
  render() {
    const { event$$ } = this.props;

    return (
      <div className="Page">
        <Header/>
        <View event$$={event$$}/>
        <Footer/>
      </div>
    );
  }
}

Page.propTypes = {
  event$$: PropTypes.any,
};
