var AppViewModel = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Derpy');
    this.imgSrc = ko.observable('img/derpy.jpg');
    this.level = ko.computed(function() {
        if (this.clickCount > 50) {
            return 'adult';
        } else if (this.clickCount > 25) {
            return 'teen';
        } else if this.clickCount > 12) {
            return 'kitten';
        } else {
            return 'newborn';
        }
    }, this);

    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };


}

ko.applyBindings(new AppViewModel());