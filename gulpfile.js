"use strict";

require('require-dir')('./gulp/tasks');

var gulp = require('gulp');

//TODO try multiple minifiers to find the best one
//TODO tests

//Default Task
gulp.task('default', ['build']);