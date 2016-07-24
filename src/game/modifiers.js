function Modifier(name, description) {
    this.name = name;
    this.description = description;
    this.valStats = new ValAttributes();
    this.percStats = new PercAttributes();
}

Modifier.prototype.getDescription = function() {
    return this.description;
};

Modifier.prototype.getName = function () {
    return this.name;
};

Modifier.prototype.getStatsDescription = function() {
    var sign = function (val) { return val > 0 ? "+" : ""; };
    var description = [];
    this.valStats.mapNonDefault(function(key, val) {
        description.push(attNames[key] + ": " + sign(val) + val);
    });
    this.percStats.mapNonDefault(function(key, val) {
        description.push(attNames[key] + ": " + sign(val) + val + "%");
    });
    return description;
};

Modifier.prototype.getEvaluatedStats = function(defaultStats) {
    var newStats = defaultStats.copy();
    newStats = this.valStats.evaluate(newStats);
    newStats = this.percStats.evaluate(newStats);
    newStats.subNonDefault(defaultStats);
    return newStats;
};

function Affix(name, bonus) {
    this.name = name;
    this.bonus = bonus;
}

Item.prototype = new Modifier();
function Item(name, rarity, description) {
    Modifier.call(this, name, description);
    this.rarity = rarity; // common, magic, rare, unique
    this.prefixes = [];
    this.suffixes = [];
}

Item.prototype.evaluateBonuses = function() {
    var percBonuses = this.percStats.copy();
    var valBonuses = this.valStats.copy();
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

Item.prototype.getEvaluatedStats = function(defaultStats) {
    var newStats = defaultStats.copy();
    var bonuses = this.evaluateBonuses();
    newStats = bonuses.valBonuses.evaluate(newStats);
    newStats = bonuses.percBonuses.evaluate(newStats);
    newStats.subNonDefault(defaultStats);
    return newStats;
};

Item.prototype.getName = function() {
    var name = this.name;
    this.prefixes.map(function(prefix) { name = prefix.name + " " + name; } );
    this.suffixes.map(function(suffix) { name = name + " " + suffix.name; } );
    return name;
};

Item.prototype.getBonusesDescription = function() {
    var sign = function (val) { return val > 0 ? "+" : ""; };
    var bonuses = this.evaluateBonuses();
    var description = [];
    bonuses.valBonuses.mapNonDefault(function(key, val) {
        description.push(attNames[key] + ": " + sign(val) + val);
    });
    bonuses.percBonuses.mapNonDefault(function(key, val) {
        description.push(attNames[key] + ": " + sign(val) + val + "%");
    });
    return description;
};

Buff.prototype = new Modifier();
function Buff(name, duration, description) {
    Modifier.call(this, name, description);
    this.duration = duration;
    this.startTime = new Date();
}