const PokemonActions = require('../../actions/pokemon_actions');
const PokemonStore = require('../../stores/pokemon');
const React = require('react');

const PokemonDetail = React.createClass({
  // getInitialState() {
  //   return this.getStateFromStore();
  // },

  getStateFromStore () {
    const id = parseInt(this.props.params.pokemonId);
    return {pokemon: PokemonStore.find(id)};
  },

  __onChange() {
    this.setState(this.getStateFromStore());
  },

  componentDidMount () {
    PokemonStore.addListener(this.__onChange);
    PokemonActions.fetchAllPokemons();
  },

  render () {
    let currPokemon = {
      id: '',
      attack: '',
      defense: '',
      image_url: '',
      moves: '',
      name: '',
      poke_type: ''
    };
    if (this.state !== null) {
      currPokemon = this.state.pokemon;
    }

    return (
      <div>
        <div className="pokemon-detail-pane">
          <div className="detail">
            <img src={currPokemon.image_url} />
            <p>id: {currPokemon.id}</p>
            <p>name: {currPokemon.name}</p>
            <p>attack: {currPokemon.attack}</p>
            <p>defense: {currPokemon.defense}</p>
            <p>image_url: {currPokemon.image_url}</p>
            <p>moves: {currPokemon.moves}</p>
            <p>poke_type: {currPokemon.poke_type}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PokemonDetail;

// //BOOTSTRAP// //
// <div class="container">
//   <div class="col-md-6 col-md-offset-3">
//
//   </div>
// </div>
