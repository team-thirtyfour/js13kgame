"use strict";
var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    gulpSequence = require('gulp-sequence'),
    connect = require('gulp-connect');

gulp.task('watchJS', function(callback){
    return gulpSequence(['bundlejs', 'jshint'], 'reload', callback);
});

gulp.task('watchCSS', function(callback){
    return gulpSequence('css', 'reload', callback);
});

gulp.task('watchHTML', function(callback){
    return gulpSequence('copy-html', 'reload', callback);
});

gulp.task('watching', function () {
    gulp.watch(conf.source.path.js, ['watchJS']);
    gulp.watch(conf.source.path.css, ['watchCSS']);
    gulp.watch(conf.source.path.indexhtml, ['watchHTML']);
    // gulp.watch(TESTS_SOURCE_PATH, ['tests']);
});

gulp.task('watch', function (callback) {
    return gulpSequence(
        ['clean', 'jshint'],
        ['bundlejs', 'copy-html', 'css'],
        ['connect', 'watching'], callback);
});