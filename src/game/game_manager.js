function ItemSet() {
    this.items = [];
}

function GlebasInstance(){
    this.defaultAttributes = new Attributes(0);
    this.bonusAttributes = new Attributes(0);

    this.hp = this.getMaxHp();
    this.energy = this.getMaxEnergy();
    this.happiness = this.getMaxHappiness();
    this.liver = this.getMaxLiver();
    
    this.mmr = 2500;
    this.money = 50;
    //todo: inventory, buffs
}

GlebasInstance.prototype.getMaxHp = function() {
    return 100 + Math.floor(0.5 * (this.defaultAttributes.strength + this.bonusAttributes.strength));
};

GlebasInstance.prototype.getMaxEnergy = function() {
    return 100 + Math.floor(0.5 * (this.defaultAttributes.energy + this.bonusAttributes.energy));
};

GlebasInstance.prototype.getMaxHappiness = function() {
    return 100 + Math.floor(0.5 * (this.defaultAttributes.happiness + this.bonusAttributes.happiness));
};

GlebasInstance.prototype.getMaxLiver = function() {
    return 100 + Math.floor(0.5 * (this.defaultAttributes.liver + this.bonusAttributes.liver));
};

GlebasInstance.prototype.getHpPercents = function(){
    return parseInt((this.hp / this.getMaxHp()) * 100);
};

GlebasInstance.prototype.getEnergyPercents = function(){
    return parseInt((this.energy / this.getMaxEnergy()) * 100);
};

GlebasInstance.prototype.getHappinessPercents = function (){
    return parseInt((this.happiness / this.getMaxHappiness()) * 100);
};

GlebasInstance.prototype.evaluateBonuses = function() {
    //todo: evaluate bonuses from items, buffs, global events ...
};

GlebasInstance.prototype.update = function(){
    this.hp = Math.min(this.hp, this.getMaxHp());
    this.energy = Math.min(this.energy, this.getMaxEnergy());
    this.happiness = Math.min(this.happiness, this.getMaxHappiness());
};

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

function GameManager(){
    this.glebas = new GlebasInstance();
    this.time = new Date(2010, 9, 10);
    this.sectionSets = [];
    
    this.sectionSets.push(new HomeSections());
    this.sectionSets.push(new ShopActions());
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
};
