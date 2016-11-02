/**
 * Created by brad on 10/27/16.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var minifier = require('gulp-uglify/minifier');
// var uglifyjs = require('uglify-js');
var jasmine = require('gulp-jasmine');

gulp.task('sass', function () {
    return gulp.src('resources/css/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function () {
    gulp.watch('resources/css/**', ['sass']);
});

gulp.task('uglify', function () {
    return gulp.src('resources/*/*/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('public/'));
});

gulp.task('pages', function () {
    return gulp.src('resources/pages/*/*.html')
        .pipe(gulp.dest('public/pages/'));
});

gulp.task('jas-test', function () {
    gulp.src('tests/angular.js')
    // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine())
    });

gulp.task('default', ['sass', 'uglify', 'pages']);