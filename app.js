var app = require('koa')(),
    koaBody = require('koa-body')(),
    render = require('koa-ejs'),
    less = require('koa-less'),
    serve = require('koa-static'),
    cors = require('koa-cors'),
    path = require('path'),
    mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('./config.json')[argv.production ? 'production' : 'development'];

// mongoose.connect(config.m2db);
// var db = mongoose.connection;
// autoIncrement.initialize(db);
// db.on('error', function(e) {
//   console.error(e);
// });
// db.once('open', function() {
//   console.log('connected to ' + config.m2db);
// });

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: true,
  debug: true
});

var router = require('./router');
app
  .use(less(path.join(__dirname, 'public')))
  .use(serve(path.join(__dirname, 'public'), {
    maxage: 60*60*1000
  }))
  .use(koaBody)
  .use(function* logger(next){
    var start = new Date;
    yield next;
    var used = new Date - start;
    console.log('%s %s %s %sms',
      this.method,
      this.originalUrl,
      this.status, used);
  })
  .use(cors({'origin': true}))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port);
console.log('the app listens on port ' + config.port);
