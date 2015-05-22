var initialCats = [
    {
        name: 'Derpy',
        clickCount: 0,
        imgSrc: 'img/derpy.jpg',
        nicknames: ['Mustard', 'Tiger', 'Phil', 'Collins']
    },
    {
        name: 'Furpy',
        clickCount: 0,
        imgSrc: 'img/furpy.jpg',
        nicknames: ['Randy', 'Cheeseburger', 'Picnic']
    },
    {
        name: 'Lurpy',
        clickCount: 0,
        imgSrc: 'img/lurpy.jpg',
        nicknames: ['Jim', 'Lahey', 'Trailerpark', 'Supervisor']
    },
    {
        name: 'Smurpy',
        clickCount: 0,
        imgSrc: 'img/smurpy.jpg',
        nicknames: ['Corey', 'Trevor', 'Smokes', 'Lets go']
    },
    {
        name: 'Ted',
        clickCount: 0,
        imgSrc: 'img/ted.jpg',
        nicknames: ['Bubbles', 'Kittyland', 'Lovecenter', 'Decent']
    },
];


var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(data.nicknames);

    this.level = ko.computed(function() {
        if (this.clickCount() < 10) {
            return 'newborn';
        } else if (this.clickCount() < 25) {
            return 'kitten';
        } else if (this.clickCount() < 50){
            return 'teen';
        } else if (this.clickCount() < 100) {
            return 'adult';
        } else {
            return 'geriatric kitty';
        }
    }, this);
}


var AppViewModel = function() {
    var self = this;
    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
        self.catList.push( new Cat(catItem) );
    })
    this.currentCat = ko.observable( this.catList()[0] );

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.loadCat = function() {
        self.currentCat(this);
        console.log(this.name());
    };

}

ko.applyBindings(new AppViewModel());