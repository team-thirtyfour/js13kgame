"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    filesize = require('gulp-size'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename');

gulp.task('gzip', function () {
    gulp.src(conf.dist.path.indexhtml)
        .pipe(gzip(conf.gzip.options))
        .pipe(rename(conf.gzip.filename))
        .pipe(filesize({
            title: "### GZIPPED GAME FILE SIZE ###",
            showFiles: true
        }))
        .pipe(gulp.dest(conf.dist.dir));
});
