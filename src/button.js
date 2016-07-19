function Button(parentID, text, defaultCSS) {
    this.btn = new DynamicHTMLInterfaceObject(parentID, "button");
    this.btn.addStyle(defaultCSS);
    this.btn.htmlObject.innerHTML = text;
}
