import React, { Component } from 'react';

import { getTracks } from '../../../../server/database';

import '../stylesheets/Application.scss';

console.log('Tracks: ', getTracks());

export class Application extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className="Application">
        {children}
      </div>
    );
  }
}
