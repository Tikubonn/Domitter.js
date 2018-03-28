/* 
	Copyright (c) 2018 tikubonn.
	Released under the MIT license 
	http://opensource.org/licenses/mitlicense.php 
*/

function OmitterDocumentBase (dom){
	this.dom = dom;
	this.charactorNodes = new Array();
	this.charactorTops = null;
	this.charactorLefts = null;
	this.charactorHeights = null;
}

OmitterDocumentBase.prototype.update = function (){
	var charactorTops = new Array();
	var charactorLefts = new Array();
	var charactorHeights = new Array();
	charactorNodes.forEach(
		function (node){
			charactorTops.push(node.offsetTop);
			charactorLefts.push(node.offsetLeft);
			charactorHeights.push(node.offsetHeight);
		});
	this.charactorTops = charactorTops;
	this.charactorLefts = charactorLefts;
	this.charactorHeights = charactorHeights;
};

OmitterDocumentBase.prototype.addNode = function (node){
	this.charactorNodes.push(node);
};

function OmitterDefaultDocument (dom){
	OmitterDocumentBase.apply(this, arguments);
	this.reform(this.dom);
};

OmitterDefaultDocument.prototype = 
	Object.create(OmitterDocumentBase.prototype);

OmitterDefaultDocument.prototype.reform = function (dom){
	return this.reformNode(dom);
};

OmitterDefaultDocument.prototype.reformNode = function (dom){
	return dom instanceof Text ?
		this.reformTextNode(dom):
		this.reformElementNode(dom);
};

OmitterDefaultDocument.prototype.reformTextNode = function (dom){
	var data = dom.data;
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++){
		var span = document.createElement("span");
		var spanContent = document.createTextNode(data[i]);
		span.appendChild(spanContent);
		span.classList.add("omitter-charactor");
		fragment.appendChild(span);
		this.addNode(span);
	}
	return fragment;
};

OmitterDefaultDocument.prototype.reformElementNode = function (dom){
	var dom2 = dom.cloneNode(false);
	for (var i = 0; i < dom.childNodes.length; i++){
		var node = dom.childNodes.item(i);
		var node2 = this.reformNode(node);
		dom2.appendChild(node2);
	}
	console.log(dom2);
	return dom2;
};

function OmitterClonedDocument (){
	OmitterDocumentBase.apply(this, arguments);
	this.reform(this.dom);
};

OmitterClonedDocument.prototype.reform = function (dom){
	this.reformNode(dom);
	return dom;
};

OmitterClonedDocument.prototype.reformNode = function (dom){
	if (dom instanceof Text)
		this.reformTextNode(dom);
	else this.reformElementNode(dom);
};

OmitterClonedDocument.prototype.reformTextNode = function (dom){
	var data = dom.data;
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++){
		var span = document.createElement("span");
		var spanContent = document.createTextNode(data[i]);
		span.appendChild(spanContent);
		span.classList.add("omitter-charactor");
		fragment.appendChild(span);
		this.addNode(span);
	}
	dom.parentNode.replaceChild(fragment, dom);
};

OmitterClonedDocument.prototype.reformElementNode = function (dom){
	for (var i = 0; i < dom.childNodes.length; i++){
		var node = dom.childNodes.item(i);
		if (node instanceof Text || 
				node instanceof Node && 
				!node.classList.contains("omitter-charactor")){
			this.reformNode(node);
		}
	}
};

function OmitterDom (dom, count, cramp){
	this.dom = dom;
	this.domContent = dom.innerText;
	this.cramp = null;
	this.crampContent = cramp;
	this.crampWidth = null;
	this.charactors = null;
	// this.charactorNodes = null;
	this.charactorsWidth = null;
	// this.charactorsWidths = null;
	// this.charactorsHeights = null;
	// this.charactorsTops = null;
	// this.charactorsLefts = null;
	this.root = null;
	this.maxTop = null;
	this.maxHeight = null;
	this.count = count;
	this.init();
}

OmitterDom.prototype.init = function (){
};

/*
// OmitterDom.reformed 
// return reformed element node without side-effect.

OmitterDom.prototype.reformed = function (dom){
	this.charactorNodes = new Array();
	return this.reformedNode(dom);
};

OmitterDom.prototype.reformedNode = function (dom){
	return dom instanceof Text ?
		this.reformedTextNode(dom):
		this.reformedElementNode(dom);
};

OmitterDom.prototype.reformedTextNode = function (dom){
	var data = dom.data;
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++){
		var span = document.createElement("span");
		var spanContent = document.createTextNode(data[i]);
		span.appendChild(spanContent);
		span.classList.add("omitter-charactor");
		fragment.appendChild(span);
	}
	return fragment;
};

OmitterDom.prototype.reformedElementNode = function (dom){
	var dom2 = dom.cloneNode(false);
	for (var i = 0; i < dom.childNodes.length; i++){
		var node = dom.childNodes.item(i);
		var node2 = this.reformedNode(node);
		dom2.appendChild(node2);
	}
	console.log(dom2);
	return dom2;
}; 
*/

/* 
// OmitterDom.reform
// reform element dom and return.
// becauful this function has side-effect.

OmitterDom.prototype.reform = function (dom){
	this.charactorNodes = new Array();
	this.reformNode(dom);
	return dom;
};

OmitterDom.prototype.reformNode = function (dom){
	if (dom instanceof Text)
		this.reformTextNode(dom);
	else this.reformElementNode(dom);
};

OmitterDom.prototype.reformTextNode = function (dom){
	var data = dom.data;
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < data.length; i++){
		var span = document.createElement("span");
		var spanContent = document.createTextNode(data[i]);
		span.appendChild(spanContent);
		span.classList.add("omitter-charactor");
		fragment.appendChild(span);
	}
	dom.parentNode.replaceChild(fragment, dom);
};

OmitterDom.prototype.reformElementNode = function (dom){
	for (var i = 0; i < dom.childNodes.length; i++){
		var node = dom.childNodes.item(i);
		if (node instanceof Text || 
				node instanceof Node && 
				!node.classList.contains("omitter-charactor")){
			this.reformNode(node);
		}
	}
}; 
*/

OmitterDom.prototype.omit1 = function (){
};

OmitterDom.prototype.omit2 = function (){
};

OmitterDom.prototype.omit3 = function (){
};

OmitterDom.prototype.omit4 = function (){
};

/* OmitterDom.prototype.omit1 = function (){
	
	var crampWidth = this.cramp.offsetWidth;
	var charactorsWidth = this.charactors.offsetWidth;
	var charactorsHeights = new Array();
	var charactorsLefts = new Array();
	var charactorsTops = new Array();
	
	var i = 0;
	var is = this.charactorNodes.length;
	while (i < is){
		charactorsHeights.push(this.charactorNodes[i].offsetHeight);
		charactorsLefts.push(this.charactorNodes[i].offsetLeft);
		charactorsTops.push(this.charactorNodes[i].offsetTop);
		i = (i+1)|0;
	}

	this.crampWidth = crampWidth;
	this.charactorsWidth = charactorsWidth;
	this.charactorsHeights = charactorsHeights;
	this.charactorsLefts = charactorsLefts;
	this.charactorsTops = charactorsTops;
};

OmitterDom.prototype.omit2 = function (){

	var poses = new Array();
	var i = 0;
	var is = this.charactorsTops.length;
	while (i < is){
		var pos = this.charactorsTops[i];
		if (poses.indexOf(pos) == -1)
			poses.push(pos);
		i = (i+1)|0;
	}
	
	this.maxTop = poses.length == 0 ? 0 :
		poses[Math.min(poses.length -1, this.count -1)];
	
	this.hideable = this.count < poses.length;
	if (this.hideable)
		this.cramp.classList.remove("omitter-hidden");
	else this.cramp.classList.add("omitter-hidden");
};

OmitterDom.prototype.omit3 = function (){

	this.maxHeight = 0;
	
	var i = this.charactorsTops.length -1;
	while (-1 < i){
		if (this.charactorsTops[i] == this.maxTop)
			this.maxHeight = Math.max(this.maxHeight, this.charactorsHeights[i]);
		i = (i-1)|0;
	}
};
;
OmitterDom.prototype.omit4 = function (){

	var done = false;
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		if (this.maxTop < this.charactorsTops[i]){
			this.charactors.childNodes[i].classList.add("omitter-hidden");
		}
		else if (this.maxTop == this.charactorsTops[i]){
			if (this.crampWidth < this.charactorsWidth - this.charactorsLefts[i]){
				if (!done && this.hideable){
					done = true;
					this.cramp.style.top = this.charactorsTops[i] + "px";
					this.cramp.style.left = this.charactorsLefts[i] + "px";
					this.charactors.childNodes[i].classList.add("omitter-hidden");
				}
				else {
					this.charactors.childNodes[i].classList.remove("omitter-hidden");
				}
			}
			else {
				this.charactors.childNodes[i].classList.add("omitter-hidden");
			}
		}
		else {
			this.charactors.childNodes[i].classList.remove("omitter-hidden");
		}
		i = (i-1)|0;
	}
	
	this.root.style.maxHeight = (this.maxTop + this.maxHeight).toString() + "px";
	
}; */

OmitterDom.prototype.omit = function (){
	this.omit1();
	this.omit2();
	this.omit3();
	this.omit4();
};

OmitterDom.prototype.unomit1 = function (){
	this.cramp.classList.add("omitter-hidden");
};

OmitterDom.prototype.unomit2 = function (){
	var i = this.charactors.childNodes.length -1;
	while (-1 < i){
		this.charactors.childNodes[i].classList.remove("omitter-hidden");
		i = (i-1)|0;
	}
};

OmitterDom.prototype.unomit3 = function (){
	this.root.style.maxHeight = null;
};

OmitterDom.prototype.unomit = function (){
	this.unomit1();
	this.unomit2();
	this.unomit3();
};

function Omitter (doms, count, token){
	this.status = false;
	
	if (window.jQuery &&
			doms instanceof window.jQuery){
		doms = doms.toArray();
	}
	
	this.doms = Array.prototype.slice.call(doms).map(
		function (dom){
			return new OmitterDom(dom, count, token);
		});
}

Omitter.prototype.omit = function (){
	this.status = true;
	this.doms.map(function (dom){ dom.omit1(); });
	this.doms.map(function (dom){ dom.omit2(); });
	this.doms.map(function (dom){ dom.omit3(); });
	this.doms.map(function (dom){ dom.omit4(); });
};

Omitter.prototype.unomit = function (){
	this.status && 
		this.doms.map(
			function (dom){
				dom.unomit();
			});
	this.status = false;
};

Omitter.prototype.toggle = function (){
	this.status ? 
		this.unomit():
		this.omit();
};

Omitter.prototype.update = function (){
	this.status ? 
		this.omit():
		this.unomit();
};
