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
    this.parent = document.getElementById(parentID);
    this.hidden = true;
    this.show();
}

DynamicHTMLInterfaceObject.prototype.show = function() {
    if (this.hidden) {
        this.hidden = false;
        this.parent.appendChild(this.htmlObject);
    }
};

DynamicHTMLInterfaceObject.prototype.hide = function() {
    if (!this.hidden) {
        this.parent.removeChild(this.htmlObject);
        this.hidden = true;
    }
};

DynamicHTMLInterfaceObject.prototype.setInnerHTML = function(text) {
    this.htmlObject.innerHTML = text;  
};

Status.prototype = new StaticHTMLInterfaceObject();
function Status() {
    StaticHTMLInterfaceObject.call(this, "status");
    this.hp = new ProgressBar("status", "hpBar");
    this.energy = new ProgressBar("status", "energyBar");
    this.happiness = new ProgressBar("status", "happinessBar");
    this.money = new Paragraph("status", "$: 0000010", "money");
    this.mmr = new Paragraph("status", "MMR: 2500", "mmr");
    this.date = new Paragraph("status", "date: 01.01.2010", "date");
}

Status.prototype.setStatusBars = function(hpPerc, energyPerc, happinessPerk) {
    this.hp.setProgress(hpPerc);
    this.energy.setProgress(energyPerc);
    this.happiness.setProgress(happinessPerk);
};

Status.prototype.setTextValues = function(mmr, money, date) {
    this.money.setCaption("date: " + date);
    this.mmr.setCaption("MMR: " + mmr);
    this.date.setCaption("$: " + money); 
};

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

    this.addStyle("glebas");
    this.beard.addStyle("glebasBeard");
    this.face.addStyle("glebasFace");
    this.status.addStyle("status");
}

HTMLInterfaceObjectCollection.prototype = new StaticHTMLInterfaceObject();
function HTMLInterfaceObjectCollection(htmlObjectID) {
    StaticHTMLInterfaceObject.call(this, htmlObjectID);
    this.collection = [];
}

HTMLInterfaceObjectCollection.prototype.getElementByIndex = function(index) {
    return this.collection[index];
};

HTMLInterfaceObjectCollection.prototype.push = function(item) {
    return this.collection.push(item);
};

HTMLInterfaceObjectCollection.prototype.size = function() {
    return this.collection.length;
};

Log.prototype = new HTMLInterfaceObjectCollection();
function Log() {
    HTMLInterfaceObjectCollection.call(this, "log");
    this.addStyle("log");
    
    this.addMessage('kek');
    this.addMessage('blabal');
    this.addMessage('glebas has taken 10 dmg from efuz');
}

Log.prototype.clear = function(){
    this.collection.map(function(item) { item.paragraph.hide(); });
};

Log.prototype.invalidate = function() {
    this.clear();
    var i = this.size() - 21 < 0 ? 0 : this.size() - 21;
    for (; i < this.size(); i++) {
        this.getElementByIndex(i).paragraph.show();
    }
};

Log.prototype.addMessage = function(message) {
    this.push(new Paragraph("log", message, "logParagraph"));
    this.invalidate();
};

ActionsHandler.prototype = new StaticHTMLInterfaceObject();
function ActionsHandler() {
    StaticHTMLInterfaceObject.call(this, "actionsHandler");
    this.actions = new HTMLInterfaceObjectCollection("actions");
    this.sections = new HTMLInterfaceObjectCollection("sections");

    this.addStyle("actionsHandler");
    this.actions.addStyle("actions");
    this.sections.addStyle("sections");
}

BackGround.prototype = new StaticHTMLInterfaceObject();
function BackGround() {
    StaticHTMLInterfaceObject.call(this, "backGround");

    this.addStyle("backGround");
}

Game.prototype = new StaticHTMLInterfaceObject();
function Game() {
    StaticHTMLInterfaceObject.call(this, "game");
    this.glebas = new Glebas();
    this.log = new Log();
    this.menu = new HTMLInterfaceObjectCollection("menu");
    this.actionsHandler = new ActionsHandler();
    this.backGround = new BackGround();

    this.addStyle("game");
    this.menu.addStyle("menu");

    this.menu.collection.push(new Button("menu", "Home", "menuButton", function() {alert("Home");} ));
    this.menu.collection.push(new Button("menu", "Dota", "menuButton", function() {alert("Dota");} ));
}