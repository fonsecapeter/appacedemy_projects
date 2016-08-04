const FollowToggle = require('./follow_toggle');
const UsersSearch  = require('./users_search');
const TweatCompose = require('./tweet_compose');
const InfiniteTweats = require('./infinite_tweets');

$(document).ready ( () => {
  $('.follow-toggle').each((idx, button) => {
    new FollowToggle(button);
  });

  $('.users-search').each((idx, nav) => {
    new UsersSearch(nav);
  });

  $('.tweet-compose').each((idx, form) => {
    new TweatCompose(form);
  });

  $('.infinite-tweets').each((idx, div) => {
    new InfiniteTweats(div);
  });
});
