"use strict";
var gulp = require('gulp'),
    conf = require('../../gulp-config'),
    connect = require('gulp-connect');

gulp.task('connect', function(){
   return connect.server(conf.server.options);

});

gulp.task('reload', function(){
   gulp.src('./dist/index.html').pipe(connect.reload());
});