var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
    gulp.src('./public/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/dest/style'));
});

gulp.task('main',function () {
    return gulp.src(['out/index.js'])
        .pipe(browserify({
            debug: true
        }))
        .pipe(gulp.dest('./public/dest/'));
});

gulp.task('default', ['main', 'sass', 'watch', 'watch-scss']);

gulp.task('watch', function () {
    gulp.watch(['out/**/*.js'], ['main']);
});

gulp.task("watch-scss",function(){
    gulp.watch(['public/style/*.scss'],["sass"])
});



