// @flow

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Subject } from 'rxjs/Subject';
import assign from 'lodash-es/assign';

import { Page } from './components/Page';

import { initApplicationStreams } from './streams';

import './main.scss';

class Application extends Component {

  event$$: ?Subject = void 0;

  constructor(props) {
    super(props);
    assign(this, initApplicationStreams());
  }

  render() {
    const { event$$ } = this;

    return (
      <div className="Application">

        <Page event$$={event$$}>
          {this.props.children}
        </Page>
      </div>
    );
  }
}

Application.propTypes = {
  children: PropTypes.any,
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={Application} />
  </Router>
), document.getElementById('application'));
