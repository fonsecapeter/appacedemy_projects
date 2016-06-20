const React = require('react');

const Clock = React.createClass({
  getInitialState () {
    return ({
      date: new Date(),
      interval: 0
    });
  },

  tick () {
    this.setState({
      date: new Date()
    });
  },

  componentDidMount () {
    this.setState({
      interval: setInterval(() => {
        this.tick();
      }, 1000)
    });
  },

  componentWillUnmount () {
    clearInterval(this.props.interval);
    this.props.interval = 0;
  },

  face () {
    return (
      <p>{this.state.date.toString()}</p>
    );
  },

  render () {
    return(
      <div>
        {this.face()}
      </div>
    );
  }
});

module.exports = Clock;
