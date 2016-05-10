var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer')

gulp.task('stylesheets', function() {
    return gulp
        .src('./web/static/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./web/static/css/'))
})

gulp.task('javascripts', function() {

})

gulp.task('images', function() {

})

gulp.task('serve', function() {

})

gulp.task('watch', function() {
    gulp.watch('web/static/scss/**/*.scss', ['stylesheets'])

})

gulp.task('default', ['watch', 'stylesheets'])
