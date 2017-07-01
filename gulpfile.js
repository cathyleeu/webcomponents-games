'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var child = require('child_process');
var glob = require('glob');
var path = require('path');

gulp.task('build', ['less']);

gulp.task('less', function () {
  return gulp.src('public/css/**/*.less')
    .pipe($.less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['less'], function() {
  var server = child.spawn('node', ['--harmony', 'app.js']);
  // var log = fs.createWriteStream('server.log', {flags: 'a'});
  // server.stdout.pipe(log);
  // server.stderr.pipe(log);
});
