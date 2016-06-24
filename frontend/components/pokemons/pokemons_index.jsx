const PokemonActions = require('../../actions/pokemon_actions');
const PokemonIndexItem = require('./pokemon_index_item');
const PokemonStore = require('../../stores/pokemon');
const React = require('react');

const PokemonsIndex = React.createClass({
  getInitialState: function() {
    return {
      pokemons: PokemonStore.all()
    };
  },

  componentDidMount: function() {
    this.pokemonListener = PokemonStore.addListener( () => {
      this.setState({
        pokemons: PokemonStore.all()
      });
    });
    PokemonActions.fetchAllPokemons();
  },

  componentWillUnmount: function() {
    this.pokemonListener.remove();
  },

  render () {
    return (
      <div>
        {
          this.state.pokemons.map(pokemon => {
            return <PokemonIndexItem key={pokemon.id}
                                     name={pokemon.name}
                                     pokeType={pokemon.poke_type} />;
          })
        }
      </div>
    );
  }
});

module.exports = PokemonsIndex;
