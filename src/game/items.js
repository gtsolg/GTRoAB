TestMouse.prototype = new Item();
function TestMouse() {
    Item.call(this, "Стандартная мышь", "common", "Стандартная мышь с колёсиком прямиком из 90-х");
    this.percStats.hp = 10;
    this.percStats.happiness = -11;
    this.itemType = "mouse";

    this.caption = "kek";

    var testPrefix = new Affix("Устрашающая", new PercAttributes());
    testPrefix.bonus.liver = 10;
    testPrefix.bonus.hp = 5;

    var testSuffix = new Affix("Боли", new ValAttributes());
    testSuffix.bonus.energy = -20;
    testSuffix.bonus.mmrBonus = 10;

    this.prefixes.push(testPrefix);
    this.suffixes.push(testSuffix);
}

TestKeyBoard.prototype = new Item();
function TestKeyBoard() {
    Item.call(this, "Стандартная клава", "common", "Стандартная клава с колёсиком прямиком из 90-х");
    this.percStats.hp = 10;
    this.percStats.happiness = -11;
    this.itemType = "keyboard";

    this.caption = "lul";

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
var testKeyBoard = new TestKeyBoard();
