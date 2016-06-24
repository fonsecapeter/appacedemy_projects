const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const hashHistory = require('react-router').hashHistory;

const App = React.createClass({
  render () {
    return(
      <main>
        {this.props.children}
        <p>hello from react</p>
      </main>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('content');
  ReactDOM.render((
    <Router history={hashHistory} routes={routes} />
  ), root);
});
