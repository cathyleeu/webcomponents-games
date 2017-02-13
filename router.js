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
    argv = require('minimist')(process.argv.slice(2)),
    siteUrl = argv.url || 'http://localhost:3000',
    config = require('./config.json'); //[argv.production ? 'production' : 'development'];

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
  yield this.render('code');
});

public.get('/code/:code', function *(next) {
  yield this.render('code', {
    manifest: this.params.code
  });
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

public.get('/info', function *(next) {
  yield this.render('info');
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
