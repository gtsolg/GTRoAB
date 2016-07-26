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

Mouse.prototype = new Item();
function Mouse(name) {
    Item.call(this, name, "", "");
    this.itemType = "mouse";
}

MechanicalMouse.prototype = new Mouse();
function MechanicalMouse() {
    Mouse.call(this, "Механическая мышь");
}

OpticalMouse.prototype = new Mouse();
function OpticalMouse() {
    Mouse.call(this, "Оптическая мышь");
}

LaserMouse.prototype = new Mouse();
function LaserMouse() {
    Mouse.call(this, "Лазерная мышь");
}

WirelessMouse.prototype = new Mouse();
function WirelessMouse() {
    Mouse.call(this, "Беспроводная мышь");
}

Keyboard.prototype = new Item();
function Keyboard(name) {
    Item.call(this, name, "", "");
    this.itemType = "keyboard";
}

MechanicalKeyboard.prototype = new Keyboard();
function MechanicalKeyboard() {
    Keyboard.call(this, "Механическая клавиатура");
}

FlexibleKeyboard.prototype = new Keyboard();
function FlexibleKeyboard() {
    Keyboard.call(this, "Резиновая клавиатура");
}

MembraneKeyboard.prototype = new Keyboard();
function MembraneKeyboard() {
    Keyboard.call(this, "Мембранная клавиатура");
}

ProjectionKeyboard.prototype = new Keyboard();
function ProjectionKeyboard() {
    Keyboard.call(this, "Проекционная клавиатура");
}

Monitor.prototype = new Item();
function Monitor(name) {
    Item.call(this, name, "", "");
    this.itemType = "display";
}

CRTMonitor.prototype = new Monitor();
function CRTMonitor() {
    Keyboard.call(this, "ЭЛТ монитор");
}

LCMonitor.prototype = new Monitor();
function LCMonitor() {
    Keyboard.call(this, "ЖК монитор");
}

Projector.prototype = new Monitor();
function Projector() {
    Keyboard.call(this, "Проектор");
}

VRGlasses.prototype = new Monitor();
function VRGlasses() {
    Keyboard.call(this, "Очки виртуальной реальности");
}

VRMonitor.prototype = new Monitor();
function VRMonitor() {
    Keyboard.call(this, "Виртуальный ретинальный монитор");
}