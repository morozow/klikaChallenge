import React, { Component, PropTypes } from 'react';
import { Playlist } from 'components/Playlist';

import '../stylesheets/View.scss';

export class View extends Component {

  render() {
    const { event$$ } = this.props;
    return (
      <div className="View">
        <Playlist event$$={event$$}/>
      </div>
    );
  }
}

View.propTypes = {
  event$$: PropTypes.any,
};
