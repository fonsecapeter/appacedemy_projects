const React = require('react');
const ReactDOM = require('react-dom');

var Widgets = React.createClass({
  render() {
    return(
      <div>Hello World</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Widgets />, document.getElementById('main'));
});
