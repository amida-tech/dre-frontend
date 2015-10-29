
var fs = require('fs'),
	path = require('path');

module.exports = {
	'url':'http://dre.ntrlab.ru/#/',
	'shoot': function(baseFileName) {
		var file = path.resolve( 'target/' + baseFileName + '.png');
		browser.takeScreenshot().then(function (png) {
			console.log('Writing file ' + file);
			fs.writeFileSync(file, png, {encoding: 'base64'}, console.log);
		}, console.log);
	}
	
	};