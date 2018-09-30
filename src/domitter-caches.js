
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
