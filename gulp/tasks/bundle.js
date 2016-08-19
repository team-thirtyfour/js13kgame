"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    rollup = require('gulp-rollup'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    stylishReporter = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('bundlejs', function () {
    var stream = gulp.src(conf.JS_SRC_PATH)
        .pipe(jshint())
        .pipe(jshint.reporter(stylishReporter))
        .pipe(rollup({
            entry: 'src/main.js',
            format: 'iife',
            plugins: []
        }))
        .pipe(rename(conf.BUNDLE_NAME))
        .pipe(babel());

    if (conf.SOURCEMAP_FLAG) {
        stream.pipe(sourcemaps.init({debug: true}));
    }
    if (conf.PRODUCTION_FLAG) {
        stream.pipe(uglify({mangle: true, compress: true}))
    }
    if (conf.SOURCEMAP_FLAG) {
        stream.pipe(sourcemaps.write());
    }

    return stream.pipe(gulp.dest(conf.DIST_DIR));
});