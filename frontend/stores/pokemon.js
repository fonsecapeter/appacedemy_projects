const Dispatcher = require('../dispatcher/dispatcher');
const PokemonActions = require('../actions/pokemon_actions');
const PokemonConstants = require('../constants/pokemon_constants');
const Store = require('flux/utils').Store;

let _pokemons = {};

const PokemonStore = new Store(Dispatcher);

PokemonStore.all = function () {
  return Object.keys(_pokemons).map(key => _pokemons[key]);
};

PokemonStore.resetPokemons = function (pokemons) {
  // debugger;
  _pokemons = {};
  for (let i = 0; i < pokemons.length; i++) {
    _pokemons[pokemons[i].id] = pokemons[i];
  }
  return _pokemons;
};


PokemonStore.find = function (id) {
  return _pokemons[id];
};

PokemonStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PokemonConstants.POKEMONS_RECEIVED:
      PokemonStore.resetPokemons(payload.pokemons);
      PokemonStore.__emitChange();
      break;
  }
};



module.exports = window.store = PokemonStore;
