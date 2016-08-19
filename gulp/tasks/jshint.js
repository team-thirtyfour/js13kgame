"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    jshint = require('gulp-jshint'),
    stylishReporter = require('jshint-stylish');

gulp.task('jshint', function () {
    return gulp.src(conf.JS_SRC_PATH)
        .pipe(jshint())
        .pipe(jshint.reporter(stylishReporter));
});