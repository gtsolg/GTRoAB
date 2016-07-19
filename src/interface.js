function HTMLInterfaceObject() {}

HTMLInterfaceObject.prototype.addStyle = function(cssStyle) {
    this.htmlObject.classList.add(cssStyle);
};

HTMLInterfaceObject.prototype.removeStyle = function(cssStyle) {
    this.htmlObject.classList.remove(cssStyle);
};

StaticHTMLInterfaceObject.prototype = new HTMLInterfaceObject();
function StaticHTMLInterfaceObject(id) {
    HTMLInterfaceObject.call(this);
    this.htmlObject = document.getElementById(id);
}

DynamicHTMLInterfaceObject.prototype = new HTMLInterfaceObject();
function DynamicHTMLInterfaceObject(parentID, elementType) {
    HTMLInterfaceObject.call(this);
    this.htmlObject = document.createElement(elementType);
    document.getElementById(parentID).appendChild(this.htmlObject);
}

DynamicHTMLInterfaceObject.prototype.setInnerHTML = function(text) {
    this.htmlObject.innerHTML = text;  
};

Status.prototype = new StaticHTMLInterfaceObject();
function Status() {
    StaticHTMLInterfaceObject.call(this, "status");
    this.hp = new ProgressBar("status", "hpBar");
    this.energy = new ProgressBar("status", "energyBar");
    this.happiness = new ProgressBar("status", "happinessBar");
}

Beard.prototype = new StaticHTMLInterfaceObject();
function Beard() {
    StaticHTMLInterfaceObject.call(this, "glebasBeard");
}

Face.prototype = new StaticHTMLInterfaceObject();
function Face() {
    StaticHTMLInterfaceObject.call(this, "glebasFace");
}

Glebas.prototype = new StaticHTMLInterfaceObject();
function Glebas() {
    StaticHTMLInterfaceObject.call(this, "glebas");
    this.beard = new Beard();
    this.status = new Status();
    this.face = new Face();
}

Log.prototype = new StaticHTMLInterfaceObject();
function Log() {
    StaticHTMLInterfaceObject.call(this, "log");
    this.history = [];
}

Log.prototype.invalidate = function() {

};

Log.prototype.addMessage = function(message) {
    this.history.push(message);
    this.invalidate();
};

Menu.prototype = new StaticHTMLInterfaceObject();
function Menu() {
    StaticHTMLInterfaceObject.call(this, "menu");
    this.buttons = [];
}

StaticHTMLInterfaceObjectCollection.prototype = new StaticHTMLInterfaceObject();
function StaticHTMLInterfaceObjectCollection(htmlObjectID) {
    StaticHTMLInterfaceObject.call(this, htmlObjectID);
    this.collection = [];
}

StaticHTMLInterfaceObjectCollection.prototype.getElementByIndex = function(index) {
    return this.collection[index];
};

ActionsHandler.prototype = new StaticHTMLInterfaceObject();
function ActionsHandler() {
    StaticHTMLInterfaceObject.call(this, "actionsHandler");
    this.actions = new StaticHTMLInterfaceObjectCollection("actions");
    this.sections = new StaticHTMLInterfaceObjectCollection("sections");
}

BackGround.prototype = new StaticHTMLInterfaceObject();
function BackGround() {
    StaticHTMLInterfaceObject.call(this, "backGround");
}

Game.prototype = new StaticHTMLInterfaceObject();

Game.prototype.createButton = function (parentID, caption, defaultCSS) {
    var btn = new DynamicHTMLInterfaceObject(parentID, "button");
    btn.addStyle(defaultCSS);
    btn.htmlObject.innerHTML = caption;
    return btn;
};

function test(game) {
    alert(2);
    game.glebas.status.setProgress(parseInt(Math.random() * 100));
}

function Game() {
    StaticHTMLInterfaceObject.call(this, "game");
    this.glebas = new Glebas();
    this.log = new Log();
    this.menu = new Menu();
    this.actionsHandler = new ActionsHandler();
    this.backGround = new BackGround();

    this.backGround.addStyle("backGround");
    this.addStyle("game");
    this.menu.addStyle("menu");
    this.log.addStyle("log");
    this.glebas.addStyle("glebas");
    this.glebas.beard.addStyle("glebasBeard");
    this.glebas.face.addStyle("glebasFace");
    this.glebas.status.addStyle("status");
    
    this.actionsHandler.addStyle("actionsHandler");
    this.actionsHandler.actions.addStyle("actions");
    this.actionsHandler.sections.addStyle("sections");

    this.homeBtn = this.createButton("menu", "Home", "menuButton");
    this.dotaBtn = this.createButton("menu", "Dota", "menuButton");
}