// Initialize assets object to be passed for the Layout library to load them
let assets = {};

// Template Page Structure Configuration (loadded from templates folder)
assets.head     	= null		// if null The Default head.html file will be loadded
assets.headBody     = null		// if null The Default headBody.html file will be loadded
assets.footer       = null		// if null The Default footer.html file will be loadded
assets.navBar       = true		// if true The nav bars will be loaded 
								// (sideBar.html than HeaderBar.html)

// HTMLs to be loaded in the given order
assets.HTMLs = [
	'allUsers_content.html'
];

// Application scripts to be loadded in the given order
assets.Scripts = [
	'allUsers_app.js'
];

// Style Sheets loaded from resources folder
assets.css = [
	'datatable/datatables.css'
]

// Resources scripts loading from resources folder
assets.rscScrits = [
	'js/jquery.min.js',
	'datatable/datatables.min.js'
]

// Scripts to be loaded from the shared libs folder
assets.libs = [
	'example_lib.js'	
]

module.exports = assets;