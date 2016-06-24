const App = require('./components/app');
const PokemonDetail = require('./components/pokemons/pokemon_detail');
const PokemonsIndex = require('./components/pokemons/pokemons_index');
const React = require('react');
const ReactDOM = require('react-dom');
const Route = require('react-router').Route;
const Router = require('react-router').Router;


document.addEventListener("DOMContentLoaded", function(e) {
  ReactDOM.render((
    <Router>
      <Route path="/" component={App}>
        <Route path="pokemon/:pokemonId" component={PokemonDetail} />
      </Route>
    </Router>
    ), document.getElementById('root')
  );
});
