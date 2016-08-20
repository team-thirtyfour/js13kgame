"use strict";

var gulp = require('gulp'),
    conf = require('../config'),
    closureCompiler = require('google-closure-compiler').gulp(),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('googlebundle', ['rollup'], function () {
    if (conf.SOURCEMAP_FLAG) {
        return gulp.src(conf.ROLLEDUP_FILE_PATH, {base: './'})
            .pipe(sourcemaps.init())
            .pipe(closureCompiler({
                compilation_level: 'SIMPLE',
                warning_level: 'VERBOSE',
                language_in: 'ECMASCRIPT6_STRICT',
                language_out: 'ECMASCRIPT5_STRICT',
                output_wrapper: '(function(){\n%output%\n}).call(this)',
                js_output_file: conf.BUNDLE_NAME
            }))
            .pipe(sourcemaps.write('/')) // gulp-sourcemaps automatically adds the sourcemap url comment
            .pipe(gulp.dest(conf.DIST_DIR));
    } else {
        //faster with no sourcemaps as we don't need to pass file to gulp.src and thus no need to read all rolledup.js file in memory
        return closureCompiler({
            js: conf.ROLLEDUP_FILE_PATH,
            compilation_level: 'SIMPLE',
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'bundle.js'
        })
            .src() // needed to force the plugin to run without gulp.src
            .pipe(gulp.dest(conf.DIST_DIR));
    }

});
