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
    auth_db = pmongo(config.auth_db, "user"),
    url_json = require('./public/login/url.json');

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
var level_pw = JSON.parse(fs.readFileSync("public/login/level_pw.json"));
var loginImgs = level_pw["default"]
    .concat(level_pw["A"])
    .concat(level_pw["B"])
    .concat(level_pw["C"])
    .concat(level_pw["buttons"]);
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

// 각 원별 cache 생성
var url = JSON.parse(fs.readFileSync('public/login/url.json')),
    books = JSON.parse(fs.readFileSync('public/login/books.json'));

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
          var classes = {};
          kinder.kinderClasses.forEach(function(classObj) {
            var book = classObj.level + "-1:" + classObj.level + "-1";
            if(!classes[book]) {
              classes[book] = [];
            }
            classes[book].push(classObj.className);
          });
          var time = user.updateOn || user.createdOn;
          resolve({
            school: kinder.name,
            code: code,
            date: "20170301",
            classes: classes,
            lang: kinder.lang || "",
            updateOn: time ? time.toISOString() : null
          });
          found = true;
        });
      });
      if(!found) {
        resolve(null);
      }
    });
  });
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
    from: '키즈코딩 <toycodeinc_do_not_reply@gmail.com>',
    subject: '키즈코딩 회원 이메일 인증',
    html: '<p>다음의 링크를 클릭하시면 이메일 인증이 완료됩니다 : </p><p>${URL}</p>',
    text: '다음의 링크를 클릭하시면 이메일 인증이 완료됩니다 : ${URL}'
  },
  confirmMailOptions: {
    from: '키즈코딩 <toycodeinc_do_not_reply@gmail.com>',
    subject: '키즈코딩 회원 가입 완료',
    html: '<p>키즈코딩 회원 가입이 완료 되었습니다.</p>',
    text: '키즈코딩 회원 가입이 완료 되었습니다.'
  }
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
              var book = classObj.level + "-1:" + classObj.level + "-1";
              if(!classes[book]) {
                classes[book] = [];
              }
              classes[book].push(classObj.className);
            });
            info = {
              school: kinder.name,
              code: code,
              date: "20170301",
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

public.get('/cache/:manifest', function *(next) {
  this.type = "text/cache-manifest";
  var manifest = this.params.manifest;
  var code = manifest.split(".")[0];
  var school = url_json.filter(function(obj) {
    return obj.code == code;
  })[0] || (yield getInfoByCode(code));
  if(!school) {
    var users = yield auth_db.user.find({});
    users = users.forEach(function(user) {
      if(user.userType == "branch") {
        user.kinders.forEach(function(kinder) {
          var kcode = getCode(user.branch.name, kinder.name);
          if(code == kcode) {
            var classes = {};
            kinder.kinderClasses.forEach(function(classObj) {
              var book = classObj.level + "-1:" + classObj.level + "-1";
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
      page_manifests = [],
      jsons = [],
      imgs = [],
      cache = [],
      output = "CACHE MANIFEST\n";
  bookArr.forEach(function(bookName) {
    bookName = bookName.split(":")[0];
    books[bookName].forEach(function(contentInfo) {
      var maniPath = contentInfo[1],
          pagePath = contentInfo[1];
      if(maniPath.indexOf("#!") >= 0) {
        maniPath = maniPath.slice(maniPath.indexOf("#!") + 2);
      }
      maniPath = maniPath.slice(0, maniPath.lastIndexOf("/"));
      if(maniPath && manifests.indexOf(maniPath) < 0) {
        manifests.push(maniPath);
      }
      if(pagePath.indexOf("#!") >= 0) {
        pagePath = pagePath.slice(0, pagePath.indexOf("#!"));
      }
      if(pages.indexOf(pagePath) < 0) {
        pages.push(pagePath);
      }
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

  // imgs에 속한 이미지중 cache에 속한 이미지는 제거
  imgs = imgs.filter(function(item) {
    return cache.indexOf(item) < 0;
  });

  // timestamp
  output += '#' + timestamp + '\n';

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

public.get('/login', function *(next) {
  yield this.render('login');
});

public.get('/book', function *(next) {
  yield this.render('book')
});

public.get('/school', function *(next) {
  yield this.render('school', {
    siteUrl: siteUrl
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
  yield this.render('info');
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
    name: this.request.body.name,
    email: this.request.body.email,
    password: this.request.body.password,
    code: code[0],
    school: code[1],
    className: this.request.body.className
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
    this.body = "입력하신 메일로 이메일 인증 메세지를 보냈습니다. \n이메일 인증을 하시면 로그인하실수 있습니다.";
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
    this.redirect('/login-home');
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
    successRedirect: '/login#' + user.code + '-' + encodeURI(user.className) + '-kids',
    failureRedirect: '/login-home'
  });
});

public.get('/api/logout', function*(next) {
  this.logout();
  this.redirect('/login-home');
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
