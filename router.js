var public = require('koa-router')(),
    secured = require('koa-router')(),
    passport = require('koa-passport'),
    request = require('co-request'),
    students = require('./controller/students'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('./config.json'); //[argv.production ? 'production' : 'development'];

public.get('/', function *(next) {
  yield this.render('home', {
    title: "키즈코딩"
  });
});

public.get('/list', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/list.json'
  });
  yield this.render('list', {
    title: "키즈코딩",
    list: JSON.parse(list.body)
  });
});

public.get('/offline', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/offline.json'
  });
  yield this.render('list', {
    title: "키즈코딩",
    list: JSON.parse(list.body)
  });
});

public.get('/old', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/list2.json'
  });
  yield this.render('home', {
    title: "키즈코딩",
    list: JSON.parse(list.body)
  });
});

public.get('/code', function *(next) {
  yield this.render('code', {
    title: "키즈코딩",
    manifest: true
  });
});

public.get('/login', function *(next) {
  yield this.render('login', {
    title: "키즈코딩 로그인"
  });
});

public.get('/book', function *(next) {
  yield this.render('book', {
    title: "키즈코딩 1권"
  });
});

public.get('/school', function *(next) {
  yield this.render('school', {
    title: "키즈코딩 로그인 정보"
  });
});

public.get('/info', function *(next) {
  yield this.render('info', {
    title: "키즈코딩 로그인 정보"
  });
});

// public.get('/login/:school/:class', function *(next) {
//   var Students = require('./model/students');
//   yield this.render('class', {
//     title: "키즈코딩 로그인",
//     schoolName: this.params.school,
//     className: this.params.class,
//     students: yield Students.find({
//       school: this.params.school,
//       class: this.params.class
//     })
//   });
// });

public.get('/click', function *(next) {
  yield this.render('click', {
    title: "키즈코딩"
  });
});

public.get('/dragndrop', function *(next) {
  yield this.render('dragndrop', {
    title: "키즈코딩"
  });
});

public.get('/maze/:type', function *(next) {
  yield this.render('maze', {
    title: "키즈코딩",
    type: this.params.type
  });
});

public.get('/maze/:type/:step', function *(next) {
  yield this.render('maze', {
    title: "키즈코딩",
    type: this.params.type,
    step: this.params.step
  });
});

public.get('/maze/:category/:type/:step', function *(next) {
  yield this.render('maze', {
    title: "키즈코딩",
    category: this.params.category,
    type: this.params.type,
    step: this.params.step
  });
});

// public.post('/api/login',
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login'
//   })
// );
//
// public.get('/api/logout', function*(next) {
//   this.logout();
//   this.redirect('/login');
// });

secured.get('/dashboard', function*(next) {
  yield this.render('dashboard', {
    title: "키즈코딩",
    user: this.session.passport.user
  });
});

module.exports = {
  public: public,
  secured: secured
};
