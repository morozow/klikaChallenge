import React, { PropTypes } from 'react';

import { DialogWrapper, Dialog, Input, Checkbox } from 'Dialog';

import '../stylesheets/TrackDialog.scss';

// we can create different validation functions (composing from simple validations)

export class TrackDialog extends Dialog {

  submit(e) {
    e.preventDefault();
    console.log('Result values: ', this.values.toJS());
    // validate
    // send to db
    // success
  }

  render() {
    // this is used as DB request sending, graphql, etc ...
    // @try use as context?
    // const { collector$$ } = this;
    const { dialogType } = this.props;

    return (
      <div className="TrackDialog">
        <DialogWrapper
          type={dialogType}
          submit={::this.submit}
        >
          <div className="some-div">
            <Input
              label={'Artist'}
              name="test-input-1"
            />
          </div>
          <div className="something">
            <Input
              label={'Song'}
              name="test-input-2"
            />
          </div>
          <div className="some-div-2">
            <Input
              label={'Genre'}
              name="test-input-3"
            />
          </div>
          <div className="some-div-2">
            <Input
              label={'Year'}
              name="test-input-3"
            />
          </div>
          <div className="some-checkbox-2">
            <Checkbox
              name="test-checkbox-1"
              label="Hello, Checkbox!"
            />
          </div>
        </DialogWrapper>
      </div>
    );
  }
}

TrackDialog.propTypes = {
  dialogType: PropTypes.any,
};
