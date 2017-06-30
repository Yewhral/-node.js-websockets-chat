const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('prefix', () => {
    gulp.src('./public/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            grid: false,
            cascade: false
        }))
        .pipe(gulp.dest('./public/'))
});