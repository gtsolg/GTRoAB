function ProgressBar(parentID, cssStyle) {
    this.container = new DynamicHTMLInterfaceObject(parentID, "div");
    this.container.randomID("_Container");
    this.container.addStyle("pbarContainer");


    this.background = new DynamicHTMLInterfaceObject(this.container.htmlObject.id, "div");
    this.background.randomID("_Background");
    this.background.addStyle("pbarBackground");
    
    this.bar = new DynamicHTMLInterfaceObject(this.background.htmlObject.id, "div");
    this.bar.addStyle(cssStyle);
    this.text = new Paragraph(this.container.htmlObject.id, "", "pbarText");
}

ProgressBar.prototype.setProgress = function(perc) {
    this.bar.htmlObject.style.width = perc + "%";
};

ProgressBar.prototype.getProgress = function() {
    return parseInt(this.bar.htmlObject.style.width);
};

ProgressBar.prototype.setTextProgress = function (current, max) {
    this.text.setCaption(current + " / " + max);
};