const Store = require('flux').store;
const Dispatcher = require('../dispatcher/dispatcher');

// { benchId, bench }
let _benches = {};

const BenchStore = new Store();

function resetAllBenches (benches) {
  _benches = benches;
}

BenchStore.all = function () {
  return _benches;
};

module.exports = BenchStore;
