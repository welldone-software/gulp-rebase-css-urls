'use strict';

var gulp = require('gulp'),
    print = require('gulp-print'),
    concat = require('gulp-concat'),
    rimraf = require('rimraf'),
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

gulp.task('default', ['clean'], function(){
    gulp.start('run-test');
});