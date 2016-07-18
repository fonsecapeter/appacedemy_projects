const PokemonActions = require('../actions/pokemon_actions');

const ApiUtil = {
  fetchAllPokemons (callback) {
    $.ajax({
      url: '/api/pokemon',
      success (allPokemons) {
        callback(allPokemons);
      }
    });
  }
};

module.exports = ApiUtil;
