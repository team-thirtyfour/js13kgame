"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('bundlejs', ['rollup'], function () {
    var stream = gulp.src(conf.DIST_DIR + '/' + conf.ROLLEDUP_FILENAME)
        .pipe(rename(conf.BUNDLE_NAME))
        .pipe(babel());

    if (conf.SOURCEMAP_FLAG) {
        stream.pipe(sourcemaps.init({debug: true}));
    }
    if (conf.UGLIFY_FLAG) {
        stream.pipe(uglify({mangle: true, compress: true}))
    }
    if (conf.SOURCEMAP_FLAG) {
        stream.pipe(sourcemaps.write());
    }

    return stream.pipe(gulp.dest(conf.DIST_DIR));
});