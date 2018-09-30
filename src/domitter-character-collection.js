
var makeDomitterCharacterCollection = makeDomitterCacheCollection;
var updateDomitterCharacterCollection = updateDomitterCacheCollection;
var addDomitterCharacterCollection = addDomitterCacheCollection;
var addsDomitterCharacterCollection = addsDomitterCacheCollection;
var extendDomitterCharacterCollection = extendDomitterCacheCollection;
var domitterCharacterCollectionLength = domitterCacheCollectionLength;
var domitterCharacterCollectionDom = domitterCacheCollectionDom;
var domitterCharacterCollectionTop = domitterCacheCollectionTop;
var domitterCharacterCollectionLeft = domitterCacheCollectionLeft;
var domitterCharacterCollectionRight = domitterCacheCollectionRight;
var domitterCharacterCollectionBottom = domitterCacheCollectionBottom;
var domitterCharacterCollectionInnerWidth = domitterCacheCollectionInnerWidth;
var domitterCharacterCollectionInnerHeight = domitterCacheCollectionInnerHeight;
var domitterCharacterCollectionOuterWidth = domitterCacheCollectionOuterWidth;
var domitterCharacterCollectionOuterHeight = domitterCacheCollectionOuterHeight;
var domitterCharacterCollectionLineHeight = domitterCacheCollectionLineHeight;
var domitterCharacterCollectionLineMargin = domitterCacheCollectionLineMargin;

/**
 * @param {string} character
 * @return {Element}
 */

function makeDomitterCharacterCollectionDom (character){
	var span = document.createElement("span");
	var text = document.createTextNode(character);
	span.classList.add("domitter-character");
	span.appendChild(text);
	return span;
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {void}
 */

function showDomitterCharacterCollection (instance, index){
	var dom = domitterCharacterCollectionDom(instance, index);
	dom.classList.remove("domitter-character-hidden");
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {void}
 */

function hideDomitterCharacterCollection (instance, index){
	var dom = domitterCharacterCollectionDom(instance, index);
	dom.classList.add("domitter-character-hidden");
}

/**
 * @param {Object} instance
 * @return {void}
 */

function showAllDomitterCharacterCollection (instance){
	var index = 0;
	var length = domitterCharacterCollectionLength(instance);
	while (index < length){
		showDomitterCharacterCollection(instance, index);
		index = (index+1)|0;
	}
}

/**
 * @param {Object} instance
 * @return {void}
 */

function hideAllDomitterCharacterCollection (instance){
	var index = 0;
	var length = domitterCharacterCollectionLength(instance);
	while (index < length){
		hideDomitterCharacterCollection(instance, index);
		index = (index+1)|0;
	}
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {boolean}
 */

function showpDomitterCharacterCollection (instance, index){
	var dom = domitterCharacterCollectionDom(instance, index);
	return dom.classList.contains("domitter-character-hidden") == false;
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {boolean}
 */

function hidepDomitterCharacterCollection (instance, index){
	var dom = domitterCharacterCollectionDom(instance, index);
	return dom.classList.contains("domitter-character-hidden");
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function showAllpDomitterCharacterCollection (instance){
	var length = domitterCharacterCollectionLength(instance);
	return 0 < length && showpDomitterCharacterCollection(instance, length -1);
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function hideAllpDomitterCharacterCollection (instance){
	var length = domitterCharacterCollectionLength(instance);
	return 0 < length && hidepDomitterCharacterCollection(instance, 0);
}

/**
 * @param {Object} instance
 * @return {Object} return DomitterCollectionSpan object.
 */

function showsDomitterCharacterCollection (instance){
	var index = 0;
	var length = domitterCacheCollectionLength(instance);
	while (index < length){
		if (hidepDomitterCharacterCollection(instance, index)){
			return makeDomitterCollectionSpan(0, index);
		}
		index = (index+1)|0;
	}
	return makeDomitterCollectionSpan(0, length);
}

/**
 * @param {Object} instance
 * @return {Object} return DomitterCollectionSpan object.
 */

function hidesDomitterCharacterCollection (instance){
	var length = domitterCacheCollectionLength(instance);
	var index = length;
	while (0 < index){
		index = (index-1)|0;
		if (showpDomitterCharacterCollection(instance, index)){
			return makeDomitterCollectionSpan(index +1, length);
		}
	}
	return makeDomitterCollectionSpan(0, length);
}

/* export */

window["domitterCharacterCollectionLength"] = domitterCharacterCollectionLength;
window["domitterCharacterCollectionDom"] = domitterCharacterCollectionDom;
window["domitterCharacterCollectionTop"] = domitterCharacterCollectionTop;
window["domitterCharacterCollectionLeft"] = domitterCharacterCollectionLeft;
window["domitterCharacterCollectionRight"] = domitterCharacterCollectionRight;
window["domitterCharacterCollectionBottom"] = domitterCharacterCollectionBottom;
window["domitterCharacterCollectionInnerWidth"] = domitterCharacterCollectionInnerWidth;
window["domitterCharacterCollectionInnerHeight"] = domitterCharacterCollectionInnerHeight;
window["domitterCharacterCollectionOuterWidth"] = domitterCharacterCollectionOuterWidth;
window["domitterCharacterCollectionOuterHeight"] = domitterCharacterCollectionOuterHeight;
window["domitterCharacterCollectionLineHeight"] = domitterCharacterCollectionLineHeight;
window["domitterCharacterCollectionLineMargin"] = domitterCharacterCollectionLineMargin;
window["showDomitterCharacterCollection"] = domitterCharacterCollectionLineMargin;
window["hideDomitterCharacterCollection"] = domitterCharacterCollectionLineMargin;
window["showpDomitterCharacterCollection"] = domitterCharacterCollectionLineMargin;
window["hidepDomitterCharacterCollection"] = domitterCharacterCollectionLineMargin;
window["showsDomitterCharacterCollection"] = domitterCharacterCollectionLineMargin;
window["hidesDomitterCharacterCollection"] = domitterCharacterCollectionLineMargin;
