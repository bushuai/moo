var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    filter = require('gulp-filter'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload

var paths = {
    scss: './web/scss/**/*.scss',
    scss_dest: './web/css',
    html: './web/view/**/*.html',
    js: ['./web/**/*.js','./server/**/*.js']
}

gulp.task('stylesheets', function() {
    return gulp
        .src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.scss_dest))
        .pipe(filter('**/*.css'))
        .pipe(reload({
            stream: true
        }))
})

gulp.task('javascripts', function() {

})

gulp.task('images', function() {

})

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['stylesheets'])
})

gulp.task('serve', function() {
    browserSync
        .init(null, {
            proxy: "http://localhost:3000"
        })

    gulp.watch(paths.scss, ['stylesheets'])
    gulp.watch(paths.html).on('change', reload)
    gulp.watch(paths.js).on('change', reload)
})

gulp.task('default', ['serve', 'watch', 'stylesheets'])
