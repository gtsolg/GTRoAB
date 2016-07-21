function ToolTip(parentID, elementType, caption){
    this.toolTip = new DynamicHTMLInterfaceObject(parentID, elementType);
    this.toolTip.addStyle("toolTip");
    this.toolTip.htmlObject.innerHTML = caption;
}