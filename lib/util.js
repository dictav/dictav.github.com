Object.prototype.property = function(prop, desc) {
  return Object.defineProperty(this, prop, desc);
};

function raw(text) {
  var div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent;
}
