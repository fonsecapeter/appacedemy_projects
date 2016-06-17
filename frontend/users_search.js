const FollowToggle = require('./follow_toggle');

function UsersSearch (el) {
  this.$el = $(el);
  let children = this.$el.children();
  this.$input = $(children[0]);
  this.$list = $(children[1]);

  this.handleInput();
}

UsersSearch.prototype.handleInput = function () {
  this.$input.on('input', event => {
    let self = this;

    $.ajax({
      url: '/users/search',
      type: 'GET',
      data: {
        query: this.$input.val()
      },
      dataType: 'json',
      success(users) {
        self.renderResults(users);
      }
    });
  });
};

UsersSearch.prototype.renderResults = function (users) {
  this.$list.empty();
  users.forEach((user) => {

    let item = $('<li></li>');

    let anchor = $('<a>')
      .attr('href', `/users/${user.id}`)
      .attr('title', `${user.username}`)
      .text(`${user.username}`);

    let followedState = (user.followed) ? 'followed' : 'unfollowed';
    let followButton = $('<button></buttton')
      .attr('data-user-id', user.id)
      .attr('data-initial-followed-state', followedState)
      .addClass('follow-toggle');

    new FollowToggle(followButton, {
      userId: user.id,
      followState: followedState
    });

    this.$list.append(item.append(anchor.append(followButton)));
  });
};

module.exports = UsersSearch;
