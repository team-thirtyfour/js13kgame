var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    gulpSequence = require('gulp-sequence');

gulp.task('build', function (callback) {
    if (conf.flags.uglify) {
        return gulpSequence(['clean', 'jshint'], ['bundlejs', 'css'], ['minify-html'], callback);
    } else if (conf.flags.googlecompile) {
        return gulpSequence(['clean', 'jshint'], ['googlebundle', 'css'], ['minify-html'], callback);
    } else {
        return gulpSequence(['clean', 'jshint'], 'bundlejs', ['css', 'copy-html'], callback);
    }
});