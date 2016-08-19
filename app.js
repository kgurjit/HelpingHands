var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var db = require('./models');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
   db.user.findOne({where : {username: username}}).then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid Username or Password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid Username or Password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   db.user.findOne({where : {username: username}}).then(function(user) {
      done(null, user);
   });
});


var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
}));
app.set('view engine', 'handlebars');

var routes = require('./routes');

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.user = req.user; 
    next();
});

app.use('/', routes);

var port = 3000;
app.listen(port);