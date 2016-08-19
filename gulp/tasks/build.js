var gulp = require('gulp'),
    conf = require('../config'),
    gulpSequence = require('gulp-sequence');

gulp.task('build', function (callback) {
    if (conf.PRODUCTION_FLAG) {
        return gulpSequence(['clean', 'jshint'], ['bundlejs', 'minify-css'], ['minify-html'], callback);
    } else {
        return gulpSequence(['clean', 'jshint'], 'bundlejs', ['minify-css', 'copy-html'], callback);
    }
});