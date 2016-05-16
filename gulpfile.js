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
  // cache 디렉토리가 없는 경우 생성해준다
  var cacheDirPath = path.join("public", "cache");
  try {
    fs.accessSync(cacheDirPath, fs.F_OK);
  } catch (e) {
    fs.mkdirSync(cacheDirPath);
  }

  // js와 css파일 리스트를 생성 및 cache-postfile.txt 로딩
  var jsList = fs.readdirSync(path.join("public", "js"))
      .filter(function(item) {
        return item != ".DS_Store" && item != "Thumbs.db";
      })
      .map(function(item) {
        return "/" + path.join("js", item);
      }),
      cssList = fs.readdirSync(path.join("public", "css"))
      .filter(function(item) {
        return item.slice(item.lastIndexOf(".")) == ".css";
      })
      .map(function(item) {
        return "/" + path.join("css", item);
      }),
      postfile = fs.readFileSync('cache-postfile.txt');

  // 로그인 및 공통 이미지, 블록클리 리소스 파일들 로딩
  var loginImgs = fs.readdirSync("public/img/login")
      .filter(function(item) {
        return item != ".DS_Store" && item != "Thumbs.db";
      })
      .map(function(item) {
        return "/img/login/" + item;
      });
  var commonImgs = fs.readdirSync("public/img")
      .filter(function(item) {
        var stat = fs.statSync("public/img/" + item);
        return !stat.isDirectory() && item != ".DS_Store" && item != "Thumbs.db";
      })
      .map(function(item) {
        return "/img/" + item;
      });
  var blocklyImgs = fs.readdirSync("public/components/GoogleBlockly/media")
      .filter(function(item) {
        return item != ".DS_Store" && item != "Thumbs.db";
      })
      .map(function(item) {
        return "/components/GoogleBlockly/media/" + item;
      });

  // 각 원별 cache 생성
  var url = JSON.parse(fs.readFileSync('public/login/url.json')),
      books = JSON.parse(fs.readFileSync('public/login/books.json'));
  url.forEach(function(school, index) {
    var bookArr = Object.keys(school.classes),
        manifests = [],
        jsons = [],
        imgs = [],
        cache = [],
        cachePath = path.join(cacheDirPath, school.code + ".manifest"),
        output = "CACHE MANIFEST\n";
    bookArr.forEach(function(bookName) {
      books[bookName].forEach(function(contentInfo) {
        var maniPath = contentInfo[1];
        if(maniPath.indexOf("#!") >= 0) {
          maniPath = maniPath.slice(maniPath.indexOf("#!") + 2);
        }
        maniPath = maniPath.slice(0, maniPath.lastIndexOf("/"));
        if(maniPath && manifests.indexOf(maniPath) < 0) {
          manifests.push(maniPath);
        }
      });
    });
    manifests.forEach(function(maniPath) {
      var manifest = JSON.parse(fs.readFileSync(path.join("public/maze", maniPath, "manifest.json")));
      manifest.forEach(function(item) {
        // bgm을 제외한 파일을 중복 없이 추가
        if(item.id != "bgm" && cache.indexOf(item.src) < 0) {
          cache.push(item.src);
        }
      });

      jsons = jsons.concat(fs.readdirSync(path.join("public/maze", maniPath))
      .map(function(item) {
        if(item != "manifest.json") {
          var maze = JSON.parse(fs.readFileSync(path.join("public/maze", maniPath, item)));
          // tutorial에 들어있는 이미지 추가
          if(maze.tutorial) {
            maze.tutorial.forEach(function(item) {
              if(item.img && imgs.indexOf(item.img) < 0) {
                imgs.push(item.img);
              }
            });
          }
          // extra안에 들어있는 tutorial에 들어있는 이미지 추가
          if(maze.extra) {
            maze.extra.forEach(function(extra) {
              if(extra.tutorial) {
                extra.tutorial.forEach(function(item) {
                  if(item.img && imgs.indexOf(item.img) < 0) {
                    imgs.push(item.img);
                  }
                });
              }
            });
          }
        }
        return path.join("/maze", maniPath, item);
      }));
    });

    // imgs에 속한 이미지중 cache에 속한 이미지는 제거
    imgs = imgs.filter(function(item) {
      return cache.indexOf(item) < 0;
    });

    // timestamp
    output += '#' + new Date().toISOString() + '\n';

    output += "# jsons\n";
    output += jsons.join("\n") + "\n";

    output += "# files in manifest\n";
    output += cache.join("\n") + "\n";

    output += "# images in jsons\n";
    output += imgs.join("\n") + "\n";

    output += "# common resouces\n";
    output += loginImgs.join("\n") + "\n";
    output += commonImgs.join("\n") + "\n";
    output += blocklyImgs.join("\n") + "\n";

    output += "# js and css\n";
    output += jsList.join("\n") + "\n";
    output += cssList.join("\n") + "\n";

    output += "# postfile\n";
    output += postfile;

    output += "NETWORK:\n*\n";

    fs.writeFileSync(cachePath, output);
  });
  cb();
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
