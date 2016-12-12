// @flow

import React from 'react';
import { render } from 'react-dom';

import { AppRouter } from 'components/AppRouter';
import './main.scss';

render(<AppRouter ref={run}/>, document.getElementById('application'));

const run = () => {
  console.log('Application is running...');
};
