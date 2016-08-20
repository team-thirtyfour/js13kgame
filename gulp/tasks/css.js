"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    cleanCSS = require('gulp-clean-css');


gulp.task('minify-css', function () {
    var stream = gulp.src(conf.CSS_SRC_PATH);
    if (conf.UGLIFY_FLAG) {
        stream.pipe(cleanCSS());
    }
    return stream.pipe(gulp.dest(conf.DIST_DIR));
});