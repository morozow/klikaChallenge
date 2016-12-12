import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import '../stylesheets/Track.scss';

export class Track extends Component {
  render() {
    return (
      <div className="Track">
        <h2 className="Track__Title">
          Playlist Track
          <button onClick={(e) => browserHistory.push('/playlist')}>Go back...</button>
        </h2>
      </div>
    );
  }
}
