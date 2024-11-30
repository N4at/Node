console.log("This is app.js");

var util = require('./g.js');

function f() {
	console.log("call g()");
	util.g();
}

f();

import {h} from './h.mjs';
h();

console.log("OVER");