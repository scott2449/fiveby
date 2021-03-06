var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var mocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('test', ['style'], function () {
  gulp.src(['lib/*.js', 'index.js'])
    .pipe(istanbul())
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          reporters: [ 'text', 'lcov', 'cobertura' ]
        })).on('end',function () {
          if (process.env.TRAVIS) {
            gulp.src('coverage/lcov.info')
              .pipe(coveralls());
          }
        });
    });
});

gulp.task('debug', function () {
  gulp.src(['test/*.js'])
    .pipe(mocha());
});

gulp.task('style', function () {
  gulp.src(['lib/*.js','test/*.js','index.js'])
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
