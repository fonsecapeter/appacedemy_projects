const React = require('react');
const Tile = require('./tile');

// gets passed a new minesweeper game as props.currentGame
const Board = React.createClass({
  // getInitialState () {
  // },
  render () {
    let grid = this.props.board.grid.map ((subArr, idx1) => {
      let tiles = [];
      let that = this;
      subArr.forEach ((tile, idx2) => {
        tiles.push(<Tile key={`${idx1}.${idx2}`}
                    updateGame={that.props.updateGame}
                    space={tile}></Tile>);
      });
      return <div id="board" key={idx1}>{tiles}</div>;
    });

    return(
      <div>
        {grid}
      </div>
    );
  }
});











module.exports = Board;
