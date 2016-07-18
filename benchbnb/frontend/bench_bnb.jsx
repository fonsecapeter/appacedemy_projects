const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const hashHistory = require('react-router').hashHistory;

const BenchIndex = require('./components/bench_index');

const BenchStore = require('./stores/bench_store');
window.sto = BenchStore;

// const BenchApiUtil = require('./util/bench_api_util');
// window.util = BenchApiUtil;

const BenchActions = require('./actions/bench_actions');
window.acn = BenchActions;


const App = React.createClass({
  render () {
    return(
      <main>
        <header>
          <h3>BenchBnB</h3>
          <ul>
            <li>Become Host</li>
            <li>Help</li>
            <li>Sign Up</li>
            <li>Sign In</li>
          </ul>
        </header>
        {this.props.children}
      </main>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <Route path="benches" component={BenchIndex} />
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('content');
  ReactDOM.render((
    <Router history={hashHistory} routes={routes} />
  ), root);
});
