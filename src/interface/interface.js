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

DynamicHTMLInterfaceObject.prototype.randomID = function(suffix) {
    this.htmlObject.id = parseInt(Math.random() * 100000000) + suffix;
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
    this.money.setCaption("$: " + money);
    this.mmr.setCaption("MMR: " + mmr);
    this.date.setCaption(date);
};

Beard.prototype = new StaticHTMLInterfaceObject();
function Beard() {
    StaticHTMLInterfaceObject.call(this, "glebasBeard");
}

Face.prototype = new StaticHTMLInterfaceObject();
function Face() {
    StaticHTMLInterfaceObject.call(this, "glebasFace");
}

IGlebas.prototype = new StaticHTMLInterfaceObject();
function IGlebas() {
    StaticHTMLInterfaceObject.call(this, "glebas");
    this.beard = new Beard();
    this.status = new Status();
    this.face = new Face();

    this.addStyle("glebas");
    this.beard.addStyle("glebasBeard");
    this.face.addStyle("glebasFace");
    this.status.addStyle("status");
}

IGlebas.prototype.invalidate = function(gameManager){
    var gleb = gameManager.glebas;
    this.status.setStatusBars(gleb.getHpPercents(), gleb.getEnergyPercents(), gleb.getHappinessPercents());
    this.status.setTextValues(gameManager.getMMR(), gameManager.getMoney(), gameManager.getTime());
    
    this.status.hp.setTextProgress(gleb.hp, gleb.getMaxHp());
    this.status.energy.setTextProgress(gleb.energy, gleb.getMaxEnergy());
    this.status.happiness.setTextProgress(gleb.happiness, gleb.getMaxHappiness());
};

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

Menu.prototype = new HTMLInterfaceObjectCollection();
function Menu(){
    HTMLInterfaceObjectCollection.call(this, "menu");
    this.lastButtonIndex = 0;
}

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
    this.lastSectionIndex = 0;
}

ActionsHandler.prototype.resetSections = function(){
    this.lastSectionIndex = 0;
    this.sections.collection.map(function(item) {item.btn.hide()})
    this.sections.collection = [];
};

ActionsHandler.prototype.resetActions = function(){
    this.actions.collection.map(function(item) {item.btn.hide()})
    this.actions.collection = [];
};

BackGround.prototype = new StaticHTMLInterfaceObject();
function BackGround() {
    StaticHTMLInterfaceObject.call(this, "backGround");

    this.addStyle("backGround");
}

Game.prototype = new StaticHTMLInterfaceObject();
function Game(gm) {
    StaticHTMLInterfaceObject.call(this, "game");
    this.glebas = new IGlebas();
    this.log = new Log();
    this.menu = new Menu();
    this.actionsHandler = new ActionsHandler();
    this.backGround = new BackGround();

    this.addStyle("game");
    this.menu.addStyle("menu");

    this.gameManager = gm;

    this.invalidateMenu(this.gameManager.sectionSets);
    this.invalidate();
    this.invalidateActionHandler(this.gameManager.sectionSets[0]);
}

Game.prototype.onMenuBtnClick = function(btn){
    //this.menu.lastButtonIndex = btn.index;
    this.invalidateActionHandler(btn.index);
};

Game.prototype.onSectionBtnClick = function(btn){
    //this.actionsHandler.lastSectionIndex = btn.index;
    this.invalidateActions(btn.index.actions);
};

Game.prototype.onActionBtnClick = function(btn){
    //console.log(this.gameManager);
    this.gameManager.evaluateAction(btn.index);
    this.invalidate();
};

Game.prototype.invalidate = function(){
    this.glebas.invalidate(this.gameManager);
    //this.invalidateMenu(this.gameManager.sectionSet);
};

Game.prototype.onGlebasFaceClick = function () {
    this.invalidateActionHandler(this.gameManager.glebasSections);
};

Game.prototype.invalidateMenu = function(){
    for(var i in this.gameManager.sectionSets) {
        this.menu.collection.push(new Button("menu", this.gameManager.sectionSets[i].caption, "menuButton", this.gameManager.sectionSets[i], this.onMenuBtnClick.bind(this)));
    }
    this.glebas.face.htmlObject.onclick = this.onGlebasFaceClick.bind(this);
};

Game.prototype.invalidateActionHandler = function(sectionSet){
    this.invalidateSections(sectionSet.sections);
    this.invalidateActions(sectionSet.sections[0].actions);
};

Game.prototype.invalidateSections = function(sectionSet){
    this.actionsHandler.resetSections();
    for(var i in sectionSet){
        this.actionsHandler.sections.push(new Button("sections", sectionSet[i].caption, "sectionButton", sectionSet[i], this.onSectionBtnClick.bind(this)));
    }
};

Game.prototype.invalidateActions = function(actionSet){
    this.actionsHandler.resetActions();
    for(var i in actionSet){
        var newBtn = new Button("actions", actionSet[i].caption, "actionButton", actionSet[i], this.onActionBtnClick.bind(this));
        if (actionSet[i].toolTipCaption != undefined) {
            newBtn.addToolTip(actionSet[i].toolTipCaption);
        }
        this.actionsHandler.actions.push(newBtn);
    }
};