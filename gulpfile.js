var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('sass', function() {
    gulp.src([
      './dev/styles.scss' 
    ])
    .pipe(concat('styles.min.css'))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scripts', function() {
    gulp.src([
      './dev/getData.js', 
      './dev/main.js' 
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass','scripts'], function (){
  gulp.watch('./dev/**/*.scss', ['sass']); 
  gulp.watch('./dev/**/*.js', ['scripts']); 
  gulp.watch('./*.html', browserSync.reload); 
});

gulp.task('build', ['sass','scripts']);