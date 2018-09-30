
/**
 * @constructor
 */

function Domitter (target, height, ellipsis, options){

  /* cook arguments */
  
  if (window["jQuery"] && target instanceof window["jQuery"]){
    var doms = target.toArray();
    if (doms.length == 0){
      throw new Error("took an empty jQuery object.");
    }
    target = doms[0];
  }
  
  if (typeof height == "number" || height instanceof Number){
    height = new DomitterLines(height);
  }
  
  if (ellipsis == undefined){
    ellipsis = makeDomitterEllipsis("...");
  }
  
  else if (typeof ellipsis == "string" || ellipsis instanceof String){
    ellipsis = makeDomitterEllipsis(ellipsis.toString());
  }
  
  if (options == undefined){
    options = {};
  }
  
  /* construct members */
  
  this.__target = target;
  this.__height = height;
  this.__ellipsis = ellipsis;
  this.__options = options;
  this.__container = null;
  this.__characters = null;
  this.__status = false;

  /* form dom structure */
  
  this.form();
  
}

Domitter.prototype["omitp"] = function (){
  return this.__status;
};

Domitter.prototype["unomitp"] = function (){
  return this.__status == false;
};

Domitter.prototype.formIn = function (builder, target){
  if (target instanceof Text){
    this.formInText(builder, target);
  }
  else if (target instanceof Node){
    this.formInNode(builder, target);
  }
};

/* Domitter.prototype.formInText = function (builder, target){
  var builder2 = makeDomitterBuilder();
  //addsDomitterBuilder(builder2, target.data);
  addsDomitterBuilderExperiments(builder2, target.data, this.__options);
  addsDomitterCharacters(
    domitterRootBuilderCharacters(builder),
    domitterCharactersArray(
      domitterBuilderCharacters(builder2)));
  target.parentNode.replaceChild(
    domitterContainerDom(
      domitterBuilderContainer(builder2)),
    target);
}; */

Domitter.prototype.formInText = function (builder, target){
  var builder2 = makeDomitterBuilder();
  //addsDomitterBuilder(builder2, target.data);
  addsDomitterBuilderExperiments(builder2, target.data, this.__options);
  extendDomitterCacheCollection(
    domitterRootBuilderCharacters(builder),
    domitterBuilderCharacters(builder2));
  target.parentNode.replaceChild(
    domitterContainerDom(
      domitterBuilderContainer(builder2)),
    target);
};

Domitter.prototype.formInNode = function (builder, target){
  if (target.classList.contains("domitter") == false &&
      target.classList.contains("domitter-character") == false &&
      target.classList.contains("domitter-ellipsis") == false){
    var index = 0;
    while (index < target.childNodes.length){
      this.formIn(builder, target.childNodes[index]);
      index = (index+1)|0;
    }
  }
};

Domitter.prototype.swapElements = function (doma, domb){
  var count = doma.childNodes.length;
  var doms = document.createDocumentFragment();
  while (count){
    count = (count-1)|0;
    doms.appendChild(doma.firstChild);
  }
  domb.appendChild(doms);
}

Domitter.prototype.form = function (){
  var builder = makeDomitterRootBuilder();
  this.formIn(builder, this.__target);
  this.__container = domitterRootBuilderContainer(builder);
  this.__characters = domitterRootBuilderCharacters(builder);
  this.swapElements(
    this.__target,
    domitterRootContainerDom(
      domitterRootBuilderContainer(builder)));
  domitterRootContainerDom(
    domitterRootBuilderContainer(builder)).appendChild(
    domitterEllipsisDom(this.__ellipsis));
  this.__target.appendChild(
    domitterRootContainerDom(
      domitterRootBuilderContainer(builder)));
  hideDomitterEllipsis(this.__ellipsis);
};

Domitter.prototype.omit1 = function (){
  updateDomitterEllipsis(this.__ellipsis);
  updateDomitterContainer(this.__container);
  //updateDomitterCharacters(this.__characters);
  updateDomitterCharacterCollection(this.__characters);
};

Domitter.prototype.omit2 = function (){
  this.__height["omit"](this.__characters);
  this.updateEllipsis();
  this.updateContainer();
  this.__status = true;
};

/* Domitter.prototype.updateEllipsis = function (){
  var hides = hidesDomitterCharacters(this.__characters); // optimize later
  if (hides.length == 0){
    hideDomitterEllipsis(this.__ellipsis);
  }
  else {
    var shows = showsDomitterCharacters(this.__characters); // optimize later
    if (shows.length == 0){
      hideDomitterEllipsis(this.__ellipsis);
    }
    else {
      showDomitterEllipsis(this.__ellipsis);
      var index = shows.length;
      while (index){
        index = (index-1)|0;
        var show = shows[index];
        if (/\s+/.test(domitterCharacterDom(show).data)){
          hideDomitterCharacter(show);
        }
        else 
        if (domitterEllipsisOuterWidth(this.__ellipsis) <= 
            (domitterRootContainerLeft(this.__container) + 
             domitterRootContainerInnerWidth(this.__container) - 
             domitterCharacterRight(show))){
          setDomitterEllipsisBottom(
            this.__ellipsis, 
            domitterCharacterBottom(show) + 
            domitterCharacterLineMargin(show) - 
            domitterRootContainerTop(this.__container));
          setDomitterEllipsisLeft(
            this.__ellipsis, 
            domitterCharacterRight(show) - 
            domitterRootContainerLeft(this.__container));
          break;
        }
        else {
          hideDomitterCharacter(show);
        }
      }
    }    
  }
  this.__status = true;
}; */

/* Domitter.prototype.updateEllipsis = function (){
  var hides = hidesDomitterCharacters(this.__characters); // optimize later
  if (domitterSpanLength(hides) == 0){
    hideDomitterEllipsis(this.__ellipsis);
  }
  else {
    var shows = showsDomitterCharacters(this.__characters); // optimize later
    if (domitterSpanLength(shows) == 0){
      hideDomitterEllipsis(this.__ellipsis);
    }
    else {
      showDomitterEllipsis(this.__ellipsis);
      var index = domitterSpanLength(shows);
      while (index){
        index = (index-1)|0;
        var show = getDomitterSpan(shows, index);
        if (/\s+/.test(domitterCharacterDom(show).data)){
          hideDomitterCharacter(show);
        }
        else 
        if (domitterEllipsisOuterWidth(this.__ellipsis) <= 
            (domitterRootContainerLeft(this.__container) + 
             domitterRootContainerInnerWidth(this.__container) - 
             domitterCharacterRight(show))){
          setDomitterEllipsisBottom(
            this.__ellipsis, 
            domitterCharacterBottom(show) + 
            domitterCharacterLineMargin(show) - 
            domitterRootContainerTop(this.__container));
          setDomitterEllipsisLeft(
            this.__ellipsis, 
            domitterCharacterRight(show) - 
            domitterRootContainerLeft(this.__container));
          break;
        }
        else {
          hideDomitterCharacter(show);
        }
      }
    }    
  }
  this.__status = true;
}; */

Domitter.prototype.updateEllipsis = function (){
  var hides = hidesDomitterCharacterCollection(this.__characters);
  if (domitterCollectionSpanLength(hides) == 0){
    hideDomitterEllipsis(this.__ellipsis);
  }
  else {
    var shows = showsDomitterCharacterCollection(this.__characters);
    if (domitterCollectionSpanLength(shows) == 0){
      hideDomitterEllipsis(this.__ellipsis);
    }
    else {
      showDomitterEllipsis(this.__ellipsis);
      var index = domitterCollectionSpanEnd(shows);
      var beginning = domitterCollectionSpanBeginning(shows);
      while (beginning < index){
        index = (index-1)|0;
        if (/\s+/.test(domitterCharacterCollectionDom(this.__characters, index).data)){
          hideDomitterCharacterCollection(this.__characters, index);
        }
        else 
        if (domitterEllipsisOuterWidth(this.__ellipsis) <= 
            (domitterRootContainerLeft(this.__container) + 
             domitterRootContainerInnerWidth(this.__container) - 
             domitterCharacterCollectionRight(this.__characters, index))){
          setDomitterEllipsisBottom(
            this.__ellipsis, 
            domitterCharacterCollectionBottom(this.__characters, index) + 
            domitterCharacterCollectionLineMargin(this.__characters, index) -
            domitterRootContainerTop(this.__container));
          setDomitterEllipsisLeft(
            this.__ellipsis, 
            domitterCharacterCollectionRight(this.__characters, index) - 
            domitterRootContainerLeft(this.__container));
          break;
        }
        else {
          hideDomitterCharacterCollection(this.__characters, index);
        }
      }
    }    
  }
  this.__status = true;
};

/* Domitter.prototype.updateContainer = function (){
  var hides = hidesDomitterCharacters(this.__characters); // optimize later
  if (hides.length == 0){
    setDomitterRootContainerWidth(this.__container, null);
    setDomitterRootContainerHeight(this.__container, null);
  }
  else {
    var shows = showsDomitterCharacters(this.__characters); // optimize later
    if (shows.length == 0){
      setDomitterRootContainerWidth(this.__container, null);
      setDomitterRootContainerHeight(this.__container, null);
    }
    else {
      var index = 1;
      //var bottom = domitterCharacterBottom(shows[0]);
      var bottom = 
          domitterCharacterBottom(shows[0]) + 
          domitterCharacterLineMargin(shows[0]);
      while (index < shows.length){
        var show = shows[index];
        //bottom = Math.max(bottom, domitterCharacterBottom(show));
        bottom = Math.max(
          bottom, 
          domitterCharacterBottom(show) + 
          domitterCharacterLineMargin(show));
        index = (index+1)|0;
      }
      var top = domitterRootContainerTop(this.__container);
      setDomitterRootContainerWidth(this.__container, null);
      setDomitterRootContainerHeight(this.__container, bottom - top);
    }    
  }
  this.__status = true;
}; */

/* Domitter.prototype.updateContainer = function (){
  var hides = hidesDomitterCharacters(this.__characters); // optimize later
  if (domitterSpanLength(hides) == 0){
    setDomitterRootContainerWidth(this.__container, null);
    setDomitterRootContainerHeight(this.__container, null);
  }
  else {
    var shows = showsDomitterCharacters(this.__characters); // optimize later
    if (domitterSpanLength(shows) == 0){
      setDomitterRootContainerWidth(this.__container, null);
      setDomitterRootContainerHeight(this.__container, null);
    }
    else {
      var index = 1;
      //var bottom = domitterCharacterBottom(shows[0]);
      var bottom = 
          domitterCharacterBottom(getDomitterSpan(shows, 0)) + 
          domitterCharacterLineMargin(getDomitterSpan(shows, 0));
      var length = domitterSpanLength(shows);
      while (index < length){
        var show = getDomitterSpan(shows, index);
        //bottom = Math.max(bottom, domitterCharacterBottom(show));
        bottom = Math.max(
          bottom, 
          domitterCharacterBottom(show) + 
          domitterCharacterLineMargin(show));
        index = (index+1)|0;
      }
      var top = domitterRootContainerTop(this.__container);
      setDomitterRootContainerWidth(this.__container, null);
      setDomitterRootContainerHeight(this.__container, bottom - top);
    }    
  }
  this.__status = true;
}; */

Domitter.prototype.updateContainer = function (){
  var hides = hidesDomitterCharacterCollection(this.__characters); // optimize later
  if (domitterCollectionSpanLength(hides) == 0){
    setDomitterRootContainerWidth(this.__container, null);
    setDomitterRootContainerHeight(this.__container, null);
  }
  else {
    var shows = showsDomitterCharacterCollection(this.__characters); // optimize later
    if (domitterCollectionSpanLength(shows) == 0){
      setDomitterRootContainerWidth(this.__container, null);
      setDomitterRootContainerHeight(this.__container, null);
    }
    else {
      var index = 1;
      var end = domitterCollectionSpanEnd(shows);
      var bottom = 
          domitterCharacterCollectionBottom(this.__characters, 0) + 
          domitterCharacterCollectionLineMargin(this.__characters, 0);
      while (index < end){
        bottom = Math.max(
          bottom, 
          domitterCharacterCollectionBottom(this.__characters, index) + 
          domitterCharacterCollectionLineMargin(this.__characters, index));
        index = (index+1)|0;
      }
      var top = domitterRootContainerTop(this.__container);
      setDomitterRootContainerWidth(this.__container, null);
      setDomitterRootContainerHeight(this.__container, bottom - top);
    }
  }
  this.__status = true;
};

Domitter.prototype.omit3 = function (){
  confirmDomitterEllipsis(this.__ellipsis);
  confirmDomitterRootContainer(this.__container);
  this.__status = true;
};

Domitter.prototype.omitMain = function (){
  this.omit1();
  this.omit2();
  this.omit3();
}

Domitter.prototype["omit"] = function (){
  if (this.__options["experiments"] &&
      this.__options["experiments"]["useRequestAnimationFrame"]){
    requestAnimationFrame(this.omitMain.bind(this));
  }
  else {
    this.omitMain();
  }
};

Domitter.prototype.unomit1 = function (){
  hideDomitterEllipsis(this.__ellipsis);
  //showDomitterCharacters(this.__characters);
  showAllDomitterCharacterCollection(this.__characters);
  setDomitterRootContainerWidth(this.__container, null);
  setDomitterRootContainerHeight(this.__container, null);
  this.__status = false;
};

Domitter.prototype.unomit2 = function (){
  confirmDomitterEllipsis(this.__ellipsis);
  confirmDomitterRootContainer(this.__container);
  this.__status = false;
};

Domitter.prototype.unomitMain = function (){
  this.unomit1();
  this.unomit2();
};

Domitter.prototype["unomit"] = function (){
  if (this.__options["experiments"] &&
      this.__options["experiments"]["useRequestAnimationFrame"]){
    requestAnimationFrame(this.unomitMain.bind(this));
  }
  else {
    this.unomitMain();
  }
};

Domitter.prototype["toggle"] = function (){
  this["omitp"]() ? 
    this["unomit"]() : 
    this["omit"](); 
};

Domitter.prototype["update"] = function (){
  this["omitp"]() ? 
    this["omit"]() : 
    this["unomit"](); 
};

/* export */

window["Domitter"] = Domitter;
