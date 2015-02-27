'use strict';
var fs = require('fs');
var path = require('path');

var async = require('async');
var mkdirp = require('mkdirp');
var zeroFill = require('zero-fill');


module.exports = function(input, output) {
    var data = input? input.data: {};
    var posts = data.posts || [];

    mkdirp(output, function(err) {
        if(err) {
            return console.error(err);
        }

        convert(posts, output, function(err) {
            if(err) {
                return console.error(err);
            }
        });
    });
};

function convert(posts, output, cb) {
    async.eachLimit(posts, 4, function(post, cb) {
        var slug = post.slug;
        var published = new Date(post['published_at']);
        var title = post.title;
        var content = post.markdown;
        var d = published.getFullYear() + '-' +
            zeroFill(2, published.getMonth() + 1) + '-' +
            zeroFill(2, published.getDate());
        var p = path.join(output, d + '-' + slug + '.md');
        var data = '---\ntitle: ' + title + '\n---\n' + content;

        fs.writeFile(p, data, cb);
    }, cb);
}
