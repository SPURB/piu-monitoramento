var gulp = require('gulp');
var scss = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify'); 

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('scss', function() {
    gulp.src([
      './dev/styles.scss' 
    ])
    .pipe(concat('styles.min.css'))
    .pipe(scss())
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('css-loader', function() {
    gulp.src([
      './dev/scss/loader.scss' 
    ])
    .pipe(concat('loader.css'))
    .pipe(scss())
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))
});

gulp.task('scripts-production', function() {
    gulp.src([
      './dev/data/kmls.js',
      './dev/components/mapa.js',
      './dev/components/sumario_linha.js',
      './dev/components/sumario.js',
      './dev/components/ficha.js',
      './dev/main.js' 
    ])
    .pipe(concat('main.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('kmls', function(){
  var fs = require('fs');
  var kmls = [];

  fs.readdir('./dist/kml', (err, files) => {
    if(err){
      console.log(err)
    }
    else{
      files.map(function(index) {
        kmls.push(index)
      })
      var concat = 'var kmls = ' + JSON.stringify(files)
      fs.writeFile( './dev/data/kmls.js', concat, 'utF8', function (err){
        if (err) { console.log(err) }
      })
      console.log('.dev/data/kmls.js atualizado')
    }
  })
})

gulp.task('default', [
  'browserSync', 
  'scss',
  'css-loader',
  'kmls',
  'scripts-production'
  ], function (){
    gulp.watch('./dev/**/*.scss', ['scss']); 
    gulp.watch('./dev/**/*.js', ['scripts-production']); 
    gulp.watch('./*.xlsx', ['scripts-production']); 
    gulp.watch('./*.html', browserSync.reload); 
});

gulp.task('build', [
  'scss',
  'css-loader',
  'kmls',
  'scripts-production'
]);