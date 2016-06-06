var app = require('koa')(),
    body = require('koa-body'),
    session = require('koa-generic-session'),
    passport = require('koa-passport'),
    localStrategy = require('passport-local').Strategy,
    render = require('koa-ejs'),
    less = require('koa-less'),
    serve = require('koa-static'),
    cors = require('koa-cors'),
    compress = require('koa-compress'),
    path = require('path'),
    mongoose = require('mongoose'),
    argv = require('minimist')(process.argv.slice(2)),
    Users = require('./model/users'),
    config = require('./config.json'); //[argv.production ? 'production' : 'development'];

mongoose.connect(config.db);
var db = mongoose.connection;
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

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  Users.findOne({ email: user.email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    return done(null, user);
  });
});

passport.use('local', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  Users.findOne({ email: email }, function(err, user) {
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
  .use(compress())
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
      this.redirect('/login-home');
    }
  })
  .use(router.secured.middleware());

app.listen(config.port);
console.log('the app listens on port ' + config.port);
