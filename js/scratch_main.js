
// the source cat pics
var catPics = ['derpy.jpg', 'furpy.jpg', 'lerpy.jpg', 'smurpy.jpg', 'ted.jpg'];

// declare variables here outside of the loop
var picCount = catPics.length;
var catPic, catName, catElem, catCounter;

// save the DOM elements we are interested in
var catContainer = document.getElementById('cat_container');
var catCounter = document.getElementById('counter');
var catViewer = document.getElementById('cat_viewer');
var catMeow = document.getElementById('meow');

for (i=0; i<picCount; i++) {
	// format the cat strings nicely
	catPic = catPics[i];
	catName = catPic.replace('.jpg', '');

	// create a cat DOM element for each cat pic
	catElem = document.createElement('img');
	catElem.id = catName;
    catElem.className = 'cat';
    catElem.src = "img/"+catPic;
    catElem.style.width = "100px";
    catElem.count = 0;

	// cat's displayed name text
	catText = document.createElement('span');
	catText.width = "100px";
	catText.innerHTML = catName;

	// div containing the cat img and text
	catBox = document.createElement('div');
	catBox.className = 'cat-box';
	catBox.appendChild(catText);
	catBox.appendChild(catElem);
	catContainer.appendChild(catBox);

	// when a cat is selected put its image in the cat viewer
	catElem.addEventListener('click', function() {
		catName = this.id;
		// set the cat viewer's image to this cat's image
		catViewer.src = this.src;
		// save the current object in the cat viewer
		catViewer.currentCat = this;
		// update the displayed count when switching cats
		catCounter.innerHTML = catName + ' count: ' + this.count;
		}, false);
};

//Cat Viewer is the large cat pic, when the user clicks add to the cat's
//click count and display
catViewer.addEventListener('click', function() {
	// iterate this cat object's count
	this.currentCat.count++;
	// update the count display
	catCounter.innerHTML = this.currentCat.id + ' count: ' + this.currentCat.count;
	// play a cat noise, not annoying at all
	catMeow.play();
});