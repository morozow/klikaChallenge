import React, { Component, PropTypes } from 'react';
import { Subject } from 'rxjs/Subject';
import { map } from 'utils/immutable';

/**
 * Responsible for data collecting from fields
 * Reassign getChildContext(), collectControlValue() methods to change behavior
 */
export class Dialog extends Component {
  values = map();

  getChildContext() {
    const collector$$ = new Subject();
    const collector$$subscriber = collector$$.subscribe(::this.collectControlValue);
    return { collector$$, collector$$subscriber };
  }

  /**
   * This method defined behavior of how form
   * will collect data from control to whole form data.
   */
  collectControlValue({ name, value }: TControlValue) {
    this.values = this.values.merge({ [name]: value });
  }

  render() {
    return null;
  }
}

Dialog.childContextTypes = {
  collector$$: PropTypes.any.isRequired,
  collector$$subscriber: PropTypes.any.isRequired,
};

type TControlValue = {
  name: String,
  value: mixed,
};
