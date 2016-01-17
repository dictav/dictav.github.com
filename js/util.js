/* Utility functions
 */
var util = function () {}
util.updateCard = function (title, image, desc) {
  var DEFAULT_URL = 'http://www.dictav.info/'
  var DEFAULT_TITLE = 'DICTAV SITE'
  var DEFAULT_IMAGE = 'http://www.dictav.info/images/dictav.jpg'
  var DEFAULT_DESC = '@dictav is a Mobile(iOS/Android/Web) Programmer.'

  var elURL = document.querySelector('head meta[property="og:url"]')
  var elTitle = document.querySelector('head meta[property="og:title"]')
  var elImage = document.querySelector('head meta[property="og:image"]')
  var elDesc = document.querySelector('head meta[property="og:description"]')

  elURL.content = document.location.href
  elTitle.content = title || DEFAULT_TITLE
  elImage.content = image || DEFAULT_IMAGE
  elDesc.content = desc || DEFAULT_DESC
}

util.raw = function (text) {
  var div = document.createElement("div");
  div.innerHTML = text;
  return div.textContent;
}

// extend Object
Object.prototype.property = function(prop, desc) {
  return Object.defineProperty(this, prop, desc);
};

