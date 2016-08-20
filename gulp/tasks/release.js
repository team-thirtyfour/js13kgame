"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    gulpSequence = require('gulp-sequence'),
    gzip = require('gulp-gzip');

gulp.task('release', function (callback) {
    if(conf.flags.uglify){
        gulpSequence('clean', ['bundlejs', 'css'], 'minify-html', 'gzip', callback);
    } else if(conf.flags.googlecompile) {
        gulpSequence('clean', ['googlebundle', 'css'], 'minify-html', 'gzip', callback);
    } else {
        throw new Error('Please choose to minify with uglify : --uglify or google-compiler with : --googlecompiler')
    }
});