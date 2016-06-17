const DOMNodeCollection = require('./dom_node_collection.js');

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
