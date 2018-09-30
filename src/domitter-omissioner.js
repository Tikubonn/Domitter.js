
/**
 * @constructor
 */

function DomitterOmissioner (){
}

/**
 * @param {Object} characters
 * @return {void}
 */

DomitterOmissioner.prototype["omit"] = function (characters){
  throw new Error(".omit method was not defined.");
};

/* export */

window["DomitterOmissioner"] = DomitterOmissioner;
