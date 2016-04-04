var path = require('path');
var matchdep = require('matchdep');

var dir_js = path.resolve(__dirname, 'js');

//console.log('---', dir_js);

console.log(matchdep.filter('*'));


