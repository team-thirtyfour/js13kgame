"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    filesize = require('gulp-size'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename');

gulp.task('gzip', function () {
    gulp.src(conf.BUILT_INDEX_FILE_PATH)
        .pipe(gzip({
            gzipOptions: {level: 9},
            append: true
        }))
        .pipe(filesize({
            title: "### GZIPPED GAME FILE SIZE ###",
            showFiles: true
        }))
        .pipe(rename(conf.GZIP_FILENAME))
        .pipe(gulp.dest(conf.DIST_DIR));
});
