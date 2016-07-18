const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const BenchConstants = require('../constants/bench_constants');

// { benchId, bench }
let _benches = {};
const BenchStore = new Store(Dispatcher);

function resetAllBenches (benches) {
  _benches = benches;
  BenchStore.__emitChange();
}

BenchStore.all = function () {
  return _benches;
};

BenchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECIEVED:
      resetAllBenches(payload.benches);
      break;
  }
};

module.exports = BenchStore;
