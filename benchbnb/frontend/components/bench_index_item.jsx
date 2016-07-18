const React = require('react');

const BenchIndexItem = React.createClass({
  render () {
    return(
      <div className="bench-list-item">
        <p>lat: {this.props.bench.lat}</p>
        <p>lon: {this.props.bench.lon}</p>
        <p>description: {this.props.bench.description}</p>
      </div>
    );
  }
});

module.exports = BenchIndexItem;
