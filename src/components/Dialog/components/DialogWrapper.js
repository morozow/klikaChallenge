import React, { PropTypes, Component } from 'react';

import assign from 'lodash-es/assign';

import { dialogControls } from '../modules/Controls';
import '../stylesheets/Dialog.scss';

export class DialogWrapper extends Component {

  state = {
    controls: void 0,
  };

  constructor(props) {
    super(props);
    assign(this.state, { controls: dialogControls(this) });
  }

  componentWillUnmount() {
    this.context.collector$$subscriber.unsubscribe();
  }

  render() {
    // we have not only controls, but any element
    // we should to get components not from children
    // 1. How to display my controls? Where are decorations?
    // 2. Using dialogComponents for fetching data only.
    // 3. How can I fetch data? With streams? Event$$?
    // const { children: c } = this.props;

    return (
      <div className="Dialog">
        <form>
          {this.props.children}
          <button onClick={this.props.submit}>Submit</button>
          <button onClick={this.props.resetValues}>Reset</button>
        </form>
      </div>
    );
  }

}

DialogWrapper.propTypes = {
  children: PropTypes.any,
  submit: PropTypes.any,
  resetValues: PropTypes.any,
};

DialogWrapper.contextTypes = {
  collector$$: PropTypes.any.isRequired,
  collector$$subscriber: PropTypes.any.isRequired,
};
