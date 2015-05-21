var Cat = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Derpy');
    this.imgSrc = ko.observable('img/derpy.jpg');
    this.nicknames = ko.observableArray([
        {name: 'Mustard'},
        {name: 'Tiger'},
        {name: 'Dirty'},
        {name: 'Burger'}
    ]);

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

    this.currentCat = ko.observable( new Cat() );

    this.incrementCounter = function() {
        this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    };


}

ko.applyBindings(new AppViewModel());