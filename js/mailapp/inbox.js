const MessageStore = require('./message_store.js');

function Inbox () {
  this.render = function () {
    let inMessages = MessageStore.getInboxMessages();
    let messages = document.createElement("ul");
    messages.className = "messages";
    messages.innerHTML = "An Inbox Message";

    inMessages.forEach(message => {
      let domMessage = this.renderMessage(message);
      messages.appendChild(domMessage);
    });
    
    return messages;
  };

}

module.exports = Inbox;
