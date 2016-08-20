"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream');

gulp.task('rollup', function () {
    return rollup(conf.rollup)
        .pipe(source(conf.dist.js.rolledup_filename))
        .pipe(gulp.dest(conf.dist.dir));
});