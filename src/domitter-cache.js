
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
