/**
 * @license Copyright (c) 2018 tikubonn
 * Released under the MIT License.
 * https://opensource.org/licenses/mit-license.php
 */


(function(){

/**
 * @param {Array} sequence
 * @param {number} beginning
 * @param {number} end
 * @return {Object}
 */

function makeDomitterSpan (sequence, beginning, end){
	return {
		__sequence: sequence,
		__beginning: beginning,
		__end: end
	};
}

/**
 * @param {Object} instance
 */

function domitterSpanLength (instance){
	return instance.__end - instance.__beginning;
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {void}
 */

function setDomitterSpan (instance, index, value){
	instance.__sequence[instance.__beginning + index] = value;
}

/**
 * @param {Object} instance
 * @param {number} index
 */

function getDomitterSpan (instance, index){
	return instance.__sequence[instance.__beginning + index];
}

/**
 * lineHeight is pixel size of line-height value.
 * lineMargin is half vartical margin size of line, 
 * that value is (font-size - line-height) / 2.
 * @param {Element} dom
 * @return {Object}
 */

function makeDomitterCache (dom){
  return {
    __dom: dom,
    __updated: false,
    __top: 0,
    __left: 0,
    __right: 0,
    __bottom: 0,
    __innerWidth: 0,
    __innerHeight: 0,
    __outerWidth: 0,
    __outerHeight: 0,
		__lineHeight: 0,
		__lineMargin: 0,
  };
}

/**
 * @param {Object} instance
 * @param {CSSStyleDeclaration} style
 * @return {number}
 */

function getDomitterCacheFontSize (instance, style){
	var matched1 = style.fontSize.match(/([0-9]+(?:\.[0-9]+)?)px/);
	if (matched1){
		var size = parseFloat(matched1[1]);
		return size;
	}
	throw new Error("unsupported font-size value of " + style.fontSize + ".");
}

/**
 * @param {Object} instance
 * @return {void}
 */

function updateDomitterCacheLineHeight (instance){
	var style = window.getComputedStyle(instance.__dom);
	var matched1 = style.lineHeight.match(/([0-9]+(?:\.[0-9]+)?)px/);
	if (matched1){
		var lineHeight = parseFloat(matched1[1]);
		var fontSize = getDomitterCacheFontSize(instance, style);
		instance.__lineHeight = lineHeight;
		instance.__lineMargin = (lineHeight - fontSize) / 2;
		return;
	}
	var matched2 = style.lineHeight.match(/([0-9]+(?:\.[0-9]+)?)(?:em)?/);
	if (matched2){
		var percent = parseFloat(matched2[1]);
		var fontSize = getDomitterCacheFontSize(instance, style);
		var lineHeight = percent * fontSize;
		instance.__lineHeight = lineHeight;
		instance.__lineMargin = (lineHeight - fontSize) / 2;
		return;
	}
	var matched3 = style.lineHeight.match(/normal/);
	if (matched3){

		console.warn(
			"interpreted \"normal\" of line-height value to 1.2, " + 
			"because its real size cannot be get from script."
		);

		var percent = 1.2;
		var fontSize = getDomitterCacheFontSize(instance, style);
		var lineHeight = percent * fontSize;
		instance.__lineHeight = lineHeight;
		instance.__lineMargin = (lineHeight - fontSize) / 2;
		return;
	}
	throw new Error("unsupported line-height value of " + style.lineHeight + ".");
} 

/**
 * @param {Object} instance
 * @return {void}
 */

function updateDomitterCache (instance){
  var self = instance.__dom.getBoundingClientRect();
  instance.__top = self.top + window.scrollY;
  instance.__left = self.left + window.scrollX;
  instance.__right = self.right + window.scrollX;
  instance.__bottom = self.bottom + window.scrollY;
  instance.__outerWidth = self.right - self.left;
	instance.__outerHeight = self.bottom - self.top;
  instance.__innerWidth = instance.__dom.clientWidth;
  instance.__innerHeight = instance.__dom.clientHeight;
	updateDomitterCacheLineHeight(instance);
  instance.__updated = true;
}

/**
 * @param {Object} instance
 * @return {Element}
 */

function domitterCacheDom (instance){
  return instance.__dom;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheTop (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__top;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheLeft (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__left;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheRight (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__right;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheBottom (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__bottom;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheInnerWidth (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__innerWidth;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheInnerHeight (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__innerHeight;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheOuterWidth (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__outerWidth;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheOuterHeight (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__outerHeight;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheLineHeight (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__lineHeight;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheLineMargin (instance){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
  return instance.__lineMargin;
}

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

/**
 * @return {Object}
 */

function makeDomitterCaches (){
  return {
    __caches: new Array()
  };
}

/**
 * @param {Object} instance
 * @return {Array}
 */

function domitterCachesArray (instance){
  return instance.__caches;
}

/**
 * @param {Object} instance
 * @param {Object} cache
 * @return {void}
 */

function addDomitterCaches (instance, cache){
  instance.__caches.push(cache);
}

/**
 * @param {Object} instance
 * @param {Array} caches
 * @return {void}
 */

function addsDomitterCaches (instance, caches){
	// instance.__caches = instance.__caches.concat(caches);
	Array.prototype.push.apply(instance.__caches, caches);
}

/**
 * @param {Object} instance
 * @return {void}
 */

function updateDomitterCaches (instance){
  var index = 0;
  while (index < instance.__caches.length){
    updateDomitterCache(instance.__caches[index]);
    index = (index+1)|0;
  }
}

var makeDomitterCharacters = makeDomitterCaches;
var domitterCharactersArray = domitterCachesArray;
var addDomitterCharacters = addDomitterCaches;
var addsDomitterCharacters = addsDomitterCaches;
var updateDomitterCharacters = updateDomitterCaches;

/**
 * @param {Object} instance
 * @return {void}
 */

function hideDomitterCharacters (instance){
  var index = 0;
  while (index < instance.__caches.length){
    hideDomitterCharacter(instance.__caches[index]);
    index = (index+1)|0;
  }
}

/**
 * @param {Object} instance
 * @return {void}
 */

function showDomitterCharacters (instance){
  var index = 0;
  while (index < instance.__caches.length){
    showDomitterCharacter(instance.__caches[index]);
    index = (index+1)|0;
  }
}

/**
 * @param {Object} instance
 * @return {Array}
 */

/* function hidesDomitterCharacters (instance){
  return instance.__caches.filter(
    function (cache){
      return hidepDomitterCharacter(cache);
    });
} */

/**
 * @param {Object} instance
 * @return {Object}
 */

function hidesDomitterCharacters (instance){
	var index = instance.__caches.length;
	while (index){
		index = (index-1)|0;
		var cache = instance.__caches[index];
		if (showpDomitterCharacter(cache)){
			return makeDomitterSpan(instance.__caches, index +1, instance.__caches.length);
		}
	}
	return makeDomitterSpan(instance.__caches, 0, instance.__caches.length);
}

/**
 * @param {Object} instance
 * @return {Array}
 */

/* function showsDomitterCharacters (instance){
  return instance.__caches.filter(
    function (cache){
      return showpDomitterCharacter(cache);
    });
} */

/**
 * @param {Object} instance
 * @return {Object}
 */

function showsDomitterCharacters (instance){
	var index = 0;
	while (index < instance.__caches.length){
		var cache = instance.__caches[index];
		if (hidepDomitterCharacter(cache)){
			return makeDomitterSpan(instance.__caches, 0, index);
		}
		index = (index+1)|0;
	}
	return makeDomitterSpan(instance.__caches, 0, instance.__caches.length);
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function omitpDomitterCharacters (instance){
  if (0 < instance.__caches.length){
    var dom = instance.__caches[instance.__caches.length -1];
    return hidepDomitterCharacter(dom);
  }
  return false;
}

/**
 * @param {Object} instance
 * @return {boolean}
 */

function unomitpDomitterCharacters (instance){
  if (0 < instance.__caches.length){
    var dom = instance.__caches[instance.__caches.length -1];
    return showpDomitterCharacter(dom);
  }
  return false;
}

/**
 * @param {number} beginning
 * @param {number} end
 * @return {Object}
 */

function makeDomitterCollectionSpan (beginning, end){	
	return {
		__beginning: beginning,
		__end: end
	};
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCollectionSpanLength (instance){
	return instance.__end - instance.__beginning;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCollectionSpanBeginning (instance){
	return instance.__beginning;
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCollectionSpanEnd (instance){
	return instance.__end;
}

/**
 * @return {Object}
 */

function makeDomitterCacheCollection (){
	return {
		__dom: new Array(),
		__top: new Array(),
		__left: new Array(),
		__right: new Array(),
		__bottom: new Array(),
		__innerWidth: new Array(),
		__innerHeight: new Array(),
		__outerWidth: new Array(),
		__outerHeight: new Array(),
		__lineHeight: new Array(),
		__lineMargin: new Array()
	};
}

/**
 * @param {Object} instance
 * @param {CSSStyleDeclaration} style
 * @return {number}
 */

function getDomitterCacheCollectionFontSize (instance, style){
	var matched1 = style.fontSize.match(/([0-9]+(?:\.[0-9]+)?)px/);
	if (matched1){
		var size = parseFloat(matched1[1]);
		return size;
	}
	throw new Error("unsupported font-size value of " + style.fontSize + ".");
}

/**
 * @param {Object} instance
 * @return {void}
 */

function updateDomitterCacheCollectionInLineHeight (instance, index){
	var dom = domitterCacheCollectionDom(instance, index);
	var style = window.getComputedStyle(dom);
	var matched1 = style.lineHeight.match(/([0-9]+(?:\.[0-9]+)?)px/);
	if (matched1){
		var lineHeight = parseFloat(matched1[1]);
		var fontSize = getDomitterCacheCollectionFontSize(instance, style);
		instance.__lineHeight[index] = lineHeight;
		instance.__lineMargin[index] = (lineHeight - fontSize) / 2;
		return;
	}
	var matched2 = style.lineHeight.match(/([0-9]+(?:\.[0-9]+)?)(?:em)?/);
	if (matched2){
		var percent = parseFloat(matched2[1]);
		var fontSize = getDomitterCacheCollectionFontSize(instance, style);
		var lineHeight = percent * fontSize;
		instance.__lineHeight[index] = lineHeight;
		instance.__lineMargin[index] = (lineHeight - fontSize) / 2;
		return;
	}
	var matched3 = style.lineHeight.match(/normal/);
	if (matched3){

		console.warn(
			"interpreted \"normal\" of line-height value to 1.2, " + 
			"because its real size cannot be get from script."
		);

		var percent = 1.2;
		var fontSize = getDomitterCacheCollectionFontSize(instance, style);
		var lineHeight = percent * fontSize;
		instance.__lineHeight[index] = lineHeight;
		instance.__lineMargin[index] = (lineHeight - fontSize) / 2;
		return;
	}
	throw new Error("unsupported line-height value of " + style.lineHeight + ".");
} 

/**
 * @param {Object} instance
 * @param {number} index
 * @return {void}
 */

function updateDomitterCacheCollectionIn (instance, index){
	var dom = instance.__dom[index];
	var rect = dom.getBoundingClientRect();
	instance.__top[index] = rect.top;
	instance.__left[index] = rect.left;
	instance.__right[index] = rect.right;
	instance.__bottom[index] = rect.bottom;
	instance.__innerWidth[index] = dom.clientWidth;
	instance.__innerHeight[index] = dom.clientHeight;
	instance.__outerWidth[index] = rect.right - rect.left;
	instance.__outerHeight[index] = rect.bottom - rect.top;
}

/**
 * @param {Object} instance
 * @return {void}
 */

function updateDomitterCacheCollection (instance){
	var index = 0;
	var length = domitterCacheCollectionLength(instance);
	while (index < length){
		updateDomitterCacheCollectionIn(instance, index);
		updateDomitterCacheCollectionInLineHeight(instance, index);
		index = (index+1)|0;
	}
	instance.__updated = true;
}

/**
 * @param {Object} instance
 * @param {Element} dom
 * @return {void}
 */

function addDomitterCacheCollection (instance, dom){
	instance.__dom.push(dom);
	instance.__top.push(0);
	instance.__left.push(0);
	instance.__right.push(0);
	instance.__bottom.push(0);
	instance.__innerWidth.push(0);
	instance.__innerHeight.push(0);
	instance.__outerWidth.push(0);
	instance.__outerHeight.push(0);
	instance.__lineHeight.push(0);
	instance.__lineMargin.push(0);
}

/**
 * @param {Object} instance
 * @param {Array} doms
 * @return {void}
 */

function addsDomitterCacheCollection (instance, doms){
	var index = 0;
	while (index < doms.length){
		addDomitterCacheCollection(instance, doms[index]);
		index = (index+1)|0;
	}
}

/**
 * @param {Object} instance1 to 
 * @param {Object} instance2 source 
 * @return {void}
 */

function extendDomitterCacheCollection (instance1, instance2){
	Array.prototype.push.apply(instance1.__dom, instance2.__dom);
	Array.prototype.push.apply(instance1.__top, instance2.__top);
	Array.prototype.push.apply(instance1.__left, instance2.__left);
	Array.prototype.push.apply(instance1.__right, instance2.__right);
	Array.prototype.push.apply(instance1.__bottom, instance2.__bottom);
	Array.prototype.push.apply(instance1.__innerWidth, instance2.__innerWidth);
	Array.prototype.push.apply(instance1.__innerHeight, instance2.__innerHeight);
	Array.prototype.push.apply(instance1.__outerWidth, instance2.__outerWidth);
	Array.prototype.push.apply(instance1.__outerHeight, instance2.__outerHeight);
	Array.prototype.push.apply(instance1.__lineHeight, instance2.__lineHeight);
	Array.prototype.push.apply(instance1.__lineMargin, instance2.__lineMargin);
}

/**
 * @param {Object} instance
 * @return {number}
 */

function domitterCacheCollectionLength (instance){
	return instance.__dom.length;
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {Element}
 */

function domitterCacheCollectionDom (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__dom[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionTop (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__top[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionLeft (instance, index){
	/* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__left[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionRight (instance, index){
	/* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__right[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionBottom (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__bottom[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionInnerWidth (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__innerWidth[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionInnerHeight (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__innerHeight[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionOuterWidth (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__outerWidth[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionOuterHeight (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__outerHeight[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionLineHeight (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__lineHeight[index];
}

/**
 * @param {Object} instance
 * @param {number} index
 * @return {number}
 */

function domitterCacheCollectionLineMargin (instance, index){
  /* if (instance.__updated == false)
    throw new Error("instance has not updated."); */
	return instance.__lineMargin[index];
}

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

/**
 * @return {Object}
 */

function makeDomitterBuilder (){
  return {
    __container: makeDomitterContainer(),
    // __characters: makeDomitterCharacters()
		__characters: makeDomitterCharacterCollection()
  };
}

/**
 * @param {Object} instance
 * @return {Object}
 */

function domitterBuilderContainer (instance){
  return instance.__container;
}

/**
 * @param {Object} instance
 * @return {Object}
 */

function domitterBuilderCharacters (instance){
  return instance.__characters;
}

/**
 * @param {Object} instance
 * @param {string} character
 * @return {void}
 */

/* function addDomitterBuilder (instance, character){
  var char = makeDomitterCharacter(character);
  domitterContainerDom(instance.__container)
    .appendChild(domitterCharacterDom(char));
	addDomitterCharacters(instance.__characters, char);
} */

function addDomitterBuilder (instance, character){
  var dom = makeDomitterCharacterCollectionDom(character);
  domitterContainerDom(instance.__container)
    .appendChild(domitterCharacterDom(dom));
	addDomitterCharacterCollection(instance.__characters, dom);
}

/**
 * @param {Object} instance
 * @param {string} characters
 * @param {Object} options
 * @return {void}
 */

/* function addsDomitterBuilderExperiments (instance, characters, options){
  if (options["experiments"] &&
      options["experiments"]["textResolution"]){
    var resolution = options["experiments"]["textResolution"];
    var chars = new Array(characters.length);
    var doms = document.createDocumentFragment();
    var index = 0;
    while (index < characters.length){
      var char = makeDomitterCharacter(characters.slice(index, index + resolution));
      chars[index] = char;
      doms.appendChild(domitterCharacterDom(char));
      index = (index+resolution)|0;
    }
    domitterContainerDom(instance.__container).appendChild(doms);
    addsDomitterCharacters(instance.__characters, chars);
  }
  else {
    addsDomitterBuilder(instance, characters);
  }
} */

function addsDomitterBuilderExperiments (instance, characters, options){
  if (options["experiments"] &&
      options["experiments"]["textResolution"]){
    var resolution = options["experiments"]["textResolution"];
    var doms = document.createDocumentFragment();
    var index = 0;
    while (index < characters.length){
			var dom = makeDomitterCharacterCollectionDom(characters.slice(index, index + resolution));
			doms.appendChild(dom);
			addDomitterCharacterCollection(instance.__characters, dom);
			index = (index+1)|0;
    }
    domitterContainerDom(instance.__container).appendChild(doms);
  }
  else {
    addsDomitterBuilder(instance, characters);
  }
}

/**
 * @param {Object} instance
 * @param {string} characters
 * @return {void}
 */

/* function addsDomitterBuilder (instance, characters){
  var chars = new Array();
  var doms = document.createDocumentFragment();
  var index = 0;
  while (index < characters.length){
    var char = makeDomitterCharacter(characters[index]);
    chars.push(char);
    doms.appendChild(domitterCharacterDom(char));
    index = (index+1)|0;
  }
  domitterContainerDom(instance.__container).appendChild(doms);
  addsDomitterCharacters(instance.__characters, chars);
} */

/* function addsDomitterBuilder (instance, characters){
  var chars = new Array(characters.length);
  var doms = document.createDocumentFragment();
  var index = 0;
  while (index < characters.length){
    var char = makeDomitterCharacter(characters[index]);
		chars[index] = char;
    doms.appendChild(domitterCharacterDom(char));
    index = (index+1)|0;
  }
  domitterContainerDom(instance.__container).appendChild(doms);
  addsDomitterCharacters(instance.__characters, chars);
} */

function addsDomitterBuilder (instance, characters){
	var doms = document.createDocumentFragment();
	var index = 0;
	while (index < characters.length){
		var dom = makeDomitterCharacterCollectionDom(characters[index]);
		doms.appendChild(dom);
		addDomitterCharacterCollection(instance.__characters, dom);
		index = (index+1)|0;
	}
	domitterContainerDom(instance.__container).appendChild(doms);
}

/**
 * @return {Object}
 */

function makeDomitterRootBuilder (){
  return {
    __container: makeDomitterRootContainer(),
    // __characters: makeDomitterCharacters()
    __characters: makeDomitterCharacterCollection()
  };
}

var domitterRootBuilderContainer = domitterBuilderContainer;
var domitterRootBuilderCharacters = domitterBuilderCharacters;
var addDomitterRootBuilder = addDomitterBuilder;
var addsDomitterRootBuilder = addsDomitterBuilder;

/**
 * @constructor
 */

function DomitterOmissioner (){
}

/**
 * @param {Object} characters
 * @return {void}
 */

DomitterOmissioner.prototype["omit"] = function (characters){
  throw new Error(".omit method was not defined.");
};

/* export */

window["DomitterOmissioner"] = DomitterOmissioner;

/**
 * @constructor
 * @extends {DomitterOmissioner}
 */

function DomitterLines (count){
	
	if (count < 1){
		throw new Error("arguments value must be more than 1.");
	}
	
  this.__count = count;
	
}

DomitterLines.prototype = 
  Object.create(DomitterOmissioner.prototype);

/**
 * @param {Object} characters
 * @return {void}
 */

/* DomitterLines.prototype["omit"] = function (characters){
  var doms = domitterCharactersArray(characters);
  if (0 < doms.length){
    var index = 1;
    var count = this.__count;
    var left = domitterCharacterLeft(doms[0]);
    while (index < doms.length){
      var dom = doms[index];
      if (domitterCharacterLeft(dom) < left){
        if (0 < count){
          count--;
        }
      }
      if (0 < count){
        showDomitterCharacter(dom);
      }
      else {
        hideDomitterCharacter(dom);
      }
      left = domitterCharacterLeft(dom);
      index = (index+1)|0;
    }
  }
}; */

DomitterLines.prototype["omit"] = function (characters){
	var length = domitterCharacterCollectionLength(characters);
  if (0 < length){
    var index = 1;
    var count = this.__count;
    var left = domitterCharacterCollectionLeft(characters, 0);
    while (index < length){
      if (domitterCharacterCollectionLeft(characters, index) < left){
        if (0 < count){
          count--;
        }
      }
      if (0 < count){
        showDomitterCharacterCollection(characters, index);
      }
      else {
				hideDomitterCharacterCollection(characters, index);
      }
      left = domitterCharacterCollectionLeft(characters, index);
      index = (index+1)|0;
    }
  }
};

/* export */

window["DomitterLines"] = DomitterLines;

/**
 * @constructor
 * @extends {DomitterOmissioner}
 */

function DomitterHeight (height){
	
	if (height < 0){
		throw new Error("argument value must be more than 0.");	
	}
	
  this.__height = height;
	
}

DomitterHeight.prototype = 
  Object.create(DomitterOmissioner.prototype);

/**
 * @param {Object} characters
 * @return {void}
 */

DomitterHeight.prototype["omit"] = function (characters){
	var length = domitterCharacterCollectionLength(characters);
  var index = 0;
  while (index < length){
    if (domitterCharacterCollectionBottom(characters, index) < this.__height){
      showDomitterCharacterCollection(characters, index);
    }
    else {
			hideDomitterCharacterCollection(characters, index);
    }
    index = (index+1)|0;
  }
};

/* export */

window["DomitterHeight"] = DomitterHeight;

/**
 * @constructor
 */

function Domitter (target, height, ellipsis, options){

  /* cook arguments */
  
  if (window["jQuery"] && target instanceof window["jQuery"]){
    var doms = target.toArray();
    if (doms.length == 0){
      throw new Error("took an empty jQuery object.");
    }
    target = doms[0];
  }
  
  if (typeof height == "number" || height instanceof Number){
    height = new DomitterLines(height);
  }
  
  if (ellipsis == undefined){
    ellipsis = makeDomitterEllipsis("...");
  }
  
  else if (typeof ellipsis == "string" || ellipsis instanceof String){
    ellipsis = makeDomitterEllipsis(ellipsis.toString());
  }
  
  if (options == undefined){
    options = {};
  }
  
  /* construct members */
  
  this.__target = target;
  this.__height = height;
  this.__ellipsis = ellipsis;
  this.__options = options;
  this.__container = null;
  this.__characters = null;
  this.__status = false;

  /* form dom structure */
  
  this.form();
  
}

Domitter.prototype["omitp"] = function (){
  return this.__status;
};

Domitter.prototype["unomitp"] = function (){
  return this.__status == false;
};

Domitter.prototype.formIn = function (builder, target){
  if (target instanceof Text){
    this.formInText(builder, target);
  }
  else if (target instanceof Node){
    this.formInNode(builder, target);
  }
};

/* Domitter.prototype.formInText = function (builder, target){
  var builder2 = makeDomitterBuilder();
  //addsDomitterBuilder(builder2, target.data);
  addsDomitterBuilderExperiments(builder2, target.data, this.__options);
  addsDomitterCharacters(
    domitterRootBuilderCharacters(builder),
    domitterCharactersArray(
      domitterBuilderCharacters(builder2)));
  target.parentNode.replaceChild(
    domitterContainerDom(
      domitterBuilderContainer(builder2)),
    target);
}; */

Domitter.prototype.formInText = function (builder, target){
  var builder2 = makeDomitterBuilder();
  //addsDomitterBuilder(builder2, target.data);
  addsDomitterBuilderExperiments(builder2, target.data, this.__options);
  extendDomitterCacheCollection(
		domitterRootBuilderCharacters(builder),
		domitterBuilderCharacters(builder2));
	target.parentNode.replaceChild(
    domitterContainerDom(
      domitterBuilderContainer(builder2)),
    target);
};

Domitter.prototype.formInNode = function (builder, target){
  if (target.classList.contains("domitter") == false &&
      target.classList.contains("domitter-character") == false &&
      target.classList.contains("domitter-ellipsis") == false){
    var index = 0;
    while (index < target.childNodes.length){
      this.formIn(builder, target.childNodes[index]);
      index = (index+1)|0;
    }
  }
};

Domitter.prototype.swapElements = function (doma, domb){
  var count = doma.childNodes.length;
  var doms = document.createDocumentFragment();
  while (count){
    count = (count-1)|0;
    doms.appendChild(doma.firstChild);
  }
  domb.appendChild(doms);
}

Domitter.prototype.form = function (){
  var builder = makeDomitterRootBuilder();
  this.formIn(builder, this.__target);
  this.__container = domitterRootBuilderContainer(builder);
  this.__characters = domitterRootBuilderCharacters(builder);
  this.swapElements(
    this.__target,
    domitterRootContainerDom(
      domitterRootBuilderContainer(builder)));
  domitterRootContainerDom(
    domitterRootBuilderContainer(builder)).appendChild(
    domitterEllipsisDom(this.__ellipsis));
  this.__target.appendChild(
    domitterRootContainerDom(
      domitterRootBuilderContainer(builder)));
  hideDomitterEllipsis(this.__ellipsis);
};

Domitter.prototype.omit1 = function (){
  updateDomitterEllipsis(this.__ellipsis);
  updateDomitterContainer(this.__container);
  //updateDomitterCharacters(this.__characters);
	updateDomitterCharacterCollection(this.__characters);
};

Domitter.prototype.omit2 = function (){
  this.__height["omit"](this.__characters);
  this.updateEllipsis();
  this.updateContainer();
  this.__status = true;
};

/* Domitter.prototype.updateEllipsis = function (){
	var hides = hidesDomitterCharacters(this.__characters); // optimize later
	if (hides.length == 0){
    hideDomitterEllipsis(this.__ellipsis);
	}
	else {
		var shows = showsDomitterCharacters(this.__characters); // optimize later
		if (shows.length == 0){
			hideDomitterEllipsis(this.__ellipsis);
		}
		else {
			showDomitterEllipsis(this.__ellipsis);
			var index = shows.length;
			while (index){
				index = (index-1)|0;
				var show = shows[index];
				if (/\s+/.test(domitterCharacterDom(show).data)){
					hideDomitterCharacter(show);
				}
				else 
				if (domitterEllipsisOuterWidth(this.__ellipsis) <= 
						(domitterRootContainerLeft(this.__container) + 
						 domitterRootContainerInnerWidth(this.__container) - 
						 domitterCharacterRight(show))){
					setDomitterEllipsisBottom(
						this.__ellipsis, 
						domitterCharacterBottom(show) + 
						domitterCharacterLineMargin(show) - 
						domitterRootContainerTop(this.__container));
					setDomitterEllipsisLeft(
						this.__ellipsis, 
						domitterCharacterRight(show) - 
						domitterRootContainerLeft(this.__container));
					break;
				}
				else {
					hideDomitterCharacter(show);
				}
			}
		}		
	}
  this.__status = true;
}; */

/* Domitter.prototype.updateEllipsis = function (){
	var hides = hidesDomitterCharacters(this.__characters); // optimize later
	if (domitterSpanLength(hides) == 0){
    hideDomitterEllipsis(this.__ellipsis);
	}
	else {
		var shows = showsDomitterCharacters(this.__characters); // optimize later
		if (domitterSpanLength(shows) == 0){
			hideDomitterEllipsis(this.__ellipsis);
		}
		else {
			showDomitterEllipsis(this.__ellipsis);
			var index = domitterSpanLength(shows);
			while (index){
				index = (index-1)|0;
				var show = getDomitterSpan(shows, index);
				if (/\s+/.test(domitterCharacterDom(show).data)){
					hideDomitterCharacter(show);
				}
				else 
				if (domitterEllipsisOuterWidth(this.__ellipsis) <= 
						(domitterRootContainerLeft(this.__container) + 
						 domitterRootContainerInnerWidth(this.__container) - 
						 domitterCharacterRight(show))){
					setDomitterEllipsisBottom(
						this.__ellipsis, 
						domitterCharacterBottom(show) + 
						domitterCharacterLineMargin(show) - 
						domitterRootContainerTop(this.__container));
					setDomitterEllipsisLeft(
						this.__ellipsis, 
						domitterCharacterRight(show) - 
						domitterRootContainerLeft(this.__container));
					break;
				}
				else {
					hideDomitterCharacter(show);
				}
			}
		}		
	}
  this.__status = true;
}; */

Domitter.prototype.updateEllipsis = function (){
	var hides = hidesDomitterCharacterCollection(this.__characters);
	if (domitterCollectionSpanLength(hides) == 0){
    hideDomitterEllipsis(this.__ellipsis);
	}
	else {
		var shows = showsDomitterCharacterCollection(this.__characters);
		if (domitterCollectionSpanLength(shows) == 0){
			hideDomitterEllipsis(this.__ellipsis);
		}
		else {
			showDomitterEllipsis(this.__ellipsis);
			var index = domitterCollectionSpanEnd(shows);
			var beginning = domitterCollectionSpanBeginning(shows);
			while (beginning < index){
				index = (index-1)|0;
				if (/\s+/.test(domitterCharacterCollectionDom(this.__characters, index).data)){
					hideDomitterCharacterCollection(this.__characters, index);
				}
				else 
				if (domitterEllipsisOuterWidth(this.__ellipsis) <= 
						(domitterRootContainerLeft(this.__container) + 
						 domitterRootContainerInnerWidth(this.__container) - 
						 domitterCharacterCollectionRight(this.__characters, index))){
					setDomitterEllipsisBottom(
						this.__ellipsis, 
						domitterCharacterCollectionBottom(this.__characters, index) + 
						domitterCharacterCollectionLineMargin(this.__characters, index) -
						domitterRootContainerTop(this.__container));
					setDomitterEllipsisLeft(
						this.__ellipsis, 
						domitterCharacterCollectionRight(this.__characters, index) - 
						domitterRootContainerLeft(this.__container));
					break;
				}
				else {
					hideDomitterCharacterCollection(this.__characters, index);
				}
			}
		}		
	}
  this.__status = true;
};

/* Domitter.prototype.updateContainer = function (){
	var hides = hidesDomitterCharacters(this.__characters); // optimize later
	if (hides.length == 0){
    setDomitterRootContainerWidth(this.__container, null);
    setDomitterRootContainerHeight(this.__container, null);
	}
	else {
		var shows = showsDomitterCharacters(this.__characters); // optimize later
		if (shows.length == 0){
			setDomitterRootContainerWidth(this.__container, null);
			setDomitterRootContainerHeight(this.__container, null);
		}
		else {
			var index = 1;
			//var bottom = domitterCharacterBottom(shows[0]);
			var bottom = 
					domitterCharacterBottom(shows[0]) + 
					domitterCharacterLineMargin(shows[0]);
			while (index < shows.length){
				var show = shows[index];
				//bottom = Math.max(bottom, domitterCharacterBottom(show));
				bottom = Math.max(
					bottom, 
					domitterCharacterBottom(show) + 
					domitterCharacterLineMargin(show));
				index = (index+1)|0;
			}
			var top = domitterRootContainerTop(this.__container);
			setDomitterRootContainerWidth(this.__container, null);
			setDomitterRootContainerHeight(this.__container, bottom - top);
		}		
	}
  this.__status = true;
}; */

/* Domitter.prototype.updateContainer = function (){
	var hides = hidesDomitterCharacters(this.__characters); // optimize later
	if (domitterSpanLength(hides) == 0){
    setDomitterRootContainerWidth(this.__container, null);
    setDomitterRootContainerHeight(this.__container, null);
	}
	else {
		var shows = showsDomitterCharacters(this.__characters); // optimize later
		if (domitterSpanLength(shows) == 0){
			setDomitterRootContainerWidth(this.__container, null);
			setDomitterRootContainerHeight(this.__container, null);
		}
		else {
			var index = 1;
			//var bottom = domitterCharacterBottom(shows[0]);
			var bottom = 
					domitterCharacterBottom(getDomitterSpan(shows, 0)) + 
					domitterCharacterLineMargin(getDomitterSpan(shows, 0));
			var length = domitterSpanLength(shows);
			while (index < length){
				var show = getDomitterSpan(shows, index);
				//bottom = Math.max(bottom, domitterCharacterBottom(show));
				bottom = Math.max(
					bottom, 
					domitterCharacterBottom(show) + 
					domitterCharacterLineMargin(show));
				index = (index+1)|0;
			}
			var top = domitterRootContainerTop(this.__container);
			setDomitterRootContainerWidth(this.__container, null);
			setDomitterRootContainerHeight(this.__container, bottom - top);
		}		
	}
  this.__status = true;
}; */

Domitter.prototype.updateContainer = function (){
	var hides = hidesDomitterCharacterCollection(this.__characters); // optimize later
	if (domitterCollectionSpanLength(hides) == 0){
    setDomitterRootContainerWidth(this.__container, null);
    setDomitterRootContainerHeight(this.__container, null);
	}
	else {
		var shows = showsDomitterCharacterCollection(this.__characters); // optimize later
		if (domitterCollectionSpanLength(shows) == 0){
			setDomitterRootContainerWidth(this.__container, null);
			setDomitterRootContainerHeight(this.__container, null);
		}
		else {
			var index = 1;
			var end = domitterCollectionSpanEnd(shows);
			var bottom = 
					domitterCharacterCollectionBottom(this.__characters, 0) + 
					domitterCharacterCollectionLineMargin(this.__characters, 0);
			while (index < end){
				bottom = Math.max(
					bottom, 
					domitterCharacterCollectionBottom(this.__characters, index) + 
					domitterCharacterCollectionLineMargin(this.__characters, index));
				index = (index+1)|0;
			}
			var top = domitterRootContainerTop(this.__container);
			setDomitterRootContainerWidth(this.__container, null);
			setDomitterRootContainerHeight(this.__container, bottom - top);
		}
	}
  this.__status = true;
};

Domitter.prototype.omit3 = function (){
  confirmDomitterEllipsis(this.__ellipsis);
  confirmDomitterRootContainer(this.__container);
  this.__status = true;
};

Domitter.prototype.omitMain = function (){
  this.omit1();
  this.omit2();
  this.omit3();
}

Domitter.prototype["omit"] = function (){
	if (this.__options["experiments"] &&
			this.__options["experiments"]["useRequestAnimationFrame"]){
		requestAnimationFrame(this.omitMain.bind(this));
	}
	else {
		this.omitMain();
	}
};

Domitter.prototype.unomit1 = function (){
  hideDomitterEllipsis(this.__ellipsis);
  //showDomitterCharacters(this.__characters);
  showAllDomitterCharacterCollection(this.__characters);
  setDomitterRootContainerWidth(this.__container, null);
  setDomitterRootContainerHeight(this.__container, null);
  this.__status = false;
};

Domitter.prototype.unomit2 = function (){
  confirmDomitterEllipsis(this.__ellipsis);
  confirmDomitterRootContainer(this.__container);
  this.__status = false;
};

Domitter.prototype.unomitMain = function (){
  this.unomit1();
  this.unomit2();
};

Domitter.prototype["unomit"] = function (){
	if (this.__options["experiments"] &&
			this.__options["experiments"]["useRequestAnimationFrame"]){
		requestAnimationFrame(this.unomitMain.bind(this));
	}
	else {
		this.unomitMain();
	}
};

Domitter.prototype["toggle"] = function (){
  this["omitp"]() ? 
    this["unomit"]() : 
    this["omit"](); 
};

Domitter.prototype["update"] = function (){
  this["omitp"]() ? 
    this["omit"]() : 
    this["unomit"](); 
};

/* export */

window["Domitter"] = Domitter;

/**
 * dont call .omit, .unomit, .toggle and .update in this object.
 * you should use .omit1~3 and .unomit1~2.
 * @constructor
 */

function Domitters (targets, height, ellipsis, options){

  /* cook arguments */
  
  if (targets == undefined){
    targets = new Array();
  }
  
  else if (targets instanceof Array){
    targets = Array.prototype.slice.call(targets).map(
      function (target){
        if (target instanceof Domitter){
          return target;
        }
        else {
          return new Domitter(target, height, ellipsis, options);
        }
      });
  }
	
  else if (targets instanceof NodeList || 
					 targets instanceof HTMLCollection){
    targets = Array.prototype.slice.call(targets).map(
      function (dom){
        return new Domitter(dom, height, ellipsis, options);
      });
  }
  
  else if (window.jQuery && targets instanceof window.jQuery){
    targets = targets.toArray().map(
      function (dom){
        return new Domitter(dom, height, ellipsis, options);
      });
  }
  
	if (options == undefined){
		options = {};
	}
	
  /* construct members */
  
  this.__targets = targets;
	this.__options = options;
  
}

Domitters.prototype.omit1 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].omit1();
    index = (index+1)|0;
  }
};

Domitters.prototype.omit2 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].omit2();
    index = (index+1)|0;
  }
};

Domitters.prototype.omit3 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].omit3();
    index = (index+1)|0;
  }
};

Domitters.prototype.omitMain = function (){
  this.omit1();
  this.omit2();
  this.omit3();
};

Domitters.prototype["omit"] = function (){
	if (this.__options["experiments"] &&
		 	this.__options["experiments"]["useRequestAnimationFrame"]){
		requestAnimationFrame(this.omitMain.bind(this));
	}
	else {
		this.omitMain();
	}
};

Domitters.prototype.unomit1 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].unomit1();
    index = (index+1)|0;
  }
};

Domitters.prototype.unomit2 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].unomit2();
    index = (index+1)|0;
  }
};

Domitters.prototype.unomitMain = function (){
  this.unomit1();
  this.unomit2();
};

Domitters.prototype["unomit"] = function (){
	if (this.__options["experiments"] &&
		 	this.__options["experiments"]["useRequestAnimationFrame"]){
		requestAnimationFrame(this.unomitMain.bind(this));
	}
	else {
		this.unomitMain();
	}
};

Domitters.prototype.updateMain = function (){
  
  var index1a = 0;
  while (index1a < this.__targets.length){
    if (this.__targets[index1a]["omitp"]())
      this.__targets[index1a].omit1();
    index1a = (index1a+1)|0;
  }
  
  var index2a = 0;
  while (index2a < this.__targets.length){
    if (this.__targets[index2a]["omitp"]())
      this.__targets[index2a].omit2();
    index2a = (index2a+1)|0;
  }
  
  var index1b = 0;
  while (index1b < this.__targets.length){
    if (this.__targets[index1b]["unomitp"]())
      this.__targets[index1b].unomit1();
    index1b = (index1b+1)|0;
  }
  
  var index3a = 0;
  while (index3a < this.__targets.length){
    if (this.__targets[index3a]["omitp"]())
      this.__targets[index3a].omit3();
    index3a = (index3a+1)|0;
  }
  
  var index2b = 0;
  while (index2b < this.__targets.length){
    if (this.__targets[index2b]["unomitp"]())
      this.__targets[index2b].unomit2();
    index2b = (index2b+1)|0;
  }
  
};

Domitters.prototype["update"] = function (){
	if (this.__options["experiments"] &&
		 	this.__options["experiments"]["useRequestAnimationFrame"]){
		requestAnimationFrame(this.updateMain.bind(this));
	}
	else {
		this.updateMain();
	}
};

Domitters.prototype.toggleMain = function (){
  
  var index1a = 0;
  while (index1a < this.__targets.length){
    if (this.__targets[index1a]["unomitp"]())
      this.__targets[index1a].omit1();
    index1a = (index1a+1)|0;
  }
  
  var index2a = 0;
  while (index2a < this.__targets.length){
    if (this.__targets[index2a]["unomitp"]())
      this.__targets[index2a].omit2();
    index2a = (index2a+1)|0;
  }
  
  var index1b = 0;
  while (index1b < this.__targets.length){
    if (this.__targets[index1b]["omitp"]())
      this.__targets[index1b].unomit1();
    index1b = (index1b+1)|0;
  }
  
  var index3a = 0;
  while (index3a < this.__targets.length){
    if (this.__targets[index3a]["unomitp"]())
      this.__targets[index3a].omit3();
    index3a = (index3a+1)|0;
  }
  
  var index2b = 0;
  while (index2b < this.__targets.length){
    if (this.__targets[index2b]["omitp"]())
      this.__targets[index2b].unomit2();
    index2b = (index2b+1)|0;
  }
  
};

Domitters.prototype["toggle"] = function (){
	if (this.__options["experiments"] &&
		 	this.__options["experiments"]["useRequestAnimationFrame"]){
		requestAnimationFrame(this.toggleMain.bind(this));
	}
	else {
		this.toggleMain();
	}
};

/* export */

window["Domitters"] = Domitters;

})();
