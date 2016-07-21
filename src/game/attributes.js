function Attributes(defaultVal) {
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

PercAttributes.prototype = new Attributes();
function PercAttributes() {
    Attributes.call(this, 1);
}

ValAttributes.prototype = new Attributes();
function ValAttributes() {
    Attributes.call(this, 0);
}