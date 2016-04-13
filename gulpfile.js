var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
          //changed to local host b/c _site was not being watched and css files not being changed
            host: "localhost"
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
 gulp.task('sass', function () {
   // fixed this broken link to a diff sass folder
     return gulp.src('_sass/styles.scss')
         .pipe(sass({
             includePaths: ['scss'],
             onError: browserSync.notify
         }))
         .pipe(gulp.dest('stylesheets'))
         .pipe(browserSync.reload({stream:true}))
         .pipe(gulp.dest('stylesheets'));
 });
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['**/*.scss']).on("change", function(file) {
     browserSync.reload(file.path);
 });
    gulp.watch(['*.html']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * launch BrowserSync & watch files.
 */


 gulp.task('compass', function () {
      gulp.src(['sass/*.scss', 'sass/**/*.scss'])
     .pipe(compass({
         config_file: './config.rb',
        css: 'stylesheets',
         sass: 'sass'

     }))
     .pipe(gulp.dest("stylesheets"))
 });
gulp.task('default', ['browser-sync', 'watch','compass']);
