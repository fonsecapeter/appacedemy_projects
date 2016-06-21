const React = require('react');
const Game = require('./game');
// gets passed updateGame from board, who gets it passed from game
const Tile = React.createClass({
  // getInitialState (game) {
  //   game: {game};
  // },
  render () {
    let temp;
    let cls;

    if (this.props.space.bombed && this.props.revealed) {
      temp = '*';
      cls = "tile bomb";
    } else if (this.props.space.flagged) {
      temp = "F";
      cls = "tile flag";
    } else {
      temp = " ";
      cls = "tile";
    }

    return (<p className={cls}>{temp}</p>);
  }
});





module.exports = Tile;
