var router = require('koa-router')(),
    request = require('co-request'),
    // user = require('./controller/user'),
    // terms = require('./controller/terms'),
    // food = require('./controller/food'),
    // company = require('./controller/company'),
    // restaurant = require('./controller/restaurant'),
    // menu = require('./controller/menu'),
    // vote = require('./controller/vote'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('./config.json')[argv.production ? 'production' : 'development'];

router.get('/', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/list.json'
  });
  yield this.render('home', {
    title: "키즈코딩",
    list: JSON.parse(list.body)
  });
});

router.get('/old', function *(next) {
  var list = yield request({
    method: 'GET',
    uri: 'http://localhost:' + config.port + '/maze/list2.json'
  });
  yield this.render('home', {
    title: "키즈코딩",
    list: JSON.parse(list.body)
  });
});

router.get('/maze/:type', function *(next) {
  yield this.render('maze', {
    title: "키즈코딩",
    type: this.params.type
  });
});

router.get('/maze/:type/:step', function *(next) {
  yield this.render('maze', {
    title: "키즈코딩",
    type: this.params.type,
    step: this.params.step
  });
});

router.get('/maze/:category/:type/:step', function *(next) {
  yield this.render('maze', {
    title: "키즈코딩",
    category: this.params.category,
    type: this.params.type,
    step: this.params.step
  });
});

module.exports = router;
