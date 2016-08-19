"use strict";

var gulp = require('gulp'),
    del = require('del'),
    rollup = require('gulp-rollup'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    stylishReporter = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    util = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    cleanCSS = require('gulp-clean-css'),
    gulpSequence = require('gulp-sequence'),
    jasmine = require('gulp-jasmine'),
    jasmineReporters = require('jasmine-reporters'),
    filesize = require('gulp-size'),
    gzip = require('gulp-gzip');

var SOURCE_DIR = './src',
    DIST_DIR = './dist',
    JS_SRC_PATH = SOURCE_DIR + "/**/*.js",
    BUNDLE_NAME = 'bundle.js',
    CSS_SRC_PATH = SOURCE_DIR + '/**/*.css',
    CSS_DIST_PATH = DIST_DIR + '/**/*.css',
    TESTS_SOURCE_PATH = SOURCE_DIR + '/**/*Spec.js',
    INDEX_FILE_PATH = SOURCE_DIR + '/index.html',
    BUILT_INDEX_FILE_PATH= DIST_DIR + '/index.html';

var productionFlag = process.argv.indexOf("--production") > -1 ? true : false;
var sourceMapsFlag = process.argv.indexOf("--sourcemaps") > -1 ? true : false;

gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del([DIST_DIR]);
});

gulp.task('bundlejs', function () {

    var stream = gulp.src(JS_SRC_PATH)
        .pipe(jshint())
        .pipe(jshint.reporter(stylishReporter))
        .pipe(rollup({
            entry: 'src/main.js',
            format: 'iife',
            plugins: []
        }))
        .pipe(rename(BUNDLE_NAME))
        .pipe(babel());

    if (sourceMapsFlag) {
        stream.pipe(sourcemaps.init({debug: true}));
    }
    if (productionFlag) {
        stream.pipe(uglify({mangle: true, compress: true}))
    }
    if (sourceMapsFlag) {
        stream.pipe(sourcemaps.write());
    }

    return stream.pipe(gulp.dest(DIST_DIR));
});

gulp.task('minify-css', function () {
    var stream = gulp.src(CSS_SRC_PATH);
    if (productionFlag) {
        stream.pipe(cleanCSS());
    }

    stream.pipe(gulp.dest(DIST_DIR));
});


gulp.task('minify-html', function () {
    //get css sources and minify them
    var cssSource = gulp.src(CSS_DIST_PATH);
    var jsSource = gulp.src(DIST_DIR + '/' + BUNDLE_NAME);
    return gulp.src(INDEX_FILE_PATH)
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
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('copy-html', function () {
    gulp.src(SOURCE_DIR + '/index.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true
        }))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('tests', function(){
    gulp.src(TESTS_SOURCE_PATH)
        .pipe(jasmine({
            reporter: new jasmineReporters.TerminalReporter()
        }));
});

gulp.task('build', function (callback) {
    if (productionFlag) {
        gulpSequence('clean', ['bundlejs', 'minify-css'], 'minify-html', callback);
    } else {
        gulpSequence('clean', ['bundlejs', 'minify-css', 'copy-html'], callback);
    }
});

gulp.task('gzip', function(){
    gulp.src(BUILT_INDEX_FILE_PATH)
        .pipe(gzip({
            gzipOptions: {level: 9}
        }))
        .pipe(filesize({
            title: "### GZIPPED GAME FILE SIZE ###",
            showFiles: true
        }))
        .pipe(gulp.dest(DIST_DIR + '/compressed'));
});

gulp.task('release', function(callback){
    productionFlag = true;
    gulpSequence('clean', ['bundlejs', 'minify-css'], 'minify-html', 'gzip', callback);
});

gulp.task('watch', [ 'tests', 'bundlejs'], function () {
    gulp.watch(JS_SRC_PATH, ['bundlejs', 'tests']);
    gulp.watch(CSS_SRC_PATH, ['minify-css']);
    gulp.watch(INDEX_FILE_PATH, ['copy-html']);
    gulp.watch(TESTS_SOURCE_PATH, ['tests']);
});


//TODO zip and zip check
//TODO try multiple minifiers to find the best one
//TODO tests

//Default Task
gulp.task('default', ['build']);