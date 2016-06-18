/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const $l = __webpack_require__(1);
	const Router = __webpack_require__(3);
	const Inbox = __webpack_require__(4);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(2);

	window.$l = function(selector) {
	  this.functionQueue = [];
	  if (typeof selector === "string") {
	    const nodeList = this.document.querySelectorAll(selector);
	    let HTMLElements = Array.from(nodeList);
	    return new DOMNodeCollection(HTMLElements);

	  } else if (typeof selector === 'function') {
	    if (document.readyState === "complete") {
	      selector();
	    } else {
	      this.functionQueue.push(selector);
	    }
	  }

	  let that = this;
	  document.addEventListener("DOMContentLoaded", function(event) {
	    that.functionQueue.forEach( funct => {
	      funct();
	    });
	    that.functionQueue = [];
	  });

	  this.$l.extend = function(...args) {
	    let finalHash = {};

	    args.forEach( hash => {
	      for (let key in hash) {
	        if ( hash.hasOwnProperty( key ) ) {
	          finalHash[key] = hash[key];
	        }
	      }
	    });
	    return finalHash;
	  };


	  this.$l.ajax = function(options = {}) {
	    const defaultOpts = {
	      type: "GET",
	      url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
	      dataType: "json",
	      data: {},
	      success: function () { console.log("Success"); },
	      error: function () { console.log("Failed"); }
	    };

	    let mergedOpts = this.extend(defaultOpts, options);

	    const xhr = new XMLHttpRequest();
	    xhr.open('GET', mergedOpts.url);
	    xhr.onload = function () {
	      console.log(xhr.status);
	      console.log(xhr.responseType);
	      console.log(xhr.response);
	      if (xhr.status === 200) {
	        mergedOpts["success"](JSON.parse(xhr.response));
	      } else {
	        mergedOpts["error"](JSON.parse(xhr.response));
	      }
	    };

	    xhr.send(mergedOpts);
	  };
	};

	module.exports = window.$l;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function DOMNodeCollection (HTMLElements) {
	  this.HTMLElements = HTMLElements;
	}

	DOMNodeCollection.prototype.html = function (innerHTML) {
	  this.HTMLElements.forEach(dom => {
	    dom.innerHTML = innerHTML;
	  });
	  return this;
	};

	DOMNodeCollection.prototype.attr = function (name, value) {
	  this.HTMLElements.forEach(dom => {
	    dom.setAttribute(name, value);
	  });
	  return this;
	};

	DOMNodeCollection.prototype.addClass = function (className) {
	  this.HTMLElements.forEach(dom => {
	    dom.classList.add(className);
	  });
	  return this;
	};

	DOMNodeCollection.prototype.removeClass = function (className) {
	  this.HTMLElements.forEach(dom => {
	    dom.classList.remove(className);
	  });
	  return this;
	};

	DOMNodeCollection.prototype.children = function () {
	  let allChildren = [];
	  this.HTMLElements.forEach(dom => {
	    let domChildren = dom.children;
	    for (let i = 0; i < domChildren.length; i++) {
	      allChildren.push(domChildren[i]);
	    }
	  });
	  return new DOMNodeCollection(allChildren);
	};

	DOMNodeCollection.prototype.parent = function () {
	  let parents = [];
	  this.HTMLElements.forEach(dom => {
	    let parent = dom.parentNode;
	    if (!parents.includes(parent)) {
	      parents.push(dom.parentNode);
	    }
	  });
	  return new DOMNodeCollection(parents);
	};

	DOMNodeCollection.prototype.find = function (selector) {
	  if (typeof selector === 'string') {
	    let allEls = [];
	    this.HTMLElements.forEach(dom => {
	      let els = dom.querySelectorAll(selector);
	      for (let i = 0; i < els.length; i++) {
	        allEls.push(els[i]);
	      }
	    });
	    return new DOMNodeCollection(allEls);
	  }
	  return this;
	};

	DOMNodeCollection.prototype.remove = function () {
	  this.HTMLElements.forEach(dom => {
	    dom.innerHTML = '';
	    dom.parentNode.removeChild(dom);
	  });
	  return this;
	};

	DOMNodeCollection.prototype.on = function (eventToHandle, callback) {
	  this.HTMLElements.forEach(dom => {
	    dom.addEventListener(eventToHandle, callback);
	  });
	  return this;
	};

	DOMNodeCollection.prototype.off = function (eventToHandle, callback) {
	  this.HTMLElements.forEach(dom => {
	    dom.removeEventListener(eventToHandle, callback);
	  });
	  return this;
	};

	// function myFunct (e) {
	//   console.log(e.currentTarget);
	// }

	module.exports = DOMNodeCollection;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Router (node, routes) {
	  this.node = node;
	  this.routes = routes;
	}

	Router.prototype.start = function () {
	  this.render();
	  window.addEventListener("hashchange", this.render);
	};

	Router.prototype.activeRoute = function () {
	  let hash = window.location.hash;
	  let hashName = hash.replace('#', '');
	  return this.routes[hashName];
	};

	Router.prototype.render = function () {
	  this.node.innerHTML = "";
	  let component = this.activeRoute();

	  if (component !== undefined) {
	    let domNode = component.render();
	    this.node.appendChild(domNode);
	  }

	};

	module.exports = Router;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(5);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	const MessageStore = {
	  getInboxMessages: () => messages.inbox,
	  getSentMessages: () => messages.sent
	};

	module.exports = MessageStore;


/***/ }
/******/ ]);