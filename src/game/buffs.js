TestBuff.prototype = new Buff();
function TestBuff() {
    Buff.call(this, "Ярость", 120, "Глебас в ярости");
    this.percStats.hp = 30;
}

var testBuff = new TestBuff();