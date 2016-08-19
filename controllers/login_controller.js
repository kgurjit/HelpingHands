// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

// user model
var db = require('../models');

// create-listing
var createlisting = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('createlisting', {title: 'Create Listing', user: user}); 
   }
};

// sign in
// GET
var signIn = function(req, res, next) {
   if(req.isAuthenticated()) res.redirect('/');
   res.render('signin', {title: 'Account Sign In'});
};

// sign in
// POST
var signInPost = function(req, res, next) {
   passport.authenticate('local', { successRedirect: '/create',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.render('signin', {title: 'Account Sign In', errorMessage: err.message});
      } 

      if(!user) {
         return res.render('signin', {title: 'Account Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.render('signin', {title: 'Account Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/create');
         }
      });
   })(req, res, next);
};

// sign up
// GET
var signUp = function(req, res, next) {
   if ( req.isAuthenticated() ) {
      res.redirect('/createlisting');
   } else {
      res.render('signup', {title: 'Account Sign Up'});
   }
};

// sign up
// POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   
   db.user.findOne({where : {username: user.username}}).then(function(model) {
      if(model) {
         res.render('signup', {title: 'Account Sign Up', errorMessage: 'User name already exists. Please login using sign in link.'});
      } else {
         
         // password validation can be performed here
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         db.user.create({username: user.username, password: hash}).then(function(model) {
            signInPost(req, res, next);
         });	
      }
   });
};

// sign out
var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');   // Change it to home
   } else {
      req.logout();
      res.redirect('/signin');   // Change it to home
   }
};

module.exports.createlisting = createlisting;
module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
module.exports.signOut = signOut;
