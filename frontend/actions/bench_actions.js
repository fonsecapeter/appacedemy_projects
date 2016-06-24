const BenchApiUtil = require('../util/bench_api_util');
const Dispatcher = require('../dispatcher/dispatcher');
const BenchConstants = require('../constants/bench_constants');

const BenchActions = {
  fetchAllBenches () {
    BenchApiUtil.fetchAllBenches(this.recieveAllBenches);
  },

  recieveAllBenches (benches) {
    Dispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECIEVED,
      benches: benches
    });
  }
};

module.exports = BenchActions;
