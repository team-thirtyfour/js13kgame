"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    del = require('del');

gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del([conf.DIST_DIR]);
});