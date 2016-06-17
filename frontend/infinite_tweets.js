function InfiniteTweats(el) {
  this.$el = $(el);
  this.$feed = $('#feed');
  this.$fetchAnchor = $('.fetch-more');
  this.maxCreatedAt = null;

  this.fetchTweets();
}

InfiniteTweats.prototype.fetchTweets = function () {
  this.$fetchAnchor.on('click', event => {
    let self = this;
    let pageData;

    if (this.maxCreatedAt === null) {
      pageData = {
        limit: 20,
      };
    } else {
      pageData = {
        limit: 20,
        max_created_at: this.maxCreatedAt
      };
    }

    $.ajax({
      url: '/feed',
      type: 'GET',
      data: pageData,
      dataType: 'json',
      success(moreTweets) {
        console.log(moreTweets);
        self.insertTweets(moreTweets);
      }
    });
  });
};

InfiniteTweats.prototype.insertTweets = function (moreTweets) {
  moreTweets.forEach(tweet => {
    let $item = $('<li></li>').html(JSON.stringify(tweet));
    this.$feed.append($item);
  });
};

module.exports = InfiniteTweats;
