import React, { Component } from 'react';

import '../stylesheets/Footer.scss';

export class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer__copy">
          {'Raman Marozau <engineer.morozov@gmail.com>'}
        </div>
      </div>
    );
  }
}
