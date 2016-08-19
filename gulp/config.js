"use strict";

var SOURCE_DIR = './src',
    DIST_DIR = './dist',
    JS_SRC_PATH = SOURCE_DIR + "/**/*.js",
    BUNDLE_NAME = 'bundle.js',
    CSS_SRC_PATH = SOURCE_DIR + '/**/*.css',
    CSS_DIST_PATH = DIST_DIR + '/**/*.css',
    TESTS_SOURCE_PATH = SOURCE_DIR + '/**/*Spec.js',
    INDEX_FILE_PATH = SOURCE_DIR + '/index.html',
    BUILT_INDEX_FILE_PATH = DIST_DIR + '/index.html';

var productionFlag = process.argv.indexOf("--production") > -1 ? true : false;
var sourceMapsFlag = process.argv.indexOf("--sourcemaps") > -1 ? true : false;

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
    PRODUCTION_FLAG: productionFlag,
    SOURCEMAP_FLAG: sourceMapsFlag
};