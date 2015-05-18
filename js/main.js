$(function(){
	var model = {
        init: function() {
            localStorage.cats = JSON.stringify([]);
            localStorage.currentCat;
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
			var catPics = ['derpy.jpg', 'furpy.jpg', 'lerpy.jpg', 'smurpy.jpg', 'ted.jpg'];

			// declare variables here outside of the loop
			var picCount = catPics.length;
			var catPic, catName, catElem, catCounter;

			for (i=0; i<picCount; i++) {
				// format the cat strings nicely
				catPic = catPics[i];
				catName = catPic.replace('.jpg', '');
				// add to local storage
				model.add({
					pic : catPic,
					name : catName,
					count : 0
				});
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
        },

        clickCat: function() {
        	cat = model.getCat();
        	cat.count++;
        	model.setCat(cat);
        	clickView.render();
        },

        init: function() {
            model.init();
            listView.init();
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

        	octopus.getCats().forEach(function(cat){

				// create a cat DOM element for each cat pic
				catElem = document.createElement('img');
				catElem.id = cat.name;
			    catElem.className = 'cat';
			    catElem.src = "img/"+cat.pic;

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

    		this.catViewer.addEventListener('click', function() {
    			octopus.clickCat();
    		});
    		this.render();
    	},
    	render: function() {
    		var currentCat = octopus.getCurrentCat();

    		this.catCounter.innerHTML = currentCat.name + ' count: ' + currentCat.count;
    		this.catViewer.src = 'img/' + currentCat.pic;
    	},
    };

    octopus.init();
})