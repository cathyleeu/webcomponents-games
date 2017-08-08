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

function task_webcomponents(cb) {
  let dependenciesStreamSplitter = new HtmlSplitter();
  let dependenciesStream = project.dependencies()
    .pipe(dependenciesStreamSplitter.split())
    .pipe($.if(/\.js$/, $.babel({
      presets: ['es2015'],
      plugins: ['external-helpers', 'transform-custom-element-classes', 'transform-es2015-classes']
    })))
    .pipe(dependenciesStreamSplitter.rejoin())
    .pipe($.rename(function (path) {
      if(path.dirname == "public/webcomponents") {
        path.dirname = path.dirname + "-es5";
      } else {
        path.dirname = path.dirname.replace("public/components/", "public/components-es5/");
      }
    }))
    .pipe($.if(/webcomponents-es5\/[^.]*.html/, $.change(function(contents) {
      return contents.replace(/(=["']\.*\/)(components)(\/[^"']*)/g, "$1$2-es5$3").replace("/webcomponents/", "/webcomponents-es5/");
    })))
    .pipe(project.addBabelHelpersInEntrypoint(project.config.entrypoint.replace("/webcomponents/", "/webcomponents-es5/")))
    .pipe(project.addCustomElementsEs5Adapter());

  let sourcesStream = project.sources()
    .pipe($.rename(function (path) {
      path.dirname = path.dirname.replace("public/components/", "public/components-es5/");
    }));

  mergeStream(sourcesStream, dependenciesStream)
    .pipe(gulp.dest('./'))
    // .pipe(project.bundler())
    .on('end', cb);
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
  $.watch('public/css/**/*.less', function() {
    gulp.start('less');
  });
  $.watch('public/webcomponents/*.html', function() {
    gulp.start('webcomponents');
  });
});
