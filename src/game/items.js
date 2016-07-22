function Affix(name, bonus) {
    this.name = name;
    this.bonus = bonus;
}

function Item(name, rarity, description) {
    this.name = name;
    this.stats = new ValAttributes();
    this.rarity = rarity; // common, magic, rare, unique
    this.description = description;
    this.prefixes = [];
    this.suffixes = [];
}

Item.prototype.evaluateBonuses = function() {
    var percBonuses = new PercAttributes();
    var valBonuses = new ValAttributes();
    this.prefixes.map(function(prefix) {
        prefix.bonus._isPerc
            ? percBonuses.addNonDefault(prefix.bonus)
            : valBonuses.addNonDefault(prefix.bonus);
    });
    this.suffixes.map(function(suffix) {
        suffix.bonus._isPerc
            ? percBonuses.addNonDefault(suffix.bonus)
            : valBonuses.addNonDefault(suffix.bonus);
    });
    return {
        percBonuses: percBonuses,
        valBonuses:  valBonuses
    };
};

Item.prototype.getEvaluatedStats = function() {
    var bonuses = this.evaluateBonuses();
    var result = this.stats.copy();
    result = bonuses.percBonuses.evaluate(result);
    result = bonuses.valBonuses.evaluate(result);
    return result;
};

Item.prototype.getFullName = function() {
    var name = this.name;
    this.prefixes.map(function(prefix) { name = prefix.name + " " + name; } );
    this.suffixes.map(function(suffix) { name = name + " " + suffix.name; } );
    return name;
};

Item.prototype.getStatsDescription = function() {
    var sign = function (val) { return val > 0 ? "+" : ""; };
    var stats = this.getEvaluatedStats();
    var description = [];
    stats.mapNonDefault(function(key, val) {
       description.push(attNames[key] + ": " + sign(val) + val); 
    });
    return description;
};

Item.prototype.getBonusesDescription = function() {
    var sign = function (val) { return val > 0 ? "+" : ""; };
    var bonuses = this.evaluateBonuses();
    var description = [];
    bonuses.percBonuses.mapNonDefault(function(key, val) {
        description.push(attNames[key] + ": " + sign(val) + val + "%");
    });
    bonuses.valBonuses.mapNonDefault(function(key, val) {
        description.push(attNames[key] + ": " + sign(val) + val);
    });
    return description;
};

TestMouse.prototype = new Item();
function TestMouse() {
    Item.call(this, "Стандартная мышь", "common", "Стандартная мышь с колёсиком прямиком из 90-х");
    this.stats.liver = 1;
    this.stats.luck = 5;
    this.stats.happiness = -1;

    var testPrefix = new Affix("Устрашающая", new PercAttributes());
    testPrefix.bonus.liver = 10;
    testPrefix.bonus.hp = 5;

    var testSuffix = new Affix("Боли", new ValAttributes());
    testSuffix.bonus.energy = -20;
    testSuffix.bonus.mmrBonus = 10;
    
    this.prefixes.push(testPrefix);
    this.suffixes.push(testSuffix);
}

var testMouse = new TestMouse();
console.log(testMouse.getFullName());
console.log(testMouse.getStatsDescription());
console.log(testMouse.getBonusesDescription());