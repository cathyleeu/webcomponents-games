'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var less = require('gulp-less');
var fs = require('fs');
var am = require('appcache-manifest');
var glob = require('glob');

gulp.task('less', function () {
  return gulp.src('public/css/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('appcache', ['less'], function(cb) {
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
    'public/js/**/*.js'
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

gulp.task('default', ['appcache'], shell.task([
  'npm start'
]));
