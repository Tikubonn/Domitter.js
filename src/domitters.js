
/**
 * dont call .omit, .unomit, .toggle and .update in this object.
 * you should use .omit1~3 and .unomit1~2.
 * @constructor
 */

function Domitters (targets, height, ellipsis, options){

  /* cook arguments */
  
  if (targets == undefined){
    targets = new Array();
  }
  
  else if (targets instanceof Array){
    targets = Array.prototype.slice.call(targets).map(
      function (target){
        if (target instanceof Domitter){
          return target;
        }
        else {
          return new Domitter(target, height, ellipsis, options);
        }
      });
  }
  
  else if (targets instanceof NodeList || 
           targets instanceof HTMLCollection){
    targets = Array.prototype.slice.call(targets).map(
      function (dom){
        return new Domitter(dom, height, ellipsis, options);
      });
  }
  
  else if (window.jQuery && targets instanceof window.jQuery){
    targets = targets.toArray().map(
      function (dom){
        return new Domitter(dom, height, ellipsis, options);
      });
  }
  
  if (options == undefined){
    options = {};
  }
  
  /* construct members */
  
  this.__targets = targets;
  this.__options = options;
  
}

Domitters.prototype.omit1 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].omit1();
    index = (index+1)|0;
  }
};

Domitters.prototype.omit2 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].omit2();
    index = (index+1)|0;
  }
};

Domitters.prototype.omit3 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].omit3();
    index = (index+1)|0;
  }
};

Domitters.prototype.omitMain = function (){
  this.omit1();
  this.omit2();
  this.omit3();
};

Domitters.prototype["omit"] = function (){
  if (this.__options["experiments"] &&
       this.__options["experiments"]["useRequestAnimationFrame"]){
    requestAnimationFrame(this.omitMain.bind(this));
  }
  else {
    this.omitMain();
  }
};

Domitters.prototype.unomit1 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].unomit1();
    index = (index+1)|0;
  }
};

Domitters.prototype.unomit2 = function (){
  var index = 0;
  while (index < this.__targets.length){
    this.__targets[index].unomit2();
    index = (index+1)|0;
  }
};

Domitters.prototype.unomitMain = function (){
  this.unomit1();
  this.unomit2();
};

Domitters.prototype["unomit"] = function (){
  if (this.__options["experiments"] &&
       this.__options["experiments"]["useRequestAnimationFrame"]){
    requestAnimationFrame(this.unomitMain.bind(this));
  }
  else {
    this.unomitMain();
  }
};

Domitters.prototype.updateMain = function (){
  
  var index1a = 0;
  while (index1a < this.__targets.length){
    if (this.__targets[index1a]["omitp"]())
      this.__targets[index1a].omit1();
    index1a = (index1a+1)|0;
  }
  
  var index2a = 0;
  while (index2a < this.__targets.length){
    if (this.__targets[index2a]["omitp"]())
      this.__targets[index2a].omit2();
    index2a = (index2a+1)|0;
  }
  
  var index1b = 0;
  while (index1b < this.__targets.length){
    if (this.__targets[index1b]["unomitp"]())
      this.__targets[index1b].unomit1();
    index1b = (index1b+1)|0;
  }
  
  var index3a = 0;
  while (index3a < this.__targets.length){
    if (this.__targets[index3a]["omitp"]())
      this.__targets[index3a].omit3();
    index3a = (index3a+1)|0;
  }
  
  var index2b = 0;
  while (index2b < this.__targets.length){
    if (this.__targets[index2b]["unomitp"]())
      this.__targets[index2b].unomit2();
    index2b = (index2b+1)|0;
  }
  
};

Domitters.prototype["update"] = function (){
  if (this.__options["experiments"] &&
       this.__options["experiments"]["useRequestAnimationFrame"]){
    requestAnimationFrame(this.updateMain.bind(this));
  }
  else {
    this.updateMain();
  }
};

Domitters.prototype.toggleMain = function (){
  
  var index1a = 0;
  while (index1a < this.__targets.length){
    if (this.__targets[index1a]["unomitp"]())
      this.__targets[index1a].omit1();
    index1a = (index1a+1)|0;
  }
  
  var index2a = 0;
  while (index2a < this.__targets.length){
    if (this.__targets[index2a]["unomitp"]())
      this.__targets[index2a].omit2();
    index2a = (index2a+1)|0;
  }
  
  var index1b = 0;
  while (index1b < this.__targets.length){
    if (this.__targets[index1b]["omitp"]())
      this.__targets[index1b].unomit1();
    index1b = (index1b+1)|0;
  }
  
  var index3a = 0;
  while (index3a < this.__targets.length){
    if (this.__targets[index3a]["unomitp"]())
      this.__targets[index3a].omit3();
    index3a = (index3a+1)|0;
  }
  
  var index2b = 0;
  while (index2b < this.__targets.length){
    if (this.__targets[index2b]["omitp"]())
      this.__targets[index2b].unomit2();
    index2b = (index2b+1)|0;
  }
  
};

Domitters.prototype["toggle"] = function (){
  if (this.__options["experiments"] &&
       this.__options["experiments"]["useRequestAnimationFrame"]){
    requestAnimationFrame(this.toggleMain.bind(this));
  }
  else {
    this.toggleMain();
  }
};

/* export */

window["Domitters"] = Domitters;
