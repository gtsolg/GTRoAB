HomeSections.prototype = new SectionsSet();
function HomeSections(){
    SectionsSet.call(this);
    this.caption = "Дом";

    this.addSection(new FridgesSection("Холодильник"));
    this.sections[0].addAction(new Eat());
    this.sections[0].addAction(new Sleep());
    this.sections[0].addAction(new CleanHouse());
    this.sections[0].addAction(new WatchTV());

    this.addSection(new DotaSection("Дота"));
    this.sections[1].addAction(new PlayDota());
}
