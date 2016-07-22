function Attributes(defaultVal) {
    this._defaultVal = defaultVal;
    this._isPerc = false; // костыль для итемов, чтоб складывать проценты с процентами, числа с числами
                          // иначе неизвестно что с чем складывать

    this.lvl = defaultVal;

    this.hp        = defaultVal;
    this.energy    = defaultVal;
    this.happiness = defaultVal;

    this.strength     = defaultVal;
    this.intellengece = defaultVal;
    this.endurance    = defaultVal;
    this.charisma     = defaultVal;
    this.luck         = defaultVal;
    this.liver        = defaultVal;

    this.moneyBonus   = defaultVal;
    this.expBonus     = defaultVal;
    this.mmrBonus     = defaultVal;
    this.winrateBonus = defaultVal;

    this.beardGrowingBonus         = defaultVal;
    this.beardItemSpawningBonus    = defaultVal;
    this.beardItemLvlSpawningBonus = defaultVal;
    this.beardCharismaBonus        = defaultVal;
}

Attributes.prototype.isAttribute = function(key) {
    return this.hasOwnProperty(key) && key[0] != "_"
        && typeof this[key] != "function";
};

Attributes.prototype.map = function(callback) {
    for (var key in this) {
        if (this.isAttribute(key)) {
            callback(key, this[key]);
        }
    }
};

Attributes.prototype.mapNonDefault = function(callback) {
    var t = this;
    t.map(function(key, val) {
        if (t[key] != t._defaultVal) {
            callback(key, t[key]);
        }
    });
};

Attributes.prototype.addNonDefault = function (attributes) {
    var t = this;
    attributes.mapNonDefault(function(key, val) {
       if (t[key] == t._defaultVal) {
           t[key] = val;
       } 
       else {
           t[key] += val;
       }
    });
};

Attributes.prototype.copy = function() {
    var result = new Attributes(0);
    for (var i in this) {
        result[i] = this[i];
    }
    return result;
};

Attributes.prototype.evaluate = function (stats) {
    return stats.copy();
};

AttributesNames.prototype = new Attributes();
function AttributesNames() {
    Attributes.call(this, "");
    this.lvl = "Уровень";

    this.hp        = "Жизнь";
    this.energy    = "Энергия";
    this.happiness = "Счастье";

    this.strength     = "Сила";
    this.intellengece = "Интеллект";
    this.endurance    = "Выносливость";
    this.charisma     = "Харизма";
    this.luck         = "Удача";
    this.liver        = "Печень";

    this.moneyBonus   = "Бонус к золоту";
    this.expBonus     = "Бонус к опыту";
    this.mmrBonus     = "Бонус к ммр";
    this.winrateBonus = "Бонус к победе";

    this.beardGrowingBonus         = "Бонус к росту бороды";
    this.beardItemSpawningBonus    = "Бонус к нахождению предметов в бороде";
    this.beardItemLvlSpawningBonus = "Бонус к уровню предметов найденных в бороде";
    this.beardCharismaBonus        = "Бонус к харизме от бороды";
}

var attNames = new AttributesNames();

PercAttributes.prototype = new Attributes();
function PercAttributes() {
    Attributes.call(this, 1);
    this._isPerc = true;
}

PercAttributes.prototype.evaluate = function(stats) {
    var t = this;
    t.map(function(key, val) {
        stats[key] *= val;
    });
    return stats;
};

ValAttributes.prototype = new Attributes();
function ValAttributes() {
    Attributes.call(this, 0);
}

ValAttributes.prototype.evaluate = function(stats) {
    var t = this;
    t.map(function(key, val) {
        stats[key] += val;
    });
    return stats;
};