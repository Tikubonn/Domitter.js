
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
