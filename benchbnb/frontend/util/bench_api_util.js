const BenchApiUtil = {
  fetchAllBenches (callback) {
    $.ajax({
      url: 'api/benches',
      method: 'GET',
      dataType: 'json',
      success (response) {
        callback(response);
      }
    });
  }
};

module.exports = BenchApiUtil;
