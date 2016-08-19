"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    gulpSequence = require('gulp-sequence'),
    gzip = require('gulp-gzip');

gulp.task('release', function (callback) {
    //force production flag to true
    conf.PRODUCTION_FLAG = true;
    gulpSequence('clean', ['bundlejs', 'minify-css'], 'minify-html', 'gzip', callback);
});