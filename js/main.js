$(function(){
	var model = {
        init: function() {
            localStorage.cats = JSON.stringify([]);
            localStorage.catIndex = 0;
        },

        add: function(obj) {
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data)
        },

        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },

        setCat: function(obj) {
        	// commits the object param to the current index
        	var data = JSON.parse(localStorage.cats);
        	data[localStorage.catIndex] = obj;
        	localStorage.cats = JSON.stringify(data)
        },

        setIndex: function(n) {
        	localStorage.catIndex = n;
        },

        getCat: function() {
        	var data = JSON.parse(localStorage.cats);
        	return data[localStorage.catIndex];
        }
    };

    var octopus = {
        addAllCats: function() {
			// the source cat pics
			//var catPics = ['derpy.jpg', 'furpy.jpg', 'lerpy.jpg', 'smurpy.jpg', 'ted.jpg'];
			var catObjs = [{
				name: 'derpy',
				url: 'img/derpy.jpg',
				count: 0
			}, {
				name: 'furpy',
				url: 'img/furpy.jpg',
				count: 0
			}, {
				name: 'lurpy',
				url: 'img/lurpy.jpg',
				count: 0
			}, {
				name: 'smurpy',
				url: 'img/smurpy.jpg',
				count: 0
			}, {
				name: 'ted',
				url: 'img/ted.jpg',
				count: 0
			}];

			// declare variables here outside of the loop
			var picCount = catObjs.length;
			//var catElem, catCounter;

			for (i=0; i<picCount; i++) {
				model.add(catObjs[i]);
			}
            listView.render();
        },

        getCats: function() {
            return model.getAllCats();
        },

        getCurrentCat: function() {
        	return model.getCat();
        },

        setCurrentCat: function(id) {
        	catList = model.getAllCats();
        	listLen = catList.length;
        	for (i=0; i<listLen; i++) {
        		if ( catList[i].name === id) {
        			model.setIndex(i);
        			break;
        		};
        	}
        	clickView.render();
        	adminWin.fillInputs();
        },

        clickCat: function() {
        	cat = model.getCat();
        	cat.count++;
        	this.saveCat(cat);
        },

        saveCat: function(obj) {
        	// saves the obj param as the current cat object
        	model.setCat(obj);
        	clickView.render();
        	listView.render();
        	adminWin.fillInputs();
        },

        init: function() {
            model.init();
            listView.init();
            adminWin.init();
            octopus.addAllCats();
            clickView.init();
            octopus.setCurrentCat();

        }
    };

    var listView = {
        init: function() {
            listView.render();
        },
        render: function(){
			// save the DOM elements we are interested in
			var catContainer = document.getElementById('cat_container');
			catContainer.innerHTML = '';

        	octopus.getCats().forEach(function(cat){

				// create a cat DOM element for each cat pic
				catElem = document.createElement('img');
				catElem.id = cat.name;
			    catElem.className = 'cat';
			    catElem.src = cat.url;

				// cat's displayed name text
				catText = document.createElement('span');
				catText.className = 'cat-span';
				catText.innerHTML = cat.name;

				// div containing the cat img and text
				catBox = document.createElement('div');
				catBox.className = 'cat-box';
				catBox.appendChild(catText);
				catBox.appendChild(catElem);
				catContainer.appendChild(catBox);

				catElem.addEventListener('click', function() {
					octopus.setCurrentCat(this.id);
				});
        	});
        }
    };

    var clickView = {
    	init: function() {
			this.catCounter = document.getElementById('counter');
			this.catViewer = document.getElementById('cat_viewer');
    		var currentCat = octopus.getCurrentCat();

    		// add click action to the viewer
    		this.catViewer.addEventListener('click', function() {
    			octopus.clickCat();
    		});
    		this.render();
    	},
    	render: function() {
    		var currentCat = octopus.getCurrentCat();
    		// update the viewer with current cat data
    		this.catCounter.innerHTML = currentCat.name + ' count: ' + currentCat.count;
    		this.catViewer.src = currentCat.url;
    	},
    };

    var adminWin = {
    	init: function() {
    		var adminArea = document.getElementById('admin_area');

    		var adminBtn = document.getElementById('btn-admin');
    		var saveBtn = document.getElementById('btn-admin-save');
    		var cancelBtn = document.getElementById('btn-admin-cancel');

    		this.nameInput = document.getElementById('input-admin-name');
    		this.urlInput = document.getElementById('input-admin-url');
    		this.countInput = document.getElementById('input-admin-count');

    		adminArea.style.display = 'none';
    		thisCopy = this;

    		adminBtn.addEventListener('click', function() {
    			adminArea.style.display = 'initial';
    			//console.log(thisCopy);
    			thisCopy.fillInputs();
    		});

    		saveBtn.addEventListener('click', function() {
    			thisCopy.saveInputs();
    			adminArea.style.display = 'none';
    		});

    		cancelBtn.addEventListener('click', function() {
    			adminArea.style.display = 'none';
    		});


    	},

    	fillInputs: function() {
    		cat = octopus.getCurrentCat();
    		this.nameInput.value = cat.name;
    		this.urlInput.value = cat.url;
    		this.countInput.value = cat.count;
    	},

    	saveInputs: function() {
    		cat = octopus.getCurrentCat();
    		cat.name = this.nameInput.value;
    		cat.url = this.urlInput.value;
    		cat.count = this.countInput.value;
    		octopus.saveCat(cat);
    	}
    };

    octopus.init();
})