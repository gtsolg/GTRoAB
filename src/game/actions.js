function Action() {}

Action.prototype.affectOn = function (target) {
    for(var param in this){
        if (target[param] != undefined){
            target[param] += this[param];
        }
    }
};

PlayDota.prototype = new Action();
function PlayDota(){
    Action.call(this);
    this.caption = "Играть в доту";
    this.energy = -10;
}

Sleep.prototype = new Action();
function Sleep(){
    Action.call(this);
    this.caption = "Поспать";
    this.energy = 50;
    this.toolTipCaption = "Глеб спит, востанавливая " + this.energy + " единиц энергии"
}

Eat.prototype = new Action();
function Eat(){
    Action.call(this);
    this.caption = "Поесть";
    this.hp = 20;
    this.happiness = 2;
    this.time = 15;
    this.toolTipCaption = "Поесть, востановив " + this.hp + " единиц здоровья и " + this.happiness + " единицы счастья";
}

CleanHouse.prototype = new Action();
function CleanHouse(){
    Action.call(this);
    this.caption = "Убраться в квартире";
    this.hp = -10;
    this.energy = -10;
    this.happiness = -10;
    this.money = 3;
    this.time = 70;
    this.toolTipCaption = "Убраться в квартире, потратив " + Math.abs(this.energy) + " единиц энергии, здоровья, счастья, но получив " + this.money + " единиц денег от мамки";
}

WatchTV.prototype = new Action();
function WatchTV() {
    Action.call(this);
    this.caption = "Посмотреть телевизор";
    this.happiness = 10;
    this.time = 30;
    this.toolTipCaption = "Посмотреть телевизор, востановив " + this.happiness + " единиц счастья";
}

BuyItem.prototype = new Action();
function BuyItem(item) {
    Action.call(this);
    //this.caption = "Купить Итем";
    this.caption = item.caption;
    this.item = item;
    this.defaultCSS = item.defaultCSS;
}

BuyItem.prototype.affectOn = function (target) {
    target.takeEquipment(this.item);
};
