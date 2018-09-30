
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
