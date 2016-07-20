function Button(parentID, text, defaultCSS, index, callBack) {
    this.btn = new DynamicHTMLInterfaceObject(parentID, "button");
    this.btn.addStyle(defaultCSS);
    this.btn.htmlObject.innerHTML = text;
    this.index = index;
    var kek = this;
    this.btn.htmlObject.onclick = function() {
        if (callBack != undefined) {
            callBack(kek);
        }
    };
}
