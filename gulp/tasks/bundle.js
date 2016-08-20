"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('bundlejs', ['rollup'], function () {
    var stream = gulp.src(conf.dist.path.js.rolledup)
        .pipe(rename(conf.dist.js.bundle_filename))
        .pipe(babel());

    if (conf.flags.sourcemaps) {
        stream.pipe(sourcemaps.init({debug: true}));
    }
    if (conf.flags.uglify) {
        stream.pipe(uglify({mangle: true, compress: true}))
    }
    if (conf.flags.sourcemaps) {
        stream.pipe(sourcemaps.write());
    }

    return stream.pipe(gulp.dest(conf.dist.dir));
});