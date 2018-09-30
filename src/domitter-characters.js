
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
