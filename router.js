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
    title: "Kidscoding",
    list: JSON.parse(list.body)
  });
});

router.get('/maze/:type/:step', function *(next) {
  yield this.render('maze', {
    title: "Kidscoding",
    type: this.params.type,
    step: this.params.step
  });
});

// router.get('/menucreate', function *(next) {
//   yield this.render('menucreate', {
//     title: '메뉴 입력하기'
//   });
// });
//
// router.redirect('/foodgallery', '/foodgallery/0');
// router.get('/foodgallery/:skip', function *(next) {
//   var foodlist = yield request({
//     method: 'GET',
//     uri: 'http://localhost:40001/foodlist/' + this.params.skip
//   });
//   var prev = +this.params.skip - 10,
//       next = +this.params.skip + 10;
//   if(prev < 0) {
//     prev = this.params.skip;
//   }
//   yield this.render('foodgallery', {
//     title: "Food Gallery",
//     foodlist: JSON.parse(foodlist.body),
//     prev: prev,
//     next: next
//   });
// });
//
// router.post('/subscribe', function *(next) {
//   //console.log(this.request.body);
//   var _this = this;
//
//   var response = yield request({
//     method: 'POST',
//     uri: config.m2push + '/subscribe',
//     json: this.request.body
//   });
//   this.body = 'done';
// });
//
// router
//   .get('/user/', user.all)
//   .get('/user/:uuid', user.fetch)
//   .post('/user/', user.add)
//   .put('/user/', user.modify)
//   .delete('/user/:uuid', user.remove);
//
// router
//   .get('/terms/:termstype', terms.fetch);
//
// router
//   .get('/food', food.all)
//   .get('/foodlist/:skip', food.foodlist);
//
// router
//   .get('/company/', company.all)
//   .get('/company/:no', company.fetch)
//   .post('/company/', company.add);
//
// router
//   .get('/restaurant/', restaurant.all)
//   .get('/restaurant/:company_no', restaurant.fetch);
//
// router
//   .get('/menu/:restaurant_no/:menudate', menu.fetch)
//   .get('/menu/:restaurant_no/:menudate/:timetype/:course', menu.fetch2)
//   .get('/menudetails/:restaurant_no/:menudate/:timetype/:course', menu.details)
//   .post('/menu/', menu.upsert);
//
// router
//   .post('/vote/', vote.upsert);

module.exports = router;
