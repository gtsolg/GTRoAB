function Paragraph(parentID, text, defaultCSS) {
    this.paragraph = new DynamicHTMLInterfaceObject(parentID, "p");
    this.setCaption(text);
    this.paragraph.addStyle(defaultCSS);
}

Paragraph.prototype.setCaption = function(text) {
    this.paragraph.setInnerHTML(text);
}