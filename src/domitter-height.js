
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
