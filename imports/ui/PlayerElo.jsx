import React, { Component, PropTypes } from 'react';

export default class PlayerElo extends Component {
  render() {
    return (
      <li>
        <span className = 'playerName'>{this.props.elo.player}</span> :
        <span className = 'playerElo'>{this.props.elo.elo}</span>
      </li>
    );
  }

}

PlayerElo.propTypes = {
  elo: PropTypes.object.isRequired,
};
