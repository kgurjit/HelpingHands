var express = require('express');
var passport = require('passport');
var router = express.Router();
var ad = require('../config/ad');

router.get('/', function(req, res, next) {
	res.render('index', {
		layout: 'home'
	});
});

router.get('/about', function(req, res, next) {
	res.render('about', {
		title: 'About Us'
	});
});

router.get('/contact', function(req, res, next) {
	res.render('contact', {
		title: 'Contact Us'
	});
});

router.get('/listing', function(req, res, next) {
	ad.getById(req.query.id, function(details) {
		res.render('listing', {
			details: details
		});
	});
});

router.get('/search', function(req, res, next) {
	ad.searchByKeywordsAndLoc(req.query.q, req.query.loc, function(data) {
		console.log('Rcvd data from backend: ' + JSON.stringify(data));
		res.render('search', {
			title: 'Search Results',
			q: req.query.q,
			data: data
		});
	});
});

router.get('/create', function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/signin');
	} else {
		var user = req.user;
		if (user !== undefined) {
			user = user.toJSON();
		}
		ad.getAllCategories(function(categories) {
			res.render('create', {
				title: 'Create Listing',
				categories: categories
			});
		});
	}

});

router.post('/create', function(req, res, next) {
	req.body.userId = req.user.id;
	ad.createListing(req.body, function(id) {
		res.redirect('/listing?id=' + id);
	}, function() {
		res.render('error', {
			details: 'Listing could not be created'
		});
	});
});

router.get('/signin', function(req, res, next) {
	if (req.isAuthenticated()) res.redirect('/');
	res.render('signin', {
		title: 'Account Sign In'
	});
});

var signIn = function(req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/create',
		failureRedirect: '/signin'
	}, function(err, user, info) {
		if (err) {
			return res.render('signin', {
				title: 'Account Sign In',
				errorMessage: err.message
			});
		}

		if (!user) {
			return res.render('signin', {
				title: 'Account Sign In',
				errorMessage: info.message
			});
		}
		return req.logIn(user, function(err) {
			if (err) {
				return res.render('signin', {
					title: 'Account Sign In',
					errorMessage: err.message
				});
			} else {
				return res.redirect('/create');
			}
		});
	})(req, res, next);
};

router.post('/signin', signIn);

router.get('/signup', function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/createlisting');
	} else {
		res.render('signup', {
			title: 'Account Sign Up'
		});
	}
});

router.post('/signup', function(req, res, next) {
	var user = req.body;

	ad.createUser(user, function() {
		signIn(req, res, next);
	}, function(err) {
		res.render('signup', {
			title: 'Account Sign Up',
			errorMessage: err
		});
	});
});

router.get('/signout', function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect('/signin'); // Change it to home
	} else {
		req.logout();
		res.redirect('/signin'); // Change it to home
	}
});

module.exports = router;