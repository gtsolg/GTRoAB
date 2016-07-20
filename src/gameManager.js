function GlebasInstance(hp, energy, happiness){
    this.hp = hp;
    this.energy = energy;
    this.happiness = happiness;

    this.money = 50;

    this.strength = 0;
    this.intellengece = 0;
    this.endurance = 0;
    this.charisma = 0;
    this.luck = 0;
    this.liver = 100;
}

function PlayDota(){
    this.caption = "Играть в доту";
    this.energy = -10;
}

function Sleep(){
    this.caption = "Поспать";
    this.energy = 50;
}

function Eat(){
    this.caption = "Поесть";
    this.hp = 20;
    this.happiness = 2;

    this.time = 15;
}

function CleanHouse(){
    this.caption = "Убраться в квартире";
    this.hp = -10;
    this.energy = -10;
    this.happiness = -10;
    this.money = 3;
    this.time = 70;
}

function WatchTV() {
    this.caption = "Посмотреть телевизор";
    this.happiness = 10;

    this.time = 30;
}

function evaluateAction(action, glebas){
    for(var param in action){
        if (glebas[param] != undefined){
            glebas[param] += action[param];
        }
    }
}

function SectionsSet(){
    this.caption;
    this.sections = [];
}

SectionsSet.prototype.addSection = function(section) {
    this.sections.push(section);
};

function ActionSet() {
    this.actions = [];
}

ActionSet.prototype.addAction = function(action){
  this.actions.push(action);
};

HomeActions.prototype = new ActionSet();
function HomeActions(){
    ActionSet.call(this);
}

HomeSections.prototype = new SectionsSet();
function HomeSections(){
    SectionsSet.call(this);
    this.caption = "Дом";
}

function Section(caption) {
    this.caption = caption;
    this.actions = [];
}
Section.prototype.addAction = function (action) {
    this.actions.push(action);
};

FridgesSection.prototype = new Section();
function FridgesSection(caption) {
    Section.call(this, caption);
}

DotaSection.prototype = new Section();
function DotaSection(caption) {
    Section.call(this, caption);
}

function GameManager(){
    this.glebas = new GlebasInstance(100, 100, 100);
    this.time = new Date(2010, 9, 10);
    this.sectionsSets = [];

    var homeSections = new HomeSections();
    homeSections.addSection(new FridgesSection("Холодильник"));
    homeSections.sections[0].addAction(new Eat());
    homeSections.addSection(new DotaSection("Дота"));

    this.sectionsSets.push(homeSections);
}


