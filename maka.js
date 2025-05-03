// maka.js - part of make america kittens again
// v2.2.8
// by Tom Royal 
// tomroyal.com
// Thanks to jSanchoDev, akiatoji, mcoker and the many others who've contributesd help, advice and PRs

var makaTesting = false; // for debugging only
var makaReplacements = 0;

// utility

function makaLog(logThis){
    if (makaTesting){
        console.log(logThis);
    }
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// init blocklist

var blocklist = ["trump", "трамп", "トランプ", "vance","elon","musk"]; 
var passlist = ["observance","irrelevance","contrivance","grievance","relevance","advance", "trumpet","trumped","trumping", "strump","strumpa","elongat","melon","belong","echelon","felon","erelong","agelong","muskie","muskox","musket","muskeg","muskier","muskrat","muskoxen","muskellunge","pelona","zielone","barcelona","data:image/"];

// kitten data!

var theKittens = {"kitten": [
    {"file": "1.jpg", "Credit": "Crsan", "URL": "http://www.flickr.com/photos/crsan/2571204498/"},
	{"file": "2.jpg", "Credit": "Abcrumley", "URL": "http://www.flickr.com/photos/crumley/160490011/"},
	{"file": "3.jpg", "Credit": "Woodchild2010", "URL": "http://www.flickr.com/photos/woodchild/5335939044/"},
	{"file": "4.jpg", "Credit": "Vancouverfilmschool", "URL": "http://www.flickr.com/photos/vancouverfilmschool/4838552777/"},
	{"file": "5.jpg", "Credit": "Jameswragg", "URL": "http://www.flickr.com/photos/jameswragg/4688532009/"},
	{"file": "6.jpg", "Credit": "Eva101", "URL": "http://www.flickr.com/photos/evapro/519752551/"},
	{"file": "7.jpg", "Credit": "Pinguino", "URL": "http://www.flickr.com/photos/pinguino/2655478691/"},
	{"file": "8.jpg", "Credit": "Daisyree Bakker", "URL": "http://www.flickr.com/photos/27875041@N02/4710868953/"},
	{"file": "9.jpg", "Credit": "VictoriaPeckham", "URL": "http://www.flickr.com/photos/victoriapeckham/4000992556/"},
	{"file": "10.jpg", "Credit": "Peter Huys", "URL": "http://www.flickr.com/photos/darksidex/4568967536/"},
	{"file": "11.jpg", "Credit": "Lauren Nelson", "URL": "http://www.flickr.com/photos/lulieboo/3523637733/"},
	{"file": "12.jpg", "Credit": "Denizen24", "URL": "http://www.flickr.com/photos/39311243@N05/4273391516/"},
	{"file": "13.jpg", "Credit": "Pinguino", "URL": "http://www.flickr.com/photos/pinguino/2655477765/"},
	{"file": "14.jpg", "Credit": "Sikander", "URL": "http://www.flickr.com/photos/sikander/3941418808/"},
	{"file": "15.jpg", "Credit": "Snickclunk", "URL": "ttp://www.flickr.com/photos/snickclunk/4985501252/"},
	{"file": "16.jpg", "Credit": "JeffreyW", "URL": "http://www.flickr.com/photos/jeffreyww/4975375328/"},
	{"file": "17.jpg", "Credit": "Jeremy Bronson", "URL": "http://www.flickr.com/photos/jbrons/4872001139/"},
	{"file": "18.jpg", "Credit": "Threat to Democracy", "URL": "http://www.flickr.com/photos/16725630@N00/4811658578/"},
	{"file": "19.jpg", "Credit": "Eofstr", "URL": "http://www.flickr.com/photos/eofstr/4757862779/"},
	{"file": "20.jpg", "Credit": "DvdOuden", "URL": "http://www.flickr.com/photos/dvdouden/4733485066/"},
	{"file": "21.jpg", "Credit": "Cuttlefish", "URL": "http://www.flickr.com/photos/cuttlefish/4969726052/"},
	{"file": "22.jpg", "Credit": "JenniferC", "URL": "http://www.flickr.com/photos/29638108@N06/5104339654/"},
	{"file": "23.jpg", "Credit": "Jasontoff", "URL": "http://www.flickr.com/photos/jasontoff/5098333343/"},
	{"file": "24.jpg", "Credit": "FHgitarre", "URL": "http://www.flickr.com/photos/48356868@N06/5073501988/"},
	{"file": "25.jpg", "Credit": "Phil Hawksworth", "URL": "http://www.flickr.com/photos/philhawksworth/5037670666/"},
	{"file": "26.jpg", "Credit": "Phil Hawksworth", "URL": "http://www.flickr.com/photos/philhawksworth/5036995211/"},
	{"file": "27.jpg", "Credit": "FragmentFi", "URL": "http://www.flickr.com/photos/fragmentfi/5033666682/"},
	{"file": "28.jpg", "Credit": "SpookyPeanut", "URL": "http://www.flickr.com/photos/spookypeanut/5502011850/"},
	{"file": "29.jpg", "Credit": "Glennsajan", "URL": "http://www.flickr.com/photos/glennsajan/5485364346/"},
	{"file": "30.jpg", "Credit": "Woodchild2010", "URL": "http://www.flickr.com/photos/woodchild/5335939044/"},
	{"file": "31.jpg", "Credit": "Ollie Crafoord", "URL": "http://www.flickr.com/photos/lollaping/5277362546/"},
	{"file": "32.jpg", "Credit": "Mami Terai"},
	{"file": "33.jpg", "Credit": "Sam Scheibel"},
	{"file": "34.jpg", "Credit": "Sydney Pettygrove"},
	{"file": "35.jpg", "Credit": "Sydney Pettygrove"},
	{"file": "36.jpg", "Credit": "Dionna Humphrey"},
    {"file": "37.jpg", "Credit": "Winter Miller"}
    ]
};

function makaReplace(img){
    // do an image replacement

    // append old src
    img.setAttribute("makareplaced", img.src);
                        
    // remove srcsets, forcing browser to the kitten - eg, BBC News
    if (img.hasAttribute('srcset')){
        img.removeAttribute('srcset');
    };
    // remove source srcsets if children of same parent <picture> element - eg, the Guardian
    if (img.parentElement.nodeName == 'PICTURE'){
        var theparent = img.parentNode;
        for(var child=theparent.firstChild; child!==null; child=child.nextSibling) {
            if (child.nodeName == "SOURCE"){
                child.removeAttribute('src');
                child.removeAttribute('srcset');
            };
        };
    };
    // knock out lazyloader data URLs so it doesn't overwrite kittens
    if (img.hasAttribute('data-src')){
        img.removeAttribute('data-src');
    };
    if (img.hasAttribute('data-hi-res-src')){
        img.removeAttribute('data-hi-res-src');
    };
    if (img.hasAttribute('data-low-res-src')){
        img.removeAttribute('data-low-res-src');
    };
    
    // fix for wapo lazyloading huge sidebar pix..
    if (window.location.href.indexOf('washingtonpost.com') != -1){
        if (img.classList.contains('unprocessed')){
            img.classList.remove('unprocessed');
            
        };
    };
    
    var imgwidth = img.clientWidth;
	var imgheight = img.clientHeight;
    var randk = (randomIntFromInterval(1, theKittens.kitten.length)) - 1;
    img.src = chrome.runtime.getURL('/kittens/'+theKittens.kitten[randk].file+'');
    img.width = imgwidth;
    img.height = imgheight;
    img.alt = 'A photo of an adorable kitten';
    if(theKittens.kitten[randk].hasOwnProperty("URL")){
        img.title = 'A photo of a kitten taken by '+theKittens.kitten[randk].Credit+', sourced from '+theKittens.kitten[randk].URL+'';
    }
    else {
        img.title = 'A photo of a kitten taken by '+theKittens.kitten[randk].Credit+'';
    }
    
}

function makaNow(reprocess){
    makaLog('maka init');
	// called on page load. Searches all img alt text and srcs for the strings in blocklist, replaces with kittens
	var pagepics=document.getElementsByTagName("img"), i=0, img;	
	while (img = pagepics[i++]){	
		
		if ((reprocess !== true ) && (img.hasAttribute('makareplaced'))){
			// already replaced, skip
		}
		else {
			// not yet replaced
			var alttext = String(img.alt).toLowerCase();
			var imgsrc = String(img.src).toLowerCase();
			
			if (img.parentElement.nodeName != 'BODY'){
				// check parent innerHTML for blackilist
				var parenttag = img.parentElement.innerHTML.toLowerCase();
			}
			else {
				// prevent parse of entire doc
				var parenttag = '';
			};
            
            // check for allowlist
            var maybeReplace = true;
            passlist.forEach(function(plist) {
                if ((alttext.indexOf(plist) != -1) || (imgsrc.indexOf(plist) != -1) || (parenttag.indexOf(plist) != -1)){
                    // let this pass
                    img.setAttribute("makareplaced", img.src);
                    maybeReplace = false;
                }
            });
            
            if (maybeReplace){
                // not allow-listed
                blocklist.forEach(function(blist) {
                    if ((alttext.indexOf(blist) != -1) || (imgsrc.indexOf(blist) != -1) || (parenttag.indexOf(blist) != -1)){
                        // matches, replace

                        if (window.location.href.indexOf('nytimes.com') != -1){
                            // Need to prevent React page re-hydrating image
                            // duplicate image, delete original, kitten the new one
                            makaLog('nyt clone');
                            const clonedImage = img.cloneNode(true);
                            newimg = img.parentNode.appendChild(clonedImage);
                            img.remove();
                            makaReplace(newimg);
                        }
                        else {
                            makaLog(blist);
                            makaReplace(img);
                        }
                        
                        makaReplacements++;
                    };
                });	// func on blist
            }; // if maybeReplace
		};
	}
    makaLog('maka complete, replaced '+makaReplacements+' images');
};

function makaNoLazy(){
    // rm lazy-load from all img
    var pagepics=document.getElementsByTagName("img"), i=0, img;
    while (img = pagepics[i++]){	
        if (img.hasAttribute('loading')){
            img.removeAttribute('loading');
        };
    }    
}

function makaRedo(){
    // maka again, with the reprocess flag
    makaNow(true);
}    

function makaDelayed(timeDelay){
    // execute again after timeDelay, with flag to hit every image again
    setTimeout(makaRedo, timeDelay);
}

if (window.location.href.indexOf('nytimes.com') != -1){
    // aggressive two-hit blocking for the NYT
    makaLog('maka nyt special');
    makaNoLazy(); // kill lazy-load
    makaNow(false); // first
    // document.addEventListener('DOMContentLoaded', makaDelayed(1000), false); // second after 1 sec
}  
else if (window.location.href.indexOf('washingtonpost.com') != -1){
    
    // need to handle figures instead of images

    var getCaptions = document.querySelectorAll('figcaption'); 
    getCaptions.forEach(function(figCaption) {

        makaLog('maka considering '+figCaption.innerHTML);
        var maybeReplace = true;
        passlist.forEach(function(plist) {
            if (figCaption.innerHTML.toLowerCase().indexOf(plist) != -1){
                // let this pass
                maybeReplace = false;
            }
        });
        if (maybeReplace){
            blocklist.forEach(function(blist) {
                if (figCaption.innerHTML.toLowerCase().indexOf(blist) != -1){
                    makaLog('maka replace for '+figCaption.innerHTML);
                    var figImage = figCaption.parentElement.getElementsByTagName('img');
                    makaReplace(figImage[0]);
                };
            });	// func on blist
        }        
    });
}    
else {
    document.addEventListener('DOMContentLoaded', makaNow(false), false);
}