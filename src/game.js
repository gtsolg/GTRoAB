function HTMLInterfaceObject(id) {
    this.htmlObject = document.getElementById(id);
}

HTMLInterfaceObject.prototype.addStyle = function(cssStyle) {
    this.htmlObject.classList.add(cssStyle);
};

HTMLInterfaceObject.prototype.removeStyle = function(cssStyle) {
    this.htmlObject.classList.remove(cssStyle);
};

Status.prototype = new HTMLInterfaceObject();
function Status() {
    HTMLInterfaceObject.call(this, "status");
}

Beard.prototype = new HTMLInterfaceObject();
function Beard() {
    HTMLInterfaceObject.call(this, "glebasBeard");
}

Face.prototype = new HTMLInterfaceObject();
function Face() {
    HTMLInterfaceObject.call(this, "glebasFace");
}

Glebas.prototype = new HTMLInterfaceObject();
function Glebas() {
    HTMLInterfaceObject.call(this, "glebas");
    this.beard = new Beard();
    this.status = new Status();
    this.face = new Face();
}

Log.prototype = new HTMLInterfaceObject();
function Log() {
    HTMLInterfaceObject.call(this, "log");
    this.history = [];
}

Log.prototype.invalidate = function() {

};

Log.prototype.addMessage = function(message) {
    this.history.push(message);
    this.invalidate();
};

Menu.prototype = new HTMLInterfaceObject();
function Menu() {
    HTMLInterfaceObject.call(this, "menu");
    this.buttons = [];
}

HTMLInterfaceObjectCollection.prototype = new HTMLInterfaceObject();
function HTMLInterfaceObjectCollection(htmlObjectID) {
    HTMLInterfaceObject.call(this, htmlObjectID);
    this.collection = [];
}

HTMLInterfaceObjectCollection.prototype.getElementByIndex = function(index) {
    return this.collection[index];
};

ActionsHandler.prototype = new HTMLInterfaceObject();
function ActionsHandler() {
    HTMLInterfaceObject.call(this, "actionsHandler");
    this.actions = new HTMLInterfaceObjectCollection("actions");
    this.sections = new HTMLInterfaceObjectCollection("sections");
}

BackGround.prototype = new HTMLInterfaceObject();
function BackGround() {
    HTMLInterfaceObject.call(this, "backGround");
}

Game.prototype = new HTMLInterfaceObject();
function Game() {
    HTMLInterfaceObject.call(this, "game");
    this.glebas = new Glebas();
    this.log = new Log();
    this.menu = new Menu();
    this.actionsHandler = new ActionsHandler();
    this.backGround = new BackGround();

    this.backGround.addStyle("backGround");
    this.addStyle("game");
    this.menu.addStyle("menu");
    this.log.addStyle("log")
    this.glebas.addStyle("glebas");
    this.glebas.beard.addStyle("glebasBeard");
    this.glebas.face.addStyle("glebasFace");
    this.glebas.status.addStyle("status");
    
    this.actionsHandler.addStyle("actionsHandler");
    this.actionsHandler.actions.addStyle("actions");
    this.actionsHandler.sections.addStyle("sections");
}