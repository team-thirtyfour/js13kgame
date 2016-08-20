"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    jshint = require('gulp-jshint'),
    stylishReporter = require('jshint-stylish');

gulp.task('jshint', function () {
    return gulp.src(conf.source.path.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylishReporter));
});