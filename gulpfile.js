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

gulp.task('server', ['less'], function() {
  var server = child.spawn('node', ['--harmony', 'app.js']);
  // var log = fs.createWriteStream('server.log', {flags: 'a'});
  // server.stdout.pipe(log);
  // server.stderr.pipe(log);
});

gulp.task('default', ['server'], function () {
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;

  browserSync({
    port: 3000,
    notify: false,
    logPrefix: 'KC',
    proxy: 'localhost:3000',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function (snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    // server: {
    //   baseDir: ['public']
    // }
  });

  gulp.watch(['view/**/*.ejs'], [reload]);
  gulp.watch(['public/css/**/*.less'], ['less', reload]);
  gulp.watch(['public/{components,img,js,maze,sound}/**/*'], [reload]);
});
