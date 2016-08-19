// "use strict";
//
// var gulp = require('gulp'),
//     conf = require('../config'),
//     jasmine = require('gulp-jasmine'),
//     rollup = require('gulp-rollup'),
//     babel = require('gulp-babel'),
//     jasmineReporters = require('jasmine-reporters');

// gulp.task('tests', function () {
//     gulp.src(conf.TESTS_SOURCE_PATH)
//         .pipe(rollup({
//             entry: 'src/mainSpec.js',
//             format: 'iife',
//             plugins: []
//         }))
//         .pipe(babel())
//         .pipe(jasmine({
//             reporter: new jasmineReporters.TerminalReporter()
//         }));
// });