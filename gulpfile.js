'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./2/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./2/css'));
});

gulp.task('watch',  () => {
    gulp.watch('./2/scss/**/*.scss', gulp.series('sass'));
});
