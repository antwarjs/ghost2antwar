#!/usr/bin/env node
'use strict';
var fs = require('fs');

var program = require('commander');

var convert = require('./lib/convert');
var version = require('./package.json').version;


main();

function main() {
    program.version(version).
        option('-i, --input <json>', 'Input JSON').
        option('-o --output <directory>', 'Output directory').
        parse(process.argv);

    var input = program.input;
    var output = program.output;

    if(!input) {
        return console.error('missing input');
    }

    if(!output) {
        return console.error('missing output');
    }

    fs.readFile(input, {
        encoding: 'utf8',
    }, function(err, data) {
        if(err) {
            return console.error(err);
        }
        var json;

        try {
            json = JSON.parse(data);

            convert(json, output);
        } catch(e) {
            return console.error('failed to parse JSON');
        }
    });
}
