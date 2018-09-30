
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
