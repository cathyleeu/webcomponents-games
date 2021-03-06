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
    co = require('co'),
    recursiveReadSync = require('recursive-readdir-sync'),
    siteUrl = argv.url || 'http://localhost:3000',
    config = require('./config.json'), //[argv.production ? 'production' : 'development'];
    auth_db = pmongo(config.auth_db, ["user", "logins", "reports", "history"]),
    schools_json = require('./login/schools.json'),
    names_json = require('./public/login/names.json'),
    level_json = require('./public/login/level_pw.json'),
    books_json = require('./public/login/books.json'),
    getBook = require('./getBook');
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
    .concat(level_json["A-re"])
    .concat(level_json["B-re"])
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
var webcomponentsES5 = fs.readdirSync("public/webcomponents-es5")
    .filter(function(item) {
      return item != ".DS_Store" && item != "Thumbs.db" && item.slice(-5) == ".html" || item.slice(-3) == ".js";
    })
    .map(function(item) {
      return "/webcomponents-es5/" + item;
    });
var componentsES5 = recursiveReadSync("public/components-es5")
    .filter(function(item) {
      return item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      return item.slice(6);
    });

var mazeDirs = fs.readdirSync('public/maze')
    .filter(function(file) {
      return fs.lstatSync(path.join('public/maze', file)).isDirectory();
    });

var activityJsons = fs.readdirSync('public/activities'),
    pageFiles = fs.readdirSync('view');

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
    co(function* () {
      // url_json -> db(url이 세팅되어있는 경우) -> db(url이 세팅되지 않은 겨우)
      var info = url_json.filter(function(obj) {
            return obj.code == code;
          })[0];
      if(info) {
        var classes = info.classes;
        info = Object.assign({}, info);
        info.classes = [];
        Object.keys(classes).forEach(function(book) {
          classes[book].forEach(function(className) {
            info.classes.push({
              code: className,
              className: className,
              book: book,
              level: book.match(/^(\w)-/) ? book[0] : null
            });
          });
        });
        resolve(info);
        return;
      }
      var user = yield auth_db.user.findOne({kinders:{$elemMatch:{url:code}}});
      if(!user) {
        var users = yield auth_db.user.find({});
        users.forEach(function(_user) {
          if(_user.userType == "branch") {
            _user.kinders.forEach(function(kinder) {
              var kcode = getCode(user.branch.name, kinder.name);
              if(code == kcode) {
                user = _user;
              }
            });
          }
        });
        if(!user) {
          reject(null);
        }
      }
      var kinder = user.kinders.filter(function(kinder) {
        return kinder.url == code;
      })[0];
      var logins = yield auth_db.logins.find({kinderId:kinder.code}),
          time = user.updateOn || user.createdOn,
          month = user.code == "C00071" ? "03" : "04", // 대구지사 03월로 고정 예외처리
          classes = kinder.kinderClasses.slice().map(function(classObj) {
            classObj.book = getBook(classObj);
            return classObj;
          });
      resolve({
        school: kinder.name,
        kinder: kinder.code,
        school_name: user.branch.sub_name || "",
        code: code,
        date: "2017" + month + "01",
        classes: kinder.kinderClasses,
        lang: kinder.lang || "",
        updateOn: time ? time["$date"] : null,
        logins: logins
      });
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
  var info = yield getInfoByCode(code);
  yield this.render('code', {
    manifest: code,
    code: code,
    info: JSON.stringify(info)
  });
});

public.get('/trial', function *() {
  var code = "36904";
  var info = yield getInfoByCode(code);
  yield this.render('code', {
    code: code,
    info: JSON.stringify(info),
    isTrial: true
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
  var school = yield getInfoByCode(code);
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
            school = {
              school: kinder.name,
              code: code,
              date: "20170301",
              classes: kinder.kinderClasses
            };
          }
        });
      }
    });
  }
  var bookArr = school.classes.reduce(function(acc, cur) {
        cur.book.split(",").forEach(function(book) {
          if(acc.indexOf(book) < 0) {
            acc.push(book);
          }
        });
        return acc;
      }, []),
      timestamp = school.updateOn || defaultTimeStamp,
      manifests = [],
      pages = [],
      activities = [],
      page_manifests = [],
      jsons = [],
      imgs = [],
      cache = [],
      output = "CACHE MANIFEST\n#contents:" + bookArr.join(",") + "\n";
  bookArr.forEach(function(bookNames) {
    bookNames.split(",").forEach(function(bookName) {
      books_json[bookName].forEach(function(contentInfo) {
        var maniPath = contentInfo[contentInfo.length - 1],
            pagePath = contentInfo[contentInfo.length - 1],
            isMaze = maniPath.match(/maze[hv]?#!(.*)/),
            isActivity = maniPath.match(/activity#!(.*)/);
        if(isMaze) {
          maniPath = isMaze[1];
        }
        if(isActivity) {
          activities.push(isActivity[1]);
          var activityTokens = isActivity[1].split("_");
          // c3_w1_c1이 있다면 c3_w1_c2도 추가
          if(activityTokens.length == 2 || activityTokens.length == 3) {
            activityJsons.forEach(function(filename) {
              if( isActivity[1].split("_").slice(0,2).join("_") == filename.split("_").slice(0,2).join("_") &&
                  filename.slice(-5).toLowerCase() == ".json" &&
                  activities.indexOf(filename.slice(0,-5)) < 0) {
                activities.push(filename.slice(0,-5));
              }
            });
          }
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
          var pageTokens = pagePath.split("_");
          // c3_w1_c1이 있다면 c3_w1_c2도 추가
          if(pageTokens.length == 2 || pageTokens.length == 3) {
            pageFiles.forEach(function(filename) {
              filename = "/" + filename;
              if( pagePath.split("_").slice(0,2).join("_") == filename.split("_").slice(0,2).join("_") &&
                  filename.slice(-4).toLowerCase() == ".ejs" &&
                  pages.indexOf(filename.slice(0,-4)) < 0) {
                pages.push(filename.slice(0,-4));
              }
            });
          }
        }
      });
    });
  });
  // activity의 manifest 로드
  activities.forEach(function(activity) {
    var file_path = path.join("/activities", activity + ".json");
    if(page_manifests.indexOf(file_path) < 0) {
      page_manifests.push(file_path);
    }
    var activity = JSON.parse(fs.readFileSync(path.join("public", file_path)));
    if(activity.manifest) {
      activity.manifest.forEach(function(obj) {
        if(!!obj.src && page_manifests.indexOf(obj.src) < 0) {
          page_manifests.push(obj.src);
        }
        if(!!obj.en_src && page_manifests.indexOf(obj.en_src) < 0) {
          page_manifests.push(obj.en_src);
        }
      });
    }
    // activity의 nextlink로 maze가 포함됨 경우 처리
    if(activity.attributes && activity.attributes.nextlink) {
      var maniPath = activity.attributes.nextlink.match(/^mazeh?#!(.*)/);
      if(maniPath) {
        maniPath = maniPath[1].slice(0, maniPath.lastIndexOf("/"));
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
      }
    }
  })
  // 각 index.json의 경우 link에서 다른 폴더가 필요한지 체크
  manifests.forEach(function(maniPath) {
    var index_path = path.join("public/maze", maniPath, "index.json"),
        exist = fs.existsSync(index_path),
        index;
    if(!exist) {
      return;
    }
    index = JSON.parse(fs.readFileSync(index_path));
    // extra안에 들어있는 link 확인
    if(index.extra) {
      index.extra.forEach(function(extra) {
        if(extra.link) {
          var dir = extra.link.split("/")[0];
          if(dir != maniPath && manifests.indexOf(dir) < 0) {
            manifests.push(dir);
          }
        }
      });
    }
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
    .filter(function(item) {
      return item != ".DS_Store" && item != "Thumbs.db";
    })
    .map(function(item) {
      if(item != "manifest.json") {
        try {
          var maze = JSON.parse(fs.readFileSync(path.join("public/maze", maniPath, item)));
        } catch(e) {
          console.error("JSON parse error on " + path.join("public/maze", maniPath, item));
          throw e;
        }
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
  var page_dirs = pages.slice(0);
  page_dirs.forEach(function(item) {
    // ejs 최상단에서 imageDir를 가져온다
    var exist = fs.existsSync('./view' + item + '.ejs');
    if(exist) {
      var item_text = fs.readFileSync('./view' + item + '.ejs').toString(),
          matched = item_text.match(/<!--\s*imageDir:([\S]+)\s*-->/);
      if(matched) {
        page_dirs.push(matched[1]);
      }
    }
    // a8_w1 페이지에서 a8_w1과 a8의 폴더 이미지를 가져오도록 함
    var dir = item.split("_")[0];
    if(page_dirs.indexOf(dir) < 0) {
      page_dirs.push(dir);
    }
  });
  page_dirs.filter(function(item) {
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
  output += webcomponentsES5.join("\n") + "\n";
  output += componentsES5.join("\n") + "\n";

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
          if(pathTokens.length == 3 && pathTokens[0] != "cho") {
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

public.get('/dev', function *(next) {
  if(siteUrl != "http://localhost:3000") {
    this.body = "<html><head><script>alert('잘못된 접근 입니다.1'+siteUrl);location.href='/';</script></head></html>";
    return;
  }
  yield this.render('dev');
})

public.get('/contents/:book', function *(next) {
  var contents = yield getContents(this.params.book, "1,2,3,4,5,6,7,8");
  this.body = JSON.stringify(contents, null, 2);
});

public.get('/nav/:book', function *(next) {
  if(siteUrl != "http://localhost:3000") {
    this.body = "<html><head><script>alert('잘못된 접근 입니다.2'+siteUrl);location.href='/';</script></head></html>";
    return;
  }
  var book = this.params.book,
      week = "1,2,3,4",
      contents = week.split(",").map(function(w) {
        return book.slice(0, 4) == "CHO-" ? 2*w : w;
      }).join(",");
  yield this.render('nav', {
    book: book,
    week: week,
    contents: getContents(this.params.book, contents)
  });
});

public.post('/nav', function *(next) {
  var book = this.request.body.book,
      week = this.request.body.week,
      contents = week.split(",").map(function(w) {
        return book.slice(0, 4) == "CHO-" ? 2*w : w;
      }).join(",");
  yield this.render('nav', {
    book: book,
    week: week,
    contents: getContents(book, contents)
  });
});

public.get('/kc/:book', function *(next) {
  // 교육용 임시 페이지
  yield this.render('engloo', {
    book: "A-" + this.params.book,
    week: "1,2,3,4,5,6,7,8",
    contents: getContents("CHO-A-" + this.params.book, "1,2,3,4,5,6,7,8")
  });
});

public.get('/engloo', function *(next) {
  // 교육용 임시 페이지
  yield this.render('engloo', {
    book: "A-1",
    week: "1,2,3,4,5,6,7,8",
    contents: getContents("CHO-A-1", "1,2,3,4,5,6,7,8")
  });
});

public.post('/engloo', function *(next) {
  var curricd = this.request.body.curricd,
      mstep = this.request.body.mstep,
      level = {
        "46" : "A",
        "47" : "B"
      }[curricd],
      book = level + "-" + mstep;
  yield this.render('engloo', {
    book: book,
    week: "1,2,3,4,5,6,7,8",
    contents: getContents("CHO-" + book, "1,2,3,4,5,6,7,8"),
    stuid: this.request.body.stuid,
    camid: this.request.body.camid,
    stunm: this.request.body.stunm
  });
});

public.post('/engloolms', function *(next) {
  var str = this.request.body.stuList,
      stuList = str.trim().split("|").map(function(line) {
        return line.split(",").map(function(item) {
          return item.trim();
        });
      });
  if(stuList[0][0] == "nodata") {
    stuList = [];
  } else {
    stuList.shift();
  }
  for(var i = 0; i < stuList.length; i++) {
    var result = yield auth_db.history.findOne({
      kinder: "F00000-" + stuList[i][0],
      userId: stuList[i][1],
      book: {
        "46" : "A",
        "47" : "B"
      }[stuList[i][3]] + "-" + stuList[i][4]
    });
    stuList[i].push(result || {});
  }
  yield this.render('engloolms', {
    stuList: stuList,
    week: "1,2,3,4,5,6,7,8"
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
  var body = this.request.body,
      info = yield getInfoByCode(body.code),
      infoClass = info.classes.filter(function(item) {
        return item.className == body.className;
      })[0],
      books = infoClass.book.split(","),
      level = infoClass.level;
  books.forEach(function(bookName) {
    if(bookName.slice(0, 1) == level && bookName.slice(-3) == "-re" && Object.keys(level_json).indexOf(level + "-re") >= 0) {
      level = infoClass.level + "-re";
    }
  });
  body.level = level;
  yield this.render('issue', body);
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

public.get('/a1_w1_c1', function *(next) {
  yield this.render('a1_w1_c1');
});
public.get('/a1_w1_c2', function *(next) {
  yield this.render('a1_w1_c2');
});
public.get('/a1_w3', function *(next) {
  yield this.render('a1_w3');
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
public.get('/b1_w1', function *(next) {
  yield this.render('b1_w1');
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
public.get('/b1re_w2', function *(next) {
  yield this.render('b1re_w2');
});
public.get('/b1re_w3_c1', function *(next) {
  yield this.render('b1re_w3_c1');
});
public.get('/b1re_w3_c2', function *(next) {
  yield this.render('b1re_w3_c2');
});
public.get('/b1re_w4', function *(next) {
  yield this.render('b1re_w4');
});
public.get('/a55re_w1', function *(next) {
  yield this.render('a55re_w1');
});

var activityIndex = fs.readFileSync("./public/webcomponents-es5/index.html");
public.get('/activity', function *(next) {
  this.type = "text/html";
  this.body = activityIndex;
});

public.get('/maze', function *(next) {
  yield this.render('maze', {
    mazeType: "default"
  });
});

public.get('/mazeh', function *(next) {
  yield this.render('maze', {
    mazeType: "horizontal"
  });
});

public.get('/mazev', function *(next) {
  yield this.render('maze', {
    mazeType: "vertical"
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

public.post('/reports', function*(next) {
  var result = yield auth_db.reports.insert(this.request.body);
  this.body = "success";
});

public.get('/history/:id/:book', function*(next) {
  var id = this.params.id,
      classId = this.params.id.split(",")[0],
      tokens = classId.split("-"),
      parentId = tokens[0],
      kinder = tokens[0] + "-" + tokens[1],
      userId = this.params.id.split(",")[1],
      result = yield auth_db.history.findOne({
        classId: classId,
        userId: userId,
        book: this.params.book
      });
  this.body = result || {};
});

public.put('/history/:id/:book', function*(next) {
  var id = this.params.id,
      classId = this.params.id.split(",")[0],
      tokens = classId.split("-"),
      result = yield auth_db.history.findAndModify({
        query: {
          parentId: tokens[0],
          kinder: tokens[0] + "-" + tokens[1],
          classId: classId,
          userId: this.params.id.split(",")[1],
          book: this.params.book
        },
        update: {$set: this.request.body},
        new: true,
        upsert: true
      });
  this.body = result.ok ? result.value : null;
});

module.exports = {
  public: public,
  secured: secured
};
