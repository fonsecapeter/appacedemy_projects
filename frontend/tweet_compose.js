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
