var gulp = require('gulp');
var scss = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();

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

gulp.task('scripts', function() {
    gulp.src([
      './dev/data/getDataFromExcel.js', 
      './dev/components/mapa.js',
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


gulp.task('scripts-production', function() {
    gulp.src([
      './dev/data/monitoramento.js', 
      './dev/components/mapa.js',
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

gulp.task('create-json', function (){
  var fs = require('fs');

  if(typeof require !== 'undefined') XLSX = require('xlsx');
  var workbook = XLSX.readFile('monitoramento.xlsx');

  var monitoramento = [];

  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];

  var myObj = XLSX.utils.sheet_to_json(worksheet,{raw:true});
  myObj.map(function(index){ monitoramento.push(index); })

  var obj = monitoramento;
  var json = JSON.stringify(obj);
  var concat = 'var monitoramento =' + json;

  fs.writeFile('./dev/data/monitoramento.js', concat, 'utf8', function (err){
    if(err){
      return console.log(err);
    }
    console.log("File created")
  });
})

gulp.task('watch', ['browserSync', 'scss','scripts'], function (){
  gulp.watch('./dev/**/*.scss', ['scss']); 
  gulp.watch('./dev/**/*.js', ['scripts']); 
  gulp.watch('./*.html', browserSync.reload); 
});

gulp.task('build', ['scss','create-json','scripts-production']);