
/**
 * @param {string} character
 * @return {Object}
 */

function makeDomitterCharacter (character){
  var dm = makeDomitterCharacterDom(character);
  return makeDomitterCache(dm);
}

/**
 * @param {string} character
 * @return {Element}
 */

function makeDomitterCharacterDom (character){
  var span = document.createElement("span");
  var text = document.createTextNode(character);
  span.classList.add("domitter-character");
  span.appendChild(text);
  return span;
}

var updateDomitterCharacter = updateDomitterCache;
var domitterCharacterDom = domitterCacheDom;
var domitterCharacterTop = domitterCacheTop;
var domitterCharacterLeft = domitterCacheLeft;
var domitterCharacterRight = domitterCacheRight;
var domitterCharacterBottom = domitterCacheBottom;
var domitterCharacterInnerWidth = domitterCacheInnerWidth;
var domitterCharacterInnerHeight = domitterCacheInnerHeight;
var domitterCharacterOuterWidth = domitterCacheOuterWidth;
var domitterCharacterOuterHeight = domitterCacheOuterHeight;
var domitterCharacterLineHeight = domitterCacheLineHeight;
var domitterCharacterLineMargin = domitterCacheLineMargin;

/**
 * @param {Object} instance
 * @return {void}
 */

function hideDomitterCharacter (instance){
  domitterCacheDom(instance).classList.add("domitter-character-hidden");
}

/**
 * @param {Object} instance
 * @return {void}
 */

function showDomitterCharacter (instance){
  domitterCacheDom(instance).classList.remove("domitter-character-hidden");
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function hidepDomitterCharacter (instance){
  return domitterCacheDom(instance).classList.contains("domitter-character-hidden");
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function showpDomitterCharacter (instance){
  return domitterCacheDom(instance).classList.contains("domitter-character-hidden") == false;
}

/* export */

window["domitterCharacterDom"] = domitterCacheDom;
window["domitterCharacterTop"] = domitterCacheTop;
window["domitterCharacterLeft"] = domitterCacheLeft;
window["domitterCharacterRight"] = domitterCacheRight;
window["domitterCharacterBottom"] = domitterCacheBottom;
window["domitterCharacterInnerWidth"] = domitterCacheInnerWidth;
window["domitterCharacterInnerHeight"] = domitterCacheInnerHeight;
window["domitterCharacterOuterWidth"] = domitterCacheOuterWidth;
window["domitterCharacterOuterHeight"] = domitterCacheOuterHeight;
window["hideDomitterCharacter"] = hideDomitterCharacter;
window["showDomitterCharacter"] = showDomitterCharacter;
window["hidepDomitterCharacter"] = hidepDomitterCharacter;
window["showpDomitterCharacter"] = showpDomitterCharacter;
