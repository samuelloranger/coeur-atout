const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync").create();

function styles(cb) {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    browserSync.init({
        server:{
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
    cb();
}

function defaut(cb){
    cb();
}

exports.default=defaut;
exports.styles=styles;
exports.watch=watch;