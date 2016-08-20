"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    filesize = require('gulp-size');


gulp.task('minify-html', function () {
    //get css sources and minify them
    var cssSource = gulp.src(conf.dist.path.css);
    var jsSource = gulp.src(conf.dist.path.js.bundle);
    return gulp.src(conf.source.path.indexhtml)
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
            title: "### FILE SIZE WHEN GZIPPED SHOULD BE ###",
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest(conf.dist.dir));
});


gulp.task('copy-html', function () {
    gulp.src(conf.source.path.indexhtml)
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true
        }))
        .pipe(gulp.dest(conf.dist.dir));
});
