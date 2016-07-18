const React = require('react');
const BenchStore = require('../stores/bench_store');
const BenchIndexItem = require('./bench_index_item');
const BenchActions = require('../actions/bench_actions');

const BenchIndex = React.createClass({
  getInitialState() {
    return({
      benches: BenchStore.all()
    });
  },

  _onChange(){
    let benches = BenchStore.all();
    this.setState({
      benches: BenchStore.all()
    });
  },

  componentDidMount() {
    this.listener = BenchStore.addListener(this._onChange);
    BenchActions.fetchAllBenches();
  },

  componentWillUnmount() {
    this.listener.remove();
  },

  render() {
    const benches = (Object.keys(this.state.benches).map(benchIdx => {
      return(
        <BenchIndexItem
          key={this.state.benches[benchIdx].id}
          bench={this.state.benches[benchIdx]} />
      );
    }));

    return(
      <div className="bench-list">
        {benches}
      </div>
    );
  }
});

module.exports = BenchIndex;
