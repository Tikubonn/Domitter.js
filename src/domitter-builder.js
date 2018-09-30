
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
