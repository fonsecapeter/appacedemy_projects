const React = require('react');
const Board = require('./board');

const Game = React.createClass({
  // getInitialState () {
  //   game: new Mines ()
  // },
  updateGame () {

  },
  render () {
    return <Board updateGame={this.updateGame} board={this.props.board}></Board>;
  }
});







module.exports = Game;
