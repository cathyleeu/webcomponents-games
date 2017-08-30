var public = require('koa-router')(),
    secured = require('koa-router')(),
    passport = require('koa-passport'),
    request = require('co-request'),
    mongoose = require('mongoose'),
    students = require('./controller/students'),
    Users = require('./model/users'),
    nev = require('email-verification')(mongoose);
    fs = require('fs'),
    path = require('path'),
    pmongo = require('promised-mongo'),
    argv = require('minimist')(process.argv.slice(2)),
    siteUrl = argv.url || 'http://localhost:3000',
    config = require('./config.json'), //[argv.production ? 'production' : 'development'];
    auth_db = pmongo(config.auth_db, ["user", "logins"]),
    schools_json = require('./login/schools.json'),
    names_json = require('./public/login/names.json'),
    level_json = require('./public/login/level_pw.json'),
    books_json = require('./public/login/books.json'),
    url_json = getUrlJson();

var defaultTimeStamp = new Date().toISOString();

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
var loginImgs = level_json["default"]
    .concat(level_json["A"])
    .concat(level_json["B"])
    .concat(level_json["C"])
    .concat(level_json["buttons"]);
var commonImgs = fs.readdirSync("public/img")
    .filter(function(item) {
      var stat = fs.statSync("public/img/" + item);
      return !stat.isDirectory() && item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/img/" + item;
    });
var blocklyImgs = fs.readdirSync("public/GoogleBlockly/media")
    .filter(function(item) {
      return item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/GoogleBlockly/media/" + item;
    });
var scratchBlocksImgs = fs.readdirSync("public/scratch-blocks/media")
    .filter(function(item) {
      var stat = fs.statSync("public/scratch-blocks/media/" + item);
      return !stat.isDirectory() && item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/scratch-blocks/media/" + item;
    });
var scratchBlocksIcons = fs.readdirSync("public/scratch-blocks/media/icons")
    .filter(function(item) {
      var stat = fs.statSync("public/scratch-blocks/media/icons/" + item);
      return !stat.isDirectory() && item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/scratch-blocks/media/icons/" + item;
    });
var kidsblocks = fs.readdirSync("public/img/kidsblocks")
    .filter(function(item) {
      var stat = fs.statSync("public/img/kidsblocks/" + item);
      return !stat.isDirectory() && item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/img/kidsblocks/" + item;
    });
var suwonImgs = fs.readdirSync("public/img/dragndrop_suwon")
    .filter(function(item) {
      var stat = fs.statSync("public/img/dragndrop_suwon/" + item);
      return !stat.isDirectory() && item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/img/dragndrop_suwon/" + item;
    });
var msgJsons = fs.readdirSync("public/msg")
    .filter(function(item) {
      return item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return "/msg/" + item;
    });

var mazeDirs = fs.readdirSync('public/maze')
    .filter(function(file) {
      return fs.lstatSync(path.join('public/maze', file)).isDirectory();
    });

// 각 원별 cache 생성
function getCode( bId , kId ) {
  let sum = 0;
  sum += bId.charCodeAt(0) * 17;
  sum += bId.charCodeAt(1) * 13;
  if(kId.slice(0, 2) === "러닝") {
    if(kId.slice(2, 4) !== "서초") {
      sum += kId.charCodeAt(2) * 13;
      sum += kId.charCodeAt(3) * 29;
    }
  }
  if(kId.slice(0, 4) === "와이비엠") {
    if(kId.slice(4, 6) !== "개금") {
      sum += kId.charCodeAt(4) * 11;
      sum += kId.charCodeAt(5) * 31;
    }
  }
  if(kId.slice(0, 8) === "(주)와이비엠넷") {
    if(kId.slice(8, 10) !== "송도") {
      sum += kId.charCodeAt(8) * 11;
      sum += kId.charCodeAt(9) * 31;
    }
  }
  if(kId.slice(0, 3) === "ECC") {
    if(kId.slice(3, 5) === "석계") {
      sum += kId.charCodeAt(3) * 11;
      sum += kId.charCodeAt(4) * 31;
    }
  }
  if(kId.slice(0, 2) === "이화") {
    sum += kId.charCodeAt(2) * 13;
    sum += kId.charCodeAt(3) * 29;
  }
  sum += kId.charCodeAt(0) * 11;
  sum += kId.slice(-1).charCodeAt(0) * 19;
  sum += kId.slice(parseInt(kId / 2, 10)).charCodeAt(0) * 7;
  let code = sum.toString(16).slice(1),
      l = parseInt(kId.length / 2),
      mid = kId.slice(l-1, l+1);
  code = (code + mid.charCodeAt(0).toString(16).slice(0, 2) + mid.charCodeAt(1).toString(16).slice(0, 2)).slice(0, 5);
  return code;
}

function getInfoByCode(code) {
  return new Promise(function(resolve, reject) {
    auth_db.user.find({}).then(function(users) {
      var found = false;
      users.forEach(function(user) {
        if(user.userType != "branch") {
          return;
        }
        user.kinders.forEach(function(kinder) {
          if(code != kinder.url) {
            return;
          }
          found = true;
          var classes = {};
          kinder.kinderClasses.forEach(function(classObj) {
            var book = getBook(classObj);
            if(!classes[book]) {
              classes[book] = [];
            }
            classes[book].push(classObj.className);
          });
          auth_db.logins.find({kinderId:kinder.code}).then(function(logins) {
            var time = user.updateOn || user.createdOn,
                month = user.code == "C00071" ? "03" : "04";
            // 대구지사 03월로 고정 예외처리
            resolve({
              school: kinder.name,
              school_name: user.branch.sub_name || "",
              code: code,
              date: "2017" + month + "01",
              classes: classes,
              lang: kinder.lang || "",
              updateOn: time ? time["$date"] : null,
              logins: logins
            });
          });
        });
      });
      if(!found) {
        resolve(null);
      }
    });
  });
}

function getKinder(kinderId) {
  var code = kinderId.split("-")[0];
  return new Promise(function(resolve, reject) {
    auth_db.user.findOne({code:code}).then(function(user) {
      if(user) {
        var kinder = user.kinders.filter(function(kinder) {
          return kinder.code == kinderId;
        })[0];
        resolve(kinder || {});
        return;
      }
      resolve({});
    });
  });
}

function getBook(classObj) {
  var school = classObj.code.split("-").slice(0, 2).join("-"),
      book = ["5-5", 6];
  // 성동 ECC 1권부터 시작
  if(school == "B00163-K1") {
    book = [1, 2];
  }
  // 대구지사는 요청으로 3달치 제공
  if(school.slice(0,6) == "C00071") {
    book = [5, "5-5", 6];
  }
  // PSA는 여름특별호 사용 안함(목동 러닝트리 제외)
  if(school.slice(0, 1) == "D" && school != "D00120-K1") {
    book = [5, 6];
  }
  // 청아유치원(시범원)
  if(school == "A00083-K1") {
    book = [8, 9];
  }
  // YBM영업부(내부용)
  if(school == "A00083-K3") {
    book = [1, 2, 3, 4, 5, "5-5"];
  }
  // 직영 설리번, 울산지사 교차로원, 인천지사 유원유치원, 부산지사 동성어학원
  if(school == "E00076-K1" || school == "A00072-K9" || school == "A00114-K3" || school == "A00066-K2") {
    book = [4, 5];
  }
  // 영업부 일산지사 홍익유치원, 부산PSA, 울산 설리번 영어어린이집
  if(school == "C00149-K1" || school == "D00086-K1" || school == "A00072-K2") {
    book = [5, 6];
  }
  // 송도ECC 추가반
  if(school == "B00136-K1") {
    var classNum = classObj.code.slice(-3);
    if(classNum == "KC7" || classNum == "KC8" || classNum == "KC9") {
      book = [4, 5];
    }
  }
  // 용인지사 성음유치원 A레벨 추가반
  if(classObj.code == "A00088-K1-KC2") {
    book = [1, 2, 3];
  }
  book = book.map(function(num) {
    return classObj.level + "-" + num;
  }).join(",");
  // 대구지사 에나어린이집, 청솔유치원 5세반에 6세 컨텐츠 추가
  if((school == "C00071-K6" || school == "C00071-K14") && classObj.level == "A") {
    book += ",B-1,B-2";
  }
  // 울산지사 소속원 5세반에 6세 컨텐츠 추가
  if(school.slice(0,6) == "A00072" && classObj.level == "A") {
    book += "," + book.split(",").map(function(bname) {
      return "B-" + (Number(bname.split("-")[1])-1);
    });
  }
  // 영업부 일산지사 홍익유치원 컨텐츠 추가
  if(school == "C00149-K1") {
    book += ",추가컨텐츠";
  }
  return book;
}

function getUrlJson() {
  var result = [];
  Object.keys(schools_json).forEach(function(key) {
    var school = key.split(":"),
        date = school[2];
    if(date.length == 6) {
      date += "01";
    }
    result.push({
      date: date,
      school: school[1],
      code: getCode(school[0], school[1]),
      classes: schools_json[key],
      lang: school[3] || ""
    });
  });
  return result;
}

// See: http://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
nev.configure({
  verificationURL: siteUrl + '/confirmTempUser/${URL}',
  persistentUserModel: Users,
  tempUserCollection: 'tempUsers',

  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'toycodeinc@gmail.com',
      pass: 'c0d1ng!@'
    }
  },
  verifyMailOptions: {
    from: '키즈씽킹 <toycodeinc_do_not_reply@gmail.com>',
    subject: '키즈씽킹 회원 이메일 인증',
    html: '<h1>키즈씽킹 회원 이메일 인증</h1><p>다음의 링크를 클릭하시면 이메일 인증이 완료됩니다 : </p><p>${URL}</p>',
    text: '다음의 링크를 클릭하시면 이메일 인증이 완료됩니다 : ${URL}'
  },
  shouldSendConfirmation: false
});
nev.generateTempUserModel(Users);

// promisify
function createTempUser(newUser) {
  return new Promise( function (resolve, reject) {
    nev.createTempUser(newUser, function (err, newTempUser){
      resolve({
        err: err,
        newTempUser: newTempUser
      });
    });
  });
}
function registerTempUser(newUser) {
  return new Promise( function (resolve, reject) {
    nev.registerTempUser(newUser, function (err){
      resolve(err);
    });
  });
}
function confirmTempUser(url) {
  return new Promise( function (resolve, reject) {
    nev.confirmTempUser(url, function (err, user){
      resolve({
        err: err,
        user: user
      });
    });
  });
}

public.get('/', function *(next) {
  yield this.render('home');
});

public.get('/list', function *(next) {
  var list = fs.readdirSync(path.join("public", "maze"))
      .filter(function(item) {
        return fs.lstatSync(path.join("public", "maze", item)).isDirectory() &&
            fs.existsSync(path.join("public", "maze", item, "manifest.json"));
      })
      .map(function(item) {
        var entry = fs.existsSync(path.join("public", "maze", item, "index.json")) ? "index" : "1";
        var manifest = JSON.parse(fs.readFileSync(path.join("public", "maze", item, "manifest.json")));
        var info = null;
        manifest.forEach(function(item) {
          if(item.book && item.title) {
            info = item;
          }
        });
        return {
          title: info ? "[" + info.book + "] : " + info.title: item,
          href: "/maze#!" + item + "/" + entry
        };
      });
  yield this.render('list', {
    list: list
  });
});

public.get('/offline', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/offline.json'
  });
  yield this.render('list', {
    list: JSON.parse(list.body)
  });
});

public.get('/old', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/list2.json'
  });
  yield this.render('home', {
    list: JSON.parse(list.body)
  });
});

public.get('/code', function *(next) {
  yield this.render('code', {
    code: ""
  });
});

public.get('/code/:code', function *(next) {
  var code = this.params.code;
  var info = url_json.filter(function(obj) {
    return obj.code == code;
  })[0] || (yield getInfoByCode(code));
  if(!info) {
    var users = yield auth_db.user.find({});
    users = users.forEach(function(user) {
      if(user.userType == "branch") {
        user.kinders.forEach(function(kinder) {
          var kcode = getCode(user.branch.name, kinder.name);
          if(code == kcode) {
            var classes = {};
            kinder.kinderClasses.forEach(function(classObj) {
              var book = getBook(classObj);
              if(!classes[book]) {
                classes[book] = [];
              }
              classes[book].push(classObj.className);
            });
            info = {
              school: kinder.name,
              code: code,
              date: "20170401",
              classes: classes,
              lang: kinder.lang || ""
            };
          }
        });
      }
    });
  }
  yield this.render('code', {
    manifest: code,
    code: code,
    info: JSON.stringify(info)
  });
});

secured.get('/homeschool/:classId', function *(next) {
  var classId = this.params.classId,
      kinderId = classId.split("-").slice(0, 2).join("-"),
      kinder = yield getKinder(kinderId),
      info = yield getInfoByCode(kinder.url),
      className = kinder.kinderClasses.filter(function(item) {
        return item.code == classId;
      })[0].className;

  yield this.render('code', {
    code: kinder.url,
    info: JSON.stringify(info),
    className: className
  });
});

public.get('/kinder/:kinderId', function *(next) {
  var kinder = yield getKinder(this.params.kinderId);
  this.type = "application/json";
  this.body = JSON.stringify(kinder);
});

public.get('/cache/:manifest', function *(next) {
  this.type = "text/cache-manifest";
  var manifest = this.params.manifest;
  var code = manifest.split(".")[0];
  var school = url_json.filter(function(obj) {
    return obj.code == code;
  })[0] || (yield getInfoByCode(code));
  if(school == null) {
    this.body = "# cannot generate manifest";
    return;
  }
  var loginStamp = "# login stamp dose not exist";
  if(school.logins && school.logins.length > 0) {
    loginStamp = school.logins.map(function(obj) {
      var updateOn = obj.updateOn ? (obj.updateOn.$date || obj.updateOn) : "noupdate";
      return "#" + obj.className + " : " + updateOn;
    }).join("\n");
  }
  if(!school) {
    var users = yield auth_db.user.find({});
    users = users.forEach(function(user) {
      if(user.userType == "branch") {
        user.kinders.forEach(function(kinder) {
          var kcode = getCode(user.branch.name, kinder.name);
          if(code == kcode) {
            var classes = {};
            kinder.kinderClasses.forEach(function(classObj) {
              var book = getBook(classObj);
              if(!classes[book]) {
                classes[book] = [];
              }
              classes[book].push(classObj.className);
            });
            school = {
              school: kinder.name,
              code: code,
              date: "20170301",
              classes: classes
            };
          }
        });
      }
    });
  }
  var bookArr = Object.keys(school.classes),
      timestamp = school.updateOn || defaultTimeStamp,
      manifests = [],
      pages = [],
      activities = [],
      page_manifests = [],
      jsons = [],
      imgs = [],
      cache = [],
      output = "CACHE MANIFEST\n";
  bookArr.forEach(function(bookNames) {
    bookNames.split(",").forEach(function(bookName) {
      books_json[bookName].forEach(function(contentInfo) {
        var maniPath = contentInfo[contentInfo.length - 1],
            pagePath = contentInfo[contentInfo.length - 1],
            isMaze = maniPath.match(/mazeh?#!(.*)/),
            isActivity = maniPath.match(/activity#!(.*)/);
        if(isMaze) {
          maniPath = isMaze[1];
        }
        if(isActivity) {
          activities.push(isActivity[1]);
        }
        maniPath = maniPath.slice(0, maniPath.lastIndexOf("/"));
        if(maniPath && manifests.indexOf(maniPath) < 0) {
          manifests.push(maniPath);
          var maniTokens = maniPath.split("_"),
              maniHeading = maniTokens.slice(0,2).join("_");
          // c3_w1_c1이 있다면 c3_w1_c2도 추가
          if(maniTokens.length == 2 || maniTokens.length == 3) {
            mazeDirs.forEach(function(dir) {
              if(maniPath != dir &&
                  maniHeading == dir.split("_").slice(0,2).join("_") &&
                  manifests.indexOf(dir) < 0) {
                manifests.push(dir);
              }
            });
          }
        }
        if(pagePath.indexOf("#!") >= 0) {
          pagePath = pagePath.slice(0, pagePath.indexOf("#!"));
        }
        if(pages.indexOf(pagePath) < 0) {
          pages.push(pagePath);
        }
      });
    });
  });
  function addImg(arr) {
    if(!Array.isArray(arr)) {
      arr = [arr];
    }
    arr.forEach(function(img) {
      if(typeof img != "string") {
        img = (img && img.src) ? img.src : null;
      }
      if(img && imgs.indexOf(img) < 0) {
        imgs.push(img);
      }
    });
  }
  manifests.forEach(function(maniPath) {
    var manifest = JSON.parse(fs.readFileSync(path.join("public/maze", maniPath, "manifest.json")));
    manifest.forEach(function(item) {
      // bgm을 제외한 파일을 중복 없이 추가
      if(item.id != "bgm" && item.src && cache.indexOf(item.src) < 0) {
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
            addImg(item.img);
          });
        }
        // goal에 들어있는 이미지 추가
        if(maze.goal && maze.goal.img) {
          addImg(maze.goal.img);
        }
        // extra안에 들어있는 tutorial에 들어있는 이미지 추가
        if(maze.extra) {
          maze.extra.forEach(function(extra) {
            if(extra.tutorial) {
              extra.tutorial.forEach(function(item) {
                addImg(item.img);
              });
            }
          });
        }
      }
      return path.join("/maze", maniPath, item);
    }));
  });

  // maze가 아닌 개별 페이지들의 manifest 로드
  pages.filter(function(item) {
    var item_path = path.join("public", "img", item),
        exist = fs.existsSync(item_path),
        stat = exist && fs.statSync(item_path);
    return exist && stat.isDirectory();
  })
  .forEach(function(page) {
    var page_path = path.join("public", "img", page),
        files = fs.readdirSync(page_path)
        .filter(function(item) {
          return item != ".DS_Store" && item != "Thumbs.db";
        });
    files.forEach(function(item) {
      var file_path = path.join("/img", page, item);
      if(page_manifests.indexOf(file_path) < 0) {
        page_manifests.push(file_path);
      }
    });
  });

  // activity의 manifest 로드
  activities.forEach(function(activity) {
    var file_path = path.join("/activities", activity + ".json");
    if(page_manifests.indexOf(file_path) < 0) {
      page_manifests.push(file_path);
    }
    var activity = JSON.parse(fs.readFileSync(path.join("public", file_path)));
    activity.manifest.forEach(function(obj) {
      console.log(obj.src)
      if(page_manifests.indexOf(obj.src) < 0) {
        page_manifests.push(obj.src);
      }
    });
  })

  // imgs에 속한 이미지중 cache에 속한 이미지는 제거
  imgs = imgs.filter(function(item) {
    return cache.indexOf(item) < 0;
  });

  // timestamp
  output += '#' + timestamp + '\n';
  output += '#' + defaultTimeStamp + '\n';
  output += loginStamp + '\n';

  output += "# pages\n";
  output += pages.join("\n") + "\n";

  output += "# files in pages\n";
  output += page_manifests.join("\n") + "\n";

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
  output += scratchBlocksImgs.join("\n") + "\n";
  output += scratchBlocksIcons.join("\n") + "\n";
  output += kidsblocks.join("\n") + "\n";
  output += msgJsons.join("\n") + "\n";

  output += "# js and css\n";
  output += jsList.join("\n") + "\n";
  output += cssList.join("\n") + "\n";

  output += "# postfile\n";
  output += postfile;

  output += "NETWORK:\n*\n";

  this.body = output;

});

function getContents(book, week) {
  var books = books_json[book],
      list = week.split(",").map(function(idx) {
        return books[Number(idx)-1];
      }).filter(function(idx) {return !!idx}),
      dirs = fs.readdirSync("public/maze"),
      contents = list.map(function(item) {
        var href = item[item.length - 1],
            heading = href.slice(0, href.indexOf("#!"))
            mazePath = href.slice(href.indexOf("#!")+2, href.lastIndexOf("/")),
            pathTokens = mazePath.split("_"),
            pattern = pathTokens.slice(0,2).join("_"),
            targets = [],
            problems = [];
        if(href.slice(0, 5) == "/maze") {
          if(pathTokens.length == 3) {
            dirs.forEach(function(dir) {
              if(dir.startsWith(pattern)) {
                targets.push(heading + "#!" + dir);
              }
            });
          } else {
            targets.push(heading + "#!" + mazePath);
          }
        } else {
          targets.push(href);
        }
        targets.forEach(function(href) {
          var items = [];
          if(href.slice(0, 5) == "/maze") {
            var mazePath = href.slice(href.indexOf("#!")+2),
                dir = fs.readdirSync("public/maze/" + mazePath);
            dir.forEach(function(item) {
              var filename = item.slice(0, -5);
              if( item.slice(-5) == ".json" &&
                  item != "manifest.json" &&
                  item != "99.json" &&
                  (filename == "index" || !isNaN(Number(filename)))) {
                items.push(filename);
              }
            });
            items.sort(function(a, b) {
              if(a == "index") {
                return -1;
              } else if(b == "index") {
                return 1;
              }
              return Number(a) - Number(b);
            });
            items = items.map(function(problem) {
              return href + "/" + problem;
            });
          } else {
            items = [href];
          }
          problems = problems.concat(items);
        });

        return {
          title: item[0].split(":")[0],
          subtitle: item[0].split(":")[1],
          problems: problems
        };
      });
  return contents;
}

public.get('/nav/:book', function *(next) {
  if(siteUrl != "http://localhost:3000") {
    this.body = "<html><head><script>alert('잘못된 접근 입니다.');location.href='/';</script></head></html>";
    return;
  }
  yield this.render('nav', {
    book: this.params.book,
    week: "1,2,3,4",
    contents: getContents(this.params.book, "1,2,3,4")
  });
});

public.post('/nav', function *(next) {
  yield this.render('nav', {
    book: this.request.body.book,
    week: this.request.body.week,
    contents: getContents(this.request.body.book, this.request.body.week)
  });
});

public.get('/login', function *(next) {
  yield this.render('login', {
    url: JSON.stringify(url_json),
    names: JSON.stringify(names_json),
    level: JSON.stringify(level_json),
  });
});

public.get('/book', function *(next) {
  yield this.render('book', {
    url: JSON.stringify(url_json)
  });
});

public.get('/school', function *(next) {
  yield this.render('school', {
    siteUrl: siteUrl,
    url: JSON.stringify(url_json)
  });
});

public.get('/show_collision', function *(next) {
  var users = yield auth_db.user.find({}),
      urls = {};
  users = users.filter(function(user) {
    return user.userType == "branch";
  }).map(function(user) {
    return {
      name: user.branch.name,
      code: user.code,
      address: user.branch.address.roadAddr,
      kinders: user.kinders.map(function(kinder) {
        return {
          url: getCode(user.branch.name, kinder.name),
          name: kinder.name,
          code: kinder.code,
          classes: kinder.kinderClasses.map(function(obj) {
            return obj.className;
          })
        };
      })
    };
  });
  users.forEach(function(user) {
    user.kinders.forEach(function(kinder) {
      if(!urls[kinder.url]) {
        urls[kinder.url] = [];
      }
      urls[kinder.url].push(user.code + " " + user.name + ":" + kinder.name + " - " + user.address);
    });
  });
  for(code in urls) {
    if(urls[code].length <= 1) {
      delete urls[code];
    }
  }
  this.body = JSON.stringify(urls, null, 2);
});

public.get('/info', function *(next) {
  yield this.render('info', {
    url: JSON.stringify(url_json),
    names: JSON.stringify(names_json),
    level: JSON.stringify(level_json),
  });
});

public.post('/issue', function *(next) {
  yield this.render('issue', this.request.body);
});

public.get('/kids', function *(next) {
  yield this.render('kids');
});

public.get('/login-home', function *(next) {
  yield this.render('login-home');
});

public.get('/registration', function *(next) {
  yield this.render('registration');
});

public.post('/createTempUser', function *(next) {
  var code = this.request.body.code.split("-");
  var newUser = Users({
    email: this.request.body.email,
    password: this.request.body.password,
    code: this.request.body["kinder-class"]
  });

  var result = yield createTempUser(newUser),
      newTempUser = result.newTempUser;
  if(result.err) {
    console.log("ERROR: createTempUer");
    console.log(err);
    this.body = "유저 생성 에러";
    return;
  }

  if (newTempUser) {
    // a new user
    var err = yield registerTempUser(newTempUser);
    if (err) {
      console.log("ERROR: registerTempUser");
      console.log(err);
      this.body = "유저 등록 에러";
    }
    this.redirect("/login-home?verify");
  } else {
    // user already exists in our temporary collection
    console.log("ERROR: user already exists");
    this.body = "이미 등록된 유저";
  }
});

public.get('/confirmTempUser/:url', function *(next) {
  var url = this.params.url;
  var result = yield confirmTempUser(url);
  if(result.err) {
    thid.body = "이메일 인증 에러";
    return;
  }
  if(result.user) {
    // redirect to their profile
    this.redirect('/login-home?registered');
  } else {
    // redirect to sign-up
    this.redirect('/registration');
  }
});

public.get('/click', function *(next) {
  yield this.render('click');
});
public.get('/click_history', function *(next) {
  yield this.render('click_history');
});
public.get('/c1_w2', function *(next) {
  yield this.render('c1_w2');
});
public.get('/c1_w2_2', function *(next) {
  yield this.render('c1_w2_2');
});
public.get('/b1_w2', function *(next) {
  yield this.render('b1_w2');
});
public.get('/b1_w3', function *(next) {
  yield this.render('b1_w3');
});

public.get('/dragndrop', function *(next) {
  yield this.render('dragndrop');
});
public.get('/dragndrop_suwon', function *(next) {
  yield this.render('dragndrop_suwon');
});
public.get('/c1_w3', function *(next) {
  yield this.render('c1_w3');
});
public.get('/b1_w4', function *(next) {
  yield this.render('b1_w4');
});
public.get('/a4_w3', function *(next) {
  yield this.render('a4_w3');
});
public.get('/a5_5_w3', function *(next) {
  yield this.render('a5_5_w3');
});
public.get('/a6_w4', function *(next) {
  yield this.render('a6_w4');
});
public.get('/a7_w1', function *(next) {
  yield this.render('a7_w1');
});
public.get('/a8_w1', function *(next) {
  yield this.render('a8_w1');
});

var activityIndex = fs.readFileSync("./public/webcomponents-es5/index.html");
public.get('/activity', function *(next) {
  this.type = "text/html";
  this.body = activityIndex;
});

public.get('/maze', function *(next) {
  yield this.render('maze', {
    mazeType: "vertical"
  });
});

public.get('/mazeh', function *(next) {
  yield this.render('maze', {
    mazeType: "horizontal"
  });
});

public.post('/api/login', function*(next) {
  var user = yield Users.findOne({email: this.request.body.email});
  yield passport.authenticate('local', {
    successRedirect: '/homeschool/' + (user ? user.code : ""),
    failureRedirect: '/login-home?loginfailed'
  });
});

public.get('/api/logout', function*(next) {
  this.logout();
  this.redirect('/login-home?loggedout');
});

public.get('/camera', function *(next) {
  yield this.render('camera');
});

public.get('/contents', function *(next) {
  this.redirect('https://drive.google.com/embeddedfolderview?id=0B1Aeb4WZ7p9uWGE2NVM2QmRobXM#list');
});

public.get('/office', function *(next) {
  this.redirect('http://office.toycode.org');
});

module.exports = {
  public: public,
  secured: secured
};
