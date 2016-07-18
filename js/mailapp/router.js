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
