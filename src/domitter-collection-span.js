
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
