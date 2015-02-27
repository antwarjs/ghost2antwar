'use strict';
var input = require('./nixtu.json');
var convert = require('../');


// this writes blog posts based on input json to given output directory
convert(input, 'output');
