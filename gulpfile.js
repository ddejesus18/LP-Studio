var gulp = require('gulp');
var compass = require('gulp-compass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Compile SASS & auto-inject into browsers
gulp.task('compass', function () {
    return gulp.src('sass/*.scss')
        .pipe(compass({
	      config_file: './config.rb',
	      css: 'stylesheets',
	      sass: 'sass'
	    }))
        .pipe(reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('default', ['browser-sync', 'compass'], function () {
    gulp.watch("sass/*.scss", ['compass']);
    gulp.watch("*.html").on("change", browserSync.reload);
});
