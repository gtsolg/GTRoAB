HomeSections.prototype = new SectionsSet();
function HomeSections(){
    SectionsSet.call(this);
    this.caption = "Дом";

    var fridgeSection = new Section("Холодильник");
    fridgeSection.addAction(new Eat());
    fridgeSection.addAction(new Sleep());
    fridgeSection.addAction(new CleanHouse());
    fridgeSection.addAction(new WatchTV());
    this.addSection(fridgeSection);

    var dotaSection = new Section("Дота");
    dotaSection.addAction(new PlayDota());
    this.addSection(dotaSection);
}

ShopActions.prototype = new SectionsSet();
function ShopActions() {
    SectionsSet.call(this);
    this.caption = "Магазин";
    
    var dnsSection = new Section("DN$");
    var clothes = new Section("Одежда");
    var books = new Section("Книги");
    var blackMarket = new Section("Черный рынок");

    this.addSection(dnsSection);
    this.addSection(clothes);
    this.addSection(books);
    this.addSection(blackMarket);
}