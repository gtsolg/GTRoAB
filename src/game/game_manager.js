function ItemSet() {
    this.items = {};
}

ItemSet.prototype.map = function (callback) {
    for(var key in this.items){
        callback(this.items[key]);
    }
};

function BuffManager() {
    this.buffs = [];
}

BuffManager.prototype.invalidateBuffs = function(time) {
    for (var i = 0; i < this.buffs.length; i++) {
        var buf = this.buffs[i];
        var endTime = new Date();
        endTime.setTime(buf.startTime.getTime());
        endTime.setMinutes(endTime.getMinutes() + buf.duration);
        if (endTime < time) {
            this.buffs.splice(i, 1);
        }
    }
};

BuffManager.prototype.addBuf = function(buf, time) {
    buf.startTime = time;
    this.buffs.push(buf);
};

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
    this.buffManager = new BuffManager();

    this.takeBuff(testBuff, new Date(2010, 9, 10));
    this.evaluateBonuses();
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
    this.equipment.items[item.itemType] = item;
};

GlebasInstance.prototype.takeBuff = function(buff, time) {
    this.buffManager.addBuf(buff, time);
};

GlebasInstance.prototype.evaluateBonuses = function() {
    var t = this;
    t.bonusAttributes = new Attributes(0);
    t.equipment.map(function(item) {
        t.bonusAttributes.addNonDefault(item.getEvaluatedStats(t.defaultAttributes));
    });
    t.buffManager.buffs.map(function (buff) {
        t.bonusAttributes.addNonDefault(buff.getEvaluatedStats(t.defaultAttributes)); 
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
    action.affectOn(this.glebas);
    if (action.time != undefined) {
        this.time.setMinutes(this.time.getMinutes() + action.time);
    }
    this.glebas.update();
    this.glebas.buffManager.invalidateBuffs(this.time);
    this.glebas.evaluateBonuses();
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
