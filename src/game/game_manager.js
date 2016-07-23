function ItemSet() {
    this.items = [];
}

function GlebasInstance(){
    this.defaultAttributes = new Attributes(0);
    this.bonusAttributes = new Attributes(0);

    this.defaultAttributes.hp = 100;
    this.defaultAttributes.energy = 100;
    this.defaultAttributes.happiness = 100;
    this.defaultAttributes.liver = 100;
    
    // current status
    this.hp = this.getMaxHp();
    this.energy = this.getMaxEnergy();
    this.happiness = this.getMaxHappiness();
    this.liver = this.getMaxLiver();
    this.mmr = 2500;
    this.money = 50;

    this.equipment = new ItemSet();

    this.takeEquipment(testMouse);
    this.evaluateBonuses();
    
    console.log(this.getMaxEnergy());
}

GlebasInstance.prototype.getMaxHp = function() {
    return this.defaultAttributes.hp + this.bonusAttributes.hp +
        + Math.floor(0.5 * (this.defaultAttributes.strength + this.bonusAttributes.strength));
};

GlebasInstance.prototype.getMaxEnergy = function() {
    return this.defaultAttributes.energy + this.bonusAttributes.energy;
};

GlebasInstance.prototype.getMaxHappiness = function() {
    return this.defaultAttributes.happiness + this.bonusAttributes.happiness;
};

GlebasInstance.prototype.getMaxLiver = function() {
    return this.defaultAttributes.liver + this.bonusAttributes.liver;
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

GlebasInstance.prototype.takeEquipment = function(item) {
    this.equipment.items.push(item);
};

GlebasInstance.prototype.evaluateBonuses = function() {
    this.bonusAttributes = new Attributes(0);
    var t = this;
    this.equipment.items.map(function(item) {
        t.bonusAttributes.addNonDefault(item.getEvaluatedStats(t.defaultAttributes));
    });
    this.update();
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
    this.objects = [];
}

Section.prototype.addAction = function (action) {
    this.objects.push(action);
};

function GameManager(){
    this.glebas = new GlebasInstance();
    this.time = new Date(2010, 9, 10);
    this.sectionSets = [];
    
    this.glebasSections = new GlebasSections();
    this.sectionSets.push(new HomeSections());
    this.sectionSets.push(new ShopSections());
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
