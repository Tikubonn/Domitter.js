
/**
 * @return {Object}
 */

function makeDomitterRootContainer (){
  var dom = makeDomitterRootContainerDom();
  return makeDomitterCache(dom);
}

/**
 * @return {Element}
 */

function makeDomitterRootContainerDom (){
  var dom = document.createElement("div");
  dom.classList.add("domitter");
  return dom;
}

var domitterRootContainerDom = domitterCacheDom;
var updateDomitterRootContainer = updateDomitterCache;
var domitterRootContainerTop = domitterCacheTop;
var domitterRootContainerLeft = domitterCacheLeft;
var domitterRootContainerRight = domitterCacheRight;
var domitterRootContainerInnerWidth = domitterCacheInnerWidth;
var domitterRootContainerInnerHeight = domitterCacheInnerHeight;
var domitterRootContainerOuterWidth = domitterCacheOuterWidth;
var domitterRootContainerOuterHeight = domitterCacheOuterHeight;
var setDomitterRootContainerWidth = setDomitterContainerWidth;
var setDomitterRootContainerHeight = setDomitterContainerHeight;
var confirmDomitterRootContainer = confirmDomitterContainer;
