function GlebasInstance(hp, energy, happiness){
    this.maxHp = hp;
    this.maxEnergy = energy;
    this.maxHappiness = happiness;

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

    this.mmr = 2500;
}

GlebasInstance.prototype.getHpPercents = function(){
    return parseInt((this.hp / this.maxHp) * 100);
}

GlebasInstance.prototype.getEnergyPercents = function(){
    return parseInt((this.energy / this.maxEnergy) * 100);
}

GlebasInstance.prototype.getHappinessPercents = function (){
    return parseInt((this.happiness / this.maxHappiness) * 100);
}

GlebasInstance.prototype.update = function(){
    this.hp = this.hp < this.maxHp ? this.hp : this.maxHp;
    this.energy = this.energy < this.maxEnergy ? this.energy : this.maxEnergy;
    this.happiness = this.happiness < this.maxHappiness ? this.happiness : this.maxHappiness;
}

function PlayDota(){
    this.caption = "Играть в доту";
    this.energy = -10;
}

function Sleep(){
    this.caption = "Поспать";
    this.energy = 50;
    this.toolTipCaption = "Глеб спит, востанавливая " + this.energy + " единиц энергии"
}

function Eat(){
    this.caption = "Поесть";
    this.hp = 20;
    this.happiness = 2;
    this.time = 15;
    this.toolTipCaption = "Поесть, востановив " + this.hp + " единиц здоровья и " + this.happiness + " единицы счастья";
}

function CleanHouse(){
    this.caption = "Убраться в квартире";
    this.hp = -10;
    this.energy = -10;
    this.happiness = -10;
    this.money = 3;
    this.time = 70;
    this.toolTipCaption = "Убраться в квартире, потратив " + Math.abs(this.energy) + " единиц энергии, здоровья, счастья, но получив " + this.money + " единиц денег от мамки";
}

function WatchTV() {
    this.caption = "Посмотреть телевизор";
    this.happiness = 10;

    this.time = 30;
    this.toolTipCaption = "Посмотреть телевизор, востановив " + this.happiness + " единиц счастья";
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
    this.sectionSets = [];

    var homeSections = new HomeSections();
    homeSections.addSection(new FridgesSection("Холодильник"));
    homeSections.sections[0].addAction(new Eat());
    homeSections.sections[0].addAction(new Sleep());
    homeSections.sections[0].addAction(new CleanHouse());
    homeSections.sections[0].addAction(new WatchTV());

    homeSections.addSection(new DotaSection("Дота"));
    homeSections.sections[1].addAction(new PlayDota());

    this.sectionSets.push(homeSections);
}

GameManager.prototype.evaluateAction = function(action){
    for(var param in action){
        if (this.glebas[param] != undefined){
            this.glebas[param] += action[param];
        }
    }
    if (action.time != undefined) {
        this.time.setMinutes(this.time.getMinutes() + action.time);
    }
    this.glebas.update();
};

GameManager.prototype.getMMR = function(){
    return this.glebas.mmr;
};

GameManager.prototype.getMoney = function(){
    return this.glebas.money;
};

GameManager.prototype.getTime = function(){
    return this.time.toLocaleString();
}
