/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UsersSearch  = __webpack_require__(2);
	const TweatCompose = __webpack_require__(3);
	const InfiniteTweats = __webpack_require__(4);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function TweatCompose (el) {
	  this.$el = $(el);
	  this.$inputs = $(this.$el.find(':input'));
	  this.$feed = $(this.$el.data('tweets-ul'));
	
	  this.$textArea = $(this.$el.find('textarea')[0]);
	  this.$charWatch = $(this.$el.find('.chars-left')[0]);
	
	  this.$addMentionedUserAnchor = $(this.$el.find('.add-mentioned-user')[0]);
	  this.$mentionedUsersContainer = $(this.$el.find('.mentioned-users'));
	
	
	  this.submit();
	  this.watchChars();
	  this.addMentionedUser();
	  this.removeMentionedUser();
	}
	
	TweatCompose.prototype.submit = function () {
	  this.$el.on('submit', event => {
	    event.preventDefault();
	    let self = this;
	    let formData = this.$el.serialize();
	
	    this.disableInput();
	
	    $.ajax({
	      url: '/tweets',
	      type: 'POST',
	      data: formData,
	      dataType: 'json',
	      success(newTweet) {
	        self.handleSuccess(newTweet);
	      }
	    });
	  });
	};
	
	TweatCompose.prototype.handleSuccess = function (newTweet) {
	  let $item = $('<li></li>').html(JSON.stringify(newTweet));
	  this.$feed.append($item);
	
	  this.clearInput();
	  this.enableInput();
	};
	
	TweatCompose.prototype.disableInput = function () {
	  this.$inputs.each((idx, input) => {
	    $(input).prop('disabled', true);
	  });
	};
	
	TweatCompose.prototype.enableInput = function () {
	  this.$inputs.each((idx, input) => {
	    $(input).prop('disabled', false);
	  });
	};
	
	TweatCompose.prototype.clearInput = function () {
	  this.$inputs.each((idx, input) => {
	    if (input.type !== 'submit') {
	      $(input).val('');
	    }
	  });
	
	  this.$mentionedUsersContainer.empty();
	};
	
	// ------------------------------------------------------------------ //
	
	TweatCompose.prototype.watchChars = function () {
	  this.$textArea.on('input', event => {
	    let self = this;
	
	    let charCount = this.$textArea.val().length;
	    let charsLeft = 140 - charCount;
	    let charText = (charsLeft < 140) ? `${charsLeft} characters left` : '';
	
	    this.$charWatch.html(charText);
	  });
	};
	
	// ------------------------------------------------------------------ //
	
	TweatCompose.prototype.addMentionedUser = function () {
	  this.$addMentionedUserAnchor.on('click', event => {
	    let $scriptTag = $(this.$el.find('script'));
	
	    this.$mentionedUsersContainer.append($scriptTag.html());
	
	  });
	};
	
	TweatCompose.prototype.removeMentionedUser = function () {
	  this.$mentionedUsersContainer.on('click', event => {
	    if(event.target.className === 'remove-mentioned-user') {
	      $(event.target).parent().remove();
	    }
	  });
	};
	module.exports = TweatCompose;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map