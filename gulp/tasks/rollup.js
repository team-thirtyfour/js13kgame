"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream');

gulp.task('rollup', function () {
    return rollup({
        entry: './src/main.js',
        format: 'iife',
        plugins: []
    }).pipe(source(conf.ROLLUP_FILENAME))
        .pipe(gulp.dest(conf.DIST_DIR));
});