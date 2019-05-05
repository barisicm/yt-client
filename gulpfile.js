var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir:'src'
        }
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/assets/styles/styles.css').on('change', browserSync.reload);
});