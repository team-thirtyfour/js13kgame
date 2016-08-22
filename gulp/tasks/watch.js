"use strict";
var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    gulpSequence = require('gulp-sequence');


gulp.task('watching', function () {
    gulp.watch(conf.source.path.js, ['bundlejs','jshint']);
    gulp.watch(conf.source.path.css, ['css']);
    gulp.watch(conf.source.path.indexhtml, ['copy-html']);
    // gulp.watch(TESTS_SOURCE_PATH, ['tests']);
});

gulp.task('watch', function (callback) {
    return gulpSequence(['clean', 'jshint'], ['bundlejs','copy-html', 'css'], 'watching', callback);
});