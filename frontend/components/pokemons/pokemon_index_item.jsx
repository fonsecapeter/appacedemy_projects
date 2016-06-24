const React = require('react');

const PokemonIndexItem = React.createClass({
  render () {
    return (
      <div className="poke-list-item">
        <h3>{this.props.name}</h3>
        <p>{this.props.pokeType}</p>
      </div>
    );
  }
});

module.exports = PokemonIndexItem;
