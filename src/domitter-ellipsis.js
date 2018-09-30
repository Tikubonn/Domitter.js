
/**
 * @param {!string} ellipsis
 * @return {Object}
 */

function makeDomitterEllipsis (ellipsis){
  var dom = makeDomitterEllipsisDom(ellipsis);
  return makeDomitterCache(dom);
}

/**
 * @param {!string} ellipsis
 * @return {Element}
 */

function makeDomitterEllipsisDom (ellipsis){
  var span = document.createElement("span");
  var text = document.createTextNode(ellipsis);
  span.classList.add("domitter-ellipsis");
  span.appendChild(text);
  return span;
}

var updateDomitterEllipsis = updateDomitterCache;
var domitterEllipsisDom = domitterCacheDom;
var domitterEllipsisTop = domitterCacheTop;
var domitterEllipsisLeft = domitterCacheLeft;
var domitterEllipsisRight = domitterCacheRight;
var domitterEllipsisBottom = domitterCacheBottom;
var domitterEllipsisInnerWidth = domitterCacheInnerWidth;
var domitterEllipsisInnerHeight = domitterCacheInnerHeight;
var domitterEllipsisOuterWidth = domitterCacheOuterWidth;
var domitterEllipsisOuterHeight = domitterCacheOuterHeight;

/**
 * @param {Object} instance
 * @param {number} position
 * @return {void}
 */

function setDomitterEllipsisTop (instance, position){
  instance.__top = position;
  instance.__bottom = position + instance.__outerHeight;
}

/**
 * @param {Object} instance
 * @param {number} position
 * @return {void}
 */

function setDomitterEllipsisLeft (instance, position){
  instance.__left = position;
  instance.__right = position + instance.__outerWidth;
}

/**
 * @param {Object} instance
 * @param {number} position
 * @return {void}
 */

function setDomitterEllipsisRight (instance, position){
  instance.__right = position;
  instance.__left = position - instance.__outerWidth;
}

/**
 * @param {Object} instance
 * @param {number} position
 * @return {void}
 */

function setDomitterEllipsisBottom (instance, position){
  instance.__bottom = position;
  instance.__top = position - instance.__outerHeight;
}

/**
 * @param {Object} instance
 * @return {void}
 */

function confirmDomitterEllipsis (instance){
  instance.__dom.style.top = instance.__top + "px";
  instance.__dom.style.left = instance.__left + "px";
}

/**
 * @param {Object} instance
 * @return {void}
 */

function hideDomitterEllipsis (instance){
  domitterCacheDom(instance).classList.add("domitter-ellipsis-hidden");
}

/**
 * @param {Object} instance
 * @return {void}
 */

function showDomitterEllipsis (instance){
  domitterCacheDom(instance).classList.remove("domitter-ellipsis-hidden");
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function hidepDomitterEllipsis (instance){
  return domitterCacheDom(instance).classList.contains("domitter-ellipsis-hidden");
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function showpDomitterEllipsis (instance){
  return domitterCacheDom(instance).classList.contains("domitter-ellipsis-hidden") == false;
}
