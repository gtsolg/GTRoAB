function ProgressBar(parentID, defaultCSS) {
    this.container = new DynamicHTMLInterfaceObject(parentID, "div");
    this.container.htmlObject.id = parseInt(Math.random() * 100000) + "_Container"
    this.bar = new DynamicHTMLInterfaceObject(this.container.htmlObject.id, "div");
    this.container.addStyle("progressWrapper");
    this.bar.addStyle(defaultCSS);
}

ProgressBar.prototype.setProgress = function(perc) {
    this.bar.htmlObject.style.width = perc + "%";
};

ProgressBar.prototype.getProgress = function() {
    return parseInt(this.bar.htmlObject.style.width);
};
