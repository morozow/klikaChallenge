import React, { Component } from 'react';

import '../stylesheets/Application.scss';

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
