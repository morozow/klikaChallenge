import React, { Component } from 'react';

import '../stylesheets/Header.scss';

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h2 className="Header__Title">Playlist Application</h2>
      </div>
    );
  }
}
