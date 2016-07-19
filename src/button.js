function Button(parentID, text, defaultCSS, callBack) {
    this.btn = new DynamicHTMLInterfaceObject(parentID, "button");
    this.btn.addStyle(defaultCSS);
    this.btn.htmlObject.innerHTML = text;
    this.btn.htmlObject.onclick = function() {
        if (callBack != undefined) {
            callBack();   
        }
    };
}
