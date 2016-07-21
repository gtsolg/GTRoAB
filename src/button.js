function Button(parentID, text, defaultCSS, index, callBack) {
    this.btn = new DynamicHTMLInterfaceObject(parentID, "button");
    this.btn.addStyle(defaultCSS);
    this.btn.htmlObject.innerHTML = text;
    this.index = index;
    this.btn.htmlObject.id = parseInt(Math.random() * 100000) + "_Container"

    var self = this;
    this.btn.htmlObject.onclick = function() {
        if (callBack != undefined) {
            callBack(self);
        }
    };
}

Button.prototype.addToolTip = function(caption){
    this.toolTip = new ToolTip(this.btn.htmlObject.id, "span", caption);
    this.btn.htmlObject.appendChild(this.toolTip.toolTip.htmlObject);
}
