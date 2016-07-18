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
