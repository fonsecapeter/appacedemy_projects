function FollowToggle (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data('user-id') || options.userId;
  this.followState = this.$el.data('initial-follow-state') || options.followState; // bool > string

  this.render();
  this.handleClick();
}

FollowToggle.prototype.handleClick = function () {
  this.$el.on('click', event => {
    event.preventDefault();
    this.followStateInProcess();

    let self = this;

    let verb = '';
    if (this.followState === 'following') {
      verb = 'POST';
    } else {
      verb = 'DELETE';
    }

    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: verb,
      dataType: 'json',
      data: {
        userId: this.userId,
        followState: this.followState
      },
      success() {
        self.toggleFollowState();
        self.render();
      }
    });
  });
};

FollowToggle.prototype.render = function () {
  if (this.followState === 'followed') {
    this.$el.html('Unfollow!');
  } else {
    this.$el.html('Follow!');
  }

  // ensure disabled if in process; enabled if not (backwords)
  if (this.followState === 'followed' || this.followState === 'unfollowed') {
    this.$el.prop('disabled', false);
  } else {
    this.$el.prop('disabled', true);
  }
};

FollowToggle.prototype.toggleFollowState = function () {
  if (this.followState === 'followed'|| this.followState === 'unfollowing') {
    this.followState = 'unfollowed';
  } else {
    this.followState = 'followed';
  }
};

FollowToggle.prototype.followStateInProcess = function () {
  if (this.followState === 'followed') {
      this.followState = 'unfollowing';
    } else {
      this.followState = 'following';
    }
  this.render();
};

module.exports = FollowToggle;
