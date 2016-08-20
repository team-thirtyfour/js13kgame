"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    gulpSequence = require('gulp-sequence'),
    gzip = require('gulp-gzip');

gulp.task('release', function (callback) {
    //force production flag to true
    if(conf.UGLIFY_FLAG){
        gulpSequence('clean', ['bundlejs', 'minify-css'], 'minify-html', 'gzip', callback);
    } else if(conf.GOOGLE_COMPILER_FLAG) {
        gulpSequence('clean', ['googlebundle', 'minify-css'], 'minify-html', 'gzip', callback);
    }
});