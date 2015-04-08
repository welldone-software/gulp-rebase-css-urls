'use strict';

var gulp = require('gulp'),
    print = require('gulp-print'),
    concat = require('gulp-concat'),
    rimraf = require('rimraf'),
    diff = require('gulp-diff'),
    runSequence = require('run-sequence'),
    rebaseCssUrls = require('./index.js');

var srcDir = 'tests/input',
    dstDir = 'tests/actual',
    expectedDir = 'tests/expected';

gulp.task('clean', function(cb){
    rimraf(dstDir, cb);
});

gulp.task('copy-statics', function(cb){
    return gulp.src(srcDir + '/**/*.jpg')
        .pipe(gulp.dest(dstDir));
});

gulp.task('run-test', ['copy-statics'], function(){
    return gulp.src(srcDir + '/**/*.css')
        .pipe(rebaseCssUrls(srcDir))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dstDir));
});

gulp.task('check-results', function(){
    return gulp.src(dstDir + '/bundle.css')
        .pipe(diff(expectedDir))
        .pipe(diff.reporter({ fail: true }));
});

gulp.task('default', function(cb){
    runSequence('clean', 'run-test', 'check-results', cb);
});