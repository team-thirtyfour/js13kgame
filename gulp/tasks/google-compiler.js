"use strict";

var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    closureCompiler = require('google-closure-compiler').gulp(),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('googlebundle', ['rollup'], function () {
    if (conf.flags.sourcemaps) {
        return gulp.src(conf.dist.path.js.rolledup, {base: './'})
            .pipe(sourcemaps.init())
            .pipe(closureCompiler(conf.googlecompile.options))
            .pipe(sourcemaps.write('/')) // gulp-sourcemaps automatically adds the sourcemap url comment
            .pipe(gulp.dest(conf.dist.dir));
    } else {
        var options = conf.googlecompile.options;
        options.js = conf.dist.path.js.rolledup;
        //faster with no sourcemaps as we don't need to pass file to gulp.src and thus no need to read all rolledup.js file in memory
        return closureCompiler(options)
            .src() // needed to force the plugin to run without gulp.src
            .pipe(gulp.dest(conf.dist.dir));
    }

});
