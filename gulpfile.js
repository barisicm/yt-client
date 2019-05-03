var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir:'./src/'
        }
    });

    gulp.watch('*.html').on('change', reload);
});