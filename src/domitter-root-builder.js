
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
