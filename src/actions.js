function PlayDota(){
    this.caption = "Играть в доту";
    this.energy = -10;
}

function Sleep(){
    this.caption = "Поспать";
    this.energy = 50;
    this.toolTipCaption = "Глеб спит, востанавливая " + this.energy + " единиц энергии"
}

function Eat(){
    this.caption = "Поесть";
    this.hp = 20;
    this.happiness = 2;
    this.time = 15;
    this.toolTipCaption = "Поесть, востановив " + this.hp + " единиц здоровья и " + this.happiness + " единицы счастья";
}

function CleanHouse(){
    this.caption = "Убраться в квартире";
    this.hp = -10;
    this.energy = -10;
    this.happiness = -10;
    this.money = 3;
    this.time = 70;
    this.toolTipCaption = "Убраться в квартире, потратив " + Math.abs(this.energy) + " единиц энергии, здоровья, счастья, но получив " + this.money + " единиц денег от мамки";
}

function WatchTV() {
    this.caption = "Посмотреть телевизор";
    this.happiness = 10;
    this.time = 30;
    this.toolTipCaption = "Посмотреть телевизор, востановив " + this.happiness + " единиц счастья";
}
