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
  var maze = glob.sync('public/maze/**/*.json');
  var pages = maze.filter(function(val) {
    return val.slice(-13) !== 'manifest.json';
  }).map(function(val) {
    return val.slice(6, -5);
  });
  var readable = am.generate([
    'public/css/**/*.css',
    'public/img/**/*.{png,jpg,jpeg,gif}',
    'public/js/**/*.js',
    'public/sound/**/*.{mp3,wav}'
  ].concat(maze), {});
  var text = '';
  readable.on('readable', function() {
    var chunk;
    while (null !== (chunk = readable.read())) {
      text += chunk;
    }
  });
  readable.on('end', function() {
    text += pages.join('\n') + '\n';
    text += fs.readFileSync('cache-postfile.txt') + '\n';
    text += 'NETWORK:\n*';
    fs.writeFile('public/cache.menifest', text, cb);
  });
});

gulp.task('default', ['appcache'], shell.task([
  'npm start'
]));
