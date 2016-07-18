const ApiUtil = require('../util/api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const PokemonConstants = require('../constants/pokemon_constants');

const PokemonActions = {
  receiveAllPokemons (allPokemons) {
    Dispatcher.dispatch({
      actionType: PokemonConstants.POKEMONS_RECEIVED,
      pokemons: allPokemons
    });
  },

  fetchAllPokemons () {
    ApiUtil.fetchAllPokemons(this.receiveAllPokemons);
  }
};



module.exports = window.actions = PokemonActions;
