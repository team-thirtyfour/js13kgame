var gulp = require('gulp'),
    conf = require('../config'),
    gulpSequence = require('gulp-sequence');

gulp.task('build', function (callback) {
    if (conf.PRODUCTION_FLAG) {
        gulpSequence('clean', ['bundlejs', 'minify-css'], ['minify-html'], callback);
    } else {
        gulpSequence('clean', 'bundlejs', ['minify-css', 'copy-html'], callback);
    }
});