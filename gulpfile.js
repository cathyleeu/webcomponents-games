'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    PolymerProject = require('polymer-build').PolymerProject,
    HtmlSplitter = require('polymer-build').HtmlSplitter,
    mergeStream = require('merge-stream'),
    fs = require('fs'),
    child = require('child_process'),
    glob = require('glob'),
    path = require('path'),
    polymerJson = require('./webcomponents/polymer.json'),
    project = new PolymerProject(polymerJson),
    sourcesHtmlSplitter = new HtmlSplitter();

gulp.task('build', ['less']);

gulp.task('less', function () {
  return gulp.src('public/css/**/*.less')
    .pipe($.less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', function() {
  var server = child.spawn('node', ['index']);
  server.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
  });
  server.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });
  $.watch('public/css/**/*.less', { ignoreInitial: false })
    .pipe($.less())
    .pipe(gulp.dest('public/css'));
  $.watch('webcomponents/*.html', { ignoreInitial: false }, function () {
    mergeStream(project.sources(), project.dependencies())
      .pipe($.cleanDest('public'))
      .pipe(sourcesHtmlSplitter.split())
      .pipe(project.bundler())
      .pipe(project.addCustomElementsEs5Adapter())
      .pipe(gulp.dest('public'));
  });
});
