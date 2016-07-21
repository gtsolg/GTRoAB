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

function SectionsSet(){
    this.caption;
    this.sections = [];
}

SectionsSet.prototype.addSection = function(section) {
    this.sections.push(section);
};

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
    
    this.sectionSets.push(new HomeSections());
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
