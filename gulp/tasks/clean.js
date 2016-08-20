"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    //del doesn't work well with rollup so gulp-clean was used
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src(conf.dist.dir, {read: false})
        .pipe(clean());
});