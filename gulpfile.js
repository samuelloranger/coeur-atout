'use strict';
/*
* Références:
* principale https://gist.github.com/feliperoberto/9793674
* et la doc des extensions gulp
* */

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded', includePaths: ["scss/"]}))
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('browser-sync', function () {
    browserSync.init(["assets/css/*.css", "./*.html", "assets/js/!*.js"], {
        watch:true,
        server: {
            baseDir: "./"
        }
    });
});


// Tâche par défaut
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['sass']);
});