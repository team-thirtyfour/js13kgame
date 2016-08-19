"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    filesize = require('gulp-size'),
    gzip = require('gulp-gzip');

gulp.task('gzip', function () {
    gulp.src(conf.BUILT_INDEX_FILE_PATH)
        .pipe(gzip({
            gzipOptions: {level: 9}
        }))
        .pipe(filesize({
            title: "### GZIPPED GAME FILE SIZE ###",
            showFiles: true
        }))
        .pipe(gulp.dest(conf.DIST_DIR));
});
