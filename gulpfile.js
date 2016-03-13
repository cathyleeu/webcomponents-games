'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var child = require('child_process');
var am = require('appcache-manifest');
var glob = require('glob');

gulp.task('less', function () {
  return gulp.src('public/css/**/*.less')
    .pipe($.less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('makeUrl', function(cb) {
  var schools = require('./login/schools.json'),
      books = require('./login/books.json'),
      date = new Date().toISOString().slice(0,7).split("-").join(""),
      result = [];
  Object.keys(schools[date]).forEach(function(key) {
    var school = key.split(":"),
        sum = 0;
    sum += school[0].charCodeAt(0) * 17;
    sum += school[0].charCodeAt(1) * 13;
    sum += school[1].charCodeAt(0) * 11;
    sum += school[1].slice(-1).charCodeAt(0) * 19;
    sum += school[1].slice(parseInt(school[1] / 2, 10)).charCodeAt(0) * 7;
    result.push({
      school: school[1],
      code: sum.toString(16).slice(1),
      classes: schools[date][key]
    });
  });
  fs.writeFileSync('public/login/url.json', JSON.stringify(result));
  fs.writeFileSync('public/login/books.json', JSON.stringify(books[date]));
  cb();
});

gulp.task('appcache', ['less', 'makeUrl'], function(cb) {
  var offline = JSON.parse(fs.readFileSync('public/maze/offline.json'))
  .map(function(obj) {
    return 'public/' + obj.href.split('/').slice(0, -1).join('/') + '/*.json';
  });
  var maze = glob.sync('{' + offline.join(',') + '}');
  var pages = maze.filter(function(val) {
    return val.slice(-13) !== 'manifest.json';
  }).map(function(val) {
    return val.slice(6, -5);
  });
  var readable = am.generate([
    'public/css/**/*.css',
    'public/img/**/*.{png,jpg,jpeg,gif}',
    'public/js/**/*.js',
    // 'public/sound/**/*.{mp3,wav}'
  ].concat(maze), {});
  var text = '';
  readable.on('readable', function() {
    var chunk;
    while (null !== (chunk = readable.read())) {
      text += chunk;
    }
  });
  readable.on('end', function() {
    text += '#' + new Date().toISOString() + '\n';
    text += pages.join('\n') + '\n';
    text += fs.readFileSync('cache-postfile.txt') + '\n';
    text += 'NETWORK:\n*\n';
    text += 'FALLBACK:\n/list /offline';
    fs.writeFile('public/cache.manifest', text, cb);
  });
});

gulp.task('server', ['appcache'], function() {
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

  gulp.watch(['view/**/*.ejs'], ['appcache', reload]);
  gulp.watch(['public/css/**/*.less'], ['appcache', reload]);
  gulp.watch(['public/{components,img,js,maze,sound}/**/*'], ['appcache', reload]);
});
