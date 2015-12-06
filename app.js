var app = require('koa')(),
    body = require('koa-body'),
    session = require('koa-generic-session'),
    passport = require('koa-passport'),
    localStrategy = require('passport-local').Strategy,
    render = require('koa-ejs'),
    less = require('koa-less'),
    serve = require('koa-static'),
    cors = require('koa-cors'),
    path = require('path'),
    mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    argv = require('minimist')(process.argv.slice(2)),
    config = require('./config.json'); //[argv.production ? 'production' : 'development'];

mongoose.connect(config.db);
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', function(e) {
  console.error(e);
});
db.once('open', function() {
  console.log('connected to ' + config.db);
});

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

var Students = require('./model/students');
passport.serializeUser(function(user, done) {
  console.log(1);
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  console.log(2);
  Students.findOne({ name: user.name }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    return done(null, user);
  });
});

passport.use('local', new localStrategy({
  usernameField: 'name',
  passwordField: 'password'
}, function(name, password, done) {
  console.log(3);
  Students.findOne({ name: name }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password != password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));

var router = require('./router');
app.proxy = true;
app.keys = ['toycodeinc'];
app
  .use(less(path.join(__dirname, 'public')))
  .use(serve(path.join(__dirname, 'public'), {
    maxage: 60*60*1000
  }))
  .use(session())
  .use(body())
  .use(passport.initialize())
  .use(passport.session())
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
  .use(router.public.middleware())
  .use(function*(next) {
    if (this.isAuthenticated()) {
      yield next;
    } else {
      this.redirect('/login');
    }
  })
  .use(router.secured.middleware());

app.listen(config.port);
console.log('the app listens on port ' + config.port);
