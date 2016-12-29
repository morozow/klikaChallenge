import React, { PropTypes, Component } from 'react';
import { BaseFormControl } from './BaseFormControl';

import assign from 'lodash-es/assign';

// make base class? some bugs with it
export class Checkbox extends BaseFormControl {

  constructor(props) {
    super(props);
  }

  render() {
    const { label } = this.props;
    return (
      <label>
        {this.settings.get('label')}
        <input
          type="checkbox"
          name={this.settings.get('name')}
          onChange={(e) => {
            assign(e.target, { value: e.target.checked });
            return this.event$$.next(e);
          }}
        />
      </label>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.any,
  label: PropTypes.any,
};
