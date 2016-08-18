"use strict";

var gulp = require('gulp'),
    del = require('del'),
    rollup = require('gulp-rollup'),
    sourcemaps = require('gulp-sourcemaps'),
    babel= require('gulp-babel'),
    jshint = require('gulp-jshint'),
    stylishReporter = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    util = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    runSequence = require('run-sequence').use(gulp),
    cleanCSS = require('gulp-clean-css');

var SOURCE_DIR="./src",
    DIST_DIR="./dist",
    JS_FILES=SOURCE_DIR + "/**/*.js",
    BUNDLE_NAME='bundle.js',
    CSS_SRC_PATH = SOURCE_DIR + '/**/*.css',
    CSS_DIST_PATH = DIST_DIR + '/**/*.css';

gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del([DIST_DIR]);
});

gulp.task('bundlejs', function() {
    gulp.src(JS_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter(stylishReporter))
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: 'src/main.js',
            format: 'iife',
            plugins: []}))
        .pipe(rename(BUNDLE_NAME))
        .pipe(babel())
        .on('error', util.log)
        .pipe(uglify({mangle: true, compress: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('minifyCss', function(){
    gulp.src(CSS_SRC_PATH)
        .pipe(cleanCSS())
        .pipe(gulp.dest(DIST_DIR));
});


gulp.task('buildMinifiedIndexHtml', function(){
    var target = gulp.src(SOURCE_DIR + '/index.html');
    //get css sources and minify them
    var cssSource = gulp.src(CSS_DIST_PATH);
    var jsSource = gulp.src(DIST_DIR + '/' + BUNDLE_NAME);
    return gulp.src(SOURCE_DIR + '/index.html')
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
            removeComments: true}))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('build', function(callback) {
    //runs clean before running bundlejs and minifyjs in parallel
    runSequence('clean',
        ['bundlejs', 'minifyCss'],
        ['buildMinifiedIndexHtml'],
        callback);
});


//TODO zip and zip check
//TODO try multiple minifiers to find the best
//TODO watch
//TODO tests

//Default Task
gulp.task('default', ['build']);