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

gulp.task('scripts-production', function() {
    gulp.src([
      './dev/data/monitoramento.js',
      './dev/data/hiperlinks.js', 
      './dev/data/kmls.js', 
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
  var XLSX = require('xlsx');
  var monitoramento = [];
  var hiperlinks = [];

  function createJsFromExcel(inputExcel, tableName, outputJS){
    var worksheet = XLSX.readFile(inputExcel).Sheets[tableName];
    var myObj = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    if(outputJS == 'monitoramento'){
      myObj.map(function(index){ monitoramento.push(index); })
      var json = JSON.stringify(monitoramento);
    }
    else if(outputJS == 'hiperlinks'){
      myObj.map(function(index){ hiperlinks.push(index); })
      var json = JSON.stringify(hiperlinks);
    }
    var concat = 'var ' + outputJS + '=' + json;
    var filePath = './dev/data/' + outputJS +'.js';
    fs.writeFile( filePath, concat, 'utf8', function (err){
      if(err){
        console.log(err);
      }
    });
    console.log(filePath + ' atualizado')
  }
  createJsFromExcel('./data_src/monitoramento.xlsx','COMUNICACAO', 'monitoramento');
  createJsFromExcel('./data_src/hiperlinks.xlsx','hiperlinks', 'hiperlinks');
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
  'create-json',
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
  'create-json',
  'scripts-production'
]);