"use strict";

var SOURCE_DIR = './src',
    DIST_DIR = './dist',
    JS_SRC_PATH = SOURCE_DIR + "/**/*.js",
    BUNDLE_NAME = 'bundle.js',
    CSS_SRC_PATH = SOURCE_DIR + '/**/*.css',
    CSS_DIST_PATH = DIST_DIR + '/**/*.css',
    TESTS_SOURCE_PATH = SOURCE_DIR + '/**/*Spec.js',
    INDEX_FILE_PATH = SOURCE_DIR + '/index.html',
    BUILT_INDEX_FILE_PATH = DIST_DIR + '/index.html',
    ROLLEDUP_FILENAME = 'rolledup.js';

var uglifyFlag = process.argv.indexOf("--uglify") > -1 ? true : false;
var sourceMapsFlag = process.argv.indexOf("--sourcemaps") > -1 ? true : false;
var googleCompilerFlag = process.argv.indexOf("--googlecompiler") > -1 ? true : false;

module.exports = {
    SOURCE_DIR: SOURCE_DIR,
    DIST_DIR: DIST_DIR,
    JS_SRC_PATH: JS_SRC_PATH,
    BUNDLE_NAME: BUNDLE_NAME,
    BUNDLE_PATH: DIST_DIR + '/' + BUNDLE_NAME,
    CSS_SRC_PATH: CSS_SRC_PATH,
    CSS_DIST_PATH: CSS_DIST_PATH,
    TESTS_SOURCE_PATH: TESTS_SOURCE_PATH,
    INDEX_SRC_PATH: INDEX_FILE_PATH,
    BUILT_INDEX_FILE_PATH: BUILT_INDEX_FILE_PATH,
    UGLIFY_FLAG: uglifyFlag,
    SOURCEMAP_FLAG: sourceMapsFlag,
    ROLLEDUP_FILENAME: ROLLEDUP_FILENAME,
    ROLLEDUP_FILE_PATH: DIST_DIR + '/' + ROLLEDUP_FILENAME,
    GOOGLE_COMPILER_FLAG: googleCompilerFlag,
    GZIP_FILENAME: 'game'
};