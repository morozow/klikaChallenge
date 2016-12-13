import React, { PropTypes, Component } from 'react';

import '../stylesheets/Header.scss';

export class Header extends Component {

  updateState(nextTrackState) {
    this.props.update$$.next(nextTrackState);
  }

  switch(onOff = false) {
    const { pageState, update$$ } = this.props;
    update$$.next(pageState.setIn(['player', 'play'], onOff));
  }

  render() {
    const { pageState, update$$ } = this.props;

    const song = pageState.getIn(['track', 'song'], 'Nothing to play...');

    const nextTrackState = pageState
      // set playing track
      .setIn(['player', 'track'], pageState.get('track'))
      // player switch on
      .setIn(['player', 'play'], true);

    return (
      <div className="Header">
        <h2 className="Header__Title">
          <button onClick={() => this.updateState(nextTrackState)}>Start track</button>
          {`${song} ${Math.random()}`}
        </h2>
        {pageState.getIn(['player', 'play'])
          ? <button onClick={() => this.switch(false)}>Stop</button>
          : <button onClick={() => this.switch(true)}>Play</button>}
        {pageState.getIn(['player', 'track', 'song'], 'Nothing...')}
      </div>
    );
  }
}
// update$$.next(pageState.setIn(['player', 'track'], pageState.get('track')));
Header.propTypes = {
  pageState: PropTypes.any,
  update$$: PropTypes.any,
};