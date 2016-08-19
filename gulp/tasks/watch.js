"use strict";
var gulp = require('gulp'),
    conf = require('../config');

gulp.task('watch', ['bundlejs'], function () {
    gulp.watch(conf.JS_SRC_PATH, ['bundlejs']);
    gulp.watch(conf.CSS_SRC_PATH, ['minify-css']);
    gulp.watch(conf.INDEX_SRC_PATH, ['copy-html']);
    // gulp.watch(TESTS_SOURCE_PATH, ['tests']);
});