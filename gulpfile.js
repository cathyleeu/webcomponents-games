'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var child = require('child_process');
var glob = require('glob');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('public/css/**/*.less')
    .pipe($.less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('makeUrl', ['less'], function(cb) {
  var schools = require('./login/schools.json'),
      result = [];
  Object.keys(schools).forEach(function(key) {
    var school = key.split(":"),
        date = school[2],
        sum = 0;
    if(date.length == 6) {
      date += "01";
    }
    sum += school[0].charCodeAt(0) * 17;
    sum += school[0].charCodeAt(1) * 13;
    if(school[1].slice(0, 2) == "러닝") {
      if(school[1].slice(2, 4) != "서초") {
        sum += school[1].charCodeAt(2) * 13;
        sum += school[1].charCodeAt(3) * 29;
      }
    }
    if(school[1].slice(0, 2) == "이화") {
      sum += school[1].charCodeAt(2) * 13;
      sum += school[1].charCodeAt(3) * 29;
    }
    sum += school[1].charCodeAt(0) * 11;
    sum += school[1].slice(-1).charCodeAt(0) * 19;
    sum += school[1].slice(parseInt(school[1] / 2, 10)).charCodeAt(0) * 7;
    result.push({
      date: date,
      school: school[1],
      code: sum.toString(16).slice(1),
      classes: schools[key],
      lang: school[3] || ""
    });
  });
  fs.writeFileSync('public/login/url.json', JSON.stringify(result));
  cb();
});

gulp.task('server', ['makeUrl'], function() {
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

  gulp.watch(['view/**/*.ejs'], ['makeUrl', reload]);
  gulp.watch(['public/css/**/*.less'], ['makeUrl', reload]);
  gulp.watch(['public/{components,img,js,maze,sound}/**/*'], ['makeUrl', reload]);
});
