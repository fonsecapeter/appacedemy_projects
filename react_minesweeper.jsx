const React = require('react');
const ReactDOM = require('react-dom');
const Game = require('./components/game.jsx');
const Minesweeper = require('./minesweeper.js');

var MyComponent = React.createClass({
  render() {
    return(
      <Game board={new Minesweeper.Board(9, 9)}></Game>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
