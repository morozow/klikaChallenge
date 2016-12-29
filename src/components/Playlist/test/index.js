import React, { Component } from 'react';
import { render } from 'react-dom';
import { Playlist } from 'Playlist';

class Application extends Component
{
  render() {
    return <Playlist/>;
  }
}

render(<Application/>, document.getElementById('application'));