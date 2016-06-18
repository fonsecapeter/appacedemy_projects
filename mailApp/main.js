const $l = require("../jQueryLite/lib/main.js");
const Router = require("./router.js");
const Inbox = require("./inbox.js");

document.addEventListener("DOMContentLoaded", function(event) {
  $l(".sidebar-nav li").on("click", (e) => {
    let currentTarget = e.currentTarget;
    let loc = currentTarget.innerText;
    loc = loc.toLowerCase();
    window.location.hash = loc;

    const content = document.querySelector(".content");
    const router = new Router(content, routes);
    router.start();
  });
});

const routes = {
  inbox: new Inbox()
};
