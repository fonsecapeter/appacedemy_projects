const React = require('react');

const Autocomplete = React.createClass ({
  getInitialState () {
    return ({text:""});
  },
  render () {
    return (
      <div>
        <input onChange={this.inputHandler}></input>
        <ul>{this.matchResults()}</ul>
      </div>);
  },
  inputHandler (e) {
    this.setState({text: e.target.value});
  },
  matchResults () {
    let results = [];
    this.props.listNames.forEach ((name, index) => {
      if (name.toLowerCase().includes(this.state.text.toLowerCase()) && this.state.text !== "") {
        results.push(<li key={index}>{name}</li>);
      }
    });
    return results;
  }
});


module.exports = Autocomplete;
