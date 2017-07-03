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
    polymerJson = require('./polymer.json'),
    project = new PolymerProject(polymerJson);

function task_less() {
  return gulp.src('public/css/**/*.less')
    .pipe($.less())
    .pipe(gulp.dest('public/css'));
}

function task_webcomponents() {
  let dependenciesStreamSplitter = new HtmlSplitter();
  let dependenciesStream = project.dependencies()
    .pipe(dependenciesStreamSplitter.split())
    .pipe($.if(/\.js$/, $.babel({
      presets: ['es2015'],
      plugins: ['external-helpers', 'transform-custom-element-classes', 'transform-es2015-classes']
    })))
    .pipe(dependenciesStreamSplitter.rejoin());
  return mergeStream(project.sources(), dependenciesStream)
    .pipe($.cleanDest('public/build'))
    .pipe(project.addBabelHelpersInEntrypoint())
    .pipe(project.addCustomElementsEs5Adapter())
    // .pipe(project.bundler())
    .pipe(gulp.dest('public/build'));
}

gulp.task('less', task_less);

gulp.task('webcomponents', task_webcomponents);

gulp.task('build', ['less', 'webcomponents']);

gulp.task('default', ['less', 'webcomponents'], function() {
  var server = child.spawn('node', ['index']);
  server.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
  });
  server.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });
  $.watch('public/css/**/*.less', task_less);
  $.watch('public/webcomponents/*.html', task_webcomponents);
});
