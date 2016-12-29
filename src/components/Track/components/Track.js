import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import '../stylesheets/Track.scss';

export class Track extends Component {
  render() {
    const { pageState } = this.props;
    return (
      <div className="Track">
        <h2 className="Track__Title">
          {`${pageState.getIn(['track', 'song'])}`}
        </h2>
        <button onClick={() => browserHistory.push('/track/dialog')}>Add Track</button>
        <button onClick={() => browserHistory.push('/playlist')}>Go back...</button>
      </div>
    );
  }
}

Track.propTypes = {
  pageState: PropTypes.any,
};
