var path = require('path');
var currentDir = path.basename(__dirname);

module.exports = {
	"src": {
		"html": "app/*.html",
		"styles": "app/styles/*.css",
		"scripts": "app/scripts/*.js",
		"images": "app/images/*.{jpg,png,svg}"
	},
	"dest": {
		"testServer": "../interact/" + currentDir,
		"distHtml": "../deploy/dev_www/frontend/tpl/special/",
		"distAssets": "../ft-interact/"  + currentDir
	},
	"replaceOpt": {
		"jquery": "http://static.ftchinese.com/js/jquery-1.11.3.min.js",
		"log": "http://static.ftchinese.com/js/log.js?v=6"
	},
	"insertOpt": {
		"/*ga.js*/": "app/scripts/ga.js",
		"/*ftca.js*/": "app/scripts/fa.js"
	},
	"prefixUrl": "http://interactive.ftchinese.com/"  + currentDir,
	"htmlName": currentDir + ".html"
}