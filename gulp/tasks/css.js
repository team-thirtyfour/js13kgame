"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    cleanCSS = require('gulp-clean-css');


gulp.task('css', function () {
    var stream = gulp.src(conf.source.path.css);
    if (conf.flags.minify) {
        stream.pipe(cleanCSS());
    }
    return stream.pipe(gulp.dest(conf.dist.dir));
});