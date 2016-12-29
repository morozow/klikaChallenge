import React, { PropTypes } from 'react';
import { BaseFormControl } from './BaseFormControl';

import '../../stylesheets/Dialog.scss';

// make base class? some bugs with it
export class Input extends BaseFormControl {

  render() {
    const { isValid } = this.state;

    return (
      <label>
        {this.settings.get('label')}
        <input
          className={isValid ? 'valid' : 'invalid'}
          type="text"
          onChange={(e) => this.event$$.next(e)}
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.any,
};
