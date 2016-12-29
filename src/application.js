// @flow

import React from 'react';
import { render } from 'react-dom';

import { AppRouter } from 'AppRouter';
import './main.scss';

const run = () => {
  console.log('Application is running...');
};

render(<AppRouter ref={run}/>, document.getElementById('application'));
