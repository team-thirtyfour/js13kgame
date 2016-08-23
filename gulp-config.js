"use strict";

var SOURCE_DIR = './src',
    DIST_DIR = './dist',
    BUNDLE_NAME = 'bundle.js',
    ROLLEDUP_FILENAME = 'rolledup.js';

var uglifyFlag = process.argv.indexOf("--uglify") > -1 ? true : false,
    sourcemapsFlag = process.argv.indexOf("--sourcemaps") > -1 ? true : false,
    googlecompilerFlag = process.argv.indexOf("--googlecompiler") > -1 ? true : false;

module.exports = {
    source: {
        dir: SOURCE_DIR,
        path: {
            js: SOURCE_DIR + "/**/*.js",
            css: SOURCE_DIR + '/**/*.css',
            tests: SOURCE_DIR + '/**/*Spec.js',
            indexhtml: SOURCE_DIR + '/index.html'
        }
    },
    dist: {
        dir: DIST_DIR,
        path: {
            css: DIST_DIR + '/**/*.css',
            indexhtml: DIST_DIR + '/index.html',
            js: {
                rolledup: DIST_DIR + '/' + ROLLEDUP_FILENAME,
                bundle: DIST_DIR + '/' + BUNDLE_NAME
            }
        },
        js: {
            rolledup_filename: ROLLEDUP_FILENAME,
            bundle_filename: BUNDLE_NAME
        }
    },
    flags: {
        uglify: uglifyFlag,
        sourcemaps: sourcemapsFlag,
        googlecompile: googlecompilerFlag,
        minify: googlecompilerFlag || uglifyFlag
    },
    gzip: {
        filename: 'game.gz',
        options: {
            gzipOptions: {level: 9}, //to add more options check gulp-gzip plugin options
            append: false //does not append .gz to the filename
        }
    },
    rollup: {
        entry: './src/main.js',
        format: 'iife',
        plugins: []
    },
    googlecompile: {
        options: {
            compilation_level: 'SIMPLE',
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: BUNDLE_NAME
        }
    },
    server: {
        options: {
            port: 8888,
            livereload: true,
            root: 'dist'
        }
    }
};