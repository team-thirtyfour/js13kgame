var gulp = require('gulp'),
    conf = require('../config'),
    gulpSequence = require('gulp-sequence');

gulp.task('build', function (callback) {
    if (conf.UGLIFY_FLAG) {
        return gulpSequence(['clean', 'jshint'], ['bundlejs', 'minify-css'], ['minify-html'], callback);
    } else if (conf.GOOGLE_COMPILER_FLAG) {
        return gulpSequence(['clean', 'jshint'], ['googlebundle', 'minify-css'], ['minify-html'], callback);
    }
    else {
        return gulpSequence(['clean', 'jshint'], 'bundlejs', ['minify-css', 'copy-html'], callback);
    }
});