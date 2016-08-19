"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    filesize = require('gulp-size');


gulp.task('minify-html', function () {
    //get css sources and minify them
    var cssSource = gulp.src(conf.CSS_DIST_PATH);
    var jsSource = gulp.src(conf.BUNDLE_PATH);
    return gulp.src(conf.INDEX_SRC_PATH)
        .pipe(inject(cssSource, {
            starttag: '<!-- inject:head:{{ext}} -->',
            transform: function (filePath, file) {
                // return file contents as string
                return '<style>' + file.contents.toString('utf8') + '</style>';
            }
        }))
        .pipe(inject(jsSource, {
            starttag: '<!-- inject:script:{{ext}} -->',
            transform: function (filePath, file) {
                // return file contents as string
                return '<script>' + file.contents.toString('utf8') + '</script>';
            }
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(filesize({
            title: "### FILE SIZE WHEN GZIPPED ###",
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest(conf.DIST_DIR));
});


gulp.task('copy-html', function () {
    gulp.src(conf.INDEX_SRC_PATH)
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true
        }))
        .pipe(gulp.dest(conf.DIST_DIR));
});
