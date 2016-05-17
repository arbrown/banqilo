import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Elos } from '../api/elos.js';

import PlayerElo from './PlayerElo.jsx';

class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // should handle this server side!

    p1 = this.findPlayer(ReactDOM.findDOMNode(this.refs.p1input).value.trim());
    p2 = this.findPlayer(ReactDOM.findDOMNode(this.refs.p2input).value.trim());

    exp1 = 1/(1+Math.pow(10,(p2.elo-p1.elo)/400));
    exp2 = 1/(1+Math.pow(10,(p1.elo-p2.elo)/400));

    outcome1 = ReactDOM.findDOMNode(this.refs.p1won).checked ? 1 : 0;
    outcome2 = ReactDOM.findDOMNode(this.refs.p2won).checked ? 1 : 0;
    if (outcome1 == outcome2){
      outcome1 = 0.5;
      outcome2 = 0.5;
    }

    const pointdiff =Math.round(15*(outcome1-exp1));
    p1.elo = p1.elo + pointdiff
    p2.elo = p2.elo - pointdiff

    Elos.update({ _id: p1._id}, {$set: {elo: p1.elo}});
    Elos.update({ _id: p2._id}, {$set: {elo: p2.elo}});

    this.clearForm();
  }

  clearForm() {
    //would be nice to add some jQueryUI flash or something here

    ReactDOM.findDOMNode(this.refs.p1input).value = "";
    ReactDOM.findDOMNode(this.refs.p2input).value = "";
    ReactDOM.findDOMNode(this.refs.p1won).checked = false;
    ReactDOM.findDOMNode(this.refs.p2won).checked = false;

  }

  findPlayer(name) {
    player = Elos.findOne({player: name});
    if (!player){
      player = {player: name, elo: 1000};
      player._id = Elos.insert(player)
    }
    return player;
  }

  renderElos() {
    return this.props.elos.map((elo) =>(
      <PlayerElo key={elo._id} elo={elo} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Banqi Elo Scoreboard</h1>
        </header>
      <ol className="eloList">
        {this.renderElos()}
      </ol>
      <div className='entryForm'>
        <h3>Enter a new Game</h3>
        <form className="new-game" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            ref="p1input"
            placeholder="Player 1"
            />
          <input
            type="checkbox"
            ref="p1won"
            /> Winner?<br/>
            <input
              type="text"
              ref="p2input"
              placeholder="Player 2"
              />
            <input
              type="checkbox"
              ref="p2won"
              /> Winner?<br/>
            <input type="submit" value="Submit"/>
          </form>
      </div>
    </div>
    )
  }
}

App.propTypes = {
  elos: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    elos: Elos.find({}, {sort: {elo: -1}}).fetch(),
  };
}, App);
