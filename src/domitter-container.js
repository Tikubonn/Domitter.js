
/**
 * @return {Object}
 */

function makeDomitterContainer (){
  var dom = makeDomitterContainerDom();
  return makeDomitterCache(dom);
}

/**
 * @return {Element}
 */

function makeDomitterContainerDom (){
  var span = document.createElement("span");
  span.classList.add("domitter");
  return span;
}

var domitterContainerDom = domitterCacheDom;
var updateDomitterContainer = updateDomitterCache;
var domitterContainerTop = domitterCacheTop;
var domitterContainerLeft = domitterCacheLeft;
var domitterContainerRight = domitterCacheRight;
var domitterContainerInnerWidth = domitterCacheInnerWidth;
var domitterContainerInnerHeight = domitterCacheInnerHeight;
var domitterContainerOuterWidth = domitterCacheOuterWidth;
var domitterContainerOuterHeight = domitterCacheOuterHeight;

/**
 * @param {Object} instance
 * @param {?number} width
 * @return {void}
 */

function setDomitterContainerWidth (instance, width){
  instance.__outerWidth = width;
}

/**
 * @param {Object} instance
 * @param {?number} height
 * @return {void}
 */

function setDomitterContainerHeight (instance, height){
  instance.__outerHeight = height;
}

/**
 * @param {Object} instance
 * @return {void}
 */

function confirmDomitterContainer (instance){
  instance.__dom.style.width = instance.__outerWidth == null ? "auto" : (instance.__outerWidth + "px");
  instance.__dom.style.height = instance.__outerHeight == null ? "auto" : (instance.__outerHeight + "px");
}
