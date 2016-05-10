var gulp = require('gulp'),
    sass = require('gulp-sass')


var wacthFiles = [
    "web/static/scss/**/*.scss",
    "web/static/js/**/*.js"
]

gulp.task('styles', function() {
    /**
   nested,compact, compressed, or expanded.
*/
    return gulp.src('./web/static/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(gulp.dest('./web/static/css/'))
})

gulp.task('javascripts', function() {

})

gulp.task('images', function() {

})

gulp.task('serve', function() {

})

gulp.task('watch', function() {
    gulp.watch(wacthFiles.scss, ['stylesheet'])
    gulp.watch(wacthFiles.js, ['javascript'])

})

gulp.task('default', ['styles'])
